/* Builds the blog from content/blog/<lang>/*.html.
 *
 *   node tools/build-blog.mjs
 *
 * Each source file starts with a JSON header inside an HTML comment, followed by the article body:
 *   <!--
 *   { "title": "...", "description": "...", "date": "YYYY-MM-DD", "updated": "YYYY-MM-DD" (optional),
 *     "category": "...", "source": { "title": "...", "url": "https://..." } (optional) }
 *   -->
 *   <p class="lead">...</p> <h2>...</h2> ...
 * The file name (without .html) is the URL slug.
 *
 * Output (do not edit by hand, it is overwritten):
 *   ko/blog/index.html, ko/blog/<slug>.html, ko/blog/feed.xml   (and the same under blog/ for English posts)
 *   sitemap.xml  — the block between <!-- blog:start --> and <!-- blog:end -->
 *
 * Every post must exist in BOTH languages with the same slug (content/blog/ko/<slug>.html and
 * content/blog/en/<slug>.html) and the same content, including the same IRS/FTB quote. The build fails otherwise.
 * The two versions are linked with hreflang, and the ENG/KOR buttons switch between them.
 *
 * Publishing = merging the pull request. Run this after adding or changing a post, then commit the output.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.leeeunsangtax.com';
const AUTHOR = { ko: '이은상, EA', en: 'Eunsang Lee, EA' };

const T = {
  ko: {
    base: '/ko/', dir: 'ko/blog', url: '/ko/blog/', htmlLang: 'ko', locale: 'ko_KR',
    indexTitle: '세무 소식 · 블로그 | 브레아 세무사 이은상',
    indexDesc: 'IRS와 캘리포니아 주정부 발표 중 꼭 알아야 할 세무 소식을 연방 세무사(EA) 이은상이 한국어로 정리합니다.',
    indexH1: '세무 소식',
    indexIntro: 'IRS와 캘리포니아 주정부(FTB) 발표 중 많은 분께 도움이 되는 내용을 골라, 연방 세무사가 핵심과 확인할 점을 정리합니다.',
    feedTitle: '이은상 세무사 세무 소식 | LEE EUNSANG TAX',
    read: '자세히 보기', back: '세무 소식 목록', byline: '글', published: '게시', updated: '수정', source: '출처',
    empty: '곧 첫 글이 올라옵니다.',
    ctaH: '내 상황에 해당되는지 궁금하신가요?',
    ctaP: '통지서 내용이 이해되지 않거나 확인이 필요하시면 연락 주세요. 한국어와 영어로 상담합니다.',
    ctaBtn: '상담 신청하기',
    disclaimer: '이 글은 게시일 기준 공식 발표를 바탕으로 한 일반 정보이며, 개별 세무 상담이 아닙니다. 개인 상황에 따라 적용이 달라질 수 있으니 결정 전에 전문가와 상의하시기 바랍니다.',
    authorNote: '연방 세무사(Enrolled Agent) · IRS 대리 자격 · 브레아, 캘리포니아',
    fmt: (d) => { const [y, m, day] = d.split('-').map(Number); return `${y}년 ${m}월 ${day}일`; },
  },
  en: {
    base: '/', dir: 'blog', url: '/blog/', htmlLang: 'en', locale: 'en_US',
    indexTitle: 'Tax News & Insights | LEE EUNSANG TAX, Brea, CA',
    indexDesc: 'Key IRS and California tax updates, explained by Eunsang Lee, EA, an Enrolled Agent in Brea, CA.',
    indexH1: 'Tax News & Insights',
    indexIntro: 'Selected IRS and California FTB announcements, with what they mean and what to check, from an Enrolled Agent.',
    feedTitle: 'Tax News & Insights | LEE EUNSANG TAX',
    read: 'Read more', back: 'All articles', byline: 'By', published: 'Published', updated: 'Updated', source: 'Source',
    empty: 'The first article is coming soon.',
    ctaH: 'Wondering whether this applies to you?',
    ctaP: 'If a notice is unclear or you want a second look, get in touch. We consult in English and Korean.',
    ctaBtn: 'Request a Consultation',
    disclaimer: 'This article is general information based on official announcements as of the publication date. It is not individual tax advice. How it applies depends on your situation, so consult a professional before acting.',
    authorNote: 'Enrolled Agent, enrolled to practice before the IRS · Brea, California',
    fmt: (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const DATE = /^\d{4}-\d{2}-\d{2}$/;

let problems = 0;
const fail = (msg) => { console.error('ERROR: ' + msg); problems++; };

function readPosts(lang) {
  const dir = path.join(ROOT, 'content/blog', lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.html')).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const m = raw.match(/^\s*<!--\s*([\s\S]*?)\s*-->\s*([\s\S]*)$/);
    if (!m) { fail(`content/blog/${lang}/${file}: JSON header comment missing`); return null; }
    let meta;
    try { meta = JSON.parse(m[1]); } catch (e) { fail(`content/blog/${lang}/${file}: bad JSON header (${e.message})`); return null; }
    const slug = file.replace(/\.html$/, '');
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`${file}: slug must be lowercase-with-hyphens`);
    for (const k of ['title', 'description', 'date', 'category']) if (!meta[k]) fail(`${file}: "${k}" missing`);
    if (meta.date && !DATE.test(meta.date)) fail(`${file}: date must be YYYY-MM-DD`);
    if (meta.updated && !DATE.test(meta.updated)) fail(`${file}: updated must be YYYY-MM-DD`);
    if (/<script|<h1/i.test(m[2])) fail(`${file}: body must not contain <script> or <h1>`);
    return { ...meta, slug, body: m[2].trim(), lang };
  }).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

const pair = (path) => ({ ko: '/ko' + path, en: path }); // '/blog/' or '/blog/<slug>'
function head({ t, title, description, url, type, jsonld, extra = '', alt }) {
  return `<!DOCTYPE html>
<!-- Generated by tools/build-blog.mjs from content/blog/. Do not edit by hand. -->
<html lang="${t.htmlLang}" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <base href="${t.base}" />
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(description)}" />
  <link rel="canonical" href="${SITE}${url}" />
  <link rel="alternate" hreflang="en" href="${SITE}${alt.en}" />
  <link rel="alternate" hreflang="ko" href="${SITE}${alt.ko}" />
  <link rel="alternate" hreflang="x-default" href="${SITE}${alt.en}" />
  <link rel="alternate" type="application/rss+xml" title="${attr(t.feedTitle)}" href="${SITE}${t.url}feed.xml" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="LEE EUNSANG TAX" />
  <meta property="og:locale" content="${t.locale}" />
  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(description)}" />
  <meta property="og:url" content="${SITE}${url}" />
  <meta property="og:image" content="${SITE}/images/profile.jpg" />
${extra}  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700&family=Cormorant+Garamond:wght@500;600;700&family=Noto+Serif+KR:wght@500;600;700&family=Great+Vibes&family=Playfair+Display:wght@700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/site.js"></script>
  <link rel="stylesheet" href="/site.css" />
  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2).replace(/^/gm, '  ')}
  </script>
</head>`;
}

const publisher = { '@type': 'ProfessionalService', name: 'Lee Eunsang Tax LLC', url: SITE + '/', telephone: '+1-714-482-7903' };
const person = (lang) => ({
  '@type': 'Person', name: lang === 'ko' ? '이은상' : 'Eunsang Lee', alternateName: lang === 'ko' ? 'Eunsang Lee' : '이은상',
  jobTitle: 'Enrolled Agent', url: SITE + (lang === 'ko' ? '/ko/about' : '/about'),
});

function postPage(p, t) {
  const url = `${t.url}${p.slug}`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description,
    inLanguage: t.htmlLang, datePublished: p.date, dateModified: p.updated || p.date, url: SITE + url,
    mainEntityOfPage: SITE + url, image: SITE + '/images/profile.jpg', articleSection: p.category,
    author: person(p.lang), publisher,
    ...(p.source ? { isBasedOn: p.source.url } : {}),
  };
  const extra = `  <meta property="article:published_time" content="${p.date}" />\n` +
    (p.updated ? `  <meta property="article:modified_time" content="${p.updated}" />\n` : '');
  const dates = `<time datetime="${p.date}">${t.published} ${t.fmt(p.date)}</time>` +
    (p.updated ? ` · <time datetime="${p.updated}">${t.updated} ${t.fmt(p.updated)}</time>` : '');
  return `${head({ t, title: `${p.title} | ${t.indexH1} · LEE EUNSANG TAX`, description: p.description, url, type: 'article', jsonld, extra, alt: pair('/blog/' + p.slug) })}
<body data-page="blog" class="bg-white text-slate-700 antialiased font-sans">
  <div id="site-header"></div>

  <main>
    <section class="bg-navy py-14 sm:py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <a href="blog/" class="text-sm font-semibold text-brass hover:underline">← ${esc(t.back)}</a>
        <p class="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brass">${esc(p.category)}</p>
        <h1 class="mt-3 font-serif text-3xl sm:text-4xl font-semibold leading-snug text-white">${esc(p.title)}</h1>
        <p class="mt-5 text-sm text-slate-300">${esc(t.byline)} ${esc(AUTHOR[p.lang])} · ${dates}</p>
      </div>
    </section>

    <article class="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="post-body">
${p.body.replace(/^/gm, '        ')}
      </div>
${p.source ? `
      <p class="mt-10 text-sm text-slate-500">${esc(t.source)}: <a href="${attr(p.source.url)}" target="_blank" rel="noopener" class="text-brass-dark underline underline-offset-2">${esc(p.source.title)}</a></p>` : ''}

      <div class="mt-10 flex items-center gap-4 border-t border-slate-200 pt-8">
        <img src="/images/profile.jpg" alt="${attr(AUTHOR[p.lang])}" width="56" height="56" class="h-14 w-14 rounded-full object-cover object-top" loading="lazy" />
        <div>
          <p class="font-semibold text-navy">${esc(AUTHOR[p.lang])}</p>
          <p class="text-sm text-slate-500">${esc(t.authorNote)}</p>
        </div>
      </div>

      <p class="mt-8 border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">${esc(t.disclaimer)}</p>
    </article>

    <section class="bg-navy-deep py-14 sm:py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="font-serif text-2xl sm:text-3xl font-semibold text-white">${esc(t.ctaH)}</h2>
        <p class="mt-4 leading-relaxed text-slate-300">${esc(t.ctaP)}</p>
        <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a href="contact" class="inline-flex justify-center bg-brass px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-brass-dark transition">${esc(t.ctaBtn)}</a>
          <a href="tel:+17144827903" class="inline-flex justify-center border border-white/60 px-8 py-4 text-sm font-bold tracking-[0.12em] text-white hover:bg-white hover:text-navy transition">(714) 482-7903</a>
        </div>
      </div>
    </section>
  </main>

  <div id="site-footer"></div>
</body>
</html>
`;
}

function indexPage(posts, t, lang) {
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'Blog', name: t.indexH1, description: t.indexDesc, inLanguage: t.htmlLang,
    url: SITE + t.url, publisher, author: person(lang),
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}${t.url}${p.slug}`, datePublished: p.date })),
  };
  const cards = posts.length ? posts.map((p) => `
          <li class="border-t border-slate-200 py-8">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-brass">${esc(p.category)} · <time datetime="${p.date}" class="normal-case tracking-normal text-slate-500">${t.fmt(p.date)}</time></p>
            <h2 class="mt-3 font-serif text-2xl font-semibold leading-snug text-navy"><a href="blog/${p.slug}" class="hover:text-brass-dark">${esc(p.title)}</a></h2>
            <p class="mt-3 leading-relaxed text-slate-600">${esc(p.description)}</p>
            <a href="blog/${p.slug}" class="mt-4 inline-block text-sm font-semibold text-brass-dark hover:underline">${esc(t.read)} →</a>
          </li>`).join('') : `\n          <li class="border-t border-slate-200 py-8 text-slate-500">${esc(t.empty)}</li>`;
  return `${head({ t, title: t.indexTitle, description: t.indexDesc, url: t.url, type: 'website', jsonld, alt: pair('/blog/') })}
<body data-page="blog" class="bg-white text-slate-700 antialiased font-sans">
  <div id="site-header"></div>

  <main>
    <section class="bg-navy py-16 sm:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 class="font-serif text-4xl sm:text-5xl font-semibold text-white">${esc(t.indexH1)}</h1>
        <span class="rule rule-center mt-6"></span>
        <p class="mt-6 leading-relaxed text-slate-200">${esc(t.indexIntro)}</p>
      </div>
    </section>

    <section class="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <ul>${cards}
      </ul>
    </section>
  </main>

  <div id="site-footer"></div>
</body>
</html>
`;
}

function feed(posts, t) {
  const items = posts.slice(0, 20).map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}${t.url}${p.slug}</link>
      <guid isPermaLink="true">${SITE}${t.url}${p.slug}</guid>
      <pubDate>${new Date(p.date + 'T16:00:00Z').toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.description)}</description>
    </item>`).join('\n');
  const last = posts[0] ? new Date((posts[0].updated || posts[0].date) + 'T16:00:00Z').toUTCString() : new Date(0).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(t.feedTitle)}</title>
    <link>${SITE}${t.url}</link>
    <description>${esc(t.indexDesc)}</description>
    <language>${t.htmlLang}</language>
    <lastBuildDate>${last}</lastBuildDate>
    <atom:link href="${SITE}${t.url}feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

// Both languages must have the same set of posts
const POSTS = { ko: readPosts('ko'), en: readPosts('en') };
const slugs = (l) => new Set(POSTS[l].map((p) => p.slug));
for (const [a, b] of [['ko', 'en'], ['en', 'ko']])
  for (const s of slugs(a)) if (!slugs(b).has(s)) fail(`content/blog/${a}/${s}.html has no ${b} version (content/blog/${b}/${s}.html)`);
for (const p of POSTS.ko) {
  const q = POSTS.en.find((x) => x.slug === p.slug);
  if (q && (q.date !== p.date || (q.updated || '') !== (p.updated || ''))) fail(`${p.slug}: ko and en dates differ`);
  if (q && (p.source?.url || '') !== (q.source?.url || '')) fail(`${p.slug}: ko and en source URLs differ`);
  const quote = (x) => (x.body.match(/<blockquote[\s\S]*?<\/blockquote>/) || [''])[0].replace(/<cite>[\s\S]*$/, '');
  if (q && quote(p) !== quote(q)) fail(`${p.slug}: the quoted IRS/FTB text must be identical in ko and en`);
}
if (problems) { console.error(`\n${problems} problem(s).`); process.exit(1); }

const sitemapUrls = [];
for (const lang of ['ko', 'en']) {
  const t = T[lang];
  const posts = POSTS[lang];
  const outDir = path.join(ROOT, t.dir);
  if (!posts.length) { if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true }); continue; } // no blog in this language yet
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  for (const p of posts) {
    fs.writeFileSync(path.join(outDir, p.slug + '.html'), postPage(p, t));
    sitemapUrls.push({ loc: SITE + t.url + p.slug, lastmod: p.updated || p.date, priority: '0.6' });
    console.log(`${t.dir}/${p.slug}.html  ${p.date}  ${p.title}`);
  }
  fs.writeFileSync(path.join(outDir, 'index.html'), indexPage(posts, t, lang));
  fs.writeFileSync(path.join(outDir, 'feed.xml'), feed(posts, t));
  sitemapUrls.unshift({ loc: SITE + t.url, lastmod: posts.map((p) => p.updated || p.date).sort().pop(), priority: '0.7' });
  console.log(`${t.dir}/index.html, ${t.dir}/feed.xml  (${posts.length} post(s))`);
}

// sitemap.xml: replace the generated blog block, leave every other URL as it is
const smPath = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8');
const block = `  <!-- blog:start (generated by tools/build-blog.mjs) -->\n` +
  sitemapUrls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>\n`).join('') +
  `  <!-- blog:end -->\n`;
if (/  <!-- blog:start[\s\S]*?<!-- blog:end -->\n/.test(sm)) sm = sm.replace(/  <!-- blog:start[\s\S]*?<!-- blog:end -->\n/, block);
else if (sm.includes('</urlset>')) sm = sm.replace('</urlset>', block + '</urlset>');
else fail('sitemap.xml: </urlset> not found');
fs.writeFileSync(smPath, sm);

if (problems) { console.error(`\n${problems} problem(s).`); process.exit(1); }

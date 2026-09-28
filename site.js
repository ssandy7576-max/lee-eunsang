/* LEE EUNSANG TAX — shared site script
 * - Tailwind theme (brand colors)
 * - Shared header / footer (rendered into #site-header / #site-footer)
 * - Link targets (Client Portal / Secure Upload) set in one place: LINKS
 * - ENG | KOR toggle: English lives in the HTML; Korean lives in KO below.
 * - Contact form handling
 */

/* ---------- Link targets (edit here only) ---------- */
const LINKS = {
  portal: '#',            // TODO: TaxDome client portal login URL (e.g. https://yourfirm.taxdome.com)
  upload: 'contact.html', // TODO: TaxDome portal / upload URL. Until then, goes to the inquiry form.
};

/* ---------- Contact form delivery (edit here only) ----------
 * Inquiries go to CONTACT_EMAIL.
 * WEB3FORMS_KEY: free access key from https://web3forms.com (create it with CONTACT_EMAIL).
 *   - With a key: the form sends directly; messages arrive in CONTACT_EMAIL.
 *   - Without a key: the visitor’s email app opens, pre-addressed to CONTACT_EMAIL.
 * The access key is designed to be public (it only allows sending to that inbox).
 */
const FORM = {
  CONTACT_EMAIL: "eunsang@leeeunsangtax.com",
  WEB3FORMS_KEY: "", // TODO: paste Web3Forms access key
};

/* ---------- Tailwind theme ---------- */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#14233C', deep: '#0B1627', light: '#24395C', soft: '#2F4A70' },
        brass: { DEFAULT: '#B08D57', dark: '#8C6E43', light: '#F3ECE0' },
        ivory: '#F7F5F0',
        logo: { green: '#183D2E', gold: '#B89243' },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Noto Serif KR', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        script: ['"Great Vibes"', 'cursive'],
      },
    },
  },
};

/* ---------- Korean translations (English is the HTML default) ---------- */
const KO = {
  /* nav */
  nav_home: '홈',
  nav_about: '회사 소개',
  nav_practice: '업무 분야',
  nav_contact: '문의하기',
  nav_portal: '고객 포털',

  /* shared */
  read_more: '자세히 보기',
  btn_contact: '상담 문의',
  btn_consult: '상담 신청하기',
  results_note: '* 과거의 성과가 향후 동일한 결과를 보장하지 않습니다. 결과는 고객의 개별 상황과 각 사안의 구체적인 사실관계에 따라 달라질 수 있습니다.',

  /* footer */
  ft_firm: '회사명',
  ft_loc_h: '위치',
  ft_loc: '캘리포니아 브레아 (캘리포니아 및 미국 전역 고객 지원)',
  ft_web: '웹사이트',
  ft_menu: '메뉴',

  /* ===== HOME ===== */
  home_box: '절세 플래닝 & 세무 문제 해결',
  home_title: '고소득 전문직과 소상공인을 위한 전략적 세무 플래닝 및 문제 해결',
  home_sub: '고소득 전문직부터 소상공인까지, 완벽한 세법 준수와 합법적 절세의 이중 효과를 제공합니다. 복잡한 다주(Multi-state) 세금 신고부터 국세청(IRS) 문제 해결까지, 귀하가 본업에만 집중할 수 있도록 20년 경력의 파트너가 직접 대리합니다.',
  home_cta: '안전하게 서류 업로드하기',
  home_cta2: '업무 분야 보기',

  tile1_t: '미 연방 세무사 (EA)',
  tile1: 'IRS 앞에서 납세자를 대리할 수 있는 미 재무부 공인 자격',
  tile2_t: '대표 세무사 직접 담당',
  tile2: '상담부터 신고, IRS 협상까지 한 사람이 책임지고 진행',
  tile3_t: 'MBA · 재무 인사이트',
  tile3: '경영·재무 관점으로 자산을 지키고 불리는 입체적 절세',
  tile4_t: '비대면 · 보안 포털',
  tile4: '서류, 전자서명, 메시지 모두 TaxDome 보안 포털로 진행',
  who_eyebrow: '회사 소개',
  who_title: '절세 플래닝과 세무 문제 해결, 두 개의 축',
  who_text: 'LEE EUNSANG TAX — Tax Planning and Resolution은 절세 플래닝(Tax Planning)과 세무 문제 해결(Tax Resolution)을 두 축으로, 고소득 개인 및 기업 고객에게 종합 세무·자산 플래닝 서비스를 제공하는 세무 자문 회사입니다.',
  who_li1: '부동산 투자자 · 사업체 오너 · 고소득 전문직 전문',
  who_li2: 'IRS 및 주 정부를 상대로 한 최일선 협상과 방어',
  who_li3: '한국어 · 영어로 명확하게 소통',

  res_title: '주요 성과',
  res1: '단일 사례 최대 처리 세액',
  res2: '분할납부(IA) 협상 성사',
  res3: 'IRS 압류(Levy) 해제',
  res4: '주 정부 세무 문제 해결',

  pa_title: '업무 분야',
  pa1_t: '고급 세무 플래닝',
  pa1_s: '선제적 전략',
  pa1: 'Cost Segregation, 1031 교환, 사업 구조 설계(S-Corp), 과거 3개년 환급 검토.',
  pa2_t: '세무 문제 해결 및 IRS 방어',
  pa2_s: '위기 관리',
  pa2: '은행·급여 압류 해제, 가산세 감면, OIC, 징수관(RO) 직접 대응.',
  pa3_t: '기본 세무 및 회계',
  pa3_s: '탄탄한 기초',
  pa3: '오차 없는 다주(Multi-State) 개인·법인 세금 신고와 세무조사에 대비된 장부 관리.',

  spec_intro: '단순한 세금 신고를 넘어, 고객의 자산을 지키고 불리는 전략을 설계합니다. 위기 상황에서는 정확한 진단과 법률적 절차에 따라 가장 안전하고 신속한 해결책을 제시합니다.',
  spec1_t: 'Cost Segregation · 가속상각',
  spec1: '부동산 자산을 구성 요소별로 세분화해 감가상각을 앞당기고, 당해 연도 세 부담을 크게 낮춥니다.',
  spec2_t: '은행 · 급여 압류 해제',
  spec2: '징수관(Revenue Officer)과 직접 협상하여 은행 압류(Levy)와 급여 압류(Wage Garnishment)를 해제합니다.',
  spec3_t: '과거 3개년 환급 검토',
  spec3: '지난 신고서에서 놓친 공제와 크레딧을 찾아, 수정 신고 및 조기 환급(Tentative Refund)으로 과다 납부 세금을 되찾습니다.',

  talk_title: '상담이 필요하신가요?',
  talk_text: '과거 세금신고서 리뷰 및 상담을 원하시면 문의를 남겨주세요. 모든 업무는 방문 없이 안전한 전용 포털(TaxDome)을 통해 진행됩니다. 상황 검토 후 맞춤 견적 및 포털 초청 링크를 보내드립니다.',

  /* ===== ABOUT ===== */
  about_hero: '회사 소개',
  about_eyebrow: '대표 소개',
  about_title: '이은상, EA / MBA',
  about_p1: '대표 이은상(Eunsang Lee)은 미 연방 세무사(Enrolled Agent, EA)로서, 오랜 세월 세무 및 자산 플래닝 분야에서 실무를 쌓아 왔습니다. MBA 과정에서 쌓은 경영·재무 인사이트와 조세 불복(Tax Appeal) 분야의 전문성을 바탕으로, 단순한 세금 신고를 넘어 고객의 자산을 지키고 불리는 입체적인 절세 전략을 설계합니다.',
  about_p2: '국세청(IRS) 및 주 정부와 얽힌 복잡한 세무 문제, 세무 조사(Audit), 은행 압류와 같은 위기 상황에서도 정확한 진단과 법률적 절차에 따른 가장 안전하고 신속한 해결책을 제시하는 것을 원칙으로 삼고 있습니다.',
  about_badge: '미 연방 세무사',
  about_badge_sub: 'Enrolled Agent · 미 재무부 공인',

  pr_title: '업무 원칙',
  pr1_t: '정확한 진단',
  pr1: '과거 신고서, 통지서, 재무 자료를 면밀히 분석해 문제의 본질과 기회를 먼저 찾습니다.',
  pr2_t: '합법적 · 안전한 절차',
  pr2: '모든 전략과 협상은 세법과 법률적 절차에 근거해 가장 안전한 방식으로 진행합니다.',
  pr3_t: '자산 보호와 성장',
  pr3: '올해의 세금만이 아니라, 고객의 자산을 장기적으로 지키고 불리는 방향을 설계합니다.',

  grp_title: '전문 업무 그룹',
  grp_sub: '1인 전문 사무소로서, 모든 업무 그룹을 대표 세무사가 직접 이끕니다.',
  grp1_t: '플래닝 그룹',
  grp1: 'Cost Segregation, 1031 교환, 사업 구조(S-Corp) 및 은퇴 플랜 설계.',
  grp2_t: '레졸루션 그룹',
  grp2: '압류 해제, 가산세 감면, OIC, 분할납부, 징수관(RO) 대응, 어필.',
  grp3_t: '세무 · 회계 그룹',
  grp3: '다주 개인·법인 세금 신고, 장부 기장, 페이롤, 비영리단체 세무.',

  cred_title: '학력 및 전문 자격',
  cred1: '미 연방 세무사 (Enrolled Agent, EA)',
  cred2: 'MBA (경영학 석사)',
  cred3: '부동산 라이선스',
  cred4: '생명 및 상해보험 라이선스',
  cred5: 'NAEA (전미 세무사 협회) 회원',
  cred6: 'GTAX 회원',
  exp_title: '대표 경력',
  exp1: 'Space and Time Tax Service 대표(Owner) 역임',
  exp2: 'No. 1 Tax Pro 대표 세무사(Lead Tax Professional) 역임',
  exp3: '다수의 전문 Tax Planning Firm 및 회계 법인 팀장(Manager) 역임',
  exp4: '오랜 세월에 걸쳐 쌓은 세무 및 회계 실무 경력',

  /* ===== PRACTICE ===== */
  prac_hero: '업무 분야',
  prac_core: '주력 분야',

  prac1_t: '고급 세무 플래닝',
  prac1_s: '선제적 전략',
  prac1: '부동산 투자자, 사업체 오너, 고소득 전문직을 위한 고난도 절세 설계를 전문으로 합니다. 세금이 확정되기 전에 먼저 움직이는, 세법을 철저히 준수하는 선제적 전략입니다.',
  prac1_a_t: 'Cost Segregation & Bonus Depreciation',
  prac1_a: '부동산 감가상각을 앞당겨 당해 연도 세 부담을 크게 낮춥니다.',
  prac1_b_t: '1031 교환 & 부동산 전략',
  prac1_b: '양도소득세를 이연하고 장기적으로 효율적인 부동산 포트폴리오를 설계합니다.',
  prac1_c_t: '사업 구조 설계(S-Corp) & 은퇴 플랜',
  prac1_c: 'MBA 수준의 재무 인사이트로 절세에 유리한 법인 구조와 연금·은퇴 전략을 설계합니다.',
  prac1_d_t: '과거 3개년 환급 검토',
  prac1_d: '지난 신고서에서 놓친 기회를 찾아 수정 신고 및 조기 환급(Tentative Refund)으로 과다 납부 세금을 되찾습니다.',

  prac2_t: '세무 문제 해결 및 IRS 방어',
  prac2_s: '위기 관리',
  prac2: '첫 통지서부터 최종 해결까지, IRS 및 주 정부를 상대로 최일선에서 협상하고 방어합니다. 세무 조사, 체납, 압류 등 위기 상황을 정확히 진단하고 가장 유리한 해법으로 이끕니다.',
  prac2_a_t: '은행 · 급여 압류 해제',
  prac2_a: '은행 압류(Levy)와 급여 압류(Wage Garnishment)를 신속하게 해제합니다.',
  prac2_b_t: '가산세 감면',
  prac2_b: '최초 위반 감면(First-Time Abatement) 및 합리적 사유(Reasonable Cause)에 근거한 감면을 추진합니다.',
  prac2_c_t: 'OIC · 분할납부',
  prac2_c: '세금 감면 합의(Offer in Compromise)와 감당 가능한 분할납부(Installment Agreement)를 협상합니다.',
  prac2_d_t: '징수관(RO) 직접 대응 · 어필',
  prac2_d: 'Revenue Officer와 직접 협상하고, 필요 시 조세 불복(Appeals) 절차를 진행합니다.',

  prac3_t: '기본 세무 및 회계',
  prac3_s: '탄탄한 기초',
  prac3: '모든 절세와 방어의 출발점은 정확한 신고와 깔끔한 장부입니다. 비즈니스가 언제든 세무조사에 대비할 수 있도록 기초를 탄탄하게 관리합니다.',
  prac3_a_t: '다주 개인 · 법인 세금 신고',
  prac3_a: '미국 거의 모든 주의 세법을 준수하는, 오차 없는 개인·법인 신고.',
  prac3_b_t: '장부 기장 · 재무제표',
  prac3_b: '세무조사에 대비된 체계적인 장부와 재무 관리.',
  prac3_c_t: '페이롤',
  prac3_c: '급여 처리와 페이롤 세금 신고를 정확하고 기한 내에 처리합니다.',
  prac3_d_t: '비영리단체 세무',
  prac3_d: '비영리단체의 신고 및 규정 준수를 지원합니다.',

  /* ===== CONTACT ===== */
  contact_hero: '문의하기',
  contact_title: '상담 문의',
  contact_text: '과거 세금신고서 리뷰 및 상담을 원하시면 아래 양식을 남겨주세요. 모든 업무는 방문 없이 안전한 전용 포털(TaxDome)을 통해 진행됩니다. 상황 검토 후 맞춤 견적 및 포털 초청 링크를 보내드립니다.',
  c_direct: '대표 세무사가 직접 검토하고 답변드립니다.',
  c_portal_h: '기존 고객',
  c_portal: 'TaxDome 고객 포털 로그인 →',
  step_title: '진행 절차',
  step1: '문의 양식 제출',
  step2: '상황 검토',
  step3: '맞춤 견적 및 포털 초청',

  f_name: '성함',
  f_email: '이메일',
  f_type: '고객 유형',
  f_type_ph: '선택해 주세요',
  f_type_1: '개인',
  f_type_2: '전문직',
  f_type_3: '소상공인 / 사업자',
  f_msg: '문의 내용',
  f_security: '보안을 위해 이 양식에 소셜 시큐리티 번호(SSN)나 은행 계좌 번호 등 민감한 개인 정보를 포함하지 마십시오. 안전한 문서 업로드는 추후 TaxDome 포털을 통해 안내해 드립니다.',
  f_submit: '문의 보내기',
  f_send_error: "죄송합니다. 문의를 전송하지 못했습니다. 아래 이메일로 직접 보내주세요:",
  f_error: '모든 항목을 입력하고 올바른 이메일 주소를 적어주세요.',
  f_success: '감사합니다! 문의 내용을 검토한 후 빠르게 연락드리겠습니다.',

  /* placeholders */
  ph_name: '홍길동',
  ph_msg: '상황을 간단히 적어주세요. (예: IRS 통지서 수령, 다주 세금 신고, 절세 플래닝 등)',
};

/* ---------- Logo (rebuilt from the brand logo: 3×3 mark + wordmark) ---------- */
function logoHTML(compact) {
  // Grid pattern from the logo: G = green, Y = gold, . = empty
  const pattern = ['GYY', 'G.Y', 'GGY'];
  let cells = '';
  pattern.forEach((row, r) =>
    [...row].forEach((c, col) => {
      if (c === '.') return;
      cells += `<rect x="${col * 12}" y="${r * 12}" width="10" height="10" rx="1.6" fill="${c === 'G' ? '#183D2E' : '#B89243'}"/>`;
    })
  );
  return `
    <span class="flex items-center gap-3">
      <svg viewBox="0 0 34 34" class="${compact ? 'h-8 w-8' : 'h-10 w-10'} shrink-0" aria-hidden="true">${cells}</svg>
      <span class="text-center leading-none">
        <span class="block font-display ${compact ? 'text-xl' : 'text-[26px]'} font-bold tracking-tight text-[#111]">Lee Eunsang</span>
        <span class="mx-auto mt-1.5 block h-px w-10 bg-slate-400"></span>
        <span class="mt-1.5 block font-mono ${compact ? 'text-[7.5px]' : 'text-[9px]'} font-medium tracking-[0.2em] text-logo-gold">TAX PLANNING &amp; RESOLUTION</span>
      </span>
    </span>`;
}

/* ---------- Shared header / footer ---------- */
const NAV = [
  { key: 'nav_home', label: 'Home', href: 'index.html', page: 'home' },
  { key: 'nav_about', label: 'About Us', href: 'about.html', page: 'about' },
  { key: 'nav_practice', label: 'Practice', href: 'practice.html', page: 'practice' },
  { key: 'nav_contact', label: 'Contacts', href: 'contact.html', page: 'contact' },
];

function renderHeader(page) {
  const links = NAV.map((n) => {
    const active = n.page === page;
    return `<a href="${n.href}" class="nav-link text-[13px] font-semibold uppercase tracking-[0.12em] ${active ? 'text-navy is-active' : 'text-slate-500 hover:text-navy'}" data-i18n="${n.key}"${active ? ' aria-current="page"' : ''}>${n.label}</a>`;
  }).join('');
  const mobile = NAV.map((n) =>
    `<a href="${n.href}" class="border-b border-slate-100 py-3 text-sm font-semibold uppercase tracking-[0.12em] ${n.page === page ? 'text-brass-dark' : 'text-navy'}" data-i18n="${n.key}">${n.label}</a>`
  ).join('');

  return `
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-3 h-[72px] sm:h-20">
        <a href="index.html" class="shrink-0" aria-label="Lee Eunsang — Tax Planning & Resolution, home">
          <span class="hidden sm:block">${logoHTML(false)}</span>
          <span class="sm:hidden">${logoHTML(true)}</span>
        </a>
        <nav class="hidden lg:flex items-center gap-9" aria-label="Primary">${links}</nav>
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="flex items-center rounded-full border border-slate-300 p-0.5 text-[11px] font-bold" role="group" aria-label="Language">
            <button type="button" class="lang-btn px-2.5 sm:px-3 py-1.5 rounded-full text-slate-500 transition" data-lang="en" aria-pressed="true">ENG</button>
            <button type="button" class="lang-btn px-2.5 sm:px-3 py-1.5 rounded-full text-slate-500 transition" data-lang="ko" aria-pressed="false">KOR</button>
          </div>
          <a data-link="portal" href="#" class="hidden md:inline-flex items-center gap-2 bg-navy px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white hover:bg-navy-light transition">
            <svg class="w-4 h-4 text-brass" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
            <span data-i18n="nav_portal">Client Portal</span>
          </a>
          <button type="button" id="menuBtn" class="lg:hidden p-2 text-navy" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </div>
    <div id="mobileMenu" class="hidden lg:hidden border-t border-slate-200 bg-white">
      <nav class="px-4 pb-5 pt-2 flex flex-col" aria-label="Mobile">
        ${mobile}
        <a data-link="portal" href="#" class="mt-4 inline-flex justify-center bg-navy px-4 py-3 text-sm font-bold uppercase tracking-wider text-white" data-i18n="nav_portal">Client Portal</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  const links = NAV.map((n) => `<li><a href="${n.href}" class="hover:text-brass" data-i18n="${n.key}">${n.label}</a></li>`).join('');
  return `
  <footer class="bg-navy-deep text-slate-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid gap-10 md:grid-cols-2 md:divide-x md:divide-white/15">
        <div class="md:pr-12">
          <a href="index.html" class="inline-block rounded bg-white px-4 py-3" aria-label="Home">${logoHTML(false)}</a>
          <dl class="mt-7 space-y-3 text-sm">
            <div><dt class="font-semibold text-white" data-i18n="ft_firm">Firm</dt><dd>LEEEUNSANG TAX LLC</dd></div>
            <div><dt class="font-semibold text-white" data-i18n="ft_loc_h">Location</dt><dd data-i18n="ft_loc">Brea, CA (Serving clients in California and nationwide)</dd></div>
            <div><dt class="font-semibold text-white" data-i18n="ft_web">Website</dt><dd><a href="https://leeeunsangtax.com" class="text-brass hover:underline">leeeunsangtax.com</a></dd></div>
          </dl>
        </div>
        <div class="md:pl-12 flex flex-col justify-center">
          <p class="text-sm font-bold uppercase tracking-[0.2em] text-white" data-i18n="ft_menu">Menu</p>
          <ul class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">${links}
            <li><a data-link="portal" href="#" class="hover:text-brass" data-i18n="nav_portal">Client Portal</a></li>
          </ul>
          <p class="mt-6 text-sm">&copy; 2026 <a href="https://leeeunsangtax.com" class="text-brass hover:underline">leeeunsangtax.com</a></p>
        </div>
      </div>
      <div class="mt-12 border-t border-white/10 pt-8 space-y-3 text-xs leading-relaxed text-slate-400">
        <p lang="en">Eunsang Lee is an Enrolled Agent licensed by the U.S. Department of the Treasury to practice before the Internal Revenue Service. LEEEUNSANG TAX LLC is a tax and consulting practice, not a certified public accountancy firm.</p>
        <p lang="en">Copyright &copy; 2026 LEEEUNSANG TAX LLC. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}

/* ---------- i18n ---------- */
const LANG_KEY = 'leeeunsangtax_lang';

function captureEnglish() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.textContent.trim();
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute('placeholder') || '';
  });
}

function applyLanguage(lang, animate) {
  const run = () => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const ko = KO[el.dataset.i18n];
      el.textContent = lang === 'ko' && ko !== undefined ? ko : el.dataset.en;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const ko = KO[el.dataset.i18nPh];
      el.setAttribute('placeholder', lang === 'ko' && ko !== undefined ? ko : el.dataset.enPh);
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.body.classList.remove('i18n-fade');
  };
  if (animate) {
    document.body.classList.add('i18n-fade');
    setTimeout(run, 160);
  } else {
    run();
  }
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
}

function initialLanguage() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'ko') return saved;
  } catch (e) {}
  return (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

/* ---------- Contact form ---------- */
function mailtoFallback(form) {
  const d = new FormData(form);
  const body = [
    "Name: " + d.get("name"),
    "Email: " + d.get("email"),
    "Business Type: " + d.get("business_type"),
    "",
    d.get("message"),
  ].join("\n");
  const subject = "Website inquiry — " + d.get("name");
  window.location.href = "mailto:" + FORM.CONTACT_EMAIL +
    "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const errorEl = document.getElementById("formError");
  const sendErrorEl = document.getElementById("formSendError");
  const successEl = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("formSubmit");
  form.elements.access_key.value = FORM.WEB3FORMS_KEY;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successEl.classList.add("hidden");
    sendErrorEl.classList.add("hidden");
    if (!form.checkValidity()) {
      errorEl.classList.remove("hidden");
      return;
    }
    errorEl.classList.add("hidden");

    if (!FORM.WEB3FORMS_KEY) {
      mailtoFallback(form);
      return;
    }

    submitBtn.disabled = true;
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || "Request failed");
      form.reset();
      successEl.classList.remove("hidden");
    } catch (err) {
      sendErrorEl.classList.remove("hidden");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.outerHTML = renderHeader(page);
  if (footerSlot) footerSlot.outerHTML = renderFooter();

  // Resolve shared link targets
  document.querySelectorAll('[data-link]').forEach((a) => {
    const url = LINKS[a.dataset.link];
    if (!url) return;
    a.setAttribute('href', url);
    if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
  });

  captureEnglish();
  applyLanguage(initialLanguage(), false);

  document.querySelectorAll('.lang-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== document.documentElement.lang) applyLanguage(btn.dataset.lang, true);
    })
  );

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  initForm();
});

/* Checks public site copy against the company's expression rules
 * (Notion "뿌리와 컨셉 (v1)", section 6, and IRS Circular 230 §10.30).
 *
 *   node tools/check-copy.mjs
 *
 * ERROR = must be fixed before a PR is opened.  WARN = a human must look at it.
 * Exit code 1 if any ERROR is found.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILES = ['index.html', 'about.html', 'practice.html', 'contact.html', 'site.js',
  ...fs.readdirSync(path.join(ROOT, 'ko')).filter((f) => f.endsWith('.html')).map((f) => 'ko/' + f)];

// [level, label, pattern, allow?]  allow = phrases that are fine in context
const RULES = [
  ['ERROR', '가격 표현 (reasonable price)', /reasonable[\s-]price/i],
  ['ERROR', '가격 표현 (affordable)', /affordable/i, /affordable payment plans?/i],
  ['ERROR', '가격 표현 (합리적)', /합리적/, /합리적\s*사유/],
  ['ERROR', '가격 표현 (저렴)', /저렴/],
  ['ERROR', '"certified" 금지 (EA)', /certified/i, /not a certified public account/i],
  ['ERROR', '이전 회사명 (SNT)', /space and time|시공간|\bSNT\b|No\.\s?1 Tax Pro|넘버원/i],
  ['ERROR', '1인 사무소 표현', /1인 사무소|solo practi|one-person/i],
  ['ERROR', '경력 연수 표기', /\d+\s*\+?\s*(years? of experience|년\s*(경력|이상의 경험))/i],
  ['WARN', '최상급 표현 (가장/최고/완벽/best)', /가장|최고|완벽|\bbest\b|perfect|#1(?![0-9a-f])/i, /가장 중요한/],
  ['WARN', '"회계사" (대표는 CPA가 아님)', /회계사/],
  ['WARN', '결과 보장처럼 읽히는 표현', /guarantee|보장/i, /사회보장번호|비밀이 보장/],
  ['WARN', 'snttax 주소 (커스텀 도메인 전환 전까지 허용)', /snttax/i],
];

let errors = 0;
let warns = 0;
for (const file of FILES) {
  const lines = fs.readFileSync(path.join(ROOT, file), 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const [level, label, re, allow] of RULES) {
      const m = line.match(re);
      if (!m) continue;
      if (allow && allow.test(line) && !line.replace(allow, '').match(re)) continue;
      const at = Math.max(0, m.index - 30);
      console.log(`${level}  ${file}:${i + 1}  ${label}\n       …${line.slice(at, m.index + 50).trim()}…`);
      level === 'ERROR' ? errors++ : warns++;
    }
  });
}
console.log(`\n${errors} error(s), ${warns} warning(s)`);
process.exit(errors ? 1 : 0);

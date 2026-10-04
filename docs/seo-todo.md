# 검색 상위 노출을 위한 작업 메모

마지막 정리: 2026-10-03

## 이번에 한 것 (1단계: 한국어 검색 노출)
- 한국어 페이지를 별도 주소로 만듦: `/ko/`, `/ko/about`, `/ko/practice`, `/ko/contact`
  - 한국어 본문이 HTML에 처음부터 들어 있음 → 구글이 한국어 페이지로 인식
  - 만드는 법: 영어 HTML 또는 `site.js`의 한국어(KO, KO_META)를 고친 뒤 `node tools/build-ko.mjs` 실행 → `ko/` 폴더 갱신
  - `ko/` 안의 파일은 직접 고치지 않는다 (다시 만들면 덮어씀)
- 한국어 제목·검색 설명에 "이은상 세무사" 포함 (`site.js`의 `KO_META`)
- 영어·한국어 페이지를 서로 연결하는 hreflang 태그 추가
- 구조화 데이터(JSON-LD)에 다른 이름 "이은상 세무사" 추가
- ENG/KOR 버튼 → 반대 언어 주소로 이동하는 링크로 변경
  - 이전과 달라진 점: 브라우저가 한국어여도 영어 주소는 영어로 보임 (자동 전환·언어 기억 없음)
- sitemap.xml에 한국어 주소 4개 추가

## 배포 직후 해야 할 것
- [ ] Google Search Console: sitemap 다시 제출, `/ko/` 4개 페이지 "URL 검사" 후 색인 요청
- [ ] 2~4주 후 구글에서 "이은상 세무사" 검색해 확인, Search Console에서 `/ko/` 색인 여부 확인
- [ ] Google 비즈니스 프로필: 설명에 "한국어 상담 가능", 웹사이트 주소 확인

## 다음 단계로 미룬 것
### 홈페이지 구조
- [ ] Eleventy 전환: 영어·한국어 문구를 데이터 파일 한 곳에서 관리 (지금은 영어=HTML, 한국어=site.js)
- [ ] 헤더·푸터를 HTML에 직접 포함 (지금은 JavaScript가 그려 넣음)
- [ ] Tailwind CDN → 미리 만든 CSS 파일로 전환 (디자인 동일, 로딩 더 빠름)
- [ ] og 태그 추가 → 카카오톡·문자 링크 미리보기 (공유용 이미지 1200×630 필요)
- [ ] sitemap 날짜: git 대신 데이터 파일·글 상단 날짜 사용

### 한국어 페이지에 남은 영어
- [ ] 이미지 설명(alt)과 일부 버튼 이름이 영어
- [ ] "Credentials", "Our Approach" 제목, 자격증 이름(의도적으로 영어 유지 중), 실무 항목 "Cost Segregation & Bonus Depreciation"

### 문구 (사용자 확정 필요)
- [ ] 경력 숫자(15년·20년) 전부 제거 → 실무 리더십 문구로 교체 (이전 사무소 대표, 미국 중견 택스 플래닝 팀 팀장)
- [ ] "Practice Groups" → "Practice Teams" / "그룹" → "팀" (화면 문구만)
- [ ] 문의 페이지 연락처에 전화번호 추가 (푸터·JSON-LD에는 이미 있음)
- [ ] 영어 페이지에 "Korean-speaking Enrolled Agent" 문구 추가 여부
- [ ] 가산세 감면 용어 통일: "벌금 감면/면제" vs "가산세 감면"

### 검색·키워드
- [ ] 키워드 조사: Google 키워드 플래너, 네이버 키워드 도구 → 제목·설명·본문에 반영
- [ ] 지역 표현 보강 (예: 오렌지카운티·LA 지역 서비스. 주소(street)는 쓰지 않음)
- [ ] Bing Webmaster Tools, 네이버 서치어드바이저, Daum 웹마스터도구 등록
- [ ] 매월 Search Console "검색어" 보고서 확인 → 문구·블로그 주제에 반영

### 리뷰·TaxDome
- [ ] 리뷰는 홈페이지가 아니라 Google 비즈니스 프로필에서 받기. 사이트에는 리뷰 링크만
- [ ] TaxDome 포털 주소를 Client Portal / Secure Upload 버튼에 연결 (`site.js`의 `LINKS`)
- [ ] TaxDome 자동화: 신고 완료·결제 후 구글 리뷰 요청 메시지 자동 발송

### 블로그 (AI agent 작성)
- [ ] 블로그 기반: 영어 `/blog/`, 한국어 `/ko/blog/`, 글마다 저자(Eunsang Lee, EA)와 안내 박스
- [ ] agent 작업 방식: GitHub 브랜치 + Pull Request → Vercel 미리보기 → 승인 후 게시
- [ ] GitHub main 보호 설정, agent 전용 최소 권한 토큰
- [ ] 저장소 비공개 전환 검토 (현재 PUBLIC)
- [ ] FAQ 페이지는 만들지 않음 (문의는 이메일)

### 운영 확인
- [ ] Vercel 요금제 확인 (Hobby는 비상업용 약관)

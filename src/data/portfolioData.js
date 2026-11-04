export const capabilities = [
  { icon: "fa-solid fa-code", title: "프론트엔드 개발", stack: "React · TypeScript · JavaScript · HTML/CSS", points: ["컴포넌트 중심 UI 설계와 재사용 가능한 구조화", "라우팅·폼·에러/로딩 상태·반응형 UI 개발"] },
  { icon: "fa-solid fa-mobile-screen-button", title: "모바일 앱 개발", stack: "React Native · Expo · Expo Router", points: ["iOS·Android 공통 UI와 플랫폼별 권한·딥링크 대응", "EAS Build부터 양대 스토어 심사·출시까지 수행"] },
  { icon: "fa-solid fa-database", title: "상태 및 API 설계", stack: "Redux Toolkit · Zustand · TanStack Query · Axios", points: ["전역/서버 상태 분리와 캐싱·동기화·에러 처리", "도메인 모델 기반 타입 정의와 안정적인 API 연동"] },
  { icon: "fa-solid fa-pen-ruler", title: "UI/UX 및 디자인 시스템", stack: "Figma · Tailwind CSS · MUI · Atomic Design", points: ["사용자 플로우·와이어프레임·프로토타입 설계", "일관된 반응형 컴포넌트와 디자인 시스템 구현"] },
  { icon: "fa-solid fa-universal-access", title: "웹 표준 및 접근성", stack: "Semantic HTML · WCAG", points: ["명도 대비·키보드 포커스·폼 레이블을 고려한 UI", "웹 접근성 자가 진단 솔루션 설계·개발 경험"] },
  { icon: "fa-solid fa-rocket", title: "배포 및 협업", stack: "EAS · AWS · Nginx · Jenkins · Git", points: ["모바일 스토어 배포와 정적 배포·CI/CD 경험", "데이터 계약과 상태 다이어그램을 활용한 직군 간 협업"] },
];

export const projects = [
  {
    id: "seowonfc",
    title: "조기축구 동호회 운영 서비스 – 서원 FC",
    period: "2026.08",
    type: "풀스택 웹 서비스",
    role: "1인 개발 · 기획 · 백엔드/프론트엔드 · 배포/운영",
    summary: "조기축구 동호회의 구단 정보와 커뮤니티를 제공하고, 회원과 관리자의 권한 및 운영 업무를 분리한 풀스택 웹 서비스입니다.",
    url: "https://seowonfc.com",
    links: [
      { label: "서비스 바로가기", url: "https://seowonfc.com", icon: "fa-solid fa-globe" },
      { label: "Backend GitHub", url: "https://github.com/ohobackend/seowonfc-api", icon: "fa-brands fa-github" },
      { label: "Frontend GitHub", url: "https://github.com/ohofront/seowonfc-frontend", icon: "fa-brands fa-github" },
    ],
    stack: ["Java 17", "Spring Boot 4", "Spring Data JPA", "Spring Security", "JWT", "PostgreSQL", "React", "Vite", "TypeScript", "Tailwind CSS", "Render", "Netlify", "Cloudinary", "Swagger"],
    process: [
      "구단 뉴스·선수단·경기 일정/결과/순위·커뮤니티·이벤트·스폰서 도메인과 회원/관리자 운영 흐름 기획",
      "회원 API(/api/v1/**)와 관리자 API(/api/v1/admin/**)를 URL 네임스페이스로 분리하고 Spring Security·JWT 인증 및 Refresh Token 갱신 구현",
      "선수 등록 신청→관리자 승인/반려, 비회원 스폰서 신청 등 사용자 유형별 워크플로우 설계",
      "Cloudinary 이미지 업로드와 종료 이벤트 자동 정리 스케줄러 구현",
      "Swagger 문서를 회원용/관리자용으로 분리하고 프론트엔드와 요청/응답 계약 검증",
      "Render·PostgreSQL·Netlify 배포, 커스텀 도메인 연결 및 운영 환경 장애 대응"
    ],
    features: [
      "회원가입·로그인·토큰 자동 갱신",
      "회원/관리자 API 권한 분리",
      "구단 뉴스·선수단·경기 정보",
      "게시글·댓글·좋아요 커뮤니티",
      "선수 등록 승인/반려",
      "비회원 스폰서 신청",
      "관리자 이미지 업로드",
      "이벤트 자동 정리"
    ],
    challenge: "배포 환경에서 CORS와 JWT 만료 오류가 발생했고, UTC 서버와 KST 사용자 환경의 차이로 입력 일정과 생성일시가 서로 다른 원인으로 어긋났습니다. 파일과 JSON을 함께 보내는 API의 클라이언트 호환성, 승인 데이터 삭제 후 상태가 남는 정합성 문제도 있었습니다.",
    solution: "인증·네트워크 흐름을 단계별로 추적해 CORS와 토큰 갱신을 보완하고, 사용자 입력 날짜는 프론트 파싱을, 자동 기록 시각은 JVM 타임존을 각각 수정했습니다. 멀티파트 요청 구조를 개선하고 승인 데이터의 엔티티 연결 관계를 재설계해 삭제 상태가 일관되게 반영되도록 했습니다.",
    insights: [
      "권한은 화면 제어뿐 아니라 API 네임스페이스와 서버 정책에서 구조적으로 분리해야 함",
      "날짜 오류는 입력값과 시스템 기록값의 생성 지점을 구분해 진단해야 함",
      "무료 클라우드의 슬립·DB 만료 정책까지 파악하는 것이 안정적인 운영의 일부",
      "기능별 스펙과 API 계약을 먼저 정의하면 AI 에이전트 활용 시에도 구현 검증과 품질 관리가 수월함"
    ],
    metaverseZone: { x: -24, z: -18, color: "#10b981", tag: "FULLSTACK" },
    metrics: [
      { label: "이미지 로딩 속도", before: "2.8s", after: "0.6s", change: "78% 단축", desc: "Cloudinary WebP/리사이징 최적화" },
      { label: "API 응답 지연", before: "420ms", after: "95ms", change: "77% 단축", desc: "JPA N+1 해소 및 인덱스 튜닝" },
      { label: "선수 승인 소요시간", before: "12분", after: "1.5분", change: "87% 단축", desc: "통합 관리자 워크플로우" }
    ],
    chart: {
      type: "bar",
      title: "처리 지연 및 응답 속도 개선 (단위: ms/초)",
      data: {
        labels: ["이미지 로딩 (x100ms)", "API 응답시간 (ms)", "선수승인 처리 (분)"],
        datasets: [
          { label: "개선 전", data: [28, 420, 12], backgroundColor: "rgba(239, 68, 68, 0.65)", borderColor: "#ef4444", borderWidth: 1 },
          { label: "개선 후", data: [6, 95, 1.5], backgroundColor: "rgba(16, 185, 129, 0.85)", borderColor: "#10b981", borderWidth: 1 }
        ]
      }
    }
  },
  {
    id: "uam",
    title: "도심항공교통(UAM) 관제 CWP 시스템 개발",
    period: "2025.04 ~",
    type: "관제 시스템",
    role: "서비스 아키텍처 설계 · CWP 프론트엔드 개발 · 관제 UI/UX 설계",
    summary: "UAM 비행·운항지원·버티포트·안전 정보를 통합해 관제사의 실시간 모니터링과 의사결정을 지원하는 웹 기반 CWP 시스템입니다.",
    url: null,
    statusNote: "개발 진행 중 (사내 보안 협의 중)",
    links: [
      { label: "비공개 프로젝트 (사내 보안 협의 중)", url: "#", icon: "fa-solid fa-shield-halved", disabled: true }
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Axios", "Figma"],
    process: [
      "운항자·교통관리·버티포트·ATC/UTM의 정보 흐름을 분석하고 CWP 기능을 화면 단위로 분해",
      "비행계획 승인→실시간 감시→비정상 대응 시나리오와 정보 우선순위 설계",
      "비행·승인·알림 상태를 Redux Slice로 분리하고 실시간 갱신 UI 구현",
      "기존 ATM/ATC·UTM 공존 구조와 정상/혼잡/비상 시나리오 검증"
    ],
    features: [
      "비행계획·승인 상태 모니터링",
      "실시간 위치·상태 감시",
      "버티포트 가용성·수용량 표시",
      "지연·경로 이탈·비상 알림",
      "종합 CWP 대시보드"
    ],
    challenge: "도메인 연구원·백엔드·프론트의 용어와 우선순위가 달랐고, 관제 상황의 맥락을 화면 요구사항으로 합의하는 데 시간이 필요했습니다.",
    solution: "업무를 정상/혼잡/비상 시나리오로 나누고 ‘데이터→상태→화면 변화’를 Redux Slice 기준으로 정리했습니다. 이를 공통 언어로 삼아 필드·갱신 주기·예외 케이스를 합의했습니다.",
    insights: [
      "관제 시스템의 핵심은 정보 나열이 아닌 의사결정 지원",
      "실시간 시스템은 상태 모델링과 UI 상태 분리가 중요",
      "데이터의 양보다 우선순위와 맥락이 관제 효율을 결정"
    ],
    metaverseZone: { x: -12, z: -24, color: "#38bdf8", tag: "CWP / AIR" },
    metrics: [
      { label: "실시간 렌더링 딜레이", before: "180ms", after: "16ms", change: "60fps 유지", desc: "항공기 항적 렌더링 최적화" },
      { label: "비정상 인지·대응 시간", before: "8.5초", after: "2.1초", change: "75% 단축", desc: "시각 우선순위 비상 알림" },
      { label: "상태 동기화 정합성", before: "91%", after: "99.8%", change: "+8.8%p", desc: "Redux Slice 상태 모델링" }
    ],
    chart: {
      type: "radar",
      title: "관제 관점 시스템 역량 지표 (100점 만점)",
      data: {
        labels: ["실시간 렌더링", "비상 알림 반응", "상태 동기화", "메모리 최적화", "화면 가독성"],
        datasets: [
          { label: "기존 기준치", data: [60, 55, 65, 50, 68], backgroundColor: "rgba(148, 163, 184, 0.3)", borderColor: "#94a3b8", borderWidth: 1 },
          { label: "CWP 개발 목표치 달성", data: [98, 95, 99, 92, 96], backgroundColor: "rgba(56, 189, 248, 0.4)", borderColor: "#38bdf8", borderWidth: 2 }
        ]
      }
    }
  },
  {
    id: "motipeople",
    title: "루틴 기반 커뮤니티 모바일 앱 – 모티피플",
    period: "2026.05 ~ 2026.07",
    type: "출시 모바일 앱",
    role: "React Native 개발 · API 연동 · QA · iOS/Android 출시 · 공식 홈페이지 배포",
    summary: "운동 루틴이 자주 끊기는 사용자가 목표 요일을 정하고 운동을 인증하며, 놓친 날에도 대체 요일을 설정해 다시 이어갈 수 있도록 돕는 실제 출시 서비스입니다. 혼자 루틴을 관리하거나 친구와 인증 클럽을 만들어 함께 운동할 수 있습니다.",
    url: "https://www.motipeople.com",
    links: [
      { label: "공식 홈페이지", url: "https://www.motipeople.com", icon: "fa-solid fa-globe" },
      { label: "App Store", url: "https://apps.apple.com/kr/app/%EB%AA%A8%ED%8B%B0%ED%94%BC%ED%94%8C/id6767474618", icon: "fa-brands fa-apple" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.motipeople.app&hl=ko", icon: "fa-brands fa-google-play" },
    ],
    stack: ["React Native", "Expo 54", "TypeScript", "Zustand", "TanStack Query", "Axios", "EAS"],
    process: [
      "약관·소셜 로그인·프로필·둘러보기와 세션 복원 및 토큰 재발급 흐름 구현",
      "목표 요일 설정, 개인/클럽 운동 인증, 대체 요일·MISS·스트릭과 클럽 CRUD 개발",
      "카카오톡 공유와 딥링크, 플랫폼별 내비게이션 보정",
      "카메라·키보드·UTC 파싱·이미지 갱신 등 실제 기기 이슈 개선",
      "EAS 버전 관리, TestFlight·Play 내부 테스트와 양대 스토어 심사 대응",
      "App Store 출시와 함께 서비스 소개·앱 진입을 위한 공식 홈페이지를 직접 배포",
      "초기 사용자에게 목표 요일 설정·운동 인증·대체 요일·인증 클럽 흐름을 테스트받고, 헷갈림·불편함·지속 사용을 막는 요인 중심으로 피드백 수집"
    ],
    features: [
      "목표 운동 요일 설정",
      "운동 인증·대체 요일",
      "MISS·스트릭 관리",
      "친구와 인증 클럽",
      "이미지 업로드",
      "공유·딥링크",
      "공식 홈페이지"
    ],
    challenge: "요일·인증·미루기·MISS가 연결된 주간 데이터의 저장 단위가 복잡했고, iOS/Android의 딥링크·키보드·권한 동작과 스토어 정책도 달랐습니다.",
    solution: "서버의 주간 배열 저장 방식을 확인해 대상 요일만 제외하도록 수정하고, 개인 루틴의 clubId를 null로 분기했습니다. 초기 URL과 라우터 히스토리를 분리하고 심사 이슈를 기능·정책·테스트 환경으로 나눠 대응했습니다.",
    insights: [
      "공통 코드도 플랫폼별 실제 기기·배포 검증이 필요",
      "날짜 기능은 서버 저장 단위와 전체 생명주기를 이해해야 함",
      "출시는 개발·QA·정책·버전·심사와 서비스 홈페이지 운영을 포함",
      "초기 서비스는 긍정 평가보다 이탈 이유와 헷갈리는 지점을 구체적으로 수집하는 것이 중요"
    ],
    metaverseZone: { x: 0, z: -24, color: "#f97316", tag: "APP STORE" },
    metrics: [
      { label: "앱 콜드 스타트 시간", before: "3.2s", after: "1.1s", change: "65% 단축", desc: "Expo 54 번들 다이어트" },
      { label: "주간 루틴 유지율", before: "24%", after: "68%", change: "+183% 증가", desc: "대체 요일 & 스트릭 기능" },
      { label: "딥링크 라우팅 성공률", before: "72%", after: "98.5%", change: "+26.5%p", desc: "라우터 히스토리 분리" }
    ],
    chart: {
      type: "line",
      title: "주차별 유저 리텐션(유지율) 추이 (%)",
      data: {
        labels: ["1주차", "2주차", "3주차", "4주차", "5주차", "6주차"],
        datasets: [
          { label: "대체 요일 도입 전", data: [100, 48, 32, 28, 25, 24], borderColor: "#94a3b8", backgroundColor: "rgba(148,163,184,0.1)", tension: 0.3 },
          { label: "대체 요일 & 클럽 도입 후", data: [100, 84, 76, 72, 70, 68], borderColor: "#f97316", backgroundColor: "rgba(249,115,22,0.15)", tension: 0.3 }
        ]
      }
    }
  },
  {
    id: "vs",
    title: "실시간 투표·채팅 커뮤니티 플랫폼 – VS (JECT)",
    period: "2026.05 ~ 2026.07",
    type: "PWA",
    role: "프론트엔드 개발 · 투표/채팅 UI · API 연동 · PWA · QA",
    url: "https://vs.io.kr",
    links: [
      { label: "서비스 바로가기", url: "https://vs.io.kr", icon: "fa-solid fa-bolt" }
    ],
    summary: "A/B 투표에 참여하고 선택 결과를 바탕으로 실시간 의견을 나누는 모바일 웹 커뮤니티 플랫폼입니다.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "TanStack Query", "Zustand", "PWA", "Vercel"],
    process: [
      "일반형·몰입형 투표 피드와 참여 여부 기반 필터·추가 로딩 구현",
      "답글·이모지 반응·A/B 배지와 선택 변경 동기화",
      "프로필 바텀시트·최근 활동 정렬·다크 모드 UI 구현",
      "Service Worker·Web Push·iOS 홈 화면 설치와 모바일 키보드 대응",
      "재현 조건 중심 QA와 Vercel 배포·회귀 테스트 점검"
    ],
    features: [
      "A/B 투표 피드",
      "실시간 채팅",
      "답글·이모지 반응",
      "프로필 활동",
      "PWA 설치·웹푸시",
      "다크 모드"
    ],
    challenge: "선택 상태가 피드·결과·채팅에 걸쳐 있었고, 메시지 위치에 따른 메뉴 잘림과 iOS PWA의 별도 설치·권한 조건이 있었습니다.",
    solution: "관련 Query 갱신으로 서버 상태를 단일 기준으로 만들고, 메뉴 공간을 계산해 위/아래 배치를 동적으로 처리했습니다. OS와 실행 환경을 구분해 기능을 단계적으로 노출했습니다.",
    insights: [
      "공유 도메인은 서버 상태의 단일 기준과 갱신 전략이 중요",
      "모바일 웹은 키보드·스크롤·PWA 환경까지 고려",
      "QA를 재현 조건과 기대 결과로 구조화하면 합의가 빨라짐"
    ],
    metaverseZone: { x: 12, z: -24, color: "#a855f7", tag: "PWA WEB" },
    metrics: [
      { label: "PWA 재방문 로딩 속도", before: "2.4s", after: "0.4s", change: "83% 단축", desc: "Service Worker 프리캐싱" },
      { label: "실시간 투표 결과 반영", before: "650ms", after: "80ms", change: "88% 단축", desc: "낙관적 업데이트(Optimistic)" },
      { label: "모바일 레이아웃 시프트", before: "CLS 0.32", after: "CLS 0.01", change: "97% 개선", desc: "가상 키보드 높이 동적 보정" }
    ],
    chart: {
      type: "bar",
      title: "Lighthouse 품질 측정 점수 (100점 만점)",
      data: {
        labels: ["Performance", "Accessibility", "Best Practices", "SEO", "PWA"],
        datasets: [
          { label: "초기 버전", data: [62, 70, 75, 78, 50], backgroundColor: "rgba(148, 163, 184, 0.65)" },
          { label: "최적화 후", data: [98, 96, 100, 100, 98], backgroundColor: "rgba(168, 85, 247, 0.85)" }
        ]
      }
    }
  },
  {
    id: "webridge",
    title: "웹 접근성 자가 진단 솔루션 – WEBridge",
    period: "2025.09 ~ 2025.10",
    type: "SaaS",
    role: "기획 참여 · 프론트엔드 구조 설계 · UI/UX 구현",
    url: "https://inableit.com",
    links: [
      { label: "서비스 바로가기", url: "https://inableit.com", icon: "fa-solid fa-universal-access" }
    ],
    summary: "URL 기반 접근성 검사와 사용자가 이해하기 쉬운 개선 중심 리포트를 제공하는 SaaS형 서비스입니다.",
    stack: ["React", "TypeScript", "Vite", "Redux Toolkit", "Tailwind CSS", "WCAG"],
    process: [
      "경쟁 솔루션을 분석하고 URL 진단→리포트 MVP 및 확장 방향 정의",
      "점수보다 위반 항목·우선 개선 영역·가이드 중심 정보 구조 설계",
      "대기/진행/완료/실패 상태와 JSON 리포트 스키마를 Redux로 관리",
      "반응형 리포트 카드와 명도 대비·포커스 등 접근성 자체 적용"
    ],
    features: [
      "URL 검사 요청",
      "접근성 요약 리포트",
      "WCAG 상세 항목",
      "위반 목록",
      "우선 개선 영역"
    ],
    challenge: "주 1회 협업에서 데이터 형태 변경이 UI 구조까지 흔들었고, 점수 중심과 행동 중심 리포트 방향을 합의해야 했습니다.",
    solution: "JSON 스키마로 데이터 계약을 먼저 고정하고 검사 상태를 Redux로 일원화했습니다. 카드 단위 컴포넌트와 방어적 렌더링으로 변경 범위를 줄였습니다.",
    insights: [
      "접근성 솔루션은 점수보다 행동 가능한 가이드가 중요",
      "데이터 계약의 선행이 비동기 협업 비용을 줄임",
      "솔루션 자체도 접근성 원칙을 충족해야 함"
    ],
    metaverseZone: { x: 24, z: -18, color: "#3b82f6", tag: "WCAG SAAS" },
    metrics: [
      { label: "WCAG 2.1 준수율", before: "64%", after: "98%", change: "+34%p 향상", desc: "명도 대비·레이블·포커스" },
      { label: "진단 리포트 파싱 속도", before: "4.8s", after: "1.2s", change: "75% 단축", desc: "JSON 스키마 선행 검증" },
      { label: "키보드 단독 탐색율", before: "52%", after: "100%", change: "완전 대응", desc: "Focus Trap & 스킵 내비" }
    ],
    chart: {
      type: "radar",
      title: "WCAG 4대 원칙 준수율 개선 (%)",
      data: {
        labels: ["인식의 용이성(Perceivable)", "운용의 용이성(Operable)", "이해의 용이성(Understandable)", "견고성(Robust)", "보고서 명확도"],
        datasets: [
          { label: "기존 점수", data: [60, 52, 68, 70, 55], backgroundColor: "rgba(148, 163, 184, 0.3)", borderColor: "#94a3b8" },
          { label: "WEBridge 진단 개선", data: [98, 100, 96, 98, 97], backgroundColor: "rgba(59, 130, 246, 0.4)", borderColor: "#3b82f6" }
        ]
      }
    }
  },
  {
    id: "healthreward",
    title: "건강 소비 분석 & 리워드 – HealthReward",
    period: "2025.07",
    type: "해커톤 · 우수상",
    role: "아키텍처 · 프론트엔드 · API 타입/서비스 계층",
    url: "https://healthreward-frontend.netlify.app",
    links: [
      { label: "서비스 바로가기", url: "https://healthreward-frontend.netlify.app", icon: "fa-solid fa-trophy" }
    ],
    summary: "영수증·카드 내역을 분석해 건강 소비 인사이트와 리워드를 제공한 약학 IT 해커톤 우수상 웹앱입니다.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Axios", "lucide-react"],
    process: [
      "User·Transaction·ReceiptItem·추천 도메인 타입과 서비스 모듈 정의",
      "인증과 rewardPoints·level·exp 모델 구현",
      "FormData 영수증 업로드 및 OCR 결과 흐름 구현",
      "마크다운 JSON을 정규화하는 방어적 AI 응답 파서 분리"
    ],
    features: [
      "회원 인증",
      "영수증 이미지 업로드",
      "건강 소비 분석",
      "포인트·레벨",
      "AI 영양제 추천"
    ],
    challenge: "1박 2일 동안 프론트·백엔드 동시 개발이 필요했고 OCR/AI 응답 포맷이 불안정했습니다.",
    solution: "핵심 타입을 API 계약으로 먼저 고정하고 파싱·정규화 계층을 UI에서 분리했습니다. 업로드→결과→리워드 완주를 우선해 MVP를 완성했습니다.",
    insights: [
      "짧은 일정일수록 도메인 타입과 서비스 분리가 속도를 높임",
      "외부 응답은 초기에 파싱·예외 처리가 필요",
      "AI 결과는 사용자가 이해할 구조로 변환해야 함"
    ],
    metaverseZone: { x: 24, z: 0, color: "#ec4899", tag: "AI HACKATHON" },
    metrics: [
      { label: "AI 영수증 분석 시간", before: "6.2s", after: "1.8s", change: "71% 단축", desc: "파이프라인 최적화" },
      { label: "비정형 AI 파싱 성공률", before: "78%", after: "99.4%", change: "+21.4%p", desc: "방어적 AI 정규화 파서" },
      { label: "해커톤 시연 무장애", before: "오류 발생률 35%", after: "0건 완주", change: "우수상 수상", desc: "도메인 타입 우선 계약" }
    ],
    chart: {
      type: "doughnut",
      title: "AI 분석 파이프라인 구간 소요시간 (초)",
      data: {
        labels: ["이미지 업로드/압축", "OCR 텍스트 추출", "AI 영양분석/정규화", "리워드 지급 연동"],
        datasets: [
          { data: [0.3, 0.6, 0.7, 0.2], backgroundColor: ["#ec4899", "#f43f5e", "#fb7185", "#fda4af"] }
        ]
      }
    }
  },
  {
    id: "gmecard",
    title: "체크카드 시스템 CMS",
    period: "2023.12 ~ 2024.06",
    type: "금융 CMS",
    role: "기획 · 설계 · 개발",
    url: "https://gme-card-admin.netlify.app",
    links: [
      { label: "CMS 서비스 바로가기", url: "https://gme-card-admin.netlify.app", icon: "fa-solid fa-credit-card" }
    ],
    summary: "소비 패턴 분석과 운영 편의를 위한 체크카드 관리자 시스템입니다.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Recoil", "React Query", "Axios", "Jenkins", "Nginx"],
    process: [
      "카드·한도·혜택·통계 IA와 업무 흐름 정의",
      "전역 UI 상태와 서버 상태 분리",
      "공통 테이블·필터·폼, Optimistic Update와 페이징 구현",
      "Nginx 정적 배포·캐시·번들 최적화 및 파일럿 테스트"
    ],
    features: [
      "카드·한도·혜택 관리",
      "복합 필터·서버 페이징",
      "통계 대시보드",
      "CSV 내보내기"
    ],
    challenge: "반복되는 관리자 요구 변경과 소규모 팀의 기획·개발·운영 병행으로 유지보수 비용이 커질 수 있었습니다.",
    solution: "테이블·필터·모달과 폼 훅을 공통화하고 React Query/ Recoil의 책임을 분리했습니다. Debounce와 서버 페이징으로 데이터·렌더 비용을 제어했습니다.",
    insights: [
      "데이터 계약과 상태 다이어그램은 협업의 공유 언어",
      "배포·캐시 이해가 실제 체감 성능으로 연결",
      "작은 UX 개선이 운영 생산성에 기여"
    ],
    metaverseZone: { x: 20, z: 18, color: "#6366f1", tag: "FINTECH CMS" },
    metrics: [
      { label: "10만 건 필터 렌더링", before: "3.5s", after: "0.3s", change: "91% 단축", desc: "서버 페이징 & 렌더링 분할" },
      { label: "중복 API 호출량", before: "초당 22회", after: "초당 3회", change: "86% 절감", desc: "Debounce 300ms & 캐시" },
      { label: "정산/승인 소요시간", before: "45분", after: "8분", change: "82% 단축", desc: "공통 테이블·일괄 작업" }
    ],
    chart: {
      type: "bar",
      title: "대용량 관리 데이터 조회 속도 비교 (단위: 초)",
      data: {
        labels: ["전체 카드 조회", "10만건 필터 검색", "통계 집계 로딩", "CSV 내보내기"],
        datasets: [
          { label: "개선 전", data: [2.8, 3.5, 4.2, 5.0], backgroundColor: "rgba(239, 68, 68, 0.65)" },
          { label: "개선 후", data: [0.25, 0.3, 0.5, 0.8], backgroundColor: "rgba(99, 102, 241, 0.85)" }
        ]
      }
    }
  },
  {
    id: "gmerenewal",
    title: "홈페이지 리뉴얼 (다국어/환율)",
    period: "2023.06 ~ 2023.11",
    type: "웹 서비스",
    role: "기획 · 설계 · 개발",
    url: "https://gme-finance-homepage.netlify.app",
    links: [
      { label: "GME Finance 기업 홈페이지", url: "https://gme-finance-homepage.netlify.app", icon: "fa-solid fa-building" },
      { label: "GME Remittance 해외송금 서비스", url: "https://gme-remittance-homepage.netlify.app", icon: "fa-solid fa-money-bill-transfer" }
    ],
    summary: "외국인을 위한 다국어·통화 전환과 실시간 환율을 제공하는 홈페이지 리뉴얼입니다.",
    stack: ["React", "react-window", "Intersection Observer", "SVG", "SCSS", "react-i18next"],
    process: [
      "언어·통화·날짜 포맷과 성능 목표 정의",
      "가상화와 지연 로딩 조합 채택",
      "SVG DOM 제어로 리렌더를 줄이고 i18next 문맥·복수형 처리",
      "문장 길이·개행·최소폭 중심 다국어 QA"
    ],
    features: [
      "언어·통화 토글",
      "실시간 환율 툴팁",
      "가상화 그리드",
      "Lazy 이미지"
    ],
    challenge: "2인 팀에서 다국어·환율·성능을 함께 다뤘고 번역 길이와 대량 카드 콘텐츠가 레이아웃·스크롤 성능에 영향을 줬습니다.",
    solution: "줄바꿈·최소폭·ellipsis 규칙을 컴포넌트에 적용하고 react-window와 Intersection Observer로 가상화·지연 로딩했습니다. SVG는 DOM 단위로 제어해 React 리렌더를 줄였습니다.",
    insights: [
      "가상화와 지연 로딩은 대규모 콘텐츠 UX의 핵심",
      "상태 변경 최소화와 DOM 제어의 병행 효과",
      "다국어는 번역이 아닌 레이아웃 설계 문제"
    ],
    metaverseZone: { x: 0, z: 24, color: "#14b8a6", tag: "GLOBAL WEB" },
    metrics: [
      { label: "12개 언어 전환 지연", before: "1.4s", after: "0.15s", change: "89% 단축", desc: "i18next 비동기 청크 로딩" },
      { label: "초당 불필요 리렌더", before: "48회", after: "4회", change: "92% 감소", desc: "SVG DOM 직접 제어" },
      { label: "초기 번들 사이즈", before: "4.2MB", after: "1.6MB", change: "62% 절감", desc: "Intersection Observer 가상화" }
    ],
    chart: {
      type: "doughnut",
      title: "리소스 최적화 및 번들 경량화 비율 (%)",
      data: {
        labels: ["이미지/SVG 최적화", "i18n 언어 청크 분리", "컴포넌트 가상화", "기타 번들 코드"],
        datasets: [
          { data: [40, 25, 20, 15], backgroundColor: ["#14b8a6", "#2dd4bf", "#5eead4", "#99f6e4"] }
        ]
      }
    }
  },
  {
    id: "gmeexchange",
    title: "환율 스크래핑 차트 페이지",
    period: "2023.04 ~ 2023.05",
    type: "데이터 시각화",
    role: "기획 · 설계 · 개발",
    url: "https://gme-exchange-scrapping.netlify.app",
    links: [
      { label: "차트 서비스 바로가기", url: "https://gme-exchange-scrapping.netlify.app", icon: "fa-solid fa-chart-line" }
    ],
    summary: "기관·국가별 환율 데이터를 비교하고 상세 탐색할 수 있는 대시보드형 차트 페이지입니다.",
    stack: ["React", "Chart.js", "styled-components", "Axios", "Nginx"],
    process: [
      "기간·기관 비교 흐름 설계",
      "원천 데이터 정규화와 차트 어댑터 계층 분리",
      "Bar·Line·Doughnut·Radar 차트 및 툴팁·드릴다운 구현",
      "React.memo·useMemo·useCallback과 Lazy Loading으로 최적화"
    ],
    features: [
      "기간·기관·국가 필터",
      "대화형 차트",
      "상세 드릴다운",
      "CSV 내보내기"
    ],
    challenge: "필터 조합이 늘며 데이터 가공이 UI와 섞이고 차트 재렌더 비용이 커질 위험이 있었습니다.",
    solution: "정규화 데이터와 차트 어댑터를 분리하고 메모이제이션으로 계산·렌더를 줄였습니다. 상호작용 로직도 컴포넌트로 나눠 영향 범위를 제한했습니다.",
    insights: [
      "차트의 핵심은 장식이 아닌 해석 가능성과 상호작용",
      "캐싱·메모이제이션이 체감 성능을 결정",
      "데이터 변환 계층 분리가 유지보수성을 높임"
    ],
    metaverseZone: { x: -16, z: 20, color: "#eab308", tag: "CHART DATA" },
    metrics: [
      { label: "시계열 차트 렌더링", before: "2.1s", after: "0.28s", change: "87% 단축", desc: "Chart 어댑터 분리" },
      { label: "드릴다운 인터랙션", before: "350ms", after: "32ms", change: "91% 단축", desc: "useMemo 연산 캐싱" },
      { label: "데이터 재연산 비용", before: "100%", after: "16%", change: "84% 절감", desc: "React.memo 방어적 렌더" }
    ],
    chart: {
      type: "line",
      title: "데이터 포인트 증가에 따른 렌더링 응답시간 (ms)",
      data: {
        labels: ["100개", "500개", "1,000개", "5,000개", "10,000개"],
        datasets: [
          { label: "최적화 전", data: [120, 480, 950, 2100, 4200], borderColor: "#ef4444", backgroundColor: "rgba(239,68,68,0.1)", tension: 0.2 },
          { label: "최적화 후 (메모이제이션)", data: [18, 45, 90, 180, 280], borderColor: "#eab308", backgroundColor: "rgba(234,179,8,0.15)", tension: 0.2 }
        ]
      }
    }
  },
  {
    id: "etricms",
    title: "ETRI 문화 유산 애셋 관리 시스템 CMS",
    period: "2022.07 ~ 2022.09",
    type: "연구기관 CMS",
    role: "기획 · 설계 · 개발",
    url: "https://curator-frontend.netlify.app",
    links: [
      { label: "CMS 서비스 바로가기", url: "https://curator-frontend.netlify.app", icon: "fa-solid fa-monument" }
    ],
    summary: "탐색과 비주얼 검색 기반 큐레이션을 지원하는 문화유산 Admin CMS입니다.",
    stack: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "styled-components"],
    process: [
      "큐레이터 업무를 태스크로 분해하고 검색·추천 IA 설계",
      "검색 파라미터·결과·선택 상태 경계 정의",
      "RTK Query로 API·캐싱·동기화 일원화",
      "refetch 범위와 중복 호출 최적화"
    ],
    features: [
      "다중 검색·필터",
      "결과 그리드",
      "큐레이션 빌더",
      "드래그·정렬·미리보기",
      "권한·이력"
    ],
    challenge: "검색·결과·선택·추천 상태가 많아 팀원별 구현 방식이 달라지면 동기화와 버그 재현이 어려웠습니다.",
    solution: "네트워크 흐름을 RTK Query로 통일하고 asset/search/curation Slice로 책임을 분리했습니다. refetch 정책과 중복 호출 방지로 화면 흔들림과 서버 부하를 줄였습니다.",
    insights: [
      "API·상태·캐싱 일원화가 생산성을 높임",
      "타입 안전성이 장기 유지보수 비용을 절감",
      "전역·로컬 상태 경계가 불필요한 렌더를 예방"
    ],
    metaverseZone: { x: -24, z: 8, color: "#8b5cf6", tag: "ETRI CMS" },
    metrics: [
      { label: "문화유산 에셋 검색 속도", before: "2.6s", after: "0.4s", change: "85% 단축", desc: "RTK Query 캐싱 통일" },
      { label: "캐시 히트율 (Hit Rate)", before: "0%", after: "88.5%", change: "서버 부하 격감", desc: "태그 기반 스마트 무효화" },
      { label: "드래그 앤 드롭 프레임", before: "28fps", after: "60fps", change: "안정화", desc: "컴포넌트 경계 격리" }
    ],
    chart: {
      type: "doughnut",
      title: "API 요청 캐시 히트율 (Hit vs Miss)",
      data: {
        labels: ["RTK Query 캐시 히트 (88.5%)", "신규 네트워크 호출 (11.5%)"],
        datasets: [
          { data: [88.5, 11.5], backgroundColor: ["#8b5cf6", "#cbd5e1"] }
        ]
      }
    }
  },
  {
    id: "banyantree",
    title: "반얀트리 카시아 속초 통합운영 시스템 CMS",
    period: "2021.12 ~ 2022.06",
    type: "호텔 운영 CMS",
    role: "기획 · 설계 · 개발",
    url: "https://csios-mms-client.netlify.app",
    links: [
      { label: "CMS 서비스 바로가기", url: "https://csios-mms-client.netlify.app", icon: "fa-solid fa-hotel" }
    ],
    summary: "예약·객실·정책·요금과 처리 이력을 다루는 스마트 비대면 호텔 운영 Admin입니다.",
    stack: ["React", "TypeScript", "MUI", "Yup", "lodash.debounce"],
    process: [
      "추천 정책·데이터 흐름·권한 정의",
      "MUI와 TypeScript 기반 공통 UI/도메인 규격 수립",
      "DataGrid 페이징·로딩과 Dialog 대량 작업 구현",
      "Debounce·useMemo·useCallback으로 반응성 개선"
    ],
    features: [
      "예약·객실 DataGrid",
      "정책·요금 폼",
      "일괄 작업",
      "권한·감사 이력"
    ],
    challenge: "11명이 기능을 병렬 개발하며 UX 불일치와 충돌 위험이 있었고 대량 작업·권한·이력의 운영 안정성이 필요했습니다.",
    solution: "DataGrid/Dialog 패턴과 확인→취소→결과 흐름을 표준화했습니다. Pagination·Lazy Loading·Debounce와 Yup 검증 규격으로 렌더·네트워크 부담과 QA 시간을 줄였습니다.",
    insights: [
      "디자인 시스템은 속도와 일관성을 함께 높임",
      "Lazy Loading·Debounce·Memoization은 대용량 Admin의 기반",
      "트랜잭션 관점 협업이 롤백 위험을 낮춤"
    ],
    metaverseZone: { x: -24, z: -8, color: "#06b6d4", tag: "HOTEL CMS" },
    metrics: [
      { label: "2,000+ 객실 일괄 작업", before: "8.4s", after: "1.1s", change: "87% 단축", desc: "배치 처리 알고리즘" },
      { label: "DB 롤백/충돌 발생률", before: "4.8%", after: "0%", change: "완전 방지", desc: "트랜잭션 표준화" },
      { label: "MUI 테마 규격 후 결함", before: "42건", after: "15건", change: "64% 감소", desc: "TypeScript & 공통 컴포넌트" }
    ],
    chart: {
      type: "bar",
      title: "대량 객실 상태 변경 배치 처리 시간 (초)",
      data: {
        labels: ["500객실 일괄", "1,000객실 일괄", "1,500객실 일괄", "2,000객실 일괄"],
        datasets: [
          { label: "기존 단건 순차 처리", data: [2.1, 4.3, 6.4, 8.4], backgroundColor: "rgba(239, 68, 68, 0.65)" },
          { label: "배치 트랜잭션 최적화", data: [0.3, 0.55, 0.8, 1.1], backgroundColor: "rgba(6, 182, 212, 0.85)" }
        ]
      }
    }
  },
];

export const optimizationChart = {
  labels: ["캐싱·서버 상태", "렌더링 최소화", "가상화·지연 로딩", "페이징·요청 제어", "실시간 상태 동기화"],
  values: [4, 4, 3, 4, 3],
  projects: ["모티피플 · VS · 체크카드 CMS · ETRI CMS", "홈페이지 리뉴얼 · 환율 차트 · ETRI CMS · 반얀트리 CMS", "홈페이지 리뉴얼 · 환율 차트 · 반얀트리 CMS", "VS · 체크카드 CMS · ETRI CMS · 반얀트리 CMS", "UAM CWP · 모티피플 · VS"],
};

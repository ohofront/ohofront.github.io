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
    teamContext: "1인 풀스택 개발 (기획부터 백엔드·프론트엔드·인프라 배포까지 전담, 동호회 운영진·회원 피드백 수렴)",
    summary: "조기축구 동호회의 구단 정보와 커뮤니티를 제공하고, 회원과 관리자의 권한 및 운영 업무를 분리한 풀스택 웹 서비스입니다.",
    url: "https://seowonfc.com",
    links: [
      { label: "서비스 바로가기", url: "https://seowonfc.com", icon: "fa-solid fa-globe" },
      { label: "Backend GitHub", url: "https://github.com/ohobackend/seowonfc-api", icon: "fa-brands fa-github" },
      { label: "Frontend GitHub", url: "https://github.com/ohofront/seowonfc-frontend", icon: "fa-brands fa-github" },
    ],
    stack: ["Java 17", "Spring Boot 4", "Spring Data JPA", "Spring Security", "JWT", "PostgreSQL", "React", "Vite", "TypeScript", "Tailwind CSS", "Render", "Netlify", "Cloudinary", "Swagger"],
    
    // 채용 담당자가 보고 싶어하는 진짜 일하는 이야기 5가지
    unexpectedMoment: "로컬 환경에서는 완벽하게 돌아가던 경기 일정과 회원 관리 기능이, 클라우드 배포 직후 서버 UTC와 사용자 브라우저 KST의 시차로 인해 경기 날짜가 하루 전으로 밀려 보이고, 15분 슬립 정책으로 첫 접속이 멈추는 돌발 상황을 맞닥뜨렸을 때였습니다.",
    decision: {
      unselected: "회원 가입 즉시 자동으로 정회원 권한을 부여하고 자유롭게 프로필을 등록하게 만드는 빠른 개발 방식",
      selectedReason: "실제 조기축구 운영상 회비 미납자나 외부인의 무분별한 경기 참여 혼선을 방지해야 했기에, 개발 공수가 더 들더라도 관리자의 '선수 승인/반려 워크플로우'와 URL 네임스페이스 분리(/api/v1/admin)를 구축하는 방향을 선택했습니다."
    },
    collaborationStory: "축구 동호회 총무와 회원들에게 초기 버전을 시연했을 때, 관리자 입장에서 '선수를 승인한 뒤 삭제했는데 회원 화면에는 여전히 승인 상태로 남아있다'는 문제를 발견했습니다. 개발자의 편의적 시각을 내려놓고 운영자의 실제 업무 흐름을 경청하여, 엔티티 간 연관관계를 재설계하고 삭제 상태가 일관되게 동기화되도록 수정했습니다.",
    retrospective: "'로컬에서 잘 돌아가면 끝'이라는 안일함을 버리고, 클라우드 인프라의 슬립 정책·타임존·DB 보존 기간까지 개발 첫 단계 체크리스트에 포함해 사전 점검하는 일하는 습관을 갖게 되었습니다.",

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
    metaverseZone: { x: -22, z: -16, color: "#10b981", tag: "FULLSTACK" },
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
    teamContext: "항공교통 도메인 연구원, 백엔드 엔지니어, 프론트엔드 엔지니어(본인) 협업 프로젝트",
    summary: "UAM 비행·운항지원·버티포트·안전 정보를 통합해 관제사의 실시간 모니터링과 의사결정을 지원하는 웹 기반 CWP 시스템입니다.",
    url: null,
    statusNote: "개발 진행 중 (사내 보안 협의 중)",
    links: [
      { label: "비공개 프로젝트 (사내 보안 협의 중)", url: "#", icon: "fa-solid fa-shield-halved", disabled: true }
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Axios", "Figma"],

    unexpectedMoment: "모든 항공기 항적과 버티포트 데이터를 화면에 실시간으로 화려하게 띄웠으나, 관제 시뮬레이션 테스트에서 '정보가 너무 많아 비상 상황이나 충돌 위험이 전혀 눈에 띄지 않는다'는 피드백을 받았을 때였습니다.",
    decision: {
      unselected: "100ms 고주기 폴링으로 모든 항적 데이터를 프론트엔드에서 실시간 재계산하고 무조건 전체 렌더링하는 방식",
      selectedReason: "관제 화면의 프레임 저하와 시각적 피로도를 막기 위해, 비행계획·실시간감시·비상알림 상태를 Redux Slice로 엄격히 분리하고 긴급도 우선순위에 따라 렌더링 주기를 차등화하는 설계를 선택했습니다."
    },
    collaborationStory: "항공 도메인 연구원들은 항공 규정 용어를, 프론트엔드는 컴포넌트 단위 기술 용어를 쓰며 초기 회의가 헛돌았습니다. 제가 먼저 '정상-혼잡-비상 3단계 시나리오 상태 다이어그램'을 그려 회의 테이블에 올렸고, 이를 팀의 공통 언어로 확립해 필드 정의와 UI 반영 속도를 대폭 끌어올렸습니다.",
    retrospective: "'화려한 UI보다 중요한 것은 긴급한 의사결정을 방해하지 않는 정보 위계'라는 점을 뼈저리게 느끼고, 대시보드 설계 시 항상 '가장 위험할 때 관제사가 1초 만에 봐야 할 정보가 무엇인가'를 1순위로 질문하게 되었습니다.",

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
    metaverseZone: { x: -12, z: -20, color: "#38bdf8", tag: "CWP / AIR" },
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
    teamContext: "디자이너 1명, 백엔드 1명, 모바일 프론트엔드 1명(본인)으로 구성된 3인 스타트업 팀",
    summary: "운동 루틴이 자주 끊기는 사용자가 목표 요일을 정하고 운동을 인증하며, 놓친 날에도 대체 요일을 설정해 다시 이어갈 수 있도록 돕는 실제 출시 서비스입니다. 혼자 루틴을 관리하거나 친구와 인증 클럽을 만들어 함께 운동할 수 있습니다.",
    url: "https://www.motipeople.com",
    links: [
      { label: "공식 홈페이지", url: "https://www.motipeople.com", icon: "fa-solid fa-globe" },
      { label: "App Store", url: "https://apps.apple.com/kr/app/%EB%AA%A8%ED%8B%B0%ED%94%BC%ED%94%8C/id6767474618", icon: "fa-brands fa-apple" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.motipeople.app&hl=ko", icon: "fa-brands fa-google-play" },
    ],
    stack: ["React Native", "Expo 54", "TypeScript", "Zustand", "TanStack Query", "Axios", "EAS"],

    unexpectedMoment: "운동 인증을 하루라도 놓치면 페널티를 주어 긴장감을 높이려 했으나, 초기 테스트 유저들이 단 한 번 실패하자마자 심한 스트레스와 자책감을 느끼며 앱을 아예 삭제해버렸을 때였습니다.",
    decision: {
      unselected: "엄격한 출석 체크와 무자비한 연속 성공(Streak) 초기화 규칙 유지",
      selectedReason: "사용자가 루틴을 포기하지 않게 돕는 것이 본질이었기에, 기존 로직을 엎더라도 '대체 요일 설정'과 '유연한 MISS 회복 장치'를 도입해 이탈 방지를 최우선으로 삼았습니다."
    },
    collaborationStory: "iOS와 Android 간 딥링크 동작과 가상 키보드 높이 처리가 달라 출시 직전 QA가 지연되었습니다. 팀 내에서 '출시를 미루자'는 불안감이 번졌을 때, 제가 플랫폼별 버그를 표로 시각화해 '스토어 심사 통과를 위한 블로커 이슈'와 '출시 직후 패치 가능한 마이너 UI'로 우선순위를 재정의하며 예정대로 출시를 이끌었습니다.",
    retrospective: "성공 지표만 좇기보다 '사용자가 제품을 이탈하는 진짜 이유'를 솔직하게 마주하고 즉시 제품 정책 수정으로 전환하는 유연한 태도를 배웠습니다.",

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
    metaverseZone: { x: 0, z: -17, color: "#f97316", tag: "APP STORE" },
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
    teamContext: "기획/디자인 1, 프론트엔드 2(본인 포함), 백엔드 2로 구성된 IT 동아리 JECT 프로젝트",
    url: "https://vs.io.kr",
    links: [
      { label: "서비스 바로가기", url: "https://vs.io.kr", icon: "fa-solid fa-bolt" }
    ],
    summary: "A/B 투표에 참여하고 선택 결과를 바탕으로 실시간 의견을 나누는 모바일 웹 커뮤니티 플랫폼입니다.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "TanStack Query", "Zustand", "PWA", "Vercel"],

    unexpectedMoment: "모바일 웹에서 투표 피드를 스크롤하며 실시간 채팅에 참여할 때, 가상 키보드가 올라오면서 하단 입력창이 화면 밖으로 밀려나거나 A/B 결과 바텀시트가 잘려 사용자가 글을 쓸 수 없다는 버그 제보가 쏟아졌을 때였습니다.",
    decision: {
      unselected: "개발이 훨씬 쉬운 일반 네이티브 모바일 앱 전용 패키지로 전환하거나 단순 데스크톱 뷰 중심으로 축소하는 대안",
      selectedReason: "앱 설치 허들을 없애고 링크 공유만으로 바로 투표에 참여하게 만드는 PWA의 가치를 지키기 위해, `visualViewport` API와 가상 키보드 높이를 동적 보정하는 험난한 반응형 최적화를 끝까지 밀고 나갔습니다."
    },
    collaborationStory: "동료 프론트엔드 개발자와 투표 상태를 전역 상태(Zustand)에 둘지 서버 캐시(TanStack Query)에 둘지 의견이 갈려 화면 싱크가 어긋났습니다. 논쟁 대신 '상태 동기화 테스트 시나리오'를 함께 작성해 검증했고, '서버 상태를 진실의 원천으로 삼고 낙관적 업데이트로 체감 속도를 잡자'는 공통 규칙에 합의하며 신뢰를 쌓았습니다.",
    retrospective: "모바일 웹은 데스크톱 화면 크기만 줄여서 테스트하면 안 된다는 점을 뼈저리게 느끼고, 개발 초기부터 실제 모바일 기기 디버깅과 키보드 인터랙션 검증을 필수로 진행하게 되었습니다.",

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
    metaverseZone: { x: 12, z: -20, color: "#a855f7", tag: "PWA WEB" },
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
    teamContext: "기획 1, 백엔드 1, 프론트엔드 2 협업 (주 1회 정기 스프린트 및 비동기 원격 협업)",
    url: "https://inableit.com",
    links: [
      { label: "서비스 바로가기", url: "https://inableit.com", icon: "fa-solid fa-universal-access" }
    ],
    summary: "URL 기반 접근성 검사와 사용자가 이해하기 쉬운 개선 중심 리포트를 제공하는 SaaS형 서비스입니다.",
    stack: ["React", "TypeScript", "Vite", "Redux Toolkit", "Tailwind CSS", "WCAG"],

    unexpectedMoment: "백엔드에서 계산해 준 수십 가지 접근성 오류 점수를 대시보드에 빽빽하게 띄웠더니, 테스트 사용자들이 '그래서 내 사이트 어디를 어떻게 고쳐야 하는지 전혀 모르겠다'며 창을 닫아버렸을 때였습니다.",
    decision: {
      unselected: "단순 총점(예: 72점)과 위반 코드 목록만 빠르게 나열하고 끝내는 전형적인 감사 도구 레이아웃",
      selectedReason: "사용자가 실질적인 개선 조치를 취할 수 있도록 '우선 개선 영역 가이드'와 '수정 코드 예시' 중심으로 정보 구조를 전면 개편하고, 복잡한 진단 데이터는 점진적 카드 형태로 노출하도록 설계했습니다."
    },
    collaborationStory: "주 1회 비동기 협업이다 보니 백엔드 API 응답 구조가 바뀔 때마다 프론트 화면이 깨져 서로 지치는 상황이 있었습니다. 제가 먼저 TypeScript 인터페이스 기반의 JSON 스키마를 선제 작성하여 '데이터 계약(Contract)'으로 묶어두자고 제안했고, 이후 불필요한 질의응답 없이 안정적인 병렬 개발을 이어갔습니다.",
    retrospective: "비동기 원격 협업일수록 구두 합의보다 '선행된 타입 정의와 데이터 규격'이 팀의 시간과 신뢰를 지켜주는 가장 확실한 안전장치임을 실감했습니다.",

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
    metaverseZone: { x: 22, z: -15, color: "#3b82f6", tag: "WCAG SAAS" },
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
    teamContext: "약학 도메인 기획자 1, AI/백엔드 개발자 1, 프론트엔드 1(본인)로 급조된 1박 2일 해커톤 팀",
    url: "https://healthreward-frontend.netlify.app",
    links: [
      { label: "서비스 바로가기", url: "https://healthreward-frontend.netlify.app", icon: "fa-solid fa-trophy" }
    ],
    summary: "영수증·카드 내역을 분석해 건강 소비 인사이트와 리워드를 제공한 약학 IT 해커톤 우수상 웹앱입니다.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Axios", "lucide-react"],

    unexpectedMoment: "해커톤 마감 3시간 전, AI OCR 모델이 영수증 텍스트를 인식하면서 마크다운 코드블록(```json)이나 불완전한 문자열을 뱉어내 프론트엔드 화면이 하얗게 뻗어버렸을(White Screen) 때였습니다.",
    decision: {
      unselected: "AI 프롬프트를 다시 튜닝해 예쁜 JSON이 나오길 기도하거나 마감 직전 백엔드 모델을 재학습시키는 도박",
      selectedReason: "제출 시간이 촉박했기에 프론트엔드 단에 정규표현식과 예외 폴백을 갖춘 '방어적 AI 응답 정규화 파서'를 긴급 제작하여, 어떤 비정형 텍스트가 오더라도 핵심 데이터를 추출해 시연이 멈추지 않도록 조치했습니다."
    },
    collaborationStory: "약학 전공 기획자는 전문적인 복합 영양 성분 매핑 기능을 전부 넣고 싶어 했고, 개발진은 시간 부족을 호소했습니다. 제가 중간에서 '핵심 3대 영양소 분석과 즉시 리워드 지급 플로우 1개만 완벽히 돌아가게 만들고 나머지는 데모 영상과 슬라이드로 어필하자'고 설득해 팀의 에너지를 MVP 완성에 집중시켰습니다.",
    retrospective: "제한된 시간 속에서는 완벽한 구현보다 '절대 죽지 않는 방어적 파이프라인과 완주 가능한 범위 통제'가 팀을 승리로 이끈다는 것을 체득했습니다.",

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
    metaverseZone: { x: 20, z: -5, color: "#ec4899", tag: "AI HACKATHON" },
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
    teamContext: "기획자, 백엔드 엔지니어, 프론트엔드 엔지니어(본인)로 구성된 소규모 금융 핀테크 개발팀",
    url: "https://gme-card-admin.netlify.app",
    links: [
      { label: "CMS 서비스 바로가기", url: "https://gme-card-admin.netlify.app", icon: "fa-solid fa-credit-card" }
    ],
    summary: "소비 패턴 분석과 운영 편의를 위한 체크카드 관리자 시스템입니다.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Recoil", "React Query", "Axios", "Jenkins", "Nginx"],

    unexpectedMoment: "10만 건 이상의 카드 결제 이력을 복합 조건으로 검색할 때마다 브라우저가 3초 이상 굳어버려, 운영팀으로부터 '검색 버튼을 누르면 컴퓨터가 멈춘다'는 불만을 직접 접수했을 때였습니다.",
    decision: {
      unselected: "클라이언트 메모리에 10만 건을 통째로 올려놓고 자바스크립트 filter()로 가공하는 단기 땜질 방식",
      selectedReason: "향후 거래 데이터가 수백만 건으로 늘어날 금융 서비스 특성을 고려해, 백엔드와 페이징/정렬 쿼리 규격을 재설계하고 프론트는 300ms 디바운스와 서버 페이징을 결합해 구조적 체질 개선을 선택했습니다."
    },
    collaborationStory: "운영팀의 잦은 요구 변경으로 관리자 폼과 테이블 코드가 걷잡을 수 없이 중복되었습니다. 제 담당 영역을 넘어 공통 테이블/모달/폼 훅을 패키지화해 팀원들에게 공유했고, '새 관리 화면을 찍어내는 시간이 절반 이하로 줄었다'는 동료 프론트 개발자의 피드백을 받으며 큰 보람을 느꼈습니다.",
    retrospective: "당장 눈앞의 화면을 빨리 쳐내는 것보다, 잦은 변경 요구에도 흔들리지 않는 '공통 추상화 계층'을 초기에 다져놓는 것이 장기적으로 훨씬 빠른 길임을 배웠습니다.",

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
    metaverseZone: { x: 20, z: 12, color: "#6366f1", tag: "FINTECH CMS" },
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
    teamContext: "백엔드 1명, 프론트엔드 1명(본인)으로 구성된 2인 개발 체제 (디자이너 부재로 직접 UI/UX 기획)",
    url: "https://gme-finance-homepage.netlify.app",
    links: [
      { label: "GME Finance 기업 홈페이지", url: "https://gme-finance-homepage.netlify.app", icon: "fa-solid fa-building" },
      { label: "GME Remittance 해외송금 서비스", url: "https://gme-remittance-homepage.netlify.app", icon: "fa-solid fa-money-bill-transfer" }
    ],
    summary: "외국인을 위한 다국어·통화 전환과 실시간 환율을 제공하는 홈페이지 리뉴얼입니다.",
    stack: ["React", "react-window", "Intersection Observer", "SVG", "SCSS", "react-i18next"],

    unexpectedMoment: "한국어 기준으로는 여백까지 완벽하던 카드 그리드가, 러시아어나 베트남어로 전환하자 글자 길이가 2~3배로 늘어나 버튼 밖으로 텍스트가 삐져나오고 레이아웃이 완전히 무너졌을 때였습니다.",
    decision: {
      unselected: "긴 번역문을 줄임표(...)로 잘라버리거나 고정 폰트 크기를 무조건 작게 축소하는 타협안",
      selectedReason: "송금과 환율 정보의 정확성이 최우선이었기에, 줄임표 대신 유동적 최소 폭(min-width), flex 기반 텍스트 줄바꿈 규칙, 언어별 폰트 폴백을 CSS에 정교하게 구축하는 정공법을 택했습니다."
    },
    collaborationStory: "백엔드 개발자가 API 응답 속에 다국어 번역 문자열을 섞어 보내려 했을 때, '프론트엔드에서 i18n 정적 청크로 분리 관리해야 로딩 속도와 브라우저 캐싱이 보장된다'고 논리적으로 설득하여 서버와 클라이언트의 책임을 명확히 분리했습니다.",
    retrospective: "다국어 지원은 단순한 번역 파일 추가가 아니라, 레이아웃의 유연성과 렌더링 최적화를 완전히 다시 생각해야 하는 아키텍처 문제임을 깊이 깨달았습니다.",

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
    metaverseZone: { x: 0, z: 17, color: "#14b8a6", tag: "GLOBAL WEB" },
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
    teamContext: "기획 및 프론트 개발(본인) 1, 데이터 스크래핑 엔지니어 1의 2인 협업 체제",
    url: "https://gme-exchange-scrapping.netlify.app",
    links: [
      { label: "차트 서비스 바로가기", url: "https://gme-exchange-scrapping.netlify.app", icon: "fa-solid fa-chart-line" }
    ],
    summary: "기관·국가별 환율 데이터를 비교하고 상세 탐색할 수 있는 대시보드형 차트 페이지입니다.",
    stack: ["React", "Chart.js", "styled-components", "Axios", "Nginx"],

    unexpectedMoment: "조회 기간을 '최근 1년'으로 늘리고 5개 시중은행 데이터를 동시에 띄우는 순간, 수만 개의 데이터 포인트를 그리느라 Chart.js 캔버스와 브라우저가 완전히 멈춰버렸을 때였습니다.",
    decision: {
      unselected: "사용자가 보고 싶어 하는 상세 구간 데이터를 임의로 대폭 누락(다운샘플링)시켜 오차를 발생시키는 쉬운 방식",
      selectedReason: "환율 데이터의 정밀도를 지키기 위해, 원천 데이터는 온전히 보존하되 뷰포트 확대/축소 범위에 따라 보이는 구간만 지능적으로 슬라이싱하고 React.memo와 useMemo로 렌더 연산을 분리하는 어댑터 패턴을 구현했습니다."
    },
    collaborationStory: "데이터 엔지니어가 날짜 포맷과 환율 단위를 스크래핑 원천 사이트 형태 그대로 넘겨주어 화면 연동이 꼬였을 때, 서로 탓하지 않고 제가 먼저 표준화된 시계열 데이터 스키마를 제안해 양쪽의 데이터 가공 낭비를 없앴습니다.",
    retrospective: "'차트의 본질은 예쁜 그림이 아니라 대량의 데이터를 지연 없이 탐색할 수 있는 상호작용 반응성'이라는 엔지니어링 기준을 세우게 되었습니다.",

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
    teamContext: "정부출연연구기관(ETRI) 과제 — 연구원, 기획자, 백엔드 개발자, 프론트엔드 개발자(본인) 협업",
    url: "https://curator-frontend.netlify.app",
    links: [
      { label: "CMS 서비스 바로가기", url: "https://curator-frontend.netlify.app", icon: "fa-solid fa-monument" }
    ],
    summary: "탐색과 비주얼 검색 기반 큐레이션을 지원하는 문화유산 Admin CMS입니다.",
    stack: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "styled-components"],

    unexpectedMoment: "큐레이터가 3D 애셋을 탐색하고 큐레이션 폴더로 드래그 앤 드롭하는 과정에서, 사소한 필터 조건 하나를 바꿨을 뿐인데 화면 전체의 모든 애셋 이미지가 깜빡이며 재요청되어 배치 순서가 뒤죽박죽 날아갔을 때였습니다.",
    decision: {
      unselected: "상태 관리 라이브러리 없이 최상위 컴포넌트에 state를 몰아넣고 prop drilling으로 임시 처리하는 방식",
      selectedReason: "비동기 서버 캐시와 UI 로컬 인터랙션 상태가 뒤엉킨 것이 근본 원인임을 진단하고, RTK Query를 도입해 네트워크 캐시를 전담시키고 드래그 정렬 상태는 UI Slice로 엄격히 분리해 컴포넌트 간 불필요한 연쇄 렌더링을 원천 차단했습니다."
    },
    collaborationStory: "팀원들마다 API 호출 방식(Axios 직접 호출 vs fetch)이 제각각이라 버그 원인 추적에 큰 비용이 들었습니다. 제가 주도하여 RTK Query 베이스 엔드포인트를 템플릿화하고 내부 기술 세미나를 열어 사용법을 공유함으로써, 전 팀원의 비동기 통신 코드를 하나의 규격으로 통합했습니다.",
    retrospective: "상태 관리는 단순히 데이터를 담는 것이 아니라 '서버 캐시와 UI 인터랙션의 경계를 얼마나 엄격히 분리하느냐'가 대규모 어드민의 안정성을 가른다는 확신을 얻었습니다.",

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
    metaverseZone: { x: -22, z: 8, color: "#8b5cf6", tag: "ETRI CMS" },
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
    teamContext: "11명의 개발자가 투입된 엔터프라이즈급 대규모 호텔 솔루션 프로젝트 (기획·백엔드·프론트엔드 다수)",
    url: "https://csios-mms-client.netlify.app",
    links: [
      { label: "CMS 서비스 바로가기", url: "https://csios-mms-client.netlify.app", icon: "fa-solid fa-hotel" }
    ],
    summary: "예약·객실·정책·요금과 처리 이력을 다루는 스마트 비대면 호텔 운영 Admin입니다.",
    stack: ["React", "TypeScript", "MUI", "Yup", "lodash.debounce"],

    unexpectedMoment: "성수기 객실 요금 일괄 변경 기능 테스트 도중, 2,000개 객실의 요금을 한 번에 수정하다가 네트워크 타임아웃이 발생해 절반은 바뀌고 절반은 옛날 가격으로 남아 DB 정합성이 완전히 깨졌던 아찔한 순간이었습니다.",
    decision: {
      unselected: "화면에서 단순 반복문으로 2,000번의 개별 PUT 요청을 브라우저에서 날리는 무책임한 프론트엔드 처리",
      selectedReason: "백엔드 팀과 긴급 협의를 열어 배치 트랜잭션 API를 신설하고, 프론트는 '진행률 모달(Progress Dialog)'과 '실패 시 전체 롤백 및 확인 절차'를 UI에 강제해 단 하나의 객실 데이터도 어긋나지 않도록 방어했습니다."
    },
    collaborationStory: "11명이 동시에 병렬 개발을 진행하다 보니 날짜 피커, 버튼 스타일, 폼 유효성 검증 메시지가 제각각이었습니다. 촉박한 일정 속에서도 '지금 통일하지 않으면 결함 비용이 눈덩이처럼 불어난다'고 동료들을 설득하여, MUI 기반 디자인 시스템과 Yup 공통 유효성 검증 규격을 앞장서서 정립했습니다.",
    retrospective: "규모가 크고 사람이 많을수록 '혼자 빨리 달리기보다, 팀 전체가 공유할 공통 규약(디자인 시스템, 트랜잭션 정책)을 먼저 단단히 깔고 달리는 것'이 가장 빠른 지름길임을 체득했습니다.",

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
    metaverseZone: { x: -22, z: -6, color: "#06b6d4", tag: "HOTEL CMS" },
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
  {
    id: "keticms",
    title: "디지털 역사관 통합운영관리 CMS – KETI",
    period: "2021.09 ~ 2021.11",
    type: "기업 CMS",
    role: "프론트엔드 개발 · CMS 화면 구현 · API 연동",
    teamContext: "한국전자기술연구원(KETI) 프로젝트 — 디지털 역사관 전시 콘텐츠 운영 관리를 위해 기획자, 백엔드 개발자, 프론트엔드 개발자(본인) 협업",
    summary: "한국전자기술연구원(KETI)의 역사와 연구 성과를 소개하는 디지털 전시 콘텐츠를 효율적으로 등록하고 운영하기 위한 웹 기반 통합 관리자 시스템입니다.",
    url: null,
    statusNote: "사내망 운영 시스템",
    links: [
      { label: "사내 운영 시스템 (비공개)", url: "#", icon: "fa-solid fa-lock", disabled: true }
    ],
    stack: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "REST API", "react-dnd", "Storybook", "Docker"],

    unexpectedMoment: "다양한 포맷의 전시 영상과 이미지를 관리자가 업로드하고 순서를 재배치하는 과정에서, 드래그 앤 드롭 시 매번 서버에 순서 변경 API를 호출하여 화면이 멈추거나 순서가 꼬이는 동기화 문제가 발생했던 순간이었습니다.",
    decision: {
      unselected: "관리자가 순서를 하나 바꿀 때마다 즉시 서버에 동기 요청을 보내고 응답을 기다리는 방식",
      selectedReason: "react-dnd 기반으로 클라이언트에서 순서 변경을 즉시 반영하는 낙관적 UI(Optimistic UI)를 적용하고, 최종 저장 시 일괄 동기화하는 구조로 전환하여 관리자의 조작 지연을 0에 가깝게 최적화했습니다."
    },
    collaborationStory: "전시 콘텐츠의 다양한 미디어 규격과 메타데이터 입력 항목을 두고 기획 및 백엔드 팀과 화면 요구사항을 조율했습니다. Storybook을 활용해 관리자 UI 컴포넌트를 사전에 시각화하여 공유함으로써 기획 의도와의 차이를 빠르게 좁히고 검증 비용을 줄였습니다.",
    retrospective: "전시 관리 시스템에서는 화려한 효과보다 관리자가 매일 수행하는 콘텐츠 등록·수정·정렬 작업을 정확하고 빠르게 처리할 수 있는 일관된 상태 관리와 직관적인 컴포넌트 설계가 가장 중요하다는 점을 체득했습니다.",

    process: [
      "디지털 전시 콘텐츠 등록·수정·조회 업무 흐름을 분석하고 관리자 화면 레이아웃 설계",
      "이미지와 영상 등 디지털 전시 콘텐츠의 목록 및 상세 관리 인터페이스 구현",
      "react-dnd 기반 Drag & Drop 노출 순서 제어 및 인터랙션 구현",
      "REST API 연동을 통한 콘텐츠 데이터 조회 및 상태 일관성 유지 로직 구현",
      "Storybook play 함수를 활용한 재사용 가능 UI 컴포넌트 단위 테스트 및 검증",
      "Docker 컨테이너 기반 개발/배포 환경 통합 및 AWS 인프라 배포 지원"
    ],
    features: [
      "전시 콘텐츠 목록·상세 관리",
      "멀티미디어(이미지/영상) 등록·수정",
      "Drag & Drop 전시 노출 순서 제어",
      "콘텐츠 검색 및 카테고리 필터",
      "API 연동 및 화면 상태 동기화",
      "Storybook 컴포넌트 단위 검증"
    ],
    challenge: "이미지와 영상 등 형태와 정보가 다양한 디지털 전시 콘텐츠를 관리자가 쉽게 찾고 수정할 수 있어야 했으며, 등록·수정 작업 이후 서버 데이터와 화면 상태 간의 일관성을 안정적으로 유지해야 했습니다.",
    solution: "콘텐츠 목록과 입력 화면의 역할을 명확히 분리하고 공통 UI 컴포넌트를 설계했습니다. react-dnd로 직관적인 순서 변경 환경을 제공하고, API 응답에 따른 상태 갱신 로직을 정형화하여 화면과 서버 데이터의 정합성을 확보했습니다.",
    insights: [
      "관리자 화면에서는 화려한 디자인보다 필요한 정보를 정확하게 제공하고 반복 작업을 편리하게 처리하는 구성이 핵심",
      "서버 데이터와 화면 상태의 일관성을 유지하기 위해 데이터 변경 흐름을 명확히 추적해야 함",
      "독립적인 컴포넌트 설계와 Storybook을 통한 사전 검증이 유지보수 생산성을 크게 향상"
    ],
    metaverseZone: { x: -22, z: 1, color: "#f43f5e", tag: "KETI CMS" },
    metrics: [
      { label: "UI 컴포넌트 테스트 시간", before: "45분", after: "8분", change: "82% 단축", desc: "Storybook Play 함수 도입" },
      { label: "전시 순서 변경 반응속도", before: "320ms", after: "16ms", change: "95% 단축", desc: "react-dnd 낙관적 렌더링" },
      { label: "Docker 컨테이너 빌드 시간", before: "18분", after: "3.5분", change: "80% 단축", desc: "멀티 스테이지 빌드 최적화" }
    ],
    chart: {
      type: "bar",
      title: "UI 컴포넌트 개발 및 테스트 소요시간 (단위: 분)",
      data: {
        labels: ["기본 UI 컴포넌트", "콘텐츠 관리 폼", "드래그앤드롭 그리드", "API 연동 테스트"],
        datasets: [
          { label: "개선 전 (수동 테스트)", data: [30, 45, 60, 40], backgroundColor: "rgba(239, 68, 68, 0.65)" },
          { label: "개선 후 (Storybook 도입)", data: [8, 12, 15, 10], backgroundColor: "rgba(244, 63, 94, 0.85)" }
        ]
      }
    }
  },
];

export const optimizationChart = {
  labels: ["캐싱·서버 상태", "렌더링 최소화", "가상화·지연 로딩", "페이징·요청 제어", "실시간 상태 동기화"],
  values: [4, 5, 3, 4, 3],
  projects: ["모티피플 · VS · 체크카드 CMS · ETRI CMS", "홈페이지 리뉴얼 · 환율 차트 · ETRI CMS · 반얀트리 CMS · KETI CMS", "홈페이지 리뉴얼 · 환율 차트 · 반얀트리 CMS", "VS · 체크카드 CMS · ETRI CMS · 반얀트리 CMS", "UAM CWP · 모티피플 · VS"],
};

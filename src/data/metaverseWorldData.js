import { capabilities, optimizationChart, projects } from "./portfolioData.js";

export { capabilities, optimizationChart, projects };

export const metaverseZones = {
  about: {
    id: "about",
    name: "중앙 광장 · 조영호 아키텍트 타워",
    shortName: "소개",
    icon: "fa-solid fa-address-card",
    color: "#10b981",
    position: { x: 0, z: 0 },
    title: "조영호 (Youngho Cho)",
    role: "FRONTEND & METAVERSE ARCHITECT",
    summary:
      "React/TypeScript와 React Native(Expo)로 모바일 커뮤니티·금융·헬스케어·관제 시스템을 구축하며, UI 설계 → 상태 관리 → 3D 인터랙션 및 성능 최적화를 엔드-투-엔드로 책임집니다.",
    highlights: [
      "실제 양대 스토어(App Store, Google Play) 앱 출시 및 운영 경험",
      "React 19, TypeScript, Expo 54, Three.js 3D 인터랙션 아키텍처 전문",
      "약학 IT 해커톤 우수상 수상 및 실시간 웹소켓/관제 시스템 개발",
    ],
    links: [
      { label: "GitHub 프로필", url: "https://github.com/ohofront", icon: "fa-brands fa-github" },
      { label: "기술 블로그", url: "https://medium.com/@youngho7482", icon: "fa-solid fa-pen-nib" },
      { label: "이메일 문의", url: "mailto:youngho7482@gmail.com", icon: "fa-solid fa-envelope" },
    ],
  },

  experience: {
    id: "experience",
    name: "경력 & 학력 아카이브 거리",
    shortName: "경력·학력",
    icon: "fa-solid fa-briefcase",
    color: "#38bdf8",
    position: { x: -28, z: 0 },
    title: "직무 경력 및 학력 여정 (Experience & Journey)",
    items: [
      {
        period: "2021.07 ~ 2022.09",
        company: "에스큐아이소프트(주) (SQISOFT Co., Ltd.)",
        role: "Frontend Developer",
        projects: [
          {
            title: "ETRI 문화재 관리 시스템 CMS (2022.07 ~ 2022.09)",
            desc: "큐레이터 의도를 반영한 문화재 검색 컴포넌트화, RTK Query 비동기 서버 캐싱 및 Redux Toolkit 전역 상태 관리",
          },
          {
            title: "반얀트리 카시아 속초 통합 운영 CMS (2021.12 ~ 2022.06)",
            desc: "Material UI 기반 일관된 컴포넌트 설계, TypeScript 전면 도입, DB 롤백 방지 배치 처리 및 디바운스 최적화",
          },
          {
            title: "KETI 디지털 히스토리 전광판 CMS (2021.09 ~ 2021.11)",
            desc: "AWS Docker 통합 인프라 배포, Storybook play 함수 테스트, react-dnd 기반 드래그앤드롭 전광판 노출 제어",
          },
        ],
        stack: ["TypeScript", "React", "Redux Toolkit", "RTK Query", "Material UI", "Storybook", "Docker"],
      },
      {
        period: "2013.03 ~ 2020.08",
        company: "한국공학대학교 (구 한국산업기술대학교)",
        role: "임베디드시스템공학과 공학사 (Bachelor's Degree)",
        projects: [
          {
            title: "임베디드 하드웨어 & 소프트웨어 융합 전공",
            desc: "객체지향 프로그래밍 언어, 자료구조/알고리즘, 머신러닝 기초, 스마트 디바이스 및 지능형 IoT 임베디드 아키텍처 학습",
          },
        ],
        stack: ["C/C++", "Java", "Python", "Data Structures", "Algorithms", "IoT"],
      },
    ],
  },

  skills: {
    id: "skills",
    name: "기술 스택 & 핵심 역량 타워",
    shortName: "기술스택",
    icon: "fa-solid fa-code",
    color: "#a855f7",
    position: { x: 28, z: 0 },
    title: "핵심 기술 역량 & 최적화 (Capabilities & Stack)",
    summary:
      "단순 구현을 넘어 렌더링 최적화, 전역/서버 상태 캐싱, 번들 다이어트, 사용자 중심 반응형 인터랙션을 설계합니다.",
    capabilities,
    optimizationChart,
  },

  projects: {
    id: "projects",
    name: "11개 프로젝트 엑스포 월드",
    shortName: "프로젝트 (11)",
    icon: "fa-solid fa-folder-open",
    color: "#f59e0b",
    position: { x: 0, z: -26 },
    title: "프로젝트 엑스포 월드 (11 Projects)",
    summary:
      "실제 배포된 웹 서비스, 앱스토어 출시 모바일 앱, SaaS 솔루션 및 관제 시스템의 11개 3D 부스를 직접 탐험하세요.",
    projects,
  },

  contact: {
    id: "contact",
    name: "컨택트 & 소셜 포털",
    shortName: "연락처",
    icon: "fa-solid fa-paper-plane",
    color: "#ec4899",
    position: { x: 0, z: 26 },
    title: "연락처 및 소셜 네트워크 (Contact Me)",
    summary:
      "새로운 기술적 도전, 프론트엔드 및 3D/메타버스 개발 협업, 채용 관련 문의는 언제든 편하게 연락해 주세요.",
    phone: "010-5186-7482",
    email: "youngho7482@gmail.com",
    github: "https://github.com/ohofront",
    blog: "https://medium.com/@youngho7482",
    links: [
      { label: "전화 연결", url: "tel:01051867482", icon: "fa-solid fa-phone" },
      { label: "이메일 보내기", url: "mailto:youngho7482@gmail.com", icon: "fa-solid fa-envelope" },
      { label: "GitHub", url: "https://github.com/ohofront", icon: "fa-brands fa-github" },
      { label: "기술 블로그", url: "https://medium.com/@youngho7482", icon: "fa-solid fa-pen-nib" },
    ],
  },
};

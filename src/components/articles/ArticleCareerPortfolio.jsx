import "./ArticleCareerPortfolio.scss";
import React from "react";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import Article from "/src/components/wrappers/Article.jsx";
import FaIcon from "/src/components/generic/FaIcon.jsx";
import { capabilities, optimizationChart, projects } from "/src/data/portfolioData.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ArticleCareerPortfolio() {
  const chartData = {
    labels: optimizationChart.labels,
    datasets: [{ label: "적용 프로젝트 수", data: optimizationChart.values, backgroundColor: "rgba(54, 236, 101, .72)", borderColor: "#36ec65", borderWidth: 1, borderRadius: 5 }],
  };
  const chartOptions = {
    responsive: true, maintainAspectRatio: false, indexAxis: "y",
    scales: { x: { beginAtZero: true, ticks: { precision: 0, color: "#9f9f9f" }, grid: { color: "rgba(159,159,159,.15)" } }, y: { ticks: { color: "#9f9f9f" }, grid: { display: false } } },
    plugins: { legend: { labels: { color: "#9f9f9f" } }, tooltip: { callbacks: { afterLabel: (context) => optimizationChart.projects[context.dataIndex] } } },
  };

  return (
    <Article className="article-career-portfolio">
      <header className="career-hero">
        <span className="career-eyebrow">FRONTEND ENGINEER</span>
        <h2>🧑‍💻 조영호</h2>
        <p>React/TypeScript와 React Native(Expo)로 <b>모바일 커뮤니티·금융·헬스케어·웹 접근성</b> 서비스를 만들고, <b>UI 설계 → 상태 관리 → API 연동 → QA를 엔드-투-엔드로 책임지는</b> 프론트엔드 개발자입니다.</p>
        <nav className="career-links" aria-label="외부 프로필">
          <a href="https://github.com/ohofront" target="_blank" rel="noreferrer"><FaIcon iconName="fa-brands fa-github" /> GitHub</a>
          <a href="https://medium.com/@youngho7482" target="_blank" rel="noreferrer"><FaIcon iconName="fa-solid fa-pen-nib" /> 기술 블로그</a>
        </nav>
      </header>

      <section className="career-section" aria-labelledby="capability-title">
        <div className="section-heading"><span>01</span><div><small>CORE CAPABILITIES</small><h3 id="capability-title">핵심 역량</h3></div></div>
        <div className="capability-grid">{capabilities.map((item) => <article className="capability-card" key={item.title}><FaIcon iconName={item.icon} /><h4>{item.title}</h4><strong>{item.stack}</strong><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div>
      </section>

      <section className="career-section" aria-labelledby="performance-title">
        <div className="section-heading"><span>02</span><div><small>PERFORMANCE & VISUALIZATION</small><h3 id="performance-title">성능 최적화 경험</h3></div></div>
        <div className="optimization-panel">
          <div className="chart-wrap"><Bar data={chartData} options={chartOptions} /></div>
          <div className="optimization-copy"><h4>프로젝트 전반의 최적화 패턴</h4><p>메모이제이션, 서버 상태 캐싱, 가상화, Lazy Loading, Debounce와 페이징을 데이터 성격에 맞춰 적용했습니다.</p><p className="chart-note">※ 막대는 실측 속도 점수가 아니라 아래 프로젝트 설명에 해당 기법이 명시된 프로젝트 수입니다. 각 막대에 마우스를 올리면 프로젝트를 확인할 수 있습니다.</p></div>
        </div>
      </section>

      <section className="career-section" aria-labelledby="project-title">
        <div className="section-heading"><span>03</span><div><small>SELECTED WORK</small><h3 id="project-title">프로젝트</h3></div></div>
        <div className="project-list">{projects.map((project, index) => <Project key={project.title} project={project} index={index} />)}</div>
      </section>
    </Article>
  );
}

function Project({ project, index }) {
  return <article className="career-project">
    <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
    <div className="project-body">
      <div className="project-top"><div><span className="project-type">{project.type}</span><h4>{project.title}</h4></div><time>{project.period}</time></div>
      <p className="project-summary">{project.summary}</p>
      <p className="project-role"><b>역할</b> {project.role}</p>
      <div className="project-links">
        {project.url && <a className="project-url" href={project.url} target="_blank" rel="noreferrer">서비스 보기 <FaIcon iconName="fa-solid fa-arrow-up-right-from-square" /></a>}
        {project.links?.map((link) => <a className="project-url" href={link.url} target="_blank" rel="noreferrer" key={link.url}><FaIcon iconName={link.icon} /> {link.label}</a>)}
      </div>
      <div className="stack-list">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
      <details><summary>진행 과정과 문제 해결 자세히 보기</summary><div className="project-details"><Detail title="진행 과정" items={project.process} /><Detail title="주요 기능" items={project.features} /><div><h5>어려웠던 점</h5><p>{project.challenge}</p></div><div><h5>해결 과정</h5><p>{project.solution}</p></div><Detail title="인사이트" items={project.insights} /></div></details>
    </div>
  </article>;
}

function Detail({ title, items }) { return <div><h5>{title}</h5><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>; }

export default ArticleCareerPortfolio;

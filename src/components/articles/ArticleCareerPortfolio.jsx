import "./ArticleCareerPortfolio.scss";
import React, { useState } from "react";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import Article from "/src/components/wrappers/Article.jsx";
import FaIcon from "/src/components/generic/FaIcon.jsx";
import { capabilities, optimizationChart, projects } from "/src/data/portfolioData.js";
import MetaverseWorld from "/src/components/metaverse/MetaverseWorld.jsx";

// Register all chart elements for Bar, Doughnut, Line, and Radar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

function ArticleCareerPortfolio() {
  const [filterType, setFilterType] = useState("all");

  const filteredProjects = filterType === "all"
    ? projects
    : projects.filter((p) => p.type.toLowerCase().includes(filterType.toLowerCase()));

  const chartData = {
    labels: optimizationChart.labels,
    datasets: [
      {
        label: "적용 프로젝트 수",
        data: optimizationChart.values,
        backgroundColor: "rgba(16, 185, 129, 0.75)",
        borderColor: "#10b981",
        borderWidth: 1.5,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0, color: "#94a3b8" },
        grid: { color: "rgba(148, 163, 184, 0.12)" },
      },
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { labels: { color: "#cbd5e1" } },
      tooltip: {
        callbacks: {
          afterLabel: (context) => optimizationChart.projects[context.dataIndex],
        },
      },
    },
  };

  return (
    <Article className="article-career-portfolio 3d-theme">
      {/* 3D Hero Section */}
      <header className="career-hero-3d">
        <div className="hero-floating-elements">
          <div className="floating-orb orb-1" />
          <div className="floating-orb orb-2" />
        </div>

        <div className="hero-content">
          <span className="career-eyebrow-3d">
            <span className="dot-pulse" /> 3D INTERACTIVE PORTFOLIO
          </span>
          <h2 className="hero-title-3d">
            <span className="text-gradient">조영호</span>
            <small className="hero-role-badge">FRONTEND & METAVERSE ARCHITECT</small>
          </h2>
          <p className="hero-desc-3d">
            React/TypeScript와 React Native(Expo)로 <b>모바일 커뮤니티·금융·헬스케어·관제 시스템</b>을 구축하며,
            <br />
            <b>UI 설계 → 상태 관리 → 3D 인터랙션 및 성능 최적화</b>를 엔드-투-엔드로 책임지는 프론트엔드 엔지니어입니다.
          </p>

          <nav className="career-links-3d" aria-label="외부 프로필">
            <a href="https://github.com/ohofront" target="_blank" rel="noreferrer" className="btn-3d primary">
              <FaIcon iconName="fa-brands fa-github" /> GitHub 프로필
            </a>
            <a href="https://medium.com/@youngho7482" target="_blank" rel="noreferrer" className="btn-3d secondary">
              <FaIcon iconName="fa-solid fa-pen-nib" /> 기술 블로그
            </a>
          </nav>
        </div>
      </header>

      {/* 3D Metaverse World Interactive Showcase */}
      <section className="career-section-3d metaverse-section" aria-labelledby="metaverse-title">
        <div className="section-heading-3d">
          <span className="heading-tag">3D WORLD</span>
          <div>
            <h3 id="metaverse-title">메타버스 프로젝트 월드</h3>
            <p className="heading-sub">
              키보드(WASD / 화살표)와 마우스로 캐릭터를 조작하여 11개의 3D 프로젝트 부스를 직접 탐험하세요.
            </p>
          </div>
        </div>

        <MetaverseWorld
          projects={projects}
          onSelectProject={(id) => {
            const el = document.getElementById(`project-${id}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              el.classList.add("highlight-3d");
              setTimeout(() => el.classList.remove("highlight-3d"), 2200);
            }
          }}
        />
      </section>

      {/* Core Capabilities */}
      <section className="career-section-3d" aria-labelledby="capability-title">
        <div className="section-heading-3d">
          <span className="heading-tag">01</span>
          <div>
            <h3 id="capability-title">핵심 역량 (Core Capabilities)</h3>
            <p className="heading-sub">프로덕트 중심의 엔지니어링 역량과 기술 스택</p>
          </div>
        </div>

        <div className="capability-grid-3d">
          {capabilities.map((item) => (
            <TiltCard key={item.title} className="capability-card-3d">
              <div className="card-icon-3d">
                <FaIcon iconName={item.icon} />
              </div>
              <h4>{item.title}</h4>
              <strong className="stack-pill">{item.stack}</strong>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Performance Optimization Section */}
      <section className="career-section-3d" aria-labelledby="performance-title">
        <div className="section-heading-3d">
          <span className="heading-tag">02</span>
          <div>
            <h3 id="performance-title">성능 최적화 & 시각화 경험</h3>
            <p className="heading-sub">실무에서 증명된 데이터 기반 최적화 패턴</p>
          </div>
        </div>

        <div className="optimization-panel-3d">
          <div className="chart-wrap-3d">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="optimization-copy-3d">
            <h4>프로젝트 전반의 최적화 패턴</h4>
            <p>
              메모이제이션, 서버 상태 캐싱, 가상화, Lazy Loading, Debounce와 페이징을 데이터 성격에 맞춰 설계하고 적용했습니다.
            </p>
            <p className="chart-note-3d">
              ※ 각 막대에 마우스를 올리면 해당 기법이 적용된 프로젝트를 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Selected Work & Detailed Metrics Section */}
      <section className="career-section-3d" aria-labelledby="project-title">
        <div className="section-heading-3d">
          <span className="heading-tag">03</span>
          <div className="heading-row">
            <div>
              <h3 id="project-title">프로젝트 상세 및 정량적 개선 시각화</h3>
              <p className="heading-sub">
                총 11개 프로젝트의 실제 서비스 링크 및 성능/비즈니스 개선 지표를 다양한 그래프로 제공합니다.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="project-filters-3d">
              <button
                className={`filter-pill ${filterType === "all" ? "active" : ""}`}
                onClick={() => setFilterType("all")}
              >
                전체 (11)
              </button>
              <button
                className={`filter-pill ${filterType === "웹" ? "active" : ""}`}
                onClick={() => setFilterType("웹")}
              >
                웹 서비스
              </button>
              <button
                className={`filter-pill ${filterType === "모바일" ? "active" : ""}`}
                onClick={() => setFilterType("모바일")}
              >
                모바일 앱
              </button>
              <button
                className={`filter-pill ${filterType === "cms" ? "active" : ""}`}
                onClick={() => setFilterType("cms")}
              >
                CMS / 관제
              </button>
            </div>
          </div>
        </div>

        <div className="project-list-3d">
          {filteredProjects.map((project, index) => (
            <ProjectCard3D key={project.id || project.title} project={project} index={index} />
          ))}
        </div>
      </section>
    </Article>
  );
}

// 3D Tilt Card Wrapper Component
function TiltCard({ children, className = "", style = {} }) {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrap ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// 3D Project Card with Dynamic Visualizations
function ProjectCard3D({ project, index }) {
  const accentColor = project.metaverseZone?.color || "#10b981";

  return (
    <article
      className="career-project-3d"
      id={`project-${project.id}`}
      style={{ "--accent-color": accentColor }}
    >
      <div className="project-index-3d">{String(index + 1).padStart(2, "0")}</div>

      <div className="project-body-3d">
        <div className="project-top-3d">
          <div className="project-title-group">
            <div className="badge-row">
              <span className="project-type-3d">{project.type}</span>
              {project.statusNote && <span className="status-note-3d">{project.statusNote}</span>}
            </div>
            <h4>{project.title}</h4>
          </div>
          <time className="project-period-3d">{project.period}</time>
        </div>

        <p className="project-summary-3d">{project.summary}</p>
        <p className="project-role-3d">
          <b>담당 역할:</b> {project.role}
        </p>

        {/* Links Area */}
        <div className="project-links-3d">
          {project.links?.map((link) => (
            <a
              key={link.label}
              href={link.disabled ? undefined : link.url}
              target="_blank"
              rel="noreferrer"
              className={`project-link-btn ${link.disabled ? "disabled" : ""}`}
            >
              <FaIcon iconName={link.icon} />
              <span>{link.label}</span>
              {!link.disabled && <FaIcon iconName="fa-solid fa-arrow-up-right-from-square" />}
            </a>
          ))}
        </div>

        {/* Quantitative Metrics Visualization Grid */}
        {project.metrics && (
          <div className="metrics-section-3d">
            <h5 className="metrics-title">
              <FaIcon iconName="fa-solid fa-chart-line" /> 핵심 개선 수치 (Quantified Impact)
            </h5>
            <div className="metrics-grid-3d">
              {project.metrics.map((m) => (
                <div className="metric-card-3d" key={m.label}>
                  <div className="metric-header">
                    <span className="metric-name">{m.label}</span>
                    <span className="metric-tag">{m.change}</span>
                  </div>
                  <div className="metric-comparison">
                    <span className="val-before">{m.before}</span>
                    <FaIcon iconName="fa-solid fa-arrow-right-long" />
                    <span className="val-after">{m.after}</span>
                  </div>
                  <p className="metric-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Individual Project Chart Visualization */}
        {project.chart && (
          <div className="project-chart-box-3d">
            <div className="chart-header">
              <span className="chart-tag">VISUAL ANALYSIS</span>
              <h5>{project.chart.title}</h5>
            </div>
            <div className={`chart-canvas-wrapper ${project.chart.type}`}>
              {project.chart.type === "bar" && (
                <Bar
                  data={project.chart.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: "#cbd5e1", font: { size: 11 } } },
                    },
                    scales: {
                      x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } },
                      y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } },
                    },
                  }}
                />
              )}
              {project.chart.type === "doughnut" && (
                <Doughnut
                  data={project.chart.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "right", labels: { color: "#cbd5e1", font: { size: 11 } } },
                    },
                  }}
                />
              )}
              {project.chart.type === "radar" && (
                <Radar
                  data={project.chart.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        angleLines: { color: "rgba(255,255,255,0.1)" },
                        grid: { color: "rgba(255,255,255,0.08)" },
                        pointLabels: { color: "#cbd5e1", font: { size: 11 } },
                        ticks: { display: false, maxTicksLimit: 5 },
                      },
                    },
                    plugins: {
                      legend: { labels: { color: "#cbd5e1" } },
                    },
                  }}
                />
              )}
              {project.chart.type === "line" && (
                <Line
                  data={project.chart.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: "#cbd5e1", font: { size: 11 } } },
                    },
                    scales: {
                      x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } },
                      y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } },
                    },
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="stack-list-3d">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-chip-3d">
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable Process & Problem Solving */}
        <details className="project-details-toggle">
          <summary>
            <span>상세 진행 과정 및 문제 해결 전략 확인하기</span>
            <FaIcon iconName="fa-solid fa-chevron-down" />
          </summary>
          <div className="project-details-content">
            <DetailSection title="진행 과정" items={project.process} icon="fa-solid fa-list-check" />
            <DetailSection title="주요 기능" items={project.features} icon="fa-solid fa-wand-magic-sparkles" />
            <div className="detail-block challenge-block">
              <h5>
                <FaIcon iconName="fa-solid fa-triangle-exclamation" /> 직면했던 과제 및 어려웠던 점
              </h5>
              <p>{project.challenge}</p>
            </div>
            <div className="detail-block solution-block">
              <h5>
                <FaIcon iconName="fa-solid fa-lightbulb" /> 해결 전략 및 과정
              </h5>
              <p>{project.solution}</p>
            </div>
            <DetailSection title="핵심 인사이트 & 배운 점" items={project.insights} icon="fa-solid fa-star" />
          </div>
        </details>
      </div>
    </article>
  );
}

function DetailSection({ title, items, icon }) {
  return (
    <div className="detail-block">
      <h5>
        {icon && <FaIcon iconName={icon} />} {title}
      </h5>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleCareerPortfolio;

"use client";

import { useEffect, useState } from "react";
import { defaultPortfolioContent, type PortfolioContent } from "./portfolio-content";

const CONTENT_API = "https://mohammed-alosaimi-portfolio.moh-alosaimi15.chatgpt.site/api/public-content";

export default function Home() {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);

  useEffect(() => {
    fetch(CONTENT_API)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => payload?.content && setContent(payload.content as PortfolioContent))
      .catch(() => undefined);
  }, []);

  const { site, theme } = content;
  return (
    <main
      id="top"
      style={{ "--admin-bg": theme.background, "--admin-surface": theme.surface, "--admin-accent": theme.accent, "--admin-text": theme.text } as React.CSSProperties}
    >
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Return to top"><span className="brand-monogram">M</span><span><strong>{site.name}</strong><small>{site.portfolioLabel}</small></span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">{content.navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <a className="header-download" href="/downloads/mohammed-alosaimi-cv.pdf" download>Download Resume <span>↓</span></a>
        <details className="mobile-menu"><summary aria-label="Open navigation">Menu</summary><nav>{content.navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}<a href="/downloads/mohammed-alosaimi-cv.pdf" download>Download Resume</a></nav></details>
      </header>

      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">{site.eyebrow}</p><h1>{site.name}</h1><p className="english-name">{site.role}</p><p className="hero-intro">{site.intro}</p><div className="hero-actions"><a className="primary-button" href="#projects">Explore Projects <span>→</span></a><a className="secondary-button" href={`mailto:${site.email}`}>Contact Me</a></div><div className="hero-tags">{content.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        <figure className="hero-visual"><img src={site.heroImage} alt="Mohammed Al-Osaimi across professional and media appearances"/><figcaption><span className="status-dot"/>{site.location}</figcaption></figure>
      </section>

      <section className="stats" aria-label="Key impact indicators">{content.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</section>

      <Section id="about" kicker="About" title="Commercial insight. Clear communication." intro={content.about}><div className="expertise-grid">{content.expertise.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></Section>

      <Section id="projects" dark kicker="Selected Projects" title="From challenge to measurable outcome." intro="Selected case studies showing approach, role, and impact."><div className="projects-grid">{content.projects.map((project) => <article className={project.className ?? "project-card"} key={project.number}><div className="project-topline"><span>{project.number}</span><small>{project.category}</small></div>{project.logo && <img className="project-logo" src={project.logo} alt=""/>}<h3>{project.title}</h3><p>{project.summary}</p><div className="project-meta"><span>{project.role}</span><strong>{project.result}</strong></div></article>)}</div></Section>

      <Section id="training" kicker="Training Programs" title="Practical knowledge designed for use." intro="Programs I prepared and delivered to connect business concepts with daily commercial practice."><div className="training-grid">{content.trainings.map((training) => <article className="training-card" key={training.title}><a href={training.href} target="_blank" rel="noreferrer"><img src={training.image} alt={training.title} loading="lazy"/></a><div className="training-content"><span>{training.eyebrow}</span><h3>{training.title}</h3><p>{training.text}</p><div className="training-meta">{training.meta.map((item) => <small key={item}>{item}</small>)}</div><a className="inline-link" href={training.href} download>Download Training Material ↓</a></div></article>)}</div></Section>

      <Section id="designs" dark kicker="Design Work" title="Identity, content, and design that serve a purpose." intro="Selected identity development, advertising, product materials, and visual content."><article className="video-showcase"><div className="video-copy"><span>Featured Work · Marketing Video</span><h3>Visual storytelling for DADCO products</h3><p>Product, identity, and message aligned for digital communication.</p></div><video controls preload="metadata" poster="/assets/designs/dadco-guard-square.png"><source src="/assets/videos/dadco-marketing.mp4" type="video/mp4"/></video></article><div className="design-gallery">{content.designWorks.map((work) => <a className={work.className} href={work.src} target="_blank" rel="noreferrer" key={work.src}><img src={work.src} alt={work.title} loading="lazy"/><span><small>{work.type}</small><strong>{work.title}</strong></span></a>)}</div></Section>

      <Section id="relations" kicker="Clients & Relationships" title="Relationships built on context and shared objectives." intro="Direct engagements and professional, commercial, or qualification-path experience."><div className="direct-grid">{content.directCollaborations.map((item, index) => <article key={item.organization}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.organization}</h3><p>{item.scope}</p></article>)}</div><div className="logo-grid">{content.relations.map((relation) => <div className="logo-card" key={relation.name} title={relation.name}><img src={relation.src} alt={relation.name} loading="lazy"/></div>)}</div></Section>

      <Section id="credentials" dark kicker="Qualifications & Credentials" title="Academic foundations and credentials that strengthen practice." intro="Relevant academic qualifications and professional credentials."><div className="degree-card"><div className="degree-score"><strong>4.79</strong><span>/ 5</span></div><div><span>King Abdulaziz University · 2022—2026</span><h3>Bachelor of Marketing Communication</h3><p>First Class Honours</p></div></div><div className="credential-groups">{content.credentialGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></Section>

      <Section id="experience" kicker="Professional Experience" title="A career progressing from operations to growth leadership." intro="Experience across industry, retail, academia, and consulting."><div className="timeline">{content.experiences.map((item) => <article key={`${item.role}-${item.period}`}><time>{item.period}</time><div className="timeline-marker"/><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.summary}</p></div></article>)}</div></Section>

      <Section id="recommendations" dark kicker="Recommendations & Recognition" title="Impact described by people I have worked with." intro="Selected excerpts from recommendation letters and formal acknowledgement."><div className="recommendation-grid"><article className="recommendation-main"><blockquote>{content.recommendation.quote}</blockquote><footer><div><strong>{content.recommendation.author}</strong><small>{content.recommendation.authorRole}</small></div><a href={content.recommendation.href} target="_blank" rel="noreferrer">View letter ↗</a></footer></article><article className="recommendation-proof recommendation-salman"><div><span>King Abdulaziz University · Marketing Communication Department</span><h3>Academic recommendation from Dr. Salman Alzowibi</h3><a href="/downloads/salman-alzowibi-recommendation.pdf" target="_blank" rel="noreferrer">View recommendation ↗</a></div></article></div></Section>

      <Section id="downloads" kicker="Downloads" title="Public, curated, and ready to share." intro="Internal reports and sensitive files have been excluded."><div className="download-grid">{content.downloads.map((file) => <a className={file.featured ? "download-card download-featured" : "download-card"} href={file.href} download key={file.href}><span className="download-icon">PDF</span><div><small>{file.type}</small><h3>{file.title}</h3><p>{file.details}</p></div><span className="download-arrow">↓</span></a>)}</div></Section>

      <section className="contact-section"><div><p>Have an opportunity or project that needs commercial and communication insight?</p><h2>Let’s turn it into clear impact.</h2></div><a href={`mailto:${site.email}`}><span>Start a conversation</span><strong>{site.email}</strong></a></section>
      <footer className="site-footer"><div className="brand footer-brand"><span className="brand-monogram">M</span><span><strong>{site.name}</strong><small>{site.portfolioLabel}</small></span></div><p>© 2026 · Jeddah, Saudi Arabia</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

function Section({ id, kicker, title, intro, dark = false, children }: { id: string; kicker: string; title: string; intro: string; dark?: boolean; children: React.ReactNode }) {
  return <section id={id} className={`section ${dark ? "projects" : ""}`}><div className={`section-heading ${dark ? "light-heading" : ""}`}><div><p className="section-kicker">{kicker}</p><h2>{title}</h2></div><p>{intro}</p></div>{children}</section>;
}

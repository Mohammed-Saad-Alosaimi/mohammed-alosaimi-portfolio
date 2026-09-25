(() => {
  const endpoint = "https://mohammed-alosaimi-portfolio.moh-alosaimi15.chatgpt.site/api/public-content";
  const escape = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
  const render = (selector, html) => { const element = document.querySelector(selector); if (element) element.innerHTML = html; };

  fetch(endpoint).then((response) => response.ok ? response.json() : null).then((payload) => {
    const content = payload?.content;
    if (!content) return;
    const { site, theme } = content;
    if (theme) Object.entries({ "--paper": theme.background, "--navy": theme.surface, "--cyan": theme.accent, "--ink": theme.text }).forEach(([key, value]) => document.documentElement.style.setProperty(key, value));
    if (site) {
      setText(".brand strong, .hero h1", site.name);
      setText(".brand small", site.portfolioLabel);
      setText(".hero .eyebrow", site.eyebrow);
      setText(".english-name", site.role);
      setText(".hero-intro", site.intro);
      setText(".hero-visual figcaption", site.location);
      document.querySelectorAll('a[href^="mailto:"]').forEach((link) => { link.href = `mailto:${site.email}`; const strong = link.querySelector("strong"); if (strong) strong.textContent = site.email; });
      const image = document.querySelector(".hero-visual img"); if (image && site.heroImage) image.src = site.heroImage;
    }
    if (content.stats) render(".stats", content.stats.map((item) => `<div class="stat"><strong>${escape(item.value)}</strong><span>${escape(item.label)}</span></div>`).join(""));
    if (content.projects) render(".projects-grid", content.projects.map((item) => `<article class="${escape(item.className || "project-card")}"><div class="project-topline"><span>${escape(item.number)}</span><small>${escape(item.category)}</small></div>${item.logo ? `<img class="project-logo" src="${escape(item.logo)}" alt="">` : ""}<h3>${escape(item.title)}</h3><p>${escape(item.summary)}</p><div class="project-meta"><span>${escape(item.role)}</span><strong>${escape(item.result)}</strong></div></article>`).join(""));
    if (content.trainings) render(".training-grid", content.trainings.map((item) => `<article class="training-card"><a href="${escape(item.href)}" target="_blank" rel="noreferrer"><img src="${escape(item.image)}" alt="${escape(item.title)}"></a><div class="training-content"><span>${escape(item.eyebrow)}</span><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p><div class="training-meta">${(item.meta || []).map((value) => `<small>${escape(value)}</small>`).join("")}</div><a class="inline-link" href="${escape(item.href)}" download>Download Training Material ↓</a></div></article>`).join(""));
    if (content.designWorks) render(".design-gallery", content.designWorks.map((item) => `<a class="${escape(item.className || "design-item design-tall")}" href="${escape(item.src)}" target="_blank" rel="noreferrer"><img src="${escape(item.src)}" alt="${escape(item.title)}"><span><small>${escape(item.type)}</small><strong>${escape(item.title)}</strong></span></a>`).join(""));
    if (content.relations) render(".logo-grid", content.relations.map((item) => `<div class="logo-card" title="${escape(item.name)}"><img src="${escape(item.src)}" alt="${escape(item.name)}"></div>`).join(""));
    if (content.experiences) render(".timeline", content.experiences.map((item) => `<article><time>${escape(item.period)}</time><div class="timeline-marker"></div><div><h3>${escape(item.role)}</h3><strong>${escape(item.company)}</strong><p>${escape(item.summary)}</p></div></article>`).join(""));
    if (content.downloads) render(".download-grid", content.downloads.map((item) => `<a class="${item.featured ? "download-card download-featured" : "download-card"}" href="${escape(item.href)}" download><span class="download-icon">PDF</span><div><small>${escape(item.type)}</small><h3>${escape(item.title)}</h3><p>${escape(item.details)}</p></div><span class="download-arrow">↓</span></a>`).join(""));
  }).catch(() => undefined);
})();

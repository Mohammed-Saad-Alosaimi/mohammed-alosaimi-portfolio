(() => {
  const endpoint = "/content/portfolio.json";
  const escapeHtml = (value = "") =>
    String(value).replace(/[&<>'"]/g, (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]
    );
  const setText = (selector, value) =>
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  const render = (selector, html) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = html;
  };

  fetch(endpoint, { cache: "no-store" })
    .then((response) => (response.ok ? response.json() : null))
    .then((payload) => {
      const content = payload?.content ?? payload;
      if (!content?.site) return;

      const { site, theme } = content;
      if (theme) {
        Object.entries({
          "--paper": theme.background,
          "--navy": theme.surface,
          "--cyan": theme.accent,
          "--ink": theme.text,
        }).forEach(([key, value]) =>
          document.documentElement.style.setProperty(key, value)
        );
      }

      setText(".brand strong, .hero h1", site.name);
      setText(".brand small", site.portfolioLabel);
      setText(".hero .eyebrow", site.eyebrow);
      setText(".english-name", site.role);
      setText(".hero-intro", site.intro);
      setText(".hero-visual figcaption", site.location);
      document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        link.href = `mailto:${site.email}`;
        const strong = link.querySelector("strong");
        if (strong) strong.textContent = site.email;
      });
      const heroImage = document.querySelector(".hero-visual img");
      if (heroImage && site.heroImage) heroImage.src = site.heroImage;

      if (content.navItems) {
        const links = content.navItems
          .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
          .join("");
        render(".desktop-nav", links);
        const mobile = document.querySelector(".mobile-menu nav");
        if (mobile) {
          mobile.innerHTML =
            links +
            '<a href="/downloads/mohammed-alosaimi-cv.pdf" download>Download Resume</a>';
        }
      }
      if (content.tags) {
        render(
          ".hero-tags",
          content.tags.map((item) => `<span>${escapeHtml(item)}</span>`).join("")
        );
      }
      if (content.stats) {
        render(
          ".stats",
          content.stats
            .map(
              (item) =>
                `<div class="stat"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`
            )
            .join("")
        );
      }
      if (content.about) {
        setText("#about .section-heading > p", content.about);
      }
      if (content.expertise) {
        render(
          "#about .expertise-grid",
          content.expertise
            .map(
              (item) =>
                `<article><span>${escapeHtml(item.number)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`
            )
            .join("")
        );
      }
      if (content.projects) {
        render(
          ".projects-grid",
          content.projects
            .map(
              (item) =>
                `<article class="${escapeHtml(item.className || "project-card")}"><div class="project-topline"><span>${escapeHtml(item.number)}</span><small>${escapeHtml(item.category)}</small></div>${item.logo ? `<img class="project-logo" src="${escapeHtml(item.logo)}" alt="">` : ""}<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><div class="project-meta"><span>${escapeHtml(item.role)}</span><strong>${escapeHtml(item.result)}</strong></div></article>`
            )
            .join("")
        );
      }
      if (content.trainings) {
        render(
          ".training-grid",
          content.trainings
            .map(
              (item) =>
                `<article class="training-card"><a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}"></a><div class="training-content"><span>${escapeHtml(item.eyebrow)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><div class="training-meta">${(item.meta || []).map((value) => `<small>${escapeHtml(value)}</small>`).join("")}</div><a class="inline-link" href="${escapeHtml(item.href)}" download>Download Training Material ↓</a></div></article>`
            )
            .join("")
        );
      }
      if (content.designWorks) {
        render(
          ".design-gallery",
          content.designWorks
            .map(
              (item) =>
                `<a class="${escapeHtml(item.className || "design-item design-tall")}" href="${escapeHtml(item.src)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}"><span><small>${escapeHtml(item.type)}</small><strong>${escapeHtml(item.title)}</strong></span></a>`
            )
            .join("")
        );
      }
      if (content.directCollaborations) {
        render(
          ".direct-grid",
          content.directCollaborations
            .map(
              (item, index) =>
                `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(item.organization)}</h3><p>${escapeHtml(item.scope)}</p></article>`
            )
            .join("")
        );
      }
      if (content.relations) {
        render(
          ".logo-grid",
          content.relations
            .map(
              (item) =>
                `<div class="logo-card" title="${escapeHtml(item.name)}"><img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.name)}"></div>`
            )
            .join("")
        );
      }
      if (content.credentialGroups) {
        render(
          ".credential-groups",
          content.credentialGroups
            .map(
              (group) =>
                `<article><h3>${escapeHtml(group.title)}</h3><ul>${(group.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`
            )
            .join("")
        );
      }
      if (content.experiences) {
        render(
          ".timeline",
          content.experiences
            .map(
              (item) =>
                `<article><time>${escapeHtml(item.period)}</time><div class="timeline-marker"></div><div><h3>${escapeHtml(item.role)}</h3><strong>${escapeHtml(item.company)}</strong><p>${escapeHtml(item.summary)}</p></div></article>`
            )
            .join("")
        );
      }
      if (content.recommendation) {
        const item = content.recommendation;
        const blockquote = document.querySelector(".recommendation-main blockquote");
        if (blockquote) blockquote.textContent = item.quote;
        setText(".recommendation-main footer strong", item.author);
        setText(".recommendation-main footer small", item.authorRole);
        const link = document.querySelector(".recommendation-main footer a");
        if (link) link.href = item.href;
      }
      if (content.downloads) {
        render(
          ".download-grid",
          content.downloads
            .map(
              (item) =>
                `<a class="${item.featured ? "download-card download-featured" : "download-card"}" href="${escapeHtml(item.href)}" download><span class="download-icon">PDF</span><div><small>${escapeHtml(item.type)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.details)}</p></div><span class="download-arrow">↓</span></a>`
            )
            .join("")
        );
      }
    })
    .catch((error) => console.warn("Portfolio content could not be loaded.", error));
})();

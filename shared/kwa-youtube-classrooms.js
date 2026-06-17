(function () {
  const CHANNELS = {
    crashCourse: {
      name: "Crash Course",
      url: "https://www.youtube.com/@crashcourse"
    },
    khanAcademy: {
      name: "Khan Academy",
      url: "https://www.youtube.com/@khanacademy"
    },
    studyHall: {
      name: "Study Hall",
      url: "https://www.youtube.com/@StudyHall"
    },
    bbcLearningEnglish: {
      name: "BBC Learning English",
      url: "https://www.youtube.com/@bbclearningenglish"
    },
    thirtyByForty: {
      name: "30X40 Design Workshop",
      url: "https://www.youtube.com/@30by40"
    },
    sourceCad: {
      name: "SourceCAD",
      url: "https://www.youtube.com/@SourceCAD"
    }
  };

  const CLASSROOMS = {
    readingWriting: {
      paths: ["/reading-writing/"],
      eyebrow: "YouTube video classroom",
      title: "Reading + Writing",
      deckTitle: "Study skills, composition, and deeper reading",
      description: "A writing-first video classroom for comprehension, note-taking, paragraph structure, revision, and research habits.",
      playlistId: "PLNrrxHpJhC8mNXjrAL3Ey1Q6iI35cymzl",
      channel: CHANNELS.studyHall,
      links: [
        { label: "Study Hall Composition playlist", url: "https://www.youtube.com/playlist?list=PLNrrxHpJhC8mNXjrAL3Ey1Q6iI35cymzl" },
        { label: "Crash Course Study Skills playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNcAJRf3bE1IJU6nMfHj86W" },
        { label: "Crash Course Literature playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtOeEc9ME62zTfqc0h6Pe8vb" }
      ]
    },
    mathAlgebra: {
      paths: ["/math-algebra/"],
      eyebrow: "YouTube video classroom",
      title: "Math + Algebra",
      deckTitle: "Khan Academy math foundations",
      description: "A practical math video classroom for fractions, decimals, percentages, equations, graphs, and algebra foundations.",
      playlistId: "PLSQl0a2vh4HB6I9NRYeudXLIdPqCVKXhv",
      channel: CHANNELS.khanAcademy,
      links: [
        { label: "Khan Academy Algebra Basics playlist", url: "https://www.youtube.com/playlist?list=PLSQl0a2vh4HB6I9NRYeudXLIdPqCVKXhv" },
        { label: "Khan Academy Fractions, Decimals & Percentages playlist", url: "https://www.youtube.com/playlist?list=PLSQl0a2vh4HCQHWDXEKSnY3-cygkXGiyN" },
        { label: "Khan Academy Math library", url: "https://www.khanacademy.org/math" }
      ]
    },
    scienceBioChem: {
      paths: ["/science-biology-chemistry/"],
      eyebrow: "YouTube video classroom",
      title: "Science + Biology + Chemistry",
      deckTitle: "Crash Course science foundations",
      description: "A science video classroom for biology, chemistry, scientific evidence, lab thinking, and real-world systems.",
      playlistId: "PL8dPuuaLjXtPW_ofbxdHNciuLoTRLPMgB",
      channel: CHANNELS.crashCourse,
      links: [
        { label: "Crash Course Biology playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPW_ofbxdHNciuLoTRLPMgB" },
        { label: "Crash Course Chemistry playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr" },
        { label: "Crash Course channel", url: CHANNELS.crashCourse.url }
      ]
    },
    logicResearch: {
      paths: ["/logic-research/"],
      eyebrow: "YouTube video classroom",
      title: "Logic + Research",
      deckTitle: "Media literacy, evidence, and argument",
      description: "A reasoning video classroom for claims, evidence, source checking, bias, research questions, and argument building.",
      playlistId: "PL8dPuuaLjXtM6jSpzb5gMNsx9kdmqBfmY",
      channel: CHANNELS.crashCourse,
      links: [
        { label: "Crash Course Media Literacy playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtM6jSpzb5gMNsx9kdmqBfmY" },
        { label: "Study Hall Composition playlist", url: "https://www.youtube.com/playlist?list=PLNrrxHpJhC8mNXjrAL3Ey1Q6iI35cymzl" },
        { label: "Crash Course channel", url: CHANNELS.crashCourse.url }
      ]
    },
    psychology: {
      paths: ["/psychology/"],
      eyebrow: "YouTube video classroom",
      title: "Psychology",
      deckTitle: "Crash Course Psychology",
      description: "A psychology video classroom for behavior, learning, memory, development, personality, social psychology, and mental health literacy.",
      playlistId: "PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6",
      channel: CHANNELS.crashCourse,
      links: [
        { label: "Crash Course Psychology playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6" },
        { label: "Crash Course channel", url: CHANNELS.crashCourse.url }
      ]
    },
    businessMarketing: {
      paths: ["/business-marketing/"],
      eyebrow: "YouTube video classroom",
      title: "Business + Marketing",
      deckTitle: "Entrepreneurship, communication, and marketing",
      description: "A business video classroom for customers, value, pricing, entrepreneurship, campaigns, communication, and portfolio-ready offers.",
      playlistId: "PL8dPuuaLjXtNamNKW5qlS-nKgA0on7Qze",
      channel: CHANNELS.crashCourse,
      links: [
        { label: "Crash Course Business Entrepreneurship playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNamNKW5qlS-nKgA0on7Qze" },
        { label: "Crash Course Business Soft Skills playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtMBsfP-lP28IFvfkISqJofM" },
        { label: "Crash Course Media Literacy playlist", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtM6jSpzb5gMNsx9kdmqBfmY" }
      ]
    },
    architectureDrafting: {
      paths: ["/architecture-drafting/"],
      eyebrow: "YouTube video classroom",
      title: "Architecture + Drafting",
      deckTitle: "Architecture drawing and AutoCAD drafting",
      description: "A design video classroom for sketching, drafting, scaled drawings, plans, sections, elevations, and beginner CAD workflow.",
      playlistId: "PLuJj3iQpiK3udc25pS_s2hCxm4N7VScnr",
      channel: CHANNELS.thirtyByForty,
      links: [
        { label: "30X40 Design Workshop architecture drawing playlist", url: "https://www.youtube.com/playlist?list=PLuJj3iQpiK3udc25pS_s2hCxm4N7VScnr" },
        { label: "SourceCAD AutoCAD drafting playlist", url: "https://www.youtube.com/playlist?list=PLg2jFlJlPd1z82uJk_7qDSYaPOPdimEYA" },
        { label: "SourceCAD channel", url: CHANNELS.sourceCad.url }
      ]
    }
  };

  const CHANNEL_RULES = [
    { pattern: /khan academy|PLSQl0a2vh4H/i, channel: CHANNELS.khanAcademy },
    { pattern: /study hall|PLNrrxHpJhC8/i, channel: CHANNELS.studyHall },
    { pattern: /bbc learning english|PLcetZ6gSk96/i, channel: CHANNELS.bbcLearningEnglish },
    { pattern: /30x40|PLuJj3iQpiK3/i, channel: CHANNELS.thirtyByForty },
    { pattern: /autocad|sourcecad|PLg2jFlJlPd1/i, channel: CHANNELS.sourceCad },
    { pattern: /crash course|PL8dPuuaLjXt/i, channel: CHANNELS.crashCourse }
  ];

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function playlistUrl(playlistId) {
    return `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`;
  }

  function listIdFromUrl(url = "") {
    try {
      return new URL(url).searchParams.get("list") || "";
    } catch {
      const match = String(url).match(/[?&]list=([^&]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    }
  }

  function coursePlaylistId(course = {}) {
    return course.playlistId || listIdFromUrl(course.videoUrl) || "";
  }

  function inferChannel(course = {}) {
    const haystack = [
      course.videoTitle,
      course.videoUrl,
      course.playlistId,
      course.title,
      ...(course.sources || []).map(source => `${source.label || ""} ${source.url || ""}`)
    ].join(" ");

    const rule = CHANNEL_RULES.find(item => item.pattern.test(haystack));
    return rule ? rule.channel : CHANNELS.crashCourse;
  }

  function linkButton(link, labelPrefix = "") {
    return `<a class="kwa-youtube-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(labelPrefix || link.label)}</a>`;
  }

  function renderPlayerLink({ url, title, channelName, deckTitle }) {
    return `
      <a class="kwa-youtube-frame kwa-youtube-player-link" href="${escapeHtml(url)}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(title)} on YouTube">
        <span class="kwa-youtube-screen" aria-hidden="true">
          <span class="kwa-youtube-topline">
            <span>Kingswell video classroom</span>
            <span>YouTube</span>
          </span>
          <span class="kwa-youtube-play"><span>▶</span></span>
          <span class="kwa-youtube-caption">
            <strong>${escapeHtml(title)}</strong>
            <small>${escapeHtml(deckTitle || channelName || "Open on YouTube")}</small>
          </span>
          <span class="kwa-youtube-controls"><i></i><b></b><em></em><strong></strong></span>
        </span>
      </a>
    `;
  }

  function renderCoursePlayer(course = {}) {
    const playlistId = coursePlaylistId(course);
    const title = course.videoTitle || `${course.title || "Course"} YouTube Classroom`;
    const channel = course.videoChannelUrl
      ? { name: course.videoChannelName || "YouTube Channel", url: course.videoChannelUrl }
      : inferChannel(course);
    const watchUrl = playlistId ? (course.videoUrl || playlistUrl(playlistId)) : channel.url;

    if (!playlistId) {
      return `
        <div class="kwa-youtube-course-card">
          <p class="kwa-youtube-eyebrow">YouTube video classroom</p>
          <h3>${escapeHtml(title)}</h3>
          <p>This classroom opens directly on YouTube instead of embedding a player in the website.</p>
          ${renderPlayerLink({ url: channel.url, title, channelName: channel.name, deckTitle: `Open ${channel.name} channel` })}
          <div class="kwa-youtube-actions">${linkButton({ label: "Open Channel", url: channel.url })}</div>
        </div>
      `;
    }

    return `
      <div class="kwa-youtube-course-card">
        <div class="kwa-youtube-course-copy">
          <p class="kwa-youtube-eyebrow">YouTube video classroom</p>
          <h3>${escapeHtml(title)}</h3>
          <p>This classroom is a player-style link. Click it to open the assigned YouTube playlist directly, avoiding embedded player configuration errors.</p>
        </div>
        ${renderPlayerLink({ url: watchUrl, title, channelName: channel.name, deckTitle: "Open playlist on YouTube" })}
        <div class="kwa-youtube-actions">
          ${linkButton({ label: "Open Playlist", url: watchUrl })}
          ${linkButton({ label: `Open ${channel.name} Channel`, url: channel.url })}
        </div>
      </div>
    `;
  }

  function renderStandalonePanel(classroom) {
    const links = [
      { label: `Open ${classroom.deckTitle}`, url: playlistUrl(classroom.playlistId) },
      { label: `Open ${classroom.channel.name} Channel`, url: classroom.channel.url },
      ...classroom.links
    ];
    const uniqueLinks = links.filter((link, index, all) => all.findIndex(item => item.url === link.url) === index);

    return `
      <section class="kwa-youtube-classroom" data-kwa-youtube-classroom>
        <div class="kwa-youtube-panel">
          <div class="kwa-youtube-copy">
            <p class="kwa-youtube-eyebrow">${escapeHtml(classroom.eyebrow)}</p>
            <h2>${escapeHtml(classroom.title)} Video Classroom</h2>
            <p>${escapeHtml(classroom.description)} The classroom card opens directly on YouTube instead of embedding a player on this page.</p>
            <div class="kwa-youtube-actions">
              ${uniqueLinks.slice(0, 4).map(link => linkButton(link)).join("")}
            </div>
          </div>
          ${renderPlayerLink({
            url: playlistUrl(classroom.playlistId),
            title: `${classroom.title} Video Classroom`,
            channelName: classroom.channel.name,
            deckTitle: classroom.deckTitle
          })}
        </div>
      </section>
    `;
  }

  function detectStandaloneClassroom() {
    const path = window.location.pathname;
    return Object.values(CLASSROOMS).find(classroom => classroom.paths.some(match => path.includes(match)));
  }

  function injectStandaloneClassroom() {
    const classroom = detectStandaloneClassroom();
    if (!classroom || document.querySelector("[data-kwa-youtube-classroom]")) return;

    const wrap = document.createElement("div");
    wrap.innerHTML = renderStandalonePanel(classroom).trim();
    const panel = wrap.firstElementChild;
    const anchor = document.querySelector(".hero, .site-header, .kwa-mini-brand, .kwa-brand-banner");

    if (anchor && !anchor.closest("#app") && !anchor.closest("#psychology-app")) {
      anchor.insertAdjacentElement("afterend", panel);
      return;
    }

    const fallback = document.querySelector("main, #app, #psychology-app") || document.body;
    fallback.prepend(panel);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  window.KWAYoutubeClassrooms = {
    channels: CHANNELS,
    classrooms: CLASSROOMS,
    coursePlaylistId,
    inferChannel,
    playlistUrl,
    renderPlayerLink,
    renderCoursePlayer,
    renderStandalonePanel
  };

  ready(injectStandaloneClassroom);
})();

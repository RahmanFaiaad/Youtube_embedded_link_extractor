(() => {
  const results = new Set();

  function normalizeYouTubeUrl(rawUrl) {
    try {
      const url = new URL(rawUrl, window.location.href);
      const host = url.hostname.replace(/^www\./, "");

      if (host === "youtube.com" || host === "m.youtube.com") {
        if (url.pathname.startsWith("/embed/")) {
          const id = url.pathname.split("/embed/")[1]?.split(/[/?#&]/)[0];
          if (id) return `https://www.youtube.com/watch?v=${id}`;
        }

        const v = url.searchParams.get("v");
        if (v) {
          return `https://www.youtube.com/watch?v=${v}`;
        }

        return url.href;
      }

      if (host === "youtu.be") {
        const id = url.pathname.replace(/^\/+/, "").split(/[?#&]/)[0];
        if (id) return `https://www.youtube.com/watch?v=${id}`;
      }
    } catch (error) {
      // Ignore malformed URLs
    }

    return null;
  }

  function addIfYouTube(url) {
    const normalized = normalizeYouTubeUrl(url);
    if (normalized) {
      results.add(normalized);
    }
  }

  function scanDomSources() {
    const elements = document.querySelectorAll("iframe, embed, object, video, source");

    elements.forEach((element) => {
      ["src", "data"].forEach((attr) => {
        const value = element.getAttribute(attr);
        if (value) addIfYouTube(value);
      });
    });
  }

  function scanHtmlSource() {
    const html = document.documentElement.outerHTML;

    const patterns = [
      /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/g,
      /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g,
      /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/g
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        results.add(`https://www.youtube.com/watch?v=${match[1]}`);
      }
    });
  }

  function scanInlineScripts() {
    const scripts = document.querySelectorAll("script");

    scripts.forEach((script) => {
      const text = script.textContent || "";
      const pattern = /youtube\.com\\?\/embed\\?\/([a-zA-Z0-9_-]{11})/g;

      let match;
      while ((match = pattern.exec(text)) !== null) {
        results.add(`https://www.youtube.com/watch?v=${match[1]}`);
      }
    });
  }

  scanDomSources();
  scanHtmlSource();
  scanInlineScripts();

  if (results.size > 0) {
    console.log("Found YouTube link(s):");
    [...results].forEach((link) => console.log(link));
    return [...results];
  }

  console.log("No YouTube link found in the current DOM or page source.");
  console.log("Try checking the iframe src manually in the Elements tab or inspect Network requests.");
  return [];
})();

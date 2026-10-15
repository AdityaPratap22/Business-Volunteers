const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'public', 'tools-standalone');

const navbarHtml = `
<!-- BUSINESS VOLUNTEERS OFFICIAL SITE NAVBAR -->
<style id="bv-standalone-nav-styles">
#bv-standalone-nav {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99999;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid #E2E8F0;
  box-shadow: 0 4px 20px rgba(11, 19, 42, 0.04);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#bv-standalone-nav * {
  box-sizing: border-box;
}
#bv-standalone-nav .bv-nav-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.25rem;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
#bv-standalone-nav .bv-nav-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: #0B132A;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}
#bv-standalone-nav .bv-nav-brand img {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  display: block;
}
#bv-standalone-nav .bv-nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #F8FAFC;
  padding: 0.25rem 0.4rem;
  border-radius: 999px;
  border: 1px solid #E2E8F0;
  list-style: none;
  margin: 0;
}
#bv-standalone-nav .bv-nav-link {
  font-weight: 600;
  font-size: 0.86rem;
  color: #475569;
  text-decoration: none;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
#bv-standalone-nav .bv-nav-link:hover {
  color: #FF4E27;
}
#bv-standalone-nav .bv-nav-link.bv-active {
  background-color: #FFFFFF;
  color: #FF4E27;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  font-weight: 700;
}
#bv-standalone-nav .bv-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}
#bv-standalone-nav .bv-nav-cta {
  background: #FF4E27;
  color: #FFFFFF !important;
  font-weight: 700;
  font-size: 0.84rem;
  padding: 0.5rem 1.15rem;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 3px 10px rgba(255, 78, 39, 0.25);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
}
#bv-standalone-nav .bv-nav-cta:hover {
  background: #E03913;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 78, 39, 0.32);
}
#bv-standalone-nav .bv-nav-toggle {
  display: none;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  padding: 0.45rem 0.65rem;
  cursor: pointer;
  color: #0B132A;
  font-size: 1.25rem;
  line-height: 1;
}
#bv-standalone-nav .bv-nav-mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  box-shadow: 0 16px 32px rgba(11, 19, 42, 0.1);
  padding: 1rem 1.25rem;
  flex-direction: column;
  gap: 0.4rem;
}
#bv-standalone-nav .bv-nav-mobile-menu.bv-open {
  display: flex;
}
#bv-standalone-nav .bv-nav-mobile-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  text-decoration: none;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  transition: background 0.15s ease, color 0.15s ease;
}
#bv-standalone-nav .bv-nav-mobile-link:hover,
#bv-standalone-nav .bv-nav-mobile-link.bv-active {
  background: #FFF1EE;
  color: #FF4E27;
}
@media (max-width: 980px) {
  #bv-standalone-nav .bv-nav-links {
    display: none;
  }
  #bv-standalone-nav .bv-nav-toggle {
    display: block;
  }
}
</style>

<header id="bv-standalone-nav">
  <div class="bv-nav-inner">
    <a href="/" class="bv-nav-brand">
      <img src="/businessvolunteers/logo.png" alt="Business Volunteers Logo" width="36" height="36" />
      <span>Business Volunteers</span>
    </a>

    <nav class="bv-nav-links" aria-label="Main Navigation">
      <a href="/" class="bv-nav-link">Home</a>
      <a href="/about" class="bv-nav-link">About</a>
      <a href="/services" class="bv-nav-link">Services</a>
      <a href="/industries" class="bv-nav-link">Industries</a>
      <a href="/legal" class="bv-nav-link">Legal</a>
      <a href="/portfolio" class="bv-nav-link">Our Work</a>
      <a href="/tools" class="bv-nav-link bv-active">Tools</a>
      <a href="/blogs" class="bv-nav-link">Blog</a>
      <a href="/smm" class="bv-nav-link">SMM</a>
      <a href="/contact" class="bv-nav-link">Contact</a>
    </nav>

    <div class="bv-nav-actions">
      <a href="/contact" class="bv-nav-cta">Book Strategy ➔</a>
      <button class="bv-nav-toggle" id="bv-nav-toggle-btn" aria-label="Toggle navigation menu" onclick="document.getElementById('bv-mobile-dropdown').classList.toggle('bv-open')">☰</button>
    </div>
  </div>

  <div class="bv-nav-mobile-menu" id="bv-mobile-dropdown">
    <a href="/" class="bv-nav-mobile-link">Home</a>
    <a href="/about" class="bv-nav-mobile-link">About</a>
    <a href="/services" class="bv-nav-mobile-link">Services</a>
    <a href="/industries" class="bv-nav-mobile-link">Industries</a>
    <a href="/legal" class="bv-nav-mobile-link">Legal</a>
    <a href="/portfolio" class="bv-nav-mobile-link">Our Work</a>
    <a href="/tools" class="bv-nav-mobile-link bv-active">Tools</a>
    <a href="/blogs" class="bv-nav-mobile-link">Blog</a>
    <a href="/smm" class="bv-nav-mobile-link">SMM</a>
    <a href="/contact" class="bv-nav-mobile-link">Contact Us</a>
  </div>
</header>
`;

function processFile(filename) {
  const filePath = path.join(toolsDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove theme override block
  const themeInjectionStart = html.indexOf('<!-- Business Volunteers Website Theme Injection -->');
  if (themeInjectionStart !== -1) {
    const headEnd = html.indexOf('</head>', themeInjectionStart);
    if (headEnd !== -1) {
      html = html.slice(0, themeInjectionStart) + html.slice(headEnd);
    }
  }

  // Also remove standalone <style id="bv-theme-override"> or <script id="bv-embedded-auto-resizer"> if any remains
  html = html.replace(/<style id="bv-theme-override">[\s\S]*?<\/style>/g, '');
  html = html.replace(/<script id="bv-embedded-auto-resizer">[\s\S]*?<\/script>/g, '');
  // Remove previously added nav if running multiple times
  html = html.replace(/<!-- BUSINESS VOLUNTEERS OFFICIAL SITE NAVBAR -->[\s\S]*?<\/header>/g, '');

  // 2. Add navbar right before <main id="main"> or right after <body...> if <main> not found
  if (html.includes('<main id="main">')) {
    html = html.replace('<main id="main">', navbarHtml + '\n<main id="main">');
  } else if (html.includes('<main>')) {
    html = html.replace('<main>', navbarHtml + '\n<main>');
  } else {
    // Insert after body tag
    html = html.replace(/(<body[^>]*>)/i, '$1\n' + navbarHtml);
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));
console.log(`Processing ${files.length} standalone tool HTML files...`);

let processed = 0;
for (const file of files) {
  processFile(file);
  processed++;
}

console.log(`Successfully updated ${processed} files:`);
console.log(`- Removed injected website theme overrides`);
console.log(`- Added official Business Volunteers navbar at top`);
console.log(`- Retained original tool UI styles & local vendor fallback loaders`);

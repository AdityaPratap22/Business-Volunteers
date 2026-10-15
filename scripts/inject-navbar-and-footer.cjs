const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'public', 'tools-standalone');

const DOMESTIC = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","Ahmedabad","Pune","Noida","Gurgaon","Jaipur","Dehradun","Uttarakhand","Chandigarh","Lucknow","Surat","Indore","Nagpur","Kochi","Coimbatore","Ghaziabad","Faridabad","Thane","Navi Mumbai","Bhopal","Visakhapatnam","Patna","Bhubaneswar","Vadodara","Rajkot","Ludhiana","Amritsar","Kanpur","Varanasi","Agra","Nashik","Mysuru","Mangalore","Goa","Guwahati","Raipur","Ranchi","Jodhpur","Udaipur","Vijayawada","Thiruvananthapuram","Madurai","Meerut","Moradabad","Prayagraj","Jammu","Gwalior","Gorakhpur","Ajmer","Kota","Jabalpur","Solapur","Kolhapur"];
const INTERNATIONAL = ["USA","Australia","UK","Canada","Dubai","Singapore","Malaysia"];

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const domesticLinks = DOMESTIC.map(loc =>
  `<a href="/digital-marketing/${slug(loc)}" class="bv-loc-pill">${loc}</a>`
).join('\n          ');

const intlLinks = INTERNATIONAL.map(loc =>
  `<a href="/digital-marketing/${slug(loc)}" class="bv-loc-pill">🌐 ${loc}</a>`
).join('\n          ');

// ─── NAVBAR (Floating glassmorphic header matching main site) ─────────────
const navbar = `<!-- BV SITE NAVBAR START -->
<style id="bv-site-header-css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap');

#bv-site-header-wrapper {
  position: sticky;
  top: 12px;
  z-index: 99999;
  padding: 0 1.5rem;
  margin-bottom: 1.5rem;
}

#bv-site-header {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(11, 19, 42, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

#bv-site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 1.5rem;
}

#bv-site-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  flex-shrink: 0;
  text-decoration: none;
}

#bv-site-logo img {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.1);
  display: block;
}

#bv-site-logo span {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  color: #0B132A;
  white-space: nowrap;
}

#bv-site-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(248, 250, 252, 0.85);
  padding: 0.3rem 0.45rem;
  border-radius: 999px;
  border: 1px solid #E2E8F0;
  list-style: none;
  margin: 0;
}

#bv-site-nav a {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #64748B;
  text-decoration: none;
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  transition: all 0.25s ease;
  display: inline-block;
}

#bv-site-nav a:hover {
  color: #FF4E27;
}

#bv-site-nav a.bv-active {
  background: #FFFFFF;
  color: #FF4E27;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

#bv-site-header-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

/* Pay button: Grey by default, turns vibrant orange on hover */
#bv-pay-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background-color: #F1F5F9;
  color: #475569;
  border: 1.5px solid #CBD5E1;
  padding: 0.45rem 1.05rem;
  border-radius: 999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.825rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

#bv-pay-btn:hover {
  background-color: #FF4E27 !important;
  color: #FFFFFF !important;
  border-color: #FF4E27 !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 78, 39, 0.35) !important;
}

#bv-mobile-trigger {
  display: none;
  background: #F1F5F9;
  border: 1.5px solid #CBD5E1;
  border-radius: 10px;
  padding: 0.45rem 0.65rem;
  cursor: pointer;
  font-size: 1.15rem;
  color: #475569;
  line-height: 1;
  transition: all 0.2s ease;
}

#bv-mobile-trigger:hover {
  background-color: #FF4E27 !important;
  color: #FFFFFF !important;
  border-color: #FF4E27 !important;
}

/* Mobile Slide-Over Drawer */
#bv-mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 999999;
}

#bv-mobile-overlay.open {
  display: block;
}

#bv-mobile-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(11, 19, 42, 0.45);
  backdrop-filter: blur(2px);
}

#bv-mobile-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: #FFFFFF;
  box-shadow: -8px 0 40px rgba(11, 19, 42, 0.18);
  display: flex;
  flex-direction: column;
  animation: bv-slide-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes bv-slide-in {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

#bv-mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #E2E8F0;
}

#bv-mobile-header span {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: #0B132A;
}

#bv-mobile-close {
  background: #F1F5F9;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  color: #64748B;
  line-height: 1;
}

#bv-mobile-close:hover {
  background: #E2E8F0;
}

#bv-mobile-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

#bv-mobile-body a {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1F2937;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

#bv-mobile-body a:hover,
#bv-mobile-body a.bv-active {
  background: #FFF1EE;
  color: #FF4E27;
}

#bv-mobile-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #E2E8F0;
}

#bv-mobile-cta {
  display: block;
  width: 100%;
  text-align: center;
  background: #FF4E27;
  color: #FFFFFF;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 0.95rem;
  padding: 0.85rem;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(255, 78, 39, 0.35);
  transition: background 0.2s, transform 0.2s;
}

#bv-mobile-cta:hover {
  background: #E03913;
  transform: translateY(-1px);
}

@media (max-width: 1100px) {
  #bv-site-nav a { font-size: 0.82rem; padding: 0.38rem 0.65rem; }
}

@media (max-width: 768px) {
  #bv-site-nav { display: none; }
  #bv-pay-btn { display: none; }
  #bv-mobile-trigger { display: block; }
  #bv-site-logo span { font-size: 1.1rem; }
  #bv-site-header-wrapper { padding: 0 0.75rem; top: 8px; }
}
</style>

<div id="bv-site-header-wrapper">
  <header id="bv-site-header">
    <div id="bv-site-header-inner">
      <a href="/" id="bv-site-logo">
        <img src="/businessvolunteers/logo.png" alt="Business Volunteers Logo" width="38" height="38"/>
        <span>Business Volunteers</span>
      </a>
      <nav id="bv-site-nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/industries">Industries</a>
        <a href="/legal">Legal</a>
        <a href="/portfolio">Our Work</a>
        <a href="/tools" class="bv-active">Tools</a>
        <a href="/blogs">Blog</a>
        <a href="/smm">SMM</a>
        <a href="/contact">Contact</a>
      </nav>
      <div id="bv-site-header-actions">
        <a href="/payment" id="bv-pay-btn"><span>💳</span><span>Pay Online</span></a>
        <button id="bv-mobile-trigger" onclick="document.getElementById('bv-mobile-overlay').classList.add('open')" aria-label="Open menu">☰</button>
      </div>
    </div>
  </header>
</div>

<div id="bv-mobile-overlay">
  <div id="bv-mobile-backdrop" onclick="document.getElementById('bv-mobile-overlay').classList.remove('open')"></div>
  <div id="bv-mobile-panel">
    <div id="bv-mobile-header">
      <span>Navigation</span>
      <button id="bv-mobile-close" onclick="document.getElementById('bv-mobile-overlay').classList.remove('open')">✕</button>
    </div>
    <div id="bv-mobile-body">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/tools" class="bv-active">Tools</a>
      <a href="/industries">Industries</a>
      <a href="/legal">Legal &amp; Transparency</a>
      <a href="/blogs">Blog</a>
      <a href="/smm">SMM</a>
      <a href="/contact">Contact</a>
      <a href="/payment" style="background:rgba(255,78,39,.08);color:#FF4E27;font-weight:800;">💳 Pay Online (UPI / Bank)</a>
    </div>
    <div id="bv-mobile-footer">
      <a href="/contact" id="bv-mobile-cta">Book Strategy Call ➔</a>
    </div>
  </div>
</div>
<!-- BV SITE NAVBAR END -->`;

// ─── FOOTER (Official Business Volunteers Footer matching Footer.tsx) ─────────
const footer = `<!-- BV SITE FOOTER START -->
<style id="bv-site-footer-css">
#bv-site-footer {
  background: #110D0C;
  color: #F1F5F9;
  padding: 5rem 1.5rem 3rem;
  border-top: 1px solid #261F1C;
  margin-top: 4rem;
  font-family: 'Inter', sans-serif;
}
#bv-site-footer * {
  box-sizing: border-box;
}
.bv-footer-wrap {
  max-width: 1280px;
  margin: 0 auto;
}
.bv-footer-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.5fr;
  gap: 3rem;
  margin-bottom: 4rem;
}
.bv-footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.bv-footer-brand img {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,0.15);
  display: block;
}
.bv-footer-brand span {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: #FFFFFF;
}
.bv-footer-tagline {
  font-size: 0.9rem;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.bv-footer-col h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 1.25rem;
}
.bv-footer-col ul {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: 0.875rem;
  color: #94A3B8;
  list-style: none;
  padding: 0;
  margin: 0;
}
.bv-footer-col ul li a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}
.bv-footer-col ul li a:hover {
  color: #FF4E27;
}
.bv-footer-pay-link {
  color: #FF4E27 !important;
  font-weight: 700 !important;
}
.bv-footer-contact {
  font-size: 0.875rem;
  color: #94A3B8;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.bv-footer-contact a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}
.bv-footer-contact a:hover {
  color: #3B82F6;
}
.bv-footer-orange {
  color: #D97706;
  font-weight: 700;
  text-decoration: none;
  margin-top: 0.5rem;
  display: inline-block;
}
.bv-footer-divider {
  height: 1px;
  background: #261F1C;
  margin: 3rem 0;
}
.bv-footer-locs h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 1.25rem;
}
.bv-footer-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
}
.bv-loc-pill {
  text-decoration: none;
  background: #1E1815;
  color: #E2E8F0;
  border: 1px solid #382E2A;
  border-radius: 999px;
  padding: 0.45rem 1.15rem;
  font-size: 0.825rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-block;
}
.bv-loc-pill:hover {
  background: #D97706;
  color: #0F172A;
  border-color: #D97706;
}
.bv-footer-locs-cta {
  text-align: center;
  margin-top: 2.5rem;
}
.bv-locs-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 78, 39, 0.1);
  color: #FF4E27;
  border: 1.5px solid rgba(255, 78, 39, 0.4);
  padding: 0.95rem 2.25rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 78, 39, 0.15);
  text-decoration: none;
}
.bv-locs-btn:hover {
  background: #FF4E27;
  color: #FFFFFF;
  transform: translateY(-2px);
}
.bv-footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #94A3B8;
}
.bv-footer-bottom a {
  color: #E2E8F0;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.bv-footer-bottom a:hover {
  color: #FF4E27;
}
.bv-footer-bottom .bv-brand-link {
  color: #D97706;
  font-weight: 800;
}
.bv-footer-bottom .bv-brand-link:hover {
  opacity: 0.85;
}
.bv-footer-bottom-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
}
@media (max-width: 900px) {
  .bv-footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
@media (max-width: 600px) {
  .bv-footer-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .bv-footer-bottom { flex-direction: column; text-align: center; }
  .bv-footer-bottom-links { justify-content: center; }
}
</style>

<footer id="bv-site-footer">
  <div class="bv-footer-wrap">
    <!-- Main grid -->
    <div class="bv-footer-grid">
      <div>
        <div class="bv-footer-brand">
          <img src="/businessvolunteers/logo.png" alt="Business Volunteers Logo" width="42" height="42"/>
          <span>Business Volunteers</span>
        </div>
        <p class="bv-footer-tagline">Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google &amp; Meta ads, social media, web design, and graphic design.</p>
      </div>

      <div class="bv-footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/portfolio">Our Work</a></li>
          <li><a href="/tools">Free Tools (106+)</a></li>
          <li><a href="/blogs">Blog Articles</a></li>
          <li><a href="/smm">Social Growth (SMM)</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/payment" class="bv-footer-pay-link">💳 Pay Online (UPI / Bank)</a></li>
        </ul>
      </div>

      <div class="bv-footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="/services/seo">SEO Services</a></li>
          <li><a href="/services/google-ads">Google Ads (PPC)</a></li>
          <li><a href="/services/meta-ads">Meta Ads</a></li>
          <li><a href="/smm">SMM Growth</a></li>
          <li><a href="/services/web-development">Custom Web App</a></li>
          <li><a href="/graphic-design">Graphic Design</a></li>
        </ul>
      </div>

      <div class="bv-footer-col">
        <h4>Direct Contact</h4>
        <div class="bv-footer-contact">
          <div>📍 <strong>Primary Office:</strong> Sector 62, Noida, UP, 201309, India</div>
          <div>📍 <strong>Delhi NCR:</strong> New Ashok Nagar, Delhi, 110096, India</div>
          <div>📞 +91 85869 89832</div>
          <div>✉️ <a href="mailto:contact.businessvolunteers@gmail.com">contact.businessvolunteers@gmail.com</a></div>
          <div>💳 <a href="/payment" style="color:#FF4E27;font-weight:700;">Pay Online / Invoicing Details →</a></div>
          <a href="https://wa.me/918586989832?text=Hi%2C%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer" class="bv-footer-orange">Chat on WhatsApp 💬 →</a>
        </div>
      </div>
    </div>

    <div class="bv-footer-divider"></div>

    <!-- Domestic locations -->
    <div class="bv-footer-locs">
      <h4>Our Services Are Available In Domestic Locations</h4>
      <div class="bv-footer-pills">
          ${domesticLinks}
      </div>

      <h4>Our Services Are Available In International Locations</h4>
      <div class="bv-footer-pills">
          ${intlLinks}
      </div>

      <div class="bv-footer-locs-cta">
        <a href="/digital-marketing" class="bv-locs-btn">
          <span>📍 View Complete 500+ Domestic &amp; International Locations Directory (Tier 2, Tier 3 &amp; Tier 4 Coverage)</span>
          <span>➔</span>
        </a>
      </div>
    </div>

    <div class="bv-footer-divider"></div>

    <!-- Bottom bar -->
    <div class="bv-footer-bottom">
      <div>© 2025 <a href="https://businessvolunteers.online" target="_blank" rel="noopener noreferrer" class="bv-brand-link">Business Volunteers</a>. All Rights Reserved.</div>
      <div class="bv-footer-bottom-links">
        <a href="/html-sitemap">📄 HTML Sitemap</a>
        <a href="/services">Services</a>
        <a href="/industries">89 Industries</a>
        <a href="/portfolio">Case Studies</a>
        <a href="/tools">Free Tools</a>
        <a href="/blogs">Blog</a>
        <a href="/legal">Legal &amp; Compliance</a>
        <a href="/payment" style="color:#FF4E27;font-weight:700;">💳 Pay Online</a>
      </div>
    </div>
  </div>
</footer>
<!-- BV SITE FOOTER END -->`;

// ─── PROCESS ALL 106 FILES ────────────────────────────────────────────────
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));
console.log(`Processing ${files.length} standalone tool HTML files...`);

let done = 0;
for (const file of files) {
  const fp = path.join(toolsDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // Strip previously added BV header or footer if any
  html = html.replace(/<!-- BV SITE NAVBAR START -->[\s\S]*?<!-- BV SITE NAVBAR END -->\n?/g, '');
  html = html.replace(/<!-- BV SITE FOOTER START -->[\s\S]*?<!-- BV SITE FOOTER END -->\n?/g, '');

  // 1. Insert NAVBAR right before <main id="main"> or right after <body>
  if (html.includes('<main id="main">')) {
    html = html.replace('<main id="main">', navbar + '\n<main id="main">');
  } else if (html.includes('<main>')) {
    html = html.replace('<main>', navbar + '\n<main>');
  } else {
    html = html.replace(/(<body[^>]*>)/i, '$1\n' + navbar + '\n');
  }

  // 2. Insert FOOTER: replace the dummy <footer class="site">...</footer>
  // This is completely OUTSIDE any <script> and leaves all JavaScript 100% untouched!
  const dummyFooterRegex = /<footer class="site">[\s\S]*?<\/footer>/;
  if (dummyFooterRegex.test(html)) {
    html = html.replace(dummyFooterRegex, footer);
  } else {
    // Fallback: insert before the main script tag
    const scriptMatch = html.match(/<script>\s*\(\(\)\s*=>/);
    if (scriptMatch) {
      html = html.slice(0, scriptMatch.index) + footer + '\n' + html.slice(scriptMatch.index);
    }
  }

  fs.writeFileSync(fp, html, 'utf8');
  done++;
}

console.log(`Successfully injected navbar & footer into ${done}/${files.length} tool files.`);

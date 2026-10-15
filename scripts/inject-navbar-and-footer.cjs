const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'public', 'tools-standalone');

const DOMESTIC = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","Ahmedabad","Pune","Noida","Gurgaon","Jaipur","Dehradun","Uttarakhand","Chandigarh","Lucknow","Surat","Indore","Nagpur","Kochi","Coimbatore","Ghaziabad","Faridabad","Thane","Navi Mumbai","Bhopal","Visakhapatnam","Patna","Bhubaneswar","Vadodara","Rajkot","Ludhiana","Amritsar","Kanpur","Varanasi","Agra","Nashik","Mysuru","Mangalore","Goa","Guwahati","Raipur","Ranchi","Jodhpur","Udaipur","Vijayawada","Thiruvananthapuram","Madurai","Meerut","Moradabad","Prayagraj","Jammu","Gwalior","Gorakhpur","Ajmer","Kota","Jabalpur","Solapur","Kolhapur"];
const INTERNATIONAL = ["USA","Australia","UK","Canada","Dubai","Singapore","Malaysia"];

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const domesticLinks = DOMESTIC.map(loc =>
  `<a href="/digital-marketing/${slug(loc)}" class="bv-footer-pill">${loc}</a>`
).join('\n          ');

const intlLinks = INTERNATIONAL.map(loc =>
  `<a href="/digital-marketing/${slug(loc)}" class="bv-footer-pill">🌐 ${loc}</a>`
).join('\n          ');

// ─── EXACT HEADER CSS & MARKUP (Verbatim from Header.tsx & index.css) ─────
const navbar = `<!-- BV SITE NAVBAR START -->
<style id="bv-site-header-css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&display=swap');

:root {
  --primary: #FF4E27;
  --primary-hover: #E03913;
  --secondary: #0B132A;
  --text-muted: #64748B;
  --border-color: #E2E8F0;
  --bg-card: #FFFFFF;
  --shadow-lg: 0 20px 45px rgba(11, 19, 42, 0.12);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-wrapper {
  position: sticky;
  top: 12px;
  z-index: 1000;
  padding: 0 1.5rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s, opacity 0.4s;
  font-family: 'Inter', -apple-system, sans-serif;
  box-sizing: border-box;
}

.header-wrapper--visible {
  transform: translateY(0);
}

.header-wrapper--scrolled .header {
  box-shadow: var(--shadow-lg);
  border-color: rgba(226, 232, 240, 0.9);
  background-color: rgba(255, 255, 255, 0.96);
}

.header {
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(11, 19, 42, 0.06);
  transition: var(--transition);
  box-sizing: border-box;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #0B132A;
  letter-spacing: -0.03em;
  cursor: pointer;
  text-decoration: none;
  flex-shrink: 0;
}

.logo img {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.1);
  display: block;
}

.logo span {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  color: #0B132A;
  white-space: nowrap;
}

.nav-menu {
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

.nav-link-item {
  font-weight: 600;
  font-size: 0.875rem;
  color: #64748B;
  cursor: pointer;
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  transition: var(--transition);
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  display: inline-block;
}

.nav-link-item:hover {
  color: #FF4E27;
}

.nav-link-item.active {
  background-color: #FFFFFF;
  color: #FF4E27;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-weight: 700;
}

/* Header button: Grey as current design, turns orange on hover */
.bv-header-pay-btn {
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.bv-header-pay-btn:hover {
  background-color: #FF4E27 !important;
  color: #FFFFFF !important;
  border-color: #FF4E27 !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 78, 39, 0.35) !important;
}

.mobile-menu-trigger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #F1F5F9;
  border: 1.5px solid #CBD5E1;
  font-size: 1.5rem;
  color: #475569;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s ease;
}

.mobile-menu-trigger:hover {
  background: #FF4E27;
  color: #FFFFFF;
  border-color: #FF4E27;
}

/* Mobile Slide-over Drawer Overlay (Matching Screenshot 1 & index.css) */
.mobile-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  display: none;
  justify-content: flex-end;
}

.mobile-drawer-overlay.open {
  display: flex;
}

.mobile-drawer-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
}

.mobile-drawer-panel {
  position: relative;
  width: 84%;
  max-width: 360px;
  height: 100vh;
  background: #FFFFFF;
  box-shadow: -12px 0 45px rgba(11, 19, 42, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding: 1.75rem 1.5rem;
  overflow-y: auto;
  border-left: 1px solid rgba(226, 232, 240, 0.8);
  box-sizing: border-box;
}

@keyframes slideLeftIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.animate-slide-left {
  animation: slideLeftIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 1.25rem;
}

.mobile-drawer-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 900;
  color: #0F172A;
  margin: 0;
}

.mobile-drawer-close {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: background 0.2s ease;
}

.mobile-drawer-close:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.mobile-drawer-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.mobile-drawer-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #334155;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  box-sizing: border-box;
}

.mobile-drawer-link:hover {
  background: #FFF1EE;
  color: #FF4E27;
}

.mobile-drawer-link.active {
  color: #FF4E27;
  font-weight: 900;
  background: #FFF1EE;
  border-left: 4px solid #FF4E27;
}

.mobile-drawer-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #E2E8F0;
}

.mobile-drawer-cta-btn {
  width: 100%;
  background: linear-gradient(135deg, #FF4E27 0%, #E03E19 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 999px;
  padding: 0.95rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 78, 39, 0.35);
  transition: all 0.3s ease;
  display: block;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
}

.mobile-drawer-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 78, 39, 0.45);
}

@media (max-width: 1240px) and (min-width: 769px) {
  .nav-menu {
    gap: 0.2rem;
    padding: 0.25rem 0.35rem;
  }
  .nav-link-item {
    font-size: 0.82rem;
    padding: 0.38rem 0.65rem;
  }
}

@media (max-width: 768px) {
  .desktop-nav-only {
    display: none !important;
  }
  .mobile-menu-trigger {
    display: flex !important;
  }
  .header-wrapper {
    top: 6px !important;
    padding: 0 0.5rem !important;
  }
  .header-container {
    height: 60px !important;
    padding: 0 0.85rem !important;
  }
}
</style>

<div class="header-wrapper header-wrapper--visible">
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <a href="/" class="logo">
        <img src="/businessvolunteers/logo.png" alt="Business Volunteers Logo" width="38" height="38" />
        <span>Business Volunteers</span>
      </a>

      <!-- Desktop Nav Menu -->
      <nav class="nav-menu desktop-nav-only">
        <a href="/" class="nav-link-item">Home</a>
        <a href="/about" class="nav-link-item">About</a>
        <a href="/services" class="nav-link-item">Services</a>
        <a href="/industries" class="nav-link-item">Industries</a>
        <a href="/legal" class="nav-link-item">Legal</a>
        <a href="/portfolio" class="nav-link-item">Our Work</a>
        <a href="/tools" class="nav-link-item active">Tools</a>
        <a href="/blogs" class="nav-link-item">Blog</a>
        <a href="/smm" class="nav-link-item">SMM</a>
        <a href="/contact" class="nav-link-item">Contact</a>
      </nav>

      <!-- Right Header Actions -->
      <div style="display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0;">
        <a href="/payment" class="desktop-nav-only bv-header-pay-btn">
          <span>💳</span>
          <span>Pay Online</span>
        </a>
        <button class="mobile-menu-trigger" onclick="document.getElementById('mobile-drawer').classList.add('open')" aria-label="Open Navigation Drawer">
          ☰
        </button>
      </div>
    </div>
  </header>
</div>

<!-- Mobile slide-over drawer -->
<div id="mobile-drawer" class="mobile-drawer-overlay">
  <div class="mobile-drawer-backdrop" onclick="document.getElementById('mobile-drawer').classList.remove('open')"></div>
  <div class="mobile-drawer-panel animate-slide-left">
    <div class="mobile-drawer-header">
      <h3 class="mobile-drawer-title">Navigation</h3>
      <button class="mobile-drawer-close" onclick="document.getElementById('mobile-drawer').classList.remove('open')" aria-label="Close Navigation">✕</button>
    </div>
    <div class="mobile-drawer-body">
      <a href="/" class="mobile-drawer-link"><span>Home</span></a>
      <a href="/about" class="mobile-drawer-link"><span>About</span></a>
      <a href="/services" class="mobile-drawer-link"><span>Services</span></a>
      <a href="/portfolio" class="mobile-drawer-link"><span>Our Work</span></a>
      <a href="/tools" class="mobile-drawer-link active"><span>Tools</span></a>
      <a href="/industries" class="mobile-drawer-link"><span>Industries</span></a>
      <a href="/legal" class="mobile-drawer-link"><span>Legal &amp; Transparency</span></a>
      <a href="/blogs" class="mobile-drawer-link"><span>Blog</span></a>
      <a href="/smm" class="mobile-drawer-link"><span>SMM</span></a>
      <a href="/contact" class="mobile-drawer-link"><span>Contact</span></a>
      <a href="/payment" class="mobile-drawer-link" style="background: rgba(255, 78, 39, 0.08); color: #FF4E27; font-weight: 800;"><span>💳 Pay Online (UPI / Bank)</span></a>
    </div>
    <div class="mobile-drawer-footer">
      <a href="/contact" class="mobile-drawer-cta-btn">Book Strategy Call ➔</a>
    </div>
  </div>
</div>
<!-- BV SITE NAVBAR END -->`;

// ─── EXACT FOOTER CSS & MARKUP (Verbatim from Footer.tsx & index.css) ─────
const footer = `<!-- BV SITE FOOTER START -->
<style id="bv-site-footer-css">
.bv-footer-outer {
  background: #110D0C;
  color: #F1F5F9;
  padding-top: 5rem;
  padding-bottom: 3rem;
  border-top: 1px solid #261F1C;
  margin-top: 5rem;
  font-family: 'Inter', -apple-system, sans-serif;
  box-sizing: border-box;
}

.bv-footer-outer * {
  box-sizing: border-box;
}

.bv-footer-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.footer-main-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.5fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.bv-footer-pill {
  text-decoration: none;
  background-color: #1E1815;
  color: #E2E8F0;
  border: 1px solid #382E2A;
  border-radius: 999px;
  padding: 0.45rem 1.15rem;
  font-size: 0.825rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-block;
  font-family: 'Inter', sans-serif;
}

.bv-footer-pill:hover {
  background-color: #D97706 !important;
  color: #0F172A !important;
  border-color: #D97706 !important;
}

.bv-footer-locs-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(255, 78, 39, 0.1);
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
  font-family: 'Inter', sans-serif;
}

.bv-footer-locs-btn:hover {
  background-color: #FF4E27 !important;
  color: #FFFFFF !important;
  transform: translateY(-2px);
}

.bv-footer-bottom-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #94A3B8;
}

.bv-footer-bottom-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
}

.bv-footer-bottom-links a {
  color: #E2E8F0;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.bv-footer-bottom-links a:hover {
  color: #FF4E27;
}

@media (max-width: 900px) {
  .footer-main-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 2.5rem !important;
  }
}

@media (max-width: 767px) {
  .footer-main-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
    text-align: center !important;
  }
  .footer-main-grid > div {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
  .footer-main-grid ul {
    align-items: center !important;
  }
  .bv-footer-bottom-row {
    flex-direction: column !important;
    text-align: center !important;
  }
  .bv-footer-bottom-links {
    justify-content: center !important;
  }
}
</style>

<footer class="bv-footer-outer">
  <div class="bv-footer-container">
    
    <!-- MAIN FOOTER GRID (Exact match to Footer.tsx) -->
    <div class="footer-main-grid">
      <div>
        <div style="font-size: 1.6rem; font-weight: 900; color: #FFF; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
          <img
            src="/businessvolunteers/logo.png"
            alt="Business Volunteers Logo"
            width="42"
            height="42"
            loading="lazy"
            decoding="async"
            style="width: 42px; height: 42px; border-radius: 10px; object-fit: cover; border: 1px solid rgba(255,255,255,0.15);"
          />
          <span style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.5rem; color: #FFFFFF;">
            Business Volunteers
          </span>
        </div>
        <p style="font-size: 0.9rem; color: #94A3B8; line-height: 1.6; margin-bottom: 1.5rem;">
          Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google &amp; Meta ads, social media, web design, and graphic design.
        </p>
      </div>

      <div>
        <h4 style="font-size: 1rem; font-weight: 800; color: #FFF; margin-bottom: 1.25rem; font-family: 'Outfit', sans-serif;">Navigation</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.875rem; color: #94A3B8; list-style: none; padding: 0; margin: 0;">
          <li><a href="/" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Home</a></li>
          <li><a href="/about" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">About Us</a></li>
          <li><a href="/portfolio" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Our Work</a></li>
          <li><a href="/tools" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Free Tools (106+)</a></li>
          <li><a href="/blogs" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Blog Articles</a></li>
          <li><a href="/smm" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Social Growth (SMM)</a></li>
          <li><a href="/contact" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Contact Us</a></li>
          <li><a href="/payment" style="color: #FF4E27; text-decoration: none; font-weight: 700;">💳 Pay Online (UPI / Bank)</a></li>
        </ul>
      </div>

      <div>
        <h4 style="font-size: 1rem; font-weight: 800; color: #FFF; margin-bottom: 1.25rem; font-family: 'Outfit', sans-serif;">Services</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.875rem; color: #94A3B8; list-style: none; padding: 0; margin: 0;">
          <li><a href="/services/seo" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">SEO Services</a></li>
          <li><a href="/services/google-ads" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Google Ads (PPC)</a></li>
          <li><a href="/services/meta-ads" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Meta Ads</a></li>
          <li><a href="/smm" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">SMM Growth</a></li>
          <li><a href="/services/web-development" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Custom Web App</a></li>
          <li><a href="/graphic-design" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#FF4E27'" onmouseleave="this.style.color='inherit'">Graphic Design</a></li>
        </ul>
      </div>

      <div>
        <h4 style="font-size: 1rem; font-weight: 800; color: #FFF; margin-bottom: 1.25rem; font-family: 'Outfit', sans-serif;">Direct Contact</h4>
        <div style="font-size: 0.875rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.75rem;">
          <div>📍 <strong>Primary Office:</strong> Sector 62, Noida, UP, 201309, India</div>
          <div>📍 <strong>Delhi NCR:</strong> New Ashok Nagar, Delhi, 110096, India</div>
          <div>📞 +91 85869 89832</div>
          <div>✉️ <a href="mailto:contact.businessvolunteers@gmail.com" style="color: inherit; text-decoration: none;" onmouseenter="this.style.color='#3B82F6'" onmouseleave="this.style.color='inherit'">contact.businessvolunteers@gmail.com</a></div>
          <div>💳 <a href="/payment" style="color: #FF4E27; text-decoration: none; font-weight: 700;">Pay Online / Invoicing Details →</a></div>
          <a
            href="https://wa.me/918586989832?text=Hi%2C%20I%20am%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            style="color: #D97706; font-weight: 700; text-decoration: none; margin-top: 0.5rem; display: inline-block;"
          >
            Chat on WhatsApp 💬 →
          </a>
        </div>
      </div>
    </div>

    <div style="height: 1px; background: #261F1C; margin: 3rem 0;"></div>

    <!-- DOMESTIC & INTERNATIONAL LOCATIONS (Exact match to Footer.tsx) -->
    <div>
      <div style="margin-bottom: 2.5rem;">
        <h4 style="font-family: 'Outfit', serif; font-size: 1.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1.25rem;">
          Our Services Are Available In Domestic Locations
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
          ${domesticLinks}
        </div>
      </div>

      <div style="margin-top: 2.5rem; margin-bottom: 2.5rem;">
        <h4 style="font-family: 'Outfit', serif; font-size: 1.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1.25rem;">
          Our Services Are Available In International Locations
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
          ${intlLinks}
        </div>
      </div>

      <div style="text-align: center; margin-top: 2.5rem;">
        <a href="/digital-marketing" class="bv-footer-locs-btn">
          <span>📍 View Complete 500+ Domestic &amp; International Locations Directory (Tier 2, Tier 3 &amp; Tier 4 Coverage)</span>
          <span>➔</span>
        </a>
      </div>
    </div>

    <!-- BOTTOM COPYRIGHT BAR (Exact match to Footer.tsx) -->
    <div style="height: 1px; background: #261F1C; margin: 3rem 0 1.5rem 0;"></div>
    <div class="bv-footer-bottom-row">
      <div>
        © 2025 <a href="https://businessvolunteers.online" target="_blank" rel="noopener noreferrer" style="color: #D97706; font-weight: 800; text-decoration: none;">Business Volunteers</a>. All Rights Reserved.
      </div>
      <div class="bv-footer-bottom-links">
        <a href="/html-sitemap">📄 HTML Sitemap</a>
        <a href="/services">Services</a>
        <a href="/industries">89 Industries</a>
        <a href="/portfolio">Case Studies</a>
        <a href="/tools">Free Tools</a>
        <a href="/blogs">Blog</a>
        <a href="/legal">Legal &amp; Compliance</a>
        <a href="/payment" style="color: #FF4E27; text-decoration: none; font-weight: 700;">💳 Pay Online</a>
      </div>
    </div>

  </div>
</footer>
<!-- BV SITE FOOTER END -->`;

// ─── PROCESS ALL 106 STANDALONE HTML FILES ───────────────────────────────
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));
console.log(`Injecting exact navbar & footer into ${files.length} standalone HTML files...`);

let count = 0;
for (const file of files) {
  const fp = path.join(toolsDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // 1. Remove previous BV navbar or footer injections cleanly
  html = html.replace(/<!-- BV SITE NAVBAR START -->[\s\S]*?<!-- BV SITE NAVBAR END -->\n?/g, '');
  html = html.replace(/<!-- BV SITE FOOTER START -->[\s\S]*?<!-- BV SITE FOOTER END -->\n?/g, '');

  // 2. Insert NAVBAR right before <main id="main"> or right after <body>
  if (html.includes('<main id="main">')) {
    html = html.replace('<main id="main">', navbar + '\n<main id="main">');
  } else if (html.includes('<main>')) {
    html = html.replace('<main>', navbar + '\n<main>');
  } else {
    html = html.replace(/(<body[^>]*>)/i, '$1\n' + navbar + '\n');
  }

  // 3. Insert FOOTER: Replace any existing footer before <script> (either dummy or previous footer)
  // Matching <footer...</footer> that is before <script>
  const scriptIdx = html.search(/<script>\s*\(\(\)\s*=>/);
  if (scriptIdx !== -1) {
    const beforeScript = html.slice(0, scriptIdx);
    const afterScript = html.slice(scriptIdx);
    
    // In beforeScript, replace any <footer...>...</footer>
    const updatedBeforeScript = beforeScript.replace(/<footer[\s\S]*?<\/footer>/i, footer);
    if (updatedBeforeScript !== beforeScript) {
      html = updatedBeforeScript + afterScript;
    } else {
      // If no <footer> was matched, append right before <script>
      html = beforeScript + '\n' + footer + '\n' + afterScript;
    }
  } else {
    // Fallback: replace dummy footer
    html = html.replace(/<footer class="site">[\s\S]*?<\/footer>/, footer);
  }

  fs.writeFileSync(fp, html, 'utf8');
  count++;
}

console.log(`✅ Successfully updated ${count}/${files.length} tool files with exact website navbar & footer.`);

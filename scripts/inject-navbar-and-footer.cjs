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

// ─── EXACT HEADER CSS & MARKUP (Matching Header.tsx & index.css) ─────────
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
  position: sticky !important;
  top: 12px !important;
  z-index: 1000 !important;
  padding: 0 1.5rem !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s, opacity 0.4s !important;
  font-family: 'Inter', -apple-system, sans-serif !important;
  box-sizing: border-box !important;
}

.header-wrapper--visible {
  transform: translateY(0) !important;
}

.header-wrapper--scrolled .header {
  box-shadow: 0 20px 45px rgba(11, 19, 42, 0.12) !important;
  border-color: rgba(226, 232, 240, 0.9) !important;
  background-color: rgba(255, 255, 255, 0.96) !important;
}

.header-wrapper .header {
  background-color: rgba(255, 255, 255, 0.92) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  border-radius: 20px !important;
  box-shadow: 0 10px 30px rgba(11, 19, 42, 0.06) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-sizing: border-box !important;
}

.header-wrapper .header-container {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  height: 72px !important;
  padding: 0 1.5rem !important;
  box-sizing: border-box !important;
}

.header-wrapper a.logo {
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.4rem !important;
  font-weight: 800 !important;
  color: #0B132A !important;
  letter-spacing: -0.03em !important;
  cursor: pointer !important;
  text-decoration: none !important;
  flex-shrink: 0 !important;
}

.header-wrapper a.logo img {
  width: 38px !important;
  height: 38px !important;
  border-radius: 10px !important;
  object-fit: cover !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  display: block !important;
}

.header-wrapper a.logo span {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 900 !important;
  font-size: 1.3rem !important;
  letter-spacing: -0.02em !important;
  color: #0B132A !important;
  white-space: nowrap !important;
}

.header-wrapper .nav-menu {
  display: flex !important;
  align-items: center !important;
  gap: 0.35rem !important;
  background: rgba(248, 250, 252, 0.85) !important;
  padding: 0.3rem 0.45rem !important;
  border-radius: 999px !important;
  border: 1px solid #E2E8F0 !important;
  list-style: none !important;
  margin: 0 !important;
}

.header-wrapper a.nav-link-item {
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  color: #64748B !important;
  cursor: pointer !important;
  padding: 0.42rem 0.95rem !important;
  border-radius: 999px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  text-decoration: none !important;
  font-family: 'Inter', sans-serif !important;
  white-space: nowrap !important;
  display: inline-block !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.header-wrapper a.nav-link-item:hover {
  color: #FF4E27 !important;
  background-color: rgba(255, 78, 39, 0.04) !important;
}

.header-wrapper a.nav-link-item.active {
  background-color: #FFFFFF !important;
  color: #FF4E27 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
  font-weight: 700 !important;
}

/* Header Pay Online Button — EXACT matching Header.tsx line 356 */
.header-wrapper a.bv-header-pay-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  background-color: rgba(255, 78, 39, 0.08) !important;
  color: #FF4E27 !important;
  border: 1.5px solid rgba(255, 78, 39, 0.4) !important;
  padding: 0.45rem 1.05rem !important;
  border-radius: 999px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 0.825rem !important;
  font-weight: 800 !important;
  cursor: pointer !important;
  transition: all 0.25s ease !important;
  text-decoration: none !important;
  box-shadow: none !important;
}

.header-wrapper a.bv-header-pay-btn span {
  color: #FF4E27 !important;
  transition: color 0.25s ease !important;
}

.header-wrapper a.bv-header-pay-btn:hover {
  background-color: #FF4E27 !important;
  color: #FFFFFF !important;
  border-color: #FF4E27 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 16px rgba(255, 78, 39, 0.35) !important;
}

.header-wrapper a.bv-header-pay-btn:hover span {
  color: #FFFFFF !important;
}

/* Mobile Menu Trigger */
.header-wrapper .mobile-menu-trigger {
  display: none !important;
  align-items: center !important;
  justify-content: center !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 12px !important;
  background: transparent !important;
  border: none !important;
  font-size: 1.6rem !important;
  color: #0F172A !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  line-height: 1 !important;
  transition: color 0.2s ease !important;
}

.header-wrapper .mobile-menu-trigger:hover {
  color: #FF4E27 !important;
}

/* Mobile Slide-over Drawer Overlay */
.mobile-drawer-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 999999 !important;
  display: none !important;
  justify-content: flex-end !important;
}

.mobile-drawer-overlay.open {
  display: flex !important;
}

.mobile-drawer-backdrop {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(4px) !important;
}

.mobile-drawer-panel {
  position: relative !important;
  width: 84% !important;
  max-width: 360px !important;
  height: 100vh !important;
  background: #FFFFFF !important;
  box-shadow: -12px 0 45px rgba(11, 19, 42, 0.2) !important;
  display: flex !important;
  flex-direction: column !important;
  z-index: 2 !important;
  padding: 1.75rem 1.5rem !important;
  overflow-y: auto !important;
  border-left: 1px solid rgba(226, 232, 240, 0.8) !important;
  box-sizing: border-box !important;
}

@keyframes slideLeftIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.animate-slide-left {
  animation: slideLeftIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

.mobile-drawer-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding-bottom: 1rem !important;
  border-bottom: 1px solid #E2E8F0 !important;
  margin-bottom: 1.25rem !important;
}

.mobile-drawer-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.35rem !important;
  font-weight: 900 !important;
  color: #0F172A !important;
  margin: 0 !important;
}

.mobile-drawer-close {
  background: #F1F5F9 !important;
  border: 1px solid #CBD5E1 !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  color: #475569 !important;
  cursor: pointer !important;
  transition: background 0.2s ease, color 0.2s ease !important;
}

.mobile-drawer-close:hover {
  background: #E2E8F0 !important;
  color: #0F172A !important;
}

.mobile-drawer-body {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important;
  flex-grow: 1 !important;
}

.mobile-drawer-link {
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  text-align: left !important;
  background: transparent !important;
  border: none !important;
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  color: #334155 !important;
  padding: 0.65rem 0.85rem !important;
  border-radius: 12px !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  text-decoration: none !important;
  box-sizing: border-box !important;
}

.mobile-drawer-link span {
  color: inherit !important;
}

.mobile-drawer-link:hover {
  background: #FFF1EE !important;
  color: #FF4E27 !important;
}

.mobile-drawer-link.active {
  color: #FF4E27 !important;
  font-weight: 900 !important;
  background: #FFF1EE !important;
  border-left: 4px solid #FF4E27 !important;
}

.mobile-drawer-footer {
  margin-top: auto !important;
  padding-top: 1.5rem !important;
  border-top: 1px solid #E2E8F0 !important;
}

.mobile-drawer-cta-btn {
  width: 100% !important;
  background: linear-gradient(135deg, #FF4E27 0%, #E03E19 100%) !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 999px !important;
  padding: 0.95rem 1.5rem !important;
  font-size: 0.95rem !important;
  font-weight: 800 !important;
  font-family: 'Outfit', sans-serif !important;
  cursor: pointer !important;
  box-shadow: 0 8px 25px rgba(255, 78, 39, 0.35) !important;
  transition: all 0.3s ease !important;
  display: block !important;
  text-align: center !important;
  text-decoration: none !important;
  box-sizing: border-box !important;
}

.mobile-drawer-cta-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 30px rgba(255, 78, 39, 0.45) !important;
}

@media (max-width: 1240px) and (min-width: 769px) {
  .header-wrapper .nav-menu {
    gap: 0.2rem !important;
    padding: 0.25rem 0.35rem !important;
  }
  .header-wrapper a.nav-link-item {
    font-size: 0.82rem !important;
    padding: 0.38rem 0.65rem !important;
  }
}

@media (max-width: 768px) {
  .header-wrapper .desktop-nav-only {
    display: none !important;
  }
  .header-wrapper .mobile-menu-trigger {
    display: flex !important;
  }
  .header-wrapper {
    top: 6px !important;
    padding: 0 0.5rem !important;
  }
  .header-wrapper .header-container {
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
      <a href="/payment" class="mobile-drawer-link" style="background: rgba(255, 78, 39, 0.08) !important; color: #FF4E27 !important; font-weight: 800 !important;"><span style="color: #FF4E27 !important;">💳 Pay Online (UPI / Bank)</span></a>
    </div>
    <div class="mobile-drawer-footer">
      <a href="/contact" class="mobile-drawer-cta-btn">Book Strategy Call ➔</a>
    </div>
  </div>
</div>
<!-- BV SITE NAVBAR END -->`;

// ─── EXACT FOOTER CSS & MARKUP (Matching Footer.tsx & index.css) ─────────
const footer = `<!-- BV SITE FOOTER START -->
<style id="bv-site-footer-css">
.bv-footer-outer {
  background: #110D0C !important;
  color: #F1F5F9 !important;
  padding-top: 5rem !important;
  padding-bottom: 3rem !important;
  border-top: 1px solid #261F1C !important;
  margin-top: 5rem !important;
  font-family: 'Inter', -apple-system, sans-serif !important;
  box-sizing: border-box !important;
}

.bv-footer-outer * {
  box-sizing: border-box !important;
}

.bv-footer-container {
  width: 100% !important;
  max-width: 1280px !important;
  margin: 0 auto !important;
  padding: 0 1.5rem !important;
  box-sizing: border-box !important;
}

.footer-main-grid {
  display: grid !important;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.5fr !important;
  gap: 3rem !important;
  margin-bottom: 4rem !important;
}

.bv-footer-outer .footer-main-grid ul {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.65rem !important;
  font-size: 0.875rem !important;
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.bv-footer-outer .footer-main-grid ul li a {
  color: #94A3B8 !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
  font-weight: 500 !important;
}

.bv-footer-outer .footer-main-grid ul li a:hover {
  color: #FF4E27 !important;
}

/* Pay Online links in Footer */
.bv-footer-outer a.bv-footer-pay-link {
  color: #FF4E27 !important;
  text-decoration: none !important;
  font-weight: 700 !important;
  transition: opacity 0.2s ease !important;
}

.bv-footer-outer a.bv-footer-pay-link:hover {
  opacity: 0.85 !important;
  color: #FF4E27 !important;
}

/* WhatsApp CTA Button */
.bv-footer-outer a.bv-footer-whatsapp-btn {
  color: #D97706 !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  margin-top: 0.5rem !important;
  display: inline-block !important;
  transition: opacity 0.2s ease !important;
}

.bv-footer-outer a.bv-footer-whatsapp-btn:hover {
  opacity: 0.85 !important;
}

/* Location Pills — EXACT matching Footer.tsx line 124 */
.bv-footer-outer a.bv-footer-pill {
  text-decoration: none !important;
  background-color: #1E1815 !important;
  color: #E2E8F0 !important;
  border: 1px solid #382E2A !important;
  border-radius: 999px !important;
  padding: 0.45rem 1.15rem !important;
  font-size: 0.825rem !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: inline-block !important;
  font-family: 'Inter', sans-serif !important;
}

.bv-footer-outer a.bv-footer-pill:hover {
  background-color: #D97706 !important;
  color: #0F172A !important;
  border-color: #D97706 !important;
}

/* Locations Directory Button — EXACT matching Footer.tsx line 204 */
.bv-footer-outer a.bv-footer-locs-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.75rem !important;
  background-color: rgba(255, 78, 39, 0.1) !important;
  color: #FF4E27 !important;
  border: 1.5px solid rgba(255, 78, 39, 0.4) !important;
  padding: 0.95rem 2.25rem !important;
  border-radius: 999px !important;
  font-size: 0.95rem !important;
  font-weight: 800 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 8px 25px rgba(255, 78, 39, 0.15) !important;
  text-decoration: none !important;
  font-family: 'Inter', sans-serif !important;
}

.bv-footer-outer a.bv-footer-locs-btn span {
  color: #FF4E27 !important;
  transition: color 0.3s ease !important;
}

.bv-footer-outer a.bv-footer-locs-btn:hover {
  background-color: #FF4E27 !important;
  color: #FFFFFF !important;
  border-color: #FF4E27 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 30px rgba(255, 78, 39, 0.35) !important;
}

.bv-footer-outer a.bv-footer-locs-btn:hover span {
  color: #FFFFFF !important;
}

/* Bottom row links */
.bv-footer-bottom-row {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 1rem !important;
  font-size: 0.85rem !important;
  color: #94A3B8 !important;
}

.bv-footer-outer a.bv-footer-copy-link {
  color: #D97706 !important;
  font-weight: 800 !important;
  text-decoration: none !important;
  transition: opacity 0.2s ease !important;
}

.bv-footer-outer a.bv-footer-copy-link:hover {
  opacity: 0.85 !important;
}

.bv-footer-bottom-links {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 1.25rem !important;
  align-items: center !important;
}

.bv-footer-outer .bv-footer-bottom-links a {
  color: #E2E8F0 !important;
  text-decoration: none !important;
  font-weight: 600 !important;
  transition: color 0.2s ease !important;
}

.bv-footer-outer .bv-footer-bottom-links a:hover {
  color: #FF4E27 !important;
}

.bv-footer-outer a.bv-footer-bottom-pay {
  color: #FF4E27 !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}

.bv-footer-outer a.bv-footer-bottom-pay:hover {
  color: #FFFFFF !important;
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
          <span style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.5rem; color: #FFFFFF !important;">
            Business Volunteers
          </span>
        </div>
        <p style="font-size: 0.9rem; color: #94A3B8 !important; line-height: 1.6; margin-bottom: 1.5rem;">
          Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google &amp; Meta ads, social media, web design, and graphic design.
        </p>
      </div>

      <div>
        <h4 style="font-size: 1rem; font-weight: 800; color: #FFF !important; margin-bottom: 1.25rem; font-family: 'Outfit', sans-serif;">Navigation</h4>
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

      <div>
        <h4 style="font-size: 1rem; font-weight: 800; color: #FFF !important; margin-bottom: 1.25rem; font-family: 'Outfit', sans-serif;">Services</h4>
        <ul>
          <li><a href="/services/seo">SEO Services</a></li>
          <li><a href="/services/google-ads">Google Ads (PPC)</a></li>
          <li><a href="/services/meta-ads">Meta Ads</a></li>
          <li><a href="/smm">SMM Growth</a></li>
          <li><a href="/services/web-development">Custom Web App</a></li>
          <li><a href="/graphic-design">Graphic Design</a></li>
        </ul>
      </div>

      <div>
        <h4 style="font-size: 1rem; font-weight: 800; color: #FFF !important; margin-bottom: 1.25rem; font-family: 'Outfit', sans-serif;">Direct Contact</h4>
        <div style="font-size: 0.875rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.75rem;">
          <div>📍 <strong style="color: #FFF !important;">Primary Office:</strong> Sector 62, Noida, UP, 201309, India</div>
          <div>📍 <strong style="color: #FFF !important;">Delhi NCR:</strong> New Ashok Nagar, Delhi, 110096, India</div>
          <div>📞 <span style="color: #FFF !important;">+91 85869 89832</span></div>
          <div>✉️ <a href="mailto:contact.businessvolunteers@gmail.com" style="color: #94A3B8 !important; text-decoration: none;">contact.businessvolunteers@gmail.com</a></div>
          <div>💳 <a href="/payment" class="bv-footer-pay-link">Pay Online / Invoicing Details →</a></div>
          <a
            href="https://wa.me/918586989832?text=Hi%2C%20I%20am%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            class="bv-footer-whatsapp-btn"
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
        <h4 style="font-family: 'Outfit', serif; font-size: 1.2rem; font-weight: 800; color: #FFFFFF !important; margin-bottom: 1.25rem;">
          Our Services Are Available In Domestic Locations
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
          ${domesticLinks}
        </div>
      </div>

      <div style="margin-top: 2.5rem; margin-bottom: 2.5rem;">
        <h4 style="font-family: 'Outfit', serif; font-size: 1.2rem; font-weight: 800; color: #FFFFFF !important; margin-bottom: 1.25rem;">
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
        © 2025 <a href="https://businessvolunteers.online" target="_blank" rel="noopener noreferrer" class="bv-footer-copy-link">Business Volunteers</a>. All Rights Reserved.
      </div>
      <div class="bv-footer-bottom-links">
        <a href="/html-sitemap">📄 HTML Sitemap</a>
        <a href="/services">Services</a>
        <a href="/industries">89 Industries</a>
        <a href="/portfolio">Case Studies</a>
        <a href="/tools">Free Tools</a>
        <a href="/blogs">Blog</a>
        <a href="/legal">Legal &amp; Compliance</a>
        <a href="/payment" class="bv-footer-bottom-pay">💳 Pay Online</a>
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

  // 1.5 Ensure Business Volunteers favicon is in <head>
  const faviconTags = `
<link rel="icon" type="image/png" sizes="32x32" href="/businessvolunteers/logo.png">
<link rel="icon" type="image/png" sizes="192x192" href="/businessvolunteers/logo.png">
<link rel="icon" type="image/png" href="/businessvolunteers/logo.png">
<link rel="shortcut icon" href="/businessvolunteers/logo.png">
<link rel="apple-touch-icon" sizes="180x180" href="/businessvolunteers/logo.png">`;

  if (!html.includes('href="/businessvolunteers/logo.png"')) {
    html = html.replace(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>\n?/gi, '');
    html = html.replace(/<link[^>]+rel=["']apple-touch-icon["'][^>]*>\n?/gi, '');
    if (html.includes('<head>')) {
      html = html.replace('<head>', '<head>' + faviconTags);
    } else if (html.match(/<head[^>]*>/i)) {
      html = html.replace(/(<head[^>]*>)/i, '$1' + faviconTags);
    }
  }

  // 2. Insert NAVBAR right before <main id="main"> or right after <body>
  if (html.includes('<main id="main">')) {
    html = html.replace('<main id="main">', navbar + '\n<main id="main">');
  } else if (html.includes('<main>')) {
    html = html.replace('<main>', navbar + '\n<main>');
  } else {
    html = html.replace(/(<body[^>]*>)/i, '$1\n' + navbar + '\n');
  }

  // 3. Insert FOOTER: Replace any existing footer before <script> (either dummy or previous footer)
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

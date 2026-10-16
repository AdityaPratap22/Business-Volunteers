const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const logoPngPath = path.join(rootDir, 'public', 'businessvolunteers', 'logo.png');
const logoBuf = fs.readFileSync(logoPngPath);
const logoB64 = logoBuf.toString('base64');

// 1. Write binary favicon files
const targets = [
  path.join(rootDir, 'public', 'favicon.ico'),
  path.join(rootDir, 'public', 'favicon.png'),
  path.join(rootDir, 'public', 'icon.png'),
  path.join(rootDir, 'public', 'apple-touch-icon.png'),
  path.join(rootDir, 'public', 'businessvolunteers', 'favicon.png'),
  path.join(rootDir, 'app', 'favicon.ico'),
  path.join(rootDir, 'app', 'icon.png'),
  path.join(rootDir, 'app', 'apple-icon.png'),
];

for (const t of targets) {
  fs.writeFileSync(t, logoBuf);
}

// 2. Write SVG favicons
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <image href="data:image/png;base64,${logoB64}" width="256" height="256" />
</svg>`;

fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), svgContent, 'utf8');
fs.writeFileSync(path.join(rootDir, 'public', 'businessvolunteers', 'favicon.svg'), svgContent, 'utf8');

// 3. Inject favicon <link> tags into all 106 standalone HTML files in public/tools-standalone
const toolsDir = path.join(rootDir, 'public', 'tools-standalone');
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));

const faviconTags = `
<link rel="icon" type="image/png" sizes="32x32" href="/businessvolunteers/logo.png">
<link rel="icon" type="image/png" sizes="192x192" href="/businessvolunteers/logo.png">
<link rel="icon" type="image/png" href="/businessvolunteers/logo.png">
<link rel="shortcut icon" href="/businessvolunteers/logo.png">
<link rel="apple-touch-icon" sizes="180x180" href="/businessvolunteers/logo.png">`;

let updatedTools = 0;
for (const file of toolFiles) {
  const fp = path.join(toolsDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // Remove any previous favicon link tags
  html = html.replace(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>\n?/gi, '');
  html = html.replace(/<link[^>]+rel=["']apple-touch-icon["'][^>]*>\n?/gi, '');

  // Insert right after <head> or right before </head>
  if (html.includes('<head>')) {
    html = html.replace('<head>', '<head>' + faviconTags);
  } else if (html.match(/<head[^>]*>/i)) {
    html = html.replace(/(<head[^>]*>)/i, '$1' + faviconTags);
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', faviconTags + '\n</head>');
  }

  fs.writeFileSync(fp, html, 'utf8');
  updatedTools++;
}

console.log(`✅ Favicon files generated and injected into ${updatedTools} standalone HTML tools and app routes.`);

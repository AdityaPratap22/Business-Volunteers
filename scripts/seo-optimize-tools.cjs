/**
 * SEO Optimizer for Business Volunteers Standalone Tool Pages
 * =============================================================
 * This script performs the following SEO improvements on all 106 HTML tools:
 *
 * 1. Fix <link rel="canonical"> → https://businessvolunteers.online/tools/{slug}
 * 2. Fix og:url → same canonical URL
 * 3. Improve <title> using tool-specific seoTitle from toolsData
 * 4. Improve <meta name="description"> using tool-specific seoDescription
 * 5. Improve og:title and og:description with better, specific values
 * 6. Inject WebApplication JSON-LD structured data schema
 * 7. Add twitter:card meta tags if missing
 * 8. Add robots meta tag (index, follow)
 *
 * Run with: node scripts/seo-optimize-tools.cjs
 */

'use strict';

const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'public', 'tools-standalone');
const toolsDataPath = path.join(__dirname, '..', 'src', 'data', 'toolsData.ts');

// ── Parse toolsData.ts to extract tool metadata ──────────────────────────────
// We read the TypeScript file and extract the ALL_TOOLS array via regex/JSON
const rawData = fs.readFileSync(toolsDataPath, 'utf8');

// Extract the JSON array from ALL_TOOLS by finding the array start and using
// a lightweight parser approach — find each object and extract key fields
function extractToolsMetadata(src) {
  const tools = [];
  // Match each tool object by extracting key fields via regex
  const toolPattern = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"slug":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"categoryLabel":\s*"([^"]+)"[\s\S]*?"badge":\s*"([^"]+)"[\s\S]*?"description":\s*"((?:[^"\\]|\\.)*)[\s\S]*?"seoTitle":\s*"((?:[^"\\]|\\.)*)"[\s\S]*?"seoDescription":\s*"((?:[^"\\]|\\.)*)"[\s\S]*?"keywords":\s*(\[[^\]]+\])/g;

  let match;
  while ((match = toolPattern.exec(src)) !== null) {
    const keywordsRaw = match[9];
    let keywords = [];
    try {
      keywords = JSON.parse(keywordsRaw.replace(/\n/g, ' '));
    } catch (e) {
      keywords = [];
    }

    tools.push({
      id: match[1],
      slug: match[2],
      name: match[3],
      categoryLabel: match[4],
      badge: match[5],
      description: match[6].replace(/\\"/g, '"'),
      seoTitle: match[7].replace(/\\"/g, '"'),
      seoDescription: match[8].replace(/\\"/g, '"'),
      keywords,
    });
  }
  return tools;
}

const allTools = extractToolsMetadata(rawData);
console.log(`✅ Parsed ${allTools.length} tools from toolsData.ts`);

// Build a slug → tool map
const toolBySlug = {};
for (const t of allTools) {
  toolBySlug[t.slug] = t;
}

// ── Helper: set/replace a meta tag ────────────────────────────────────────────
function setMeta(html, attr, attrVal, content) {
  // Escape special regex chars in content
  const escapedContent = content.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const tagRegex = new RegExp(`<meta\\s+${attr}=["']${attrVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i');
  const newTag = `<meta ${attr}="${attrVal}" content="${escapedContent}">`;
  if (tagRegex.test(html)) {
    return html.replace(tagRegex, newTag);
  }
  // If not found, insert before </head>
  return html.replace('</head>', `${newTag}\n</head>`);
}

// ── Helper: set/replace a link tag ────────────────────────────────────────────
function setCanonical(html, url) {
  const canonicalRegex = /<link\s+rel=["']canonical["'][^>]*>/i;
  const newTag = `<link rel="canonical" href="${url}">`;
  if (canonicalRegex.test(html)) {
    return html.replace(canonicalRegex, newTag);
  }
  return html.replace('</head>', `${newTag}\n</head>`);
}

// ── Helper: set/replace <title> ────────────────────────────────────────────
function setTitle(html, title) {
  const titleRegex = /<title>[^<]*<\/title>/i;
  const newTitle = `<title>${title.replace(/&/g, '&amp;')}</title>`;
  if (titleRegex.test(html)) {
    return html.replace(titleRegex, newTitle);
  }
  return html.replace('</head>', `${newTitle}\n</head>`);
}

// ── Helper: inject/replace JSON-LD script ──────────────────────────────────
function setJsonLd(html, id, jsonLd) {
  const scriptRegex = new RegExp(`<script[^>]+id=["']${id}["'][^>]*>[\\s\\S]*?<\\/script>`, 'i');
  const newScript = `<script type="application/ld+json" id="${id}">${JSON.stringify(jsonLd, null, 0)}</script>`;
  if (scriptRegex.test(html)) {
    return html.replace(scriptRegex, newScript);
  }
  // Inject before </head>
  return html.replace('</head>', `${newScript}\n</head>`);
}

// ── Process all HTML files ────────────────────────────────────────────────────
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));
console.log(`\n🔧 Optimizing SEO for ${files.length} standalone tool pages...\n`);

let updated = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace(/\.html$/, '');
  const tool = toolBySlug[slug];

  if (!tool) {
    console.warn(`  ⚠️  No toolsData entry found for: ${slug} — applying generic SEO only`);
  }

  const fp = path.join(toolsDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  const canonicalUrl = `https://businessvolunteers.online/tools/${slug}`;
  const toolName = tool ? tool.name : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const toolDesc = tool ? tool.seoDescription : `Use this free ${toolName} tool directly in your browser. 100% free, no watermarks, private in-browser processing.`;
  const toolTitle = tool ? tool.seoTitle : `${toolName} — Free Online Tool | Business Volunteers`;
  const toolKeywords = tool ? tool.keywords : [slug, 'free online tool', 'business volunteers'];
  const toolCategory = tool ? tool.categoryLabel : 'Free Online Tools';
  const toolBadge = tool ? tool.badge : 'Free Tool';
  const shortDesc = tool ? tool.description : toolDesc;

  // 1. Fix <title>
  html = setTitle(html, toolTitle);

  // 2. Fix meta description
  html = setMeta(html, 'name', 'description', toolDesc);

  // 3. Fix canonical
  html = setCanonical(html, canonicalUrl);

  // 4. Fix og:url
  html = setMeta(html, 'property', 'og:url', canonicalUrl);

  // 5. Fix og:title (more specific)
  html = setMeta(html, 'property', 'og:title', toolTitle);

  // 6. Fix og:description
  html = setMeta(html, 'property', 'og:description', toolDesc);

  // 7. Fix og:type
  html = setMeta(html, 'property', 'og:type', 'website');

  // 8. Fix og:site_name
  html = setMeta(html, 'property', 'og:site_name', 'Business Volunteers');

  // 9. Fix og:image
  html = setMeta(html, 'property', 'og:image', 'https://businessvolunteers.online/businessvolunteers/logo.png');

  // 10. Add Twitter Card tags
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', toolTitle);
  html = setMeta(html, 'name', 'twitter:description', toolDesc);
  html = setMeta(html, 'name', 'twitter:image', 'https://businessvolunteers.online/businessvolunteers/logo.png');

  // 11. Add robots meta tag
  html = setMeta(html, 'name', 'robots', 'index, follow');

  // 12. Add author & publisher
  html = setMeta(html, 'name', 'author', 'Business Volunteers');

  // 13. Add keywords meta tag
  html = setMeta(html, 'name', 'keywords', toolKeywords.join(', '));

  // 14. Inject WebApplication JSON-LD structured data
  const webAppSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${canonicalUrl}#webapp`,
        "name": toolName,
        "description": shortDesc,
        "url": canonicalUrl,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "provider": {
          "@type": "Organization",
          "@id": "https://businessvolunteers.online/#organization",
          "name": "Business Volunteers",
          "url": "https://businessvolunteers.online"
        },
        "featureList": toolKeywords.join(', '),
        "keywords": toolKeywords.join(', ')
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": toolTitle,
        "description": toolDesc,
        "isPartOf": {
          "@id": "https://businessvolunteers.online/#website"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://businessvolunteers.online"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Free Tools",
              "item": "https://businessvolunteers.online/tools"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": toolName,
              "item": canonicalUrl
            }
          ]
        }
      }
    ]
  };

  html = setJsonLd(html, 'bv-tool-schema', webAppSchema);

  fs.writeFileSync(fp, html, 'utf8');
  updated++;

  if (updated % 20 === 0) {
    console.log(`  ✅ Processed ${updated}/${files.length} files...`);
  }
}

console.log(`\n🎉 SEO optimization complete!`);
console.log(`   ✅ Updated: ${updated} files`);
console.log(`   ⚠️  Skipped: ${skipped} files`);
console.log(`\n📋 Changes applied to each tool page:`);
console.log(`   • Fixed <title> with tool-specific SEO title`);
console.log(`   • Fixed <meta name="description"> with specific description`);
console.log(`   • Fixed <link rel="canonical"> → https://businessvolunteers.online/tools/{slug}`);
console.log(`   • Fixed og:url → canonical URL`);
console.log(`   • Fixed og:title, og:description with specific values`);
console.log(`   • Added twitter:card, twitter:title, twitter:description, twitter:image`);
console.log(`   • Added robots: index, follow`);
console.log(`   • Added author meta tag`);
console.log(`   • Added keywords meta tag`);
console.log(`   • Injected WebApplication + WebPage + BreadcrumbList JSON-LD`);

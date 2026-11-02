import React, { useState, useMemo, useEffect } from 'react';
import type { PageView } from '../types';
import { ALL_TOOLS, TOOL_CATEGORIES, getToolById } from '../data/toolsData';

interface ToolsPageProps {
  toolSlug?: string;
  onNavigate: (page: PageView, slug?: string) => void;
  onOpenStrategyModal: () => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ toolSlug, onOpenStrategyModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // If a slug was passed directly to the client component, redirect to its standalone HTML page
  useEffect(() => {
    if (toolSlug) {
      const tool = getToolById(toolSlug);
      const targetSlug = tool?.slug || toolSlug;
      window.location.href = `/tools-standalone/${targetSlug}.html`;
    }
  }, [toolSlug]);

  // Set document title
  useEffect(() => {
    document.title = '106 Free Business, E-Commerce & Marketing Tools | Business Volunteers';
  }, []);

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.categoryKey === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q) ||
        tool.badge.toLowerCase().includes(q) ||
        tool.id.toLowerCase().includes(q) ||
        tool.keywords?.some(k => k.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="tools-page-container" style={{ backgroundColor: 'var(--bg-main, #FDFDFD)', minHeight: '90vh', paddingBottom: '6rem' }}>
      {/* DIRECTORY HERO SECTION */}
      <section style={{ backgroundColor: '#0B132A', color: '#FFFFFF', paddingTop: '8rem', paddingBottom: '4.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Free Business, Marketing &amp; Seller Utilities
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: '#94A3B8', lineHeight: 1.6, maxWidth: '750px', margin: '0 auto 2.5rem' }}>
            Instant financial calculators, Amazon &amp; Flipkart seller label croppers, PDF editors, image processors, QR code generators, and developer tools. 100% free, private, and runs directly in your browser.
          </p>

          {/* Quick Stats Pill Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', color: '#CBD5E1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10B981' }}>✓</span> 106 Browser Tools
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10B981' }}>✓</span> 100% Client-Side Privacy
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10B981' }}>✓</span> No Sign-Up or Login Needed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10B981' }}>✓</span> Instant Browser Execution
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH AND FILTER BAR */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: '640px', width: '100%', margin: '0 auto' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', color: '#94A3B8' }}>
                🔍
              </span>
              <input
                type="text"
                placeholder="Search across all 106 tools (e.g. GST calculator, amazon cropper, QR code, PDF to word)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.85rem',
                  fontSize: '0.95rem',
                  borderRadius: '999px',
                  border: '1.5px solid #CBD5E1',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  color: '#0B132A',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#FF4E27';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1rem',
                    color: '#94A3B8',
                    cursor: 'pointer'
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills Slider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '0.25rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {TOOL_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: '999px',
                      fontSize: '0.825rem',
                      fontWeight: isSelected ? 800 : 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid #FF4E27' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#FF4E27' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#475569',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span style={{ fontSize: '0.75rem', opacity: isSelected ? 0.9 : 0.6 }}>({cat.count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS DIRECTORY GRID */}
      <section style={{ paddingTop: '3rem' }}>
        <div className="container">
          {/* Results count & current filter note */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.95rem', color: '#475569' }}>
              Showing <strong>{filteredTools.length}</strong> {filteredTools.length === 1 ? 'tool' : 'tools'}
              {selectedCategory !== 'all' && (
                <span> in <strong>{TOOL_CATEGORIES.find(c => c.key === selectedCategory)?.label}</strong></span>
              )}
              {searchQuery && (
                <span> matching &ldquo;{searchQuery}&rdquo;</span>
              )}
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                style={{ background: 'transparent', border: 'none', color: '#FF4E27', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset filters ✕
              </button>
            )}
          </div>

          {/* If No tools matched */}
          {filteredTools.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔎</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.5rem' }}>
                No tools matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Try searching for broader keywords like &ldquo;PDF&rdquo;, &ldquo;QR&rdquo;, &ldquo;GST&rdquo;, or &ldquo;Image&rdquo;.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="btn-primary"
                style={{ padding: '0.65rem 1.5rem', borderRadius: '999px', fontSize: '0.875rem' }}
              >
                View all 106 tools
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
              {filteredTools.map(tool => (
                <a
                  key={tool.id}
                  href={`/tools-standalone/${tool.slug}.html`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '18px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(11, 19, 42, 0.02)',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF4E27';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(255, 78, 39, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(11, 19, 42, 0.02)';
                  }}
                >
                  <div>
                    {/* Top Row: Icon + Category Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: '#475569',
                          backgroundColor: '#F1F5F9',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '999px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {tool.badge}
                      </span>
                    </div>

                    {/* Tool Name */}
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                      {tool.name}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.55, margin: 0 }}>
                      {tool.description}
                    </p>
                  </div>

                  {/* Bottom Action Row */}
                  <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#FF4E27', fontWeight: 800, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      Open Tool ➔
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                      100% Free
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CONSULTATION CTA BANNER */}
      <section className="container" style={{ marginTop: '5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0B132A 0%, #1E293B 100%)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', color: '#FF4E27', textTransform: 'uppercase' }}>
              NEED BESPOKE AUTOMATION?
            </span>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 900, lineHeight: 1.2, margin: '0.5rem 0 0.85rem' }}>
              Turn These Workflows Into Automated Growth Systems
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Business Volunteers builds custom web platforms, automated ERP/marketplace data pipelines, and full-funnel digital marketing for high-growth brands.
            </p>
          </div>

          <button
            onClick={onOpenStrategyModal}
            style={{
              backgroundColor: '#FF4E27',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.95rem 2rem',
              borderRadius: '999px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(255, 78, 39, 0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(255, 78, 39, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 78, 39, 0.4)';
            }}
          >
            Book Free Strategy Call ➔
          </button>
        </div>
      </section>
    </div>
  );
};

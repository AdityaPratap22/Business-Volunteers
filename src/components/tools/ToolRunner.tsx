import React, { useState, useEffect, useRef } from 'react';
import type { ToolMeta } from '../../data/toolsData';

interface ToolRunnerProps {
  tool: ToolMeta;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  const [iframeHeight, setIframeHeight] = useState<number>(750);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(Date.now());
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setIframeHeight(750);
    setIframeKey(Date.now());
  }, [tool.id]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'bv-tool-resize') {
        const h = Number(event.data.height);
        if (h && h > 300) {
          // Add smooth safety buffer
          setIframeHeight(Math.max(650, h + 24));
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey(Date.now());
  };

  const standaloneUrl = `/tools-standalone/${tool.slug}.html`;

  return (
    <div className="bv-tool-runner-wrap" style={{ width: '100%', position: 'relative' }}>
      {/* Top Runner Utility Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '0.75rem 1.25rem',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderBottom: 'none',
          borderRadius: '20px 20px 0 0',
          fontSize: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0B132A', fontWeight: 700 }}>
          <span style={{ fontSize: '1.1rem' }}>{tool.icon}</span>
          <span>{tool.name}</span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              backgroundColor: '#FFF1EE',
              color: '#FF4E27',
              padding: '0.15rem 0.55rem',
              borderRadius: '999px',
              textTransform: 'uppercase'
            }}
          >
            {tool.categoryLabel}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleReload}
            title="Reload Tool Workspace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#475569',
              backgroundColor: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>⟳</span> Reload
          </button>

          <a
            href={standaloneUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Fullscreen Standalone Tab"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#FF4E27',
              backgroundColor: '#FFF1EE',
              border: '1px solid #FFD8CF',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Fullscreen ↗</span>
          </a>
        </div>
      </div>

      {/* Main Sandbox Frame Container */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 10px 30px rgba(11, 19, 42, 0.04)',
          overflow: 'hidden'
        }}
      >
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              zIndex: 5,
              minHeight: '400px'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                border: '3px solid #FFF1EE',
                borderTopColor: '#FF4E27',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}
            />
            <p style={{ fontSize: '0.9rem', color: '#64748B', margin: 0, fontWeight: 600 }}>
              Preparing {tool.name}...
            </p>
          </div>
        )}

        <iframe
          ref={iframeRef}
          key={iframeKey}
          src={`${standaloneUrl}?embedded=true`}
          title={`${tool.name} — Business Volunteers`}
          onLoad={() => setIsLoading(false)}
          style={{
            width: '100%',
            height: `${iframeHeight}px`,
            border: 'none',
            display: 'block',
            transition: 'height 0.2s ease',
            backgroundColor: '#FFFFFF'
          }}
        />
      </div>
    </div>
  );
};

import { useRef, useEffect, useState } from 'react';

export function Carousel({ slides = 5, driveLink, driveLinkLabel, isAlt, openLightbox }) {
  const trackRef  = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const accent     = isAlt ? '#5B86A8' : '#E8512F';
  const accentSoft = isAlt ? 'rgba(91,134,168,.1)' : 'rgba(232,81,47,.1)';

  function updateCoverflow() {
    const track = trackRef.current;
    if (!track) return;
    const rect    = track.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    [...track.children].forEach(slide => {
      const r         = slide.getBoundingClientRect();
      const slideCX   = r.left + r.width / 2;
      const dist      = Math.abs(centerX - slideCX);
      const maxDist   = rect.width / 2 + r.width / 2;
      const ratio     = Math.max(0, 1 - dist / maxDist);
      slide.style.transform = `scale(${(0.82 + ratio * 0.18).toFixed(3)})`;
      slide.style.opacity   = (0.55 + ratio * 0.45).toFixed(3);
    });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track?.children[0]) return;
    const idx = Math.round(track.scrollLeft / (track.children[0].offsetWidth + 14));
    setActiveIdx(idx);
    updateCoverflow();
  }

  useEffect(() => {
    const timer = setTimeout(updateCoverflow, 50);
    const track = trackRef.current;
    if (!track) return () => clearTimeout(timer);
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      track.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollTo(dir) {
    const track = trackRef.current;
    if (!track?.children[0]) return;
    const w = track.children[0].offsetWidth + 14;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  }

  return (
    <div style={{ marginTop: 18 }}>
      {/* Slide track */}
      <div ref={trackRef} className="carousel-track">
        {Array.from({ length: slides }).map((_, i) => {
          const label = `IMG ${String(i + 1).padStart(2, '0')}`;
          return (
            <div
              key={i}
              className="carousel-slide"
              onClick={() => openLightbox?.(label)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
                style={{ width: 26, height: 26, opacity: .4, marginBottom: 8 }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Nav: dots + prev/next */}
      <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: slides }).map((_, i) => (
            <span key={i} style={{
              display: 'block',
              width: i === activeIdx ? 16 : 5, height: 5,
              borderRadius: i === activeIdx ? 3 : '50%',
              background: i === activeIdx ? accent : 'var(--color-tan)',
              transition: 'background .2s, width .2s',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[-1, 1].map(dir => (
            <button
              key={dir}
              onClick={() => scrollTo(dir)}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '1px solid var(--color-tan)', background: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 14,
                color: 'var(--text-primary)', transition: 'all .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color       = accent;
                e.currentTarget.style.background  = accentSoft;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-tan)';
                e.currentTarget.style.color       = 'var(--text-primary)';
                e.currentTarget.style.background  = '#FFFFFF';
              }}
            >
              {dir === -1 ? '←' : '→'}
            </button>
          ))}
        </div>
      </div>

      {/* Drive / external link */}
      {driveLink && (
        <a
          href={driveLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18,
            fontFamily: 'var(--font-mono)', fontSize: 12, color: accent,
            borderBottom: `1px solid ${accent}`, paddingBottom: 2, textDecoration: 'none',
          }}
        >
          {driveLinkLabel}
        </a>
      )}
    </div>
  );
}

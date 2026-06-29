import { useState } from 'react';
import { Carousel } from './Carousel';

export function TimelineRow({
  date, org, title, role,
  bullets = [], slides, driveLink, driveLinkLabel,
  isAlt = false, defaultOpen = false, openLightbox,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [hov,  setHov]  = useState(false);

  const primary = org || title;
  const accent  = isAlt ? '#5B86A8' : '#E8512F';

  return (
    <div
      className="tl-reveal"
      style={{
        borderBottom: `1px solid ${hov || open ? accent : 'var(--color-tan)'}`,
        transition: 'border-color .3s',
      }}
    >
      {/* Header row */}
      <div
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
          padding: '22px 0',
          paddingLeft: hov || open ? 14 : 0,
          transition: 'padding-left .3s',
        }}
      >
        <span className="tl-date-col">{date}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--text-primary)', lineHeight: 1.3,
          }}>{primary}</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: accent,
            letterSpacing: '.03em', marginTop: 2,
          }}>{role}</div>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 16,
          color: hov || open ? accent : 'var(--text-secondary)',
          display: 'inline-block',
          transition: 'transform .3s, color .3s',
          transform: open ? 'rotate(180deg)' : 'none',
        }}>↓</span>
      </div>

      {/* Expanded detail */}
      <div style={{
        maxHeight: open ? 900 : 0,
        overflow: 'hidden',
        transition: 'max-height .45s ease',
      }}>
        <div style={{ paddingBottom: 40 }}>
          {bullets.length > 0 && (
            <ul style={{ listStyle: 'none', marginBottom: 0, maxWidth: 600 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{
                  fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7,
                  paddingLeft: 18, position: 'relative', marginBottom: 8,
                }}>
                  <span style={{ position: 'absolute', left: 0, color: accent }}>~</span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {slides > 0 && (
            <Carousel
              slides={slides}
              driveLink={driveLink}
              driveLinkLabel={driveLinkLabel}
              isAlt={isAlt}
              openLightbox={openLightbox}
            />
          )}

          {slides <= 0 && driveLink && (
            <a href={driveLink} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18,
              fontFamily: 'var(--font-mono)', fontSize: 12, color: accent,
              borderBottom: `1px solid ${accent}`, paddingBottom: 2, textDecoration: 'none',
            }}>
              {driveLinkLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

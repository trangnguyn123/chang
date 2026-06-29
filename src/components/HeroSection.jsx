import { motion } from 'motion/react';
import { Eyebrow } from './Eyebrow';

const up = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeInOut', delay },
});

export function HeroSection({ t }) {
  const h = t.hero;
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh', padding: '0 var(--page-gutter)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingTop: 'calc(var(--header-height) + 40px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <motion.div {...up(0.05)}>
        <Eyebrow>{h.eyebrow}</Eyebrow>
      </motion.div>

      <motion.h1
        {...up(0.15)}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 'clamp(36px, 9vw, 128px)', lineHeight: .95,
          letterSpacing: '-.02em',
          marginTop: 18, marginBottom: 28, color: 'var(--text-primary)', maxWidth: 1000,
        }}
      >
        {h.titleLines.map((line, i) => (
          <span key={i}>
            {i === h.titleLines.length - 1
              ? <em style={{ fontStyle: 'italic', color: 'var(--text-accent)', fontWeight: 500 }}>{line}</em>
              : line}
            {i < h.titleLines.length - 1 && <br />}
          </span>
        ))}
      </motion.h1>

      <motion.p
        {...up(0.25)}
        style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 4vw, 18px)',
          color: 'var(--text-secondary)',
          maxWidth: 560, lineHeight: 1.6, marginBottom: 48,
        }}
      >
        {h.sub}
      </motion.p>

      <motion.div
        {...up(0.35)}
        style={{ display: 'flex', gap: 'clamp(20px, 5vw, 48px)', flexWrap: 'wrap', alignItems: 'flex-start' }}
      >
        {h.meta.map(m => (
          <div key={m.label}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)',
              letterSpacing: '.04em',
            }}>{m.label}</div>
            <strong style={{
              display: 'block', fontFamily: 'var(--font-body)', fontSize: 15,
              fontWeight: 600, color: 'var(--text-primary)', marginTop: 4,
            }}>{m.value}</strong>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
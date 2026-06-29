import { SectionHeading } from './SectionHeading';
import { FadeIn } from './FadeIn';

export function ContactSection({ t }) {
  const c = t.contact;
  return (
    <section
      id="contact"
      style={{ borderTop: '0.943px solid var(--border-default)', padding: 'var(--v-pad-sm) var(--page-gutter) var(--v-pad)' }}
    >
      <FadeIn y={-20}>
        <SectionHeading number={c.number} title={c.title} />
      </FadeIn>

      {/* Big dramatic lift for the CTA */}
      <FadeIn y={56} delay={0.1} style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 'clamp(40px, 7vw, 84px)', lineHeight: 1.05, maxWidth: 760,
        marginBottom: 56, color: 'var(--text-primary)',
      }}>
        {c.ctaLines.map((line, i) => (
          <span key={i}>
            {i === c.ctaLines.length - 1 ? <em style={{ fontStyle: 'italic', color: 'var(--text-accent)' }}>{line}</em> : line}
            {i < c.ctaLines.length - 1 && <br />}
          </span>
        ))}
      </FadeIn>

      <FadeIn
        y={32}
        delay={0.22}
        style={{ display: 'flex', gap: 44, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <a
          href={c.gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)',
            textDecoration: 'none', borderBottom: '1px solid var(--border-default)',
            paddingBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'color .2s, border-color .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#E8512F';
            e.currentTarget.style.borderBottomColor = '#E8512F';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderBottomColor = 'var(--border-default)';
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
            style={{ width: 16, height: 16 }}>
            <path d="M3 5h18v14H3z"/>
            <path d="M3 6l9 7 9-7"/>
          </svg>
          {c.email}
        </a>

        <a
          href={c.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)',
            textDecoration: 'none', borderBottom: '1px solid var(--border-default)',
            paddingBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'color .2s, border-color .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#E8512F';
            e.currentTarget.style.borderBottomColor = '#E8512F';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderBottomColor = 'var(--border-default)';
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-1 0-1.7-.7-1.7-1.6s.7-1.6 1.7-1.6c1 0 1.7.7 1.7 1.6s-.7 1.6-1.7 1.6zm13.5 10.3h-3v-4.8c0-1.2-.4-2-1.5-2-.8 0-1.3.5-1.5 1-.1.2-.1.5-.1.8v5h-3s.1-8.1 0-9h3v1.3c.4-.6 1.1-1.4 2.7-1.4 2 0 3.4 1.3 3.4 4v5.1z"/>
          </svg>
          {c.linkedinLabel}
        </a>

        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)',
        }}>{c.location}</span>
      </FadeIn>
    </section>
  );
}

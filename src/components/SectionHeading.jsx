export function SectionHeading({ number, title, accent = 'primary' }) {
  const color = accent === 'alt' ? 'var(--accent-secondary)' : 'var(--text-accent)';
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color }}>
        {number}
      </span>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 'clamp(32px, 4vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.5,
      }}>
        {title}
      </h2>
    </div>
  );
}

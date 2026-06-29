export function Eyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 28, height: 1, background: 'var(--accent-primary)', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: 'var(--text-accent)', letterSpacing: '0.15em',
      }}>
        {children}
      </span>
    </div>
  );
}

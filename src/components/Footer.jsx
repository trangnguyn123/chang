export function Footer({ t }) {
  const f = t.footer;
  return (
    <footer style={{
      borderTop: '0.943px solid var(--border-default)',
      padding: '32px var(--page-gutter)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      position: 'relative', zIndex: 2,
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
        {f.copy}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
        {f.role}
      </span>
    </footer>
  );
}

export function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)',
          letterSpacing: '0.12em', whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: '0.943px', background: 'var(--border-default)' }} />
    </div>
  );
}

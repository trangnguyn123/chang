const ICONS = {
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E8512F" strokeWidth="1.5">
      <rect x="2" y="5" width="14" height="14" rx="1"/>
      <path d="M16 9l5-3v12l-5-3"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E8512F" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E8512F" strokeWidth="1.5">
      <path d="M4 19V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2z"/>
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E8512F" strokeWidth="1.5">
      <path d="M5 4l14 8-14 8V4z"/>
    </svg>
  ),
};

export function FilmCard({ tag, title, role, icon = 'video' }) {
  return (
    <div className="reveal-item" style={{ flex: '1 1 0', minWidth: 0 }}>
      <div className="frame">
        {/* Sprocket holes */}
        <div className="sprockets left">
          {[0,1,2,3,4].map(i => <div key={i} />)}
        </div>
        <div className="sprockets right">
          {[0,1,2,3,4].map(i => <div key={i} />)}
        </div>

        <div className="frame-inner">
          <div className="frame-visual">
            {ICONS[icon] || ICONS.video}
          </div>
          <div className="frame-tag">{tag}</div>
          <div className="frame-title">{title}</div>
          <div className="frame-role">{role}</div>
        </div>
      </div>
    </div>
  );
}

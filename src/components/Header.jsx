import { useState } from 'react';

export function Header({ lang, setLang, t, onNav, active }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(id) {
    setMenuOpen(false);
    onNav(id);
  }

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 'var(--header-height)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        background: 'linear-gradient(to bottom, rgba(245,240,230,.92), rgba(245,240,230,0))',
        borderBottom: '0.943px solid transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--page-gutter)',
      }}>
        <button
          onClick={() => handleNav('hero')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20,
            color: 'var(--text-primary)', letterSpacing: '.02em', flexShrink: 0,
          }}
        >
          CHANGG<span style={{ color: 'var(--text-accent)' }}>.</span>
        </button>

        {/* Desktop nav */}
        <nav className="header-nav-desktop">
          {t.nav.links.map(link => (
            <NavLink
              key={link.id}
              label={link.label}
              active={active === link.id}
              onClick={() => handleNav(link.id)}
            />
          ))}
        </nav>

        {/* Right cluster: lang toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            borderRadius: 20, border: '0.943px solid var(--border-default)',
            padding: '6px 4px', gap: 2, flexShrink: 0,
          }}>
            {['EN', 'VI'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: lang === l ? '#fff' : 'var(--text-secondary)',
                  background: lang === l ? 'var(--accent-primary)' : 'transparent',
                  border: 'none', borderRadius: 16, padding: '4px 10px', cursor: 'pointer',
                  transition: 'background .2s, color .2s',
                }}
              >{l}</button>
            ))}
          </div>

          {/* Hamburger — visible on mobile only via CSS */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
                style={{ width: 20, height: 20, display: 'block' }}>
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
                style={{ width: 20, height: 20, display: 'block' }}>
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile slide-down nav drawer */}
      <div className={`nav-mobile-drawer${menuOpen ? ' open' : ''}`}>
        {t.nav.links.map(link => (
          <button
            key={link.id}
            className="nav-mobile-link"
            onClick={() => handleNav(link.id)}
            style={{
              color: active === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}

function NavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        position: 'relative', transition: 'color .25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      {label}
      <span style={{
        position: 'absolute', left: 0, bottom: 0, height: 1,
        width: active ? '100%' : '0%',
        background: 'var(--accent-primary)',
        transition: 'width .25s',
        display: 'block',
      }} />
    </button>
  );
}

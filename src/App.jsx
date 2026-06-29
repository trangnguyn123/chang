import { useState, useEffect, useCallback } from 'react';
import { resolveContent } from './content';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ReelsSection } from './components/ReelsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectSection } from './components/ProjectSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const CONTENT = resolveContent();

export default function App() {
  const [lang, setLang]         = useState(() => localStorage.getItem('changg_lang') || 'EN');
  const [active, setActive]     = useState('');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    localStorage.setItem('changg_lang', lang);
    document.documentElement.lang = lang === 'VI' ? 'vi' : 'en';
  }, [lang]);

  useEffect(() => {
    const saved = localStorage.getItem('changg_scroll');
    if (saved) window.scrollTo(0, parseInt(saved, 10));
    const onScroll = () => localStorage.setItem('changg_scroll', String(window.scrollY));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Parallax aurora orbs + header scroll state
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    function applyParallax() {
      const y = window.scrollY;
      root.style.setProperty('--y1', (y * 0.12) + 'px');
      root.style.setProperty('--y2', (y * -0.08) + 'px');
      root.style.setProperty('--y3', (y * 0.18) + 'px');
      document.querySelector('header')?.classList.toggle('scrolled', y > 40);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    applyParallax();

    // Section tint: shift orb opacity as user scrolls through sections
    const sectionTint = {
      hero:       { op1: .35, op2: .18, op3: .12 },
      experience: { op1: .18, op2: .32, op3: .22 },
      project:    { op1: .22, op2: .3,  op3: .28 },
      contact:    { op1: .32, op2: .2,  op3: .16 },
    };

    function setTint(t) {
      root.style.setProperty('--op1', t.op1);
      root.style.setProperty('--op2', t.op2);
      root.style.setProperty('--op3', t.op3);
    }

    const sectionIds   = ['experience', 'project', 'contact'];
    const sectionEls   = [
      document.querySelector('.hero-section'),
      ...sectionIds.map(id => document.getElementById(id)),
    ];
    const tintKeys = ['hero', ...sectionIds];

    const observers = sectionEls.map((el, i) => {
      if (!el) return null;
      const key = tintKeys[i];
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) setTint(sectionTint[key]); });
      }, { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });

    setTint(sectionTint.hero);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  // Reveal-on-scroll observer (runs after every render so new language switches pick up elements)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-item, .tl-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.25 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  const openLightbox  = useCallback(label => setLightbox(label), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const t = CONTENT[lang.toLowerCase()] || CONTENT.en;

  function onNav(id) {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActive('');
      return;
    }
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {/* Aurora gradient background */}
      <div className="bg-fx">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grain" />

      <Header lang={lang} setLang={setLang} t={t} onNav={onNav} active={active} />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection t={t} />
        <AboutSection t={t} />
        <ReelsSection t={t} />
        <ExperienceSection t={t} openLightbox={openLightbox} />
        <ProjectSection t={t} openLightbox={openLightbox} />
        <ContactSection t={t} />
      </main>

      <Footer t={t} />

      {/* Global lightbox */}
      {lightbox && (
        <div
          className="lightbox open"
          onClick={e => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <div className="lightbox-inner">
            <div className="lightbox-content">
              <button className="lightbox-close" onClick={closeLightbox}>✕</button>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
                style={{ width: 60, height: 60, opacity: .4, marginBottom: 14, position: 'relative' }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <span style={{ position: 'relative' }}>{lightbox}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

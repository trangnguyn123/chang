import { SectionHeading } from './SectionHeading';
import { FadeIn } from './FadeIn';

export function AboutSection({ t }) {
  const a = t.about;

  return (
    <section
      id="about-me"
      style={{ borderTop: '0.943px solid var(--border-default)', padding: 'var(--v-pad) var(--page-gutter)' }}
    >
      {/* Heading drops in from above */}
      <FadeIn y={-24}>
        <SectionHeading number={a.number} title={a.title} />
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)',
          marginBottom: 48, maxWidth: 520, marginTop: -8,
        }}>{a.sub}</p>
      </FadeIn>

      <div className="about-grid">
        {/* Left col slides in from the left */}
        <FadeIn x={-32} y={0} delay={0.1}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 38px)' }}>
            {a.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-accent)',
            letterSpacing: '.04em', marginTop: 6, marginBottom: 20,
          }}>{a.nick}</div>

          <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 520 }}>
            {a.preface}
          </p>

          {/* YouTube embed */}
          <div style={{
            position: 'relative', width: '100%', maxWidth: 520, aspectRatio: '16/9',
            marginTop: 24, borderRadius: 10, overflow: 'hidden',
            border: '1px solid var(--border-default)', background: '#000',
          }}>
            <iframe
              src={`https://www.youtube.com/embed/${a.videoId}`}
              title="Intro video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 40, marginTop: 28, flexWrap: 'wrap' }}>
            <div>
              <span style={{
                display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4,
              }}>{a.basedInLabel}</span>
              <span style={{ fontSize: 14 }}>{a.basedIn}</span>
            </div>
            <div>
              <span style={{
                display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4,
              }}>{a.interestLabel}</span>
              <span style={{ fontSize: 14 }}>{a.interest}</span>
            </div>
          </div>

          <SkillBlock label={a.professionalSkillsLabel} skills={a.professionalSkills} />
          <SkillBlock label={a.softSkillsLabel} skills={a.softSkills} />

          {/* Career goals */}
          <div style={{ marginTop: 32 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)',
              textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12,
            }}>{a.goalsLabel}</div>
            <ul style={{ listStyle: 'none', maxWidth: 480 }}>
              {a.goals.map((g, i) => (
                <li key={i} style={{
                  fontSize: 13.5, color: 'var(--text-secondary)', paddingLeft: 16,
                  position: 'relative', marginBottom: 8, lineHeight: 1.5,
                }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--text-accent)' }}>~</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Right col slides in from the right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <FadeIn x={32} y={0} delay={0.15}>
            <div style={{
              background: '#FFFFFF', border: '1px solid var(--border-default)',
              borderRadius: 10, padding: 28,
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-link)',
                letterSpacing: '.06em', marginBottom: 8,
              }}>{a.educationTag}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600 }}>
                {a.educationSchool}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>
                {a.educationMajor}
              </div>
              <div style={{ fontSize: 14, marginTop: 14 }}>
                {a.educationGpaLabel} <strong>{a.educationGpa}</strong> / 4.0
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 6 }}>
                {a.educationStrength}
              </div>
            </div>
          </FadeIn>

          <FadeIn x={32} y={0} delay={0.28}>
            <div style={{
              background: '#FFFFFF', border: '1px solid var(--border-default)',
              borderRadius: 10, padding: 28,
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)',
                textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12,
              }}>{a.certsLabel}</div>
              <ul style={{ listStyle: 'none' }}>
                {a.certs.map((c, i) => (
                  <li key={i} style={{
                    fontSize: 13.5, color: 'var(--text-secondary)', paddingLeft: 16,
                    position: 'relative', marginBottom: 8, lineHeight: 1.5,
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--text-accent)' }}>~</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function SkillBlock({ label, skills }) {
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)',
        textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12,
      }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {skills.map((s, i) => (
          <span key={i} style={{
            fontSize: 12.5, fontFamily: 'var(--font-mono)', padding: '6px 12px',
            border: '1px solid var(--border-default)', borderRadius: 20,
            color: 'var(--text-primary)', background: '#FFFFFF',
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

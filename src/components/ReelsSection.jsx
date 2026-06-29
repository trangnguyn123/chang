import { FilmCard } from './FilmCard';
import { FadeIn } from './FadeIn';

export function ReelsSection({ t }) {
  const r = t.reels;
  return (
    <div className="stack-reel">
      <FadeIn y={12}>
        <div className="reel-label">{r.sectionLabel}</div>
      </FadeIn>
      {/* Filmstrip scales up from slightly smaller */}
      <FadeIn scale={0.94} y={0} delay={0.1}>
        <div className="filmstrip-row">
          {r.items.map((item, i) => <FilmCard key={i} {...item} />)}
        </div>
      </FadeIn>
    </div>
  );
}

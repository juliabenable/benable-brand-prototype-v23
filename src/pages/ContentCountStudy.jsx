import '../styles/content-study.css';
import '../styles/content-count-study.css';
import { ContentSpotlight } from '../components/glowlove/glowLoveSlides.jsx';

/**
 * Design study — the wrap's CONTENT carousel at low counts (1, 2, 3, 4).
 * Left: the current 3D coverflow (frozen on the first card). Right: a
 * recommended centered "gallery" — a static, balanced row that doesn't
 * rely on the coverflow's wrap math (which goes lopsided below ~5 cards).
 */

function StageCard({ children }) {
  return (
    <div className="ccs-box">
      <div className="gl-stage gl-grad--f">
        <div className="gl-body">{children}</div>
      </div>
    </div>
  );
}

function Study({ id, title, desc, children }) {
  return (
    <section className="cst-study">
      <div className="cst-study__label"><span className="cst-study__id">{id}</span><b>{title}</b><small>{desc}</small></div>
      {children}
    </section>
  );
}

export default function ContentCountStudy() {
  const counts = [1, 2, 3, 4];
  return (
    <div className="cst">
      <header className="cst-top">
        <span className="cst-top__kicker">Benable · Campaign Wrapped</span>
        <h1>Content carousel — 1 to 4 pieces</h1>
        <p>The content slide uses a 3D coverflow built for ~10+ pieces. With only a few it goes lopsided (empty or uneven sides, a flip animation that barely moves). For each count below: <b>left</b> is the current coverflow, <b>right</b> is a recommended centered <b>gallery</b> — a static, balanced row that reads as a deliberate set. The headline count adapts too (“1 new piece”, “2 new pieces”…).</p>
      </header>

      <div className="cst-rec">
        <b>Recommendation — switch layout on piece count:</b>
        <ul>
          <li><code>≥ 5</code> → keep the coverflow (it needs the depth to look good)</li>
          <li><code>2–4</code> → centered gallery: an even, balanced row, every card full-size</li>
          <li><code>1</code> → a single hero card, centered (no carousel at all)</li>
        </ul>
      </div>

      {counts.map((n) => (
        <Study key={n} id={`${n}`} title={`${n} content piece${n === 1 ? '' : 's'}`} desc={n === 1 ? 'A carousel of one — the coverflow has nothing to flank it.' : 'Coverflow sides go uneven; the gallery stays balanced.'}>
          <div className="ccs-pair">
            <div className="ccs-col">
              <div className="ccs-cap"><b>Current</b> — coverflow</div>
              <StageCard><ContentSpotlight maxItems={n} staticIdx={0} /></StageCard>
            </div>
            <div className="ccs-col">
              <div className="ccs-cap"><b>Recommended</b> — centered gallery</div>
              <StageCard><ContentSpotlight maxItems={n} layout="gallery" /></StageCard>
            </div>
          </div>
        </Study>
      ))}

      <footer className="cst-foot">Content carousel · low-count study. Tell me the threshold (default: gallery below 5 pieces) and I’ll wire it into the live Content slide.</footer>
    </div>
  );
}

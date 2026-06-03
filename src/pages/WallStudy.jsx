import '../styles/content-study.css';
import '../styles/wall-study.css';
import { avColor } from '../data/wrappedComments.js';

/**
 * Design study — Campaign Wrapped, "Wall of Love" when a campaign has
 * FEWER THAN 8 comments. The production wall is a 4-col grid + overflow
 * fade tuned for ~40+ comments; with a handful it looks sparse and the
 * fade covers nothing. These directions celebrate a small set instead.
 */

// A representative handful of real first-campaign comments (max 7).
const PICKS = [
  { t: 'Your skin looks so smooth and glowy!!✨😍 I need to try @28litsea 😍😍', u: 'alondraambrizm', p: 'tt' },
  { t: 'that glow from the body oil is insane', u: 'mollymmcqueen', p: 'tt' },
  { t: 'Almond scent??? Omg yes pls!!', u: 'brittnirosalie', p: 'tt' },
  { t: 'The body oil is giving glow show!', u: '11lisamariet', p: 'tt' },
  { t: 'Omgsh you are glowing! Need this!', u: 'lyindalynn', p: 'tt' },
  { t: 'Cute packaging and that glow 🤌', u: 'thattwinmomrn', p: 'tt' },
  { t: '✨I wish I could smell it!! It looks amazing!', u: 'clairethebear11', p: 'ig' },
];

const TILT = ['-1.4deg', '1.2deg', '-1deg', '1.6deg', '-1.6deg', '1deg', '-0.8deg'];
const PLAT = (p) => (p === 'tt' ? '♪' : '◎');

function mention(t) {
  return t.split(/(@[\w.]+)/g).map((part, i) =>
    part.startsWith('@') ? <span key={i} className="m">{part}</span> : part);
}

function Card({ c, t }) {
  return (
    <div className="wsl-card" style={{ '--t': t }}>
      <span className={`wsl-card__plat ${c.p === 'tt' ? 'tt' : 'ig'}`}>{PLAT(c.p)}</span>
      <div className="wsl-card__row">
        <span className="wsl-card__av" style={{ background: avColor(c.u) }}>{c.u[0].toUpperCase()}</span>
        <div className="wsl-card__b">
          <div className="wsl-card__u">@{c.u}</div>
          <div className="wsl-card__t">{mention(c.t)}</div>
        </div>
      </div>
    </div>
  );
}

function Head({ count }) {
  return (
    <div className="wsl-head">
      <span className="wsl-eyebrow">Real excitement, great engagement</span>
      <h3>{count} comments. <em>All love.</em></h3>
    </div>
  );
}

/* A — centered single column */
function DirColumn({ items }) {
  return (
    <div className="wsl-stage">
      <Head count={items.length} />
      <div className="wsl-column">
        {items.map((c, i) => <Card key={i} c={c} t={TILT[i % TILT.length]} />)}
      </div>
    </div>
  );
}

/* B — centered 2-col cluster (tight variant when ≤3) */
function DirCluster({ items }) {
  const tight = items.length <= 3;
  return (
    <div className="wsl-stage">
      <Head count={items.length} />
      <div className={`wsl-cluster${tight ? ' wsl-cluster--tight' : ''}`}>
        {items.map((c, i) => <Card key={i} c={c} t={TILT[i % TILT.length]} />)}
      </div>
    </div>
  );
}

/* C — hero pull-quote + supporting chips */
function DirHero({ items }) {
  const [hero, ...rest] = items;
  return (
    <div className="wsl-stage">
      <Head count={items.length} />
      <div className="wsl-hero">
        <span className="wsl-hero__mark" aria-hidden="true">&ldquo;</span>
        <div className="wsl-hero__q">{mention(hero.t)}</div>
        <div className="wsl-hero__who">
          <span className="wsl-hero__av" style={{ background: avColor(hero.u) }}>{hero.u[0].toUpperCase()}</span>
          @{hero.u}
        </div>
      </div>
      {rest.length > 0 && (
        <div className="wsl-hero__rest">
          {rest.slice(0, 3).map((c, i) => <Card key={i} c={c} t={TILT[(i + 1) % TILT.length]} />)}
        </div>
      )}
    </div>
  );
}

/* D — authentic phone comment thread */
function DirPhone({ items }) {
  return (
    <div className="wsl-stage">
      <Head count={items.length} />
      <div className="wsl-phone">
        <div className="wsl-phone__top">{items.length} comments</div>
        {items.map((c, i) => (
          <div key={i} className="wsl-phone__c">
            <span className="wsl-phone__av" style={{ background: avColor(c.u) }}>{c.u[0].toUpperCase()}</span>
            <div>
              <div className="wsl-phone__u">@{c.u}</div>
              <div className="wsl-phone__t">{mention(c.t)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* E — scatter / collage (intentionally composed) */
const SCATTER = [
  { left: '4%', top: '6%' }, { left: '52%', top: '0%' },
  { left: '26%', top: '40%' }, { left: '2%', top: '58%' }, { left: '54%', top: '52%' },
];
function DirScatter({ items }) {
  return (
    <div className="wsl-stage">
      <Head count={items.length} />
      <div className="wsl-scatter">
        <span className="wsl-spk" style={{ left: '46%', top: '34%', fontSize: 22 }}>✦</span>
        <span className="wsl-spk" style={{ left: '14%', top: '40%', fontSize: 14 }}>✦</span>
        <span className="wsl-spk" style={{ left: '88%', top: '20%', fontSize: 16 }}>✦</span>
        {items.slice(0, SCATTER.length).map((c, i) => (
          <div key={i} className="wsl-card" style={{ ...SCATTER[i], transform: `rotate(${TILT[i % TILT.length]})` }}>
            <span className={`wsl-card__plat ${c.p === 'tt' ? 'tt' : 'ig'}`}>{PLAT(c.p)}</span>
            <div className="wsl-card__row">
              <span className="wsl-card__av" style={{ background: avColor(c.u) }}>{c.u[0].toUpperCase()}</span>
              <div className="wsl-card__b">
                <div className="wsl-card__u">@{c.u}</div>
                <div className="wsl-card__t">{mention(c.t)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Study({ id, title, desc, theme = 'love', children }) {
  return (
    <section className="cst-study">
      <div className="cst-study__label"><span className="cst-study__id">{id}</span><b>{title}</b><small>{desc}</small></div>
      <div className={`cst-card cst-card--${theme}`}>
        <div className="cst-chrome">
          <div className="cst-chrome__bars">{[...Array(8)].map((_, i) => <span key={i} className={i === 4 ? 'on' : ''} />)}</div>
          <div className="cst-chrome__head"><span className="cst-chrome__dot" />28 LITSEA · WRAPPED</div>
        </div>
        <div className="cst-card__body">{children}</div>
      </div>
    </section>
  );
}

export default function WallStudy() {
  const five = PICKS.slice(0, 5);
  return (
    <div className="cst">
      <header className="cst-top">
        <span className="cst-top__kicker">Benable · Campaign Wrapped</span>
        <h1>Wall of Love — when there are fewer than 8 comments</h1>
        <p>The live wall is a 4-column grid + bottom fade tuned for 40+ comments — great when there are many, but with a handful it looks sparse and the fade covers nothing. Five directions below celebrate a small set instead. Each is shown at 5 comments; the recommended direction is also shown at 3 and 7.</p>
      </header>

      <div className="cst-rec">
        <b>Recommendation — make it adaptive on comment count:</b>
        <ul>
          <li><code>≥ 8</code> → keep today&rsquo;s grid + overflow fade (it earns the &ldquo;so much love&rdquo; read)</li>
          <li><code>4–7</code> → <b>Direction B</b> (centered 2-col cluster) — full but never sparse</li>
          <li><code>1–3</code> → <b>Direction C</b> (hero pull-quote) — turns a few comments into a featured moment</li>
        </ul>
      </div>

      <Study id="A" title="Centered column" desc="Single centered stack of larger cards, gentle alternating tilt. Simplest; reads as a short testimonial list.">
        <DirColumn items={five} />
      </Study>

      <Study id="B" title="Centered 2-col cluster" desc="Larger cards clustered at center (not stretched full-width). Recommended for 4–7.">
        <DirCluster items={five} />
      </Study>

      <Study id="C" title="Hero pull-quote + chips" desc="Feature the standout comment as a serif pull-quote, a few supporting chips below. Recommended for 1–3.">
        <DirHero items={five} />
      </Study>

      <Study id="D" title="Phone comment thread" desc="The comments inside a single phone thread mock — authentic, naturally handles any small count.">
        <DirPhone items={five} />
      </Study>

      <Study id="E" title="Scatter / collage" desc="A few cards artfully scattered & overlapping with sparkle accents, so the space feels composed rather than empty.">
        <DirScatter items={five} />
      </Study>

      <header className="cst-top" style={{ marginTop: 18 }}>
        <h1 style={{ fontSize: 26 }}>Robustness — recommended directions at other counts</h1>
        <p>How the recommended layouts hold up as the count shrinks or grows within the &lt;8 range.</p>
      </header>

      <Study id="C·1" title="Hero — 1 comment" desc="Single comment: pure pull-quote, no chips. The strongest small-count case.">
        <DirHero items={PICKS.slice(0, 1)} />
      </Study>

      <Study id="B·3" title="Cluster — 3 comments" desc="Tight variant collapses to a centered single column so 3 never looks like a broken grid.">
        <DirCluster items={PICKS.slice(0, 3)} />
      </Study>

      <Study id="B·7" title="Cluster — 7 comments" desc="Upper edge of the range — still centered and full, just before the grid takes over at 8.">
        <DirCluster items={PICKS.slice(0, 7)} />
      </Study>

      <footer className="cst-foot">Wall of Love · low-count study. Tell me which direction to build into the deck (and confirm the 8-comment threshold).</footer>
    </div>
  );
}

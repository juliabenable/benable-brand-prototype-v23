import '../styles/content-study.css';
import '../styles/wall-study.css';
import { avColor } from '../data/wrappedComments.js';

/**
 * Design study — Campaign Wrapped, "Wall of Love" when a campaign has
 * FEWER THAN 8 comments. The production wall is a 4-col grid + overflow
 * fade tuned for ~40+ comments; with a handful it looks sparse and the
 * fade covers nothing. These directions celebrate a small set instead.
 */

// A representative set of real first-campaign comments (up to 10).
const PICKS = [
  { t: 'Your skin looks so smooth and glowy!!✨😍 I need to try @28litsea 😍😍', u: 'alondraambrizm', p: 'tt' },
  { t: 'that glow from the body oil is insane', u: 'mollymmcqueen', p: 'tt' },
  { t: 'Almond scent??? Omg yes pls!!', u: 'brittnirosalie', p: 'tt' },
  { t: 'The body oil is giving glow show!', u: '11lisamariet', p: 'tt' },
  { t: 'Omgsh you are glowing! Need this!', u: 'lyindalynn', p: 'tt' },
  { t: 'Cute packaging and that glow 🤌', u: 'thattwinmomrn', p: 'tt' },
  { t: '✨I wish I could smell it!! It looks amazing!', u: 'clairethebear11', p: 'ig' },
  { t: 'Loving that glow ✨💕', u: 'kayfordayss', p: 'tt' },
  { t: 'Oh wow! I need to try this', u: 'stephriveraxo', p: 'tt' },
  { t: 'Gosh the instant glow 🤩🤩🤩', u: 'linnyboo88', p: 'tt' },
];

const TILT = ['-1.4deg', '1.2deg', '-1deg', '1.6deg', '-1.6deg', '1deg', '-0.8deg', '1.3deg', '-1.2deg', '0.9deg'];
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
      <h3>{count} comment{count === 1 ? '' : 's'}. <em>All love.</em></h3>
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

/* B — centered 2-col cluster. A lone comment shows as one wide card;
   everything else is 2-col with the odd card centering on its last row. */
function DirCluster({ items }) {
  const tight = items.length === 1;
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
  const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="cst">
      <header className="cst-top">
        <span className="cst-top__kicker">Benable · Campaign Wrapped</span>
        <h1>Wall of Love — Direction B, comments 1 → 10</h1>
        <p>Direction B (centered 2-col cluster) at every count from 1 to 10. A lone comment shows as one wide card; from 2 up it&rsquo;s a centered 2-column cluster with the odd card centering on its last row — full and balanced at every count, never the sparse-grid look. Other directions explored are at the bottom for reference.</p>
      </header>

      <div className="cst-rec">
        <b>How B scales across 1–10:</b>
        <ul>
          <li><code>1</code> → one wide centered card</li>
          <li><code>2–10</code> → centered 2-col cluster; an odd final card centers on its own row</li>
          <li><code>8–10</code> → still tidy at 4–5 rows; this is also where you could hand off to the original grid if you prefer the &ldquo;wall&rdquo; read</li>
        </ul>
      </div>

      {counts.map((n) => (
        <Study key={n} id={`B·${n}`} title={`${n} comment${n === 1 ? '' : 's'}`} desc={n === 1 ? 'Single wide card, centered.' : `Centered 2-col cluster${n % 2 ? ' — odd card centers on the last row' : ''}.`}>
          <DirCluster items={PICKS.slice(0, n)} />
        </Study>
      ))}

      <header className="cst-top" style={{ marginTop: 28 }}>
        <h1 style={{ fontSize: 26 }}>Other directions explored (at 5 comments)</h1>
        <p>Kept for reference — the directions that didn&rsquo;t win.</p>
      </header>

      <Study id="A" title="Centered column" desc="Single centered stack of larger cards, gentle alternating tilt. Simplest; reads as a short testimonial list.">
        <DirColumn items={five} />
      </Study>

      <Study id="C" title="Hero pull-quote + chips" desc="Feature the standout comment as a serif pull-quote, a few supporting chips below.">
        <DirHero items={five} />
      </Study>

      <Study id="D" title="Phone comment thread" desc="The comments inside a single phone thread mock — authentic, naturally handles any small count.">
        <DirPhone items={five} />
      </Study>

      <Study id="E" title="Scatter / collage" desc="A few cards artfully scattered & overlapping with sparkle accents, so the space feels composed rather than empty.">
        <DirScatter items={five} />
      </Study>

      <footer className="cst-foot">Wall of Love · Direction B across 1–10. Tell me if you want it wired into the deck and where to hand off to the grid (if at all).</footer>
    </div>
  );
}

// ui.jsx — Tokens, helpers et petits composants partagés

// Palettes — sombre (par défaut) et claire. T est muté par applyTheme()
// pour que tous les `T.x` lus au rendu suivent le thème choisi (Tweaks).
const DARK = {
  bg:       '#0B0E16',
  surface:  '#151A26',
  surface2: '#1C2231',
  line:     'rgba(255,255,255,0.09)',
  lineSoft: 'rgba(255,255,255,0.05)',
  text:     '#F3F5FA',
  body:     'rgba(243,245,250,0.86)',
  muted:    'rgba(233,237,246,0.56)',
  faint:    'rgba(233,237,246,0.34)',
};
const LIGHT = {
  bg:       '#F6F7FB',
  surface:  '#FFFFFF',
  surface2: '#EEF1F7',
  line:     'rgba(16,22,40,0.10)',
  lineSoft: 'rgba(16,22,40,0.06)',
  text:     '#141A2A',
  body:     'rgba(20,26,42,0.84)',
  muted:    'rgba(40,48,68,0.62)',
  faint:    'rgba(40,48,68,0.40)',
};
const T = { ...DARK };
let THEME = 'dark';
const applyTheme = (mode) => {
  THEME = mode === 'light' ? 'light' : 'dark';
  Object.assign(T, THEME === 'light' ? LIGHT : DARK);
};
const themeMode = () => THEME;

// Accent en oklch, piloté par une teinte (hue). Lumière/chroma constants.
const accent = (hue, { l = 0.72, c = 0.155, a = 1 } = {}) =>
  `oklch(${l} ${c} ${hue}${a < 1 ? ` / ${a}` : ''})`;

// Teinte d'accent de l'app (chrome neutre : accueil, quiz, progression).
// Pilotée par les Tweaks ; les filières gardent toujours leur propre teinte.
let APP_HUE = 280;
const appHue = () => APP_HUE;
const setAppHue = (h) => { APP_HUE = h; };
const GLOW = { on: true };
const glowOn = () => GLOW.on;
const setGlowOn = (v) => { GLOW.on = v; };

const FONT_DISPLAY = '"Space Grotesk", -apple-system, system-ui, sans-serif';
const FONT_UI = '"Manrope", -apple-system, system-ui, sans-serif';

// Bouton principal pleine largeur
function PrimaryBtn({ children, onClick, hue = 280, style = {} }) {
  const [down, setDown] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerLeave={() => setDown(false)}
      style={{
        width: '100%', border: 'none', cursor: 'pointer',
        borderRadius: 18, padding: '17px 20px',
        fontFamily: FONT_UI, fontSize: 17, fontWeight: 700, letterSpacing: 0.1,
        color: '#0B0E16', background: accent(hue),
        boxShadow: `0 10px 30px -8px ${accent(hue, { a: 0.55 })}`,
        transform: down ? 'scale(0.975)' : 'scale(1)',
        transition: 'transform .12s ease, box-shadow .2s ease',
        ...style,
      }}
    >{children}</button>
  );
}

// Petit chip / pastille
function Chip({ children, hue, filled = false, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, letterSpacing: 0.1,
      padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap',
      color: hue != null ? accent(hue, { l: 0.82, c: 0.09 }) : T.muted,
      background: filled
        ? accent(hue, { a: 0.16 })
        : (hue != null ? accent(hue, { a: 0.1 }) : 'rgba(255,255,255,0.05)'),
      border: `1px solid ${hue != null ? accent(hue, { a: 0.28 }) : T.line}`,
      ...style,
    }}>{children}</span>
  );
}

// Pastille teinte ronde (dot)
function Dot({ hue, size = 10 }) {
  return <span style={{
    width: size, height: size, borderRadius: 999, flexShrink: 0,
    background: accent(hue), boxShadow: `0 0 12px ${accent(hue, { a: 0.6 })}`,
  }} />;
}

// Icône de secteur (ligne, monochrome — teintée à l'usage)
const SECTOR_PATHS = {
  sante:        'M12 5v14M5 12h14',
  numerique:    'M3 5h18v11H3zM8 20h8M9 9l-2 2 2 2M15 9l2 2-2 2',
  restauration: 'M7 3v8M5 3v5a2 2 0 002 2M9 3v5a2 2 0 01-2 2M17 3c-1.5 0-2.5 2-2.5 5s1 3 1 6M7 13v8M16 15v6',
  alimentation: 'M5 13a7 4 0 0014 0M5 13a7 4 0 0114 0M8 13v5M12 13v5M16 13v5',
  batiment:     'M14.5 5.5a3 3 0 00-4 4L4 16l1.5 1.5L12 11M14.5 5.5l3 3M14.5 5.5l3-3 3 3-3 3z',
  industrie:    'M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20M6.3 6.3l1.8 1.8M15.9 15.9l1.8 1.8M17.7 6.3l-1.8 1.8M8.1 15.9l-1.8 1.8',
  gestion:      'M4 20V10M10 20V4M16 20v-7M21 20H3',
  commerce:     'M6 8h12l-1 12H7zM9 8a3 3 0 016 0',
  design:       'M16 4l4 4-11 11-5 1 1-5zM13.5 6.5l4 4',
  beaute:       'M8 8a3 3 0 100 6 3 3 0 000-6M16 8a3 3 0 100 6 3 3 0 000-6M10.5 11h3M10.5 11L19 4M13.5 11L5 4',
  social:       'M9 11a3 3 0 100-6 3 3 0 000 6M3 20c0-3 2.7-5 6-5s6 2 6 5M17 14c2.3.4 4 2.2 4 4.5',
  automobile:   'M3 13l2-5a2 2 0 012-1h10a2 2 0 012 1l2 5M3 13h18v4H3zM6.5 17v2M17.5 17v2M6 15h1M17 15h1',
  education:    'M12 4L2 9l10 5 10-5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5',
  droit:        'M12 3v18M7 21h10M5 7h14M5 7l-2.5 6a3 3 0 005 0zM19 7l-2.5 6a3 3 0 005 0z',
  recherche:    'M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3M7.5 15h9',
};
function SectorIcon({ sector, hue, size = 22 }) {
  const d = SECTOR_PATHS[sector] || SECTOR_PATHS.gestion;
  const col = accent(hue, { l: 0.84, c: 0.1 });
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke={col} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Vignette de secteur (carré teinté + icône)
function SectorThumb({ sector, hue, size = 46 }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0, borderRadius: 13,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(150deg, ${accent(hue, { a: 0.26 })}, ${accent(hue, { a: 0.08 })})`,
      border: `1px solid ${accent(hue, { a: 0.3 })}`,
    }}>
      <SectorIcon sector={sector} hue={hue} size={Math.round(size * 0.5)} />
    </div>
  );
}

// Halo lumineux radial en fond
function Glow({ hue, top = '-12%', size = 460, opacity = 0.5 }) {
  if (!glowOn()) return null;
  return <div style={{
    position: 'absolute', top, left: '50%', transform: 'translateX(-50%)',
    width: size, height: size, borderRadius: '50%', pointerEvents: 'none',
    background: `radial-gradient(circle, ${accent(hue, { a: opacity })} 0%, transparent 65%)`,
    filter: 'blur(8px)', zIndex: 0,
  }} />;
}

// Barre de progression
function Progress({ value }) {
  return (
    <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${value * 100}%`, borderRadius: 999,
        background: accent(appHue()), transition: 'width .35s cubic-bezier(.4,0,.2,1)',
      }} />
    </div>
  );
}

// Flèche retour (cercle)
function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Retour" style={{
      width: 40, height: 40, borderRadius: 999, flexShrink: 0,
      border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.04)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    }}>
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
        <path d="M7.5 1.5L1.5 8l6 6.5" stroke={T.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

Object.assign(window, { T, accent, appHue, setAppHue, glowOn, setGlowOn, applyTheme, themeMode, FONT_DISPLAY, FONT_UI, PrimaryBtn, Chip, Dot, SectorIcon, SectorThumb, Glow, Progress, BackBtn });

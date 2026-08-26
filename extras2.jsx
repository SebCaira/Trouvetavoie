// extras2.jsx — RIASEC, Journal, Événements, Métiers qui recrutent,
// bandeau anti-autocensure, lecture audio (synthèse vocale), badges.

// ── #8 Bouton lecture audio (Web Speech API) ───────────────────
function SpeakButton({ getText, hue }) {
  const [on, setOn] = React.useState(false);
  const h = hue != null ? hue : appHue();
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  React.useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); }, []);
  function toggle() {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (on) { synth.cancel(); setOn(false); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(getText());
    u.lang = 'fr-FR'; u.rate = 0.98;
    u.onend = () => setOn(false);
    u.onerror = () => setOn(false);
    setOn(true);
    synth.speak(u);
  }
  if (!supported) return null;
  return (
    <button onClick={toggle} aria-label={on ? 'Arrêter la lecture' : 'Écouter'} style={{
      display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer',
      padding: '9px 13px', borderRadius: 999,
      background: on ? accent(h, { a: 0.18 }) : T.surface, border: `1px solid ${on ? accent(h, { a: 0.4 }) : T.line}`,
      fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: on ? accent(h, { l: themeMode() === 'light' ? 0.5 : 0.84, c: 0.1 }) : T.muted,
    }}>
      {on ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 010 7M18 6a8 8 0 010 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      )}
      {on ? 'Stop' : 'Écouter'}
    </button>
  );
}

// ── #9 Bandeau anti-autocensure ────────────────────────────────
function FairnessBanner({ compact }) {
  const hue = appHue();
  return (
    <div style={{ padding: compact ? '13px 15px' : '15px 17px', borderRadius: 16, background: accent(hue, { a: 0.1 }), border: `1px solid ${accent(hue, { a: 0.26 })}`, display: 'flex', gap: 11, alignItems: 'flex-start' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><path d="M12 3l2 4 4 .5-3 3 .8 4.5L12 17l-3.8 2 .8-4.5-3-3 4-.5z" stroke={accent(hue, { l: themeMode() === 'light' ? 0.5 : 0.82, c: 0.12 })} strokeWidth="1.6" strokeLinejoin="round"/></svg>
      <div style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, color: T.body, lineHeight: 1.4 }}>{ANTI_AUTOCENSURE.banner}</div>
    </div>
  );
}

// ── #1 Quiz RIASEC ─────────────────────────────────────────────
function RiasecScreen({ onDone, onBack }) {
  const hue = appHue();
  const total = RIASEC_QUESTIONS.length;
  const [i, setI] = React.useState(0);
  const [answers, setAnswers] = React.useState(Array(total).fill(null));
  const q = RIASEC_QUESTIONS[i];
  const opts = [{ v: 0, l: 'Pas trop' }, { v: 1, l: 'Un peu' }, { v: 2, l: 'Beaucoup' }];

  function pick(v) {
    const next = answers.slice(); next[i] = v; setAnswers(next);
    setTimeout(() => { i < total - 1 ? setI(i + 1) : onDone(next); }, 220);
  }
  return (
    <div key={i} style={{ position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '70px 22px 30px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <BackBtn onClick={i === 0 ? onBack : () => setI(i - 1)} />
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: themeMode() === 'light' ? 'rgba(16,22,40,0.08)' : 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(i + 1) / total * 100}%`, borderRadius: 999, background: accent(hue), transition: 'width .35s cubic-bezier(.4,0,.2,1)' }} />
        </div>
        <div style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: T.muted, minWidth: 42, textAlign: 'right' }}>{i + 1}<span style={{ color: T.faint }}> / {total}</span></div>
      </div>
      <div className="q-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Chip style={{ alignSelf: 'flex-start', marginTop: 8 }}>Centres d’intérêt</Chip>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, color: T.text, fontSize: 29, lineHeight: 1.16, letterSpacing: -0.6, margin: '16px 0 28px', textWrap: 'balance' }}>{q.q}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {opts.map((o) => {
            const sel = answers[i] === o.v;
            return (
              <button key={o.v} onClick={() => pick(o.v)} style={{
                display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', cursor: 'pointer',
                padding: '16px 16px', borderRadius: 16, fontFamily: FONT_UI, fontSize: 16.5, fontWeight: 600,
                color: sel ? T.text : T.body, background: sel ? accent(hue, { a: 0.14 }) : T.surface,
                border: `1.5px solid ${sel ? accent(hue, { a: 0.85 }) : T.line}`, transition: 'background .15s, border-color .15s',
              }}>
                <span style={{ width: 14, height: 14, borderRadius: 999, flexShrink: 0, background: sel ? accent(hue) : 'transparent', border: `2px solid ${sel ? accent(hue) : T.faint}` }} />
                {o.l}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RiasecResult({ result, onBack, onOpenMetiers }) {
  const hue = appHue();
  const { ranked, top, code } = result;
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.32} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 18 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Ton profil d’intérêts</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '8px 0 4px' }}>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 46, letterSpacing: -1.5, margin: 0, lineHeight: 1 }}>{code}</h1>
          <span style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: T.muted }}>ton code RIASEC</span>
        </div>
        <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '6px 0 22px', lineHeight: 1.45 }}>Le modèle utilisé par les conseillers d’orientation. Tes 3 dominantes :</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {top.map((r) => {
            const d = RIASEC_DIMS[r.key];
            return (
              <div key={r.key} style={{ padding: '16px 17px', borderRadius: 18, background: `linear-gradient(160deg, ${accent(d.hue, { a: 0.16 })}, ${T.surface} 70%)`, border: `1.5px solid ${accent(d.hue, { a: 0.4 })}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 11, background: accent(d.hue), color: '#0B0E16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 19 }}>{d.key}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 19, color: T.text, letterSpacing: -0.3 }}>{d.label}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: accent(d.hue, { l: themeMode() === 'light' ? 0.48 : 0.82, c: 0.1 }) }}>{r.pct}% · {d.short}</div>
                  </div>
                </div>
                <p style={{ fontFamily: FONT_UI, fontSize: 14, color: T.body, margin: '11px 0 0', lineHeight: 1.45 }}>{d.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 11 }}>
                  {d.metiers.map((m, k) => <span key={k} style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 600, color: T.body, padding: '6px 10px', borderRadius: 9, background: T.surface, border: `1px solid ${T.line}` }}>{m}</span>)}
                </div>
              </div>
            );
          })}
        </div>

        {/* barres complètes */}
        <div style={{ marginTop: 22, padding: '18px 18px 8px', borderRadius: 18, background: T.surface, border: `1px solid ${T.lineSoft}` }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 14 }}>Les 6 dimensions</div>
          {ranked.map((r) => {
            const d = RIASEC_DIMS[r.key];
            return (
              <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 96, flexShrink: 0, fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: T.muted }}>{d.label}</div>
                <div style={{ flex: 1, height: 8, borderRadius: 999, background: themeMode() === 'light' ? 'rgba(16,22,40,0.07)' : 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.pct}%`, borderRadius: 999, background: accent(d.hue) }} />
                </div>
                <div style={{ width: 34, textAlign: 'right', fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, color: T.muted }}>{r.pct}%</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 18 }}><FairnessBanner compact /></div>
        <button onClick={onOpenMetiers} style={{ width: '100%', marginTop: 14, padding: '15px', cursor: 'pointer', borderRadius: 15, border: 'none', background: accent(hue), fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: '#0B0E16' }}>Explorer des métiers</button>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.faint, marginTop: 12, textAlign: 'center', lineHeight: 1.4 }}>Inspiré du modèle RIASEC (J. Holland), utilisé en orientation.</div>
      </div>
    </div>
  );
}

// ── #2 Journal de bord ─────────────────────────────────────────
function JournalScreen({ journal, onAdd, onDelete, onBack }) {
  const hue = appHue();
  const [text, setText] = React.useState('');
  const [tag, setTag] = React.useState('JPO');
  const tags = ['JPO', 'Stage', 'Rencontre', 'Idée'];
  function add() {
    const t = text.trim(); if (!t) return;
    onAdd({ id: Date.now(), tag, text: t, date: Date.now() });
    setText('');
  }
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={420} opacity={0.28} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Mon carnet</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 6px', lineHeight: 1.04 }}>Journal de bord</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '0 0 22px', lineHeight: 1.45 }}>Note tes impressions après une JPO, un stage, une rencontre. Tout au même endroit pour préparer tes vœux.</p>

        {/* saisie */}
        <div style={{ padding: '14px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 22 }}>
          <div style={{ display: 'flex', gap: 7, marginBottom: 11, flexWrap: 'wrap' }}>
            {tags.map((tg) => {
              const on = tag === tg;
              return <button key={tg} onClick={() => setTag(tg)} style={{ cursor: 'pointer', fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, padding: '7px 12px', borderRadius: 999, color: on ? '#0B0E16' : T.muted, background: on ? accent(hue) : (themeMode() === 'light' ? 'rgba(16,22,40,0.05)' : 'rgba(255,255,255,0.05)'), border: `1px solid ${on ? accent(hue) : T.line}` }}>{tg}</button>;
            })}
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Ce que j’ai vu, ressenti, retenu…" rows={3} style={{ width: '100%', boxSizing: 'border-box', resize: 'none', border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT_UI, fontSize: 15.5, color: T.text, lineHeight: 1.45 }} />
          <button onClick={add} disabled={!text.trim()} style={{ width: '100%', marginTop: 8, padding: '13px', borderRadius: 13, border: 'none', cursor: text.trim() ? 'pointer' : 'not-allowed', opacity: text.trim() ? 1 : 0.5, background: accent(hue), fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: '#0B0E16' }}>Ajouter au carnet</button>
        </div>

        {(journal || []).length === 0 ? (
          <div style={{ padding: '20px 18px', borderRadius: 16, background: T.surface, border: `1px dashed ${T.line}`, fontFamily: FONT_UI, fontSize: 14, color: T.muted, lineHeight: 1.45, textAlign: 'center' }}>Ton carnet est vide. Ta première note apparaîtra ici.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {journal.slice().reverse().map((n) => (
              <div key={n.id} style={{ padding: '15px 16px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                  <Chip hue={hue} filled>{n.tag}</Chip>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.faint }}>{new Date(n.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    <button onClick={() => onDelete(n.id)} aria-label="Supprimer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.faint, padding: 2 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
                <div style={{ fontFamily: FONT_UI, fontSize: 15, color: T.body, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{n.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── #3 Événements d'orientation + Trouve ton CIO ───────────────
// Les CIO via l'annuaire officiel (même API que les établissements).
function CioFinder() {
  const hue = appHue();
  const [cp, setCp] = React.useState('');
  const [state, setState] = React.useState({ status: 'idle', items: [], commune: '' });

  const CIO_BASE = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records';
  const SELECT = 'nom_etablissement,adresse_1,code_postal,nom_commune,telephone,latitude,longitude';

  function hav(a, b, c, d) { const R = 6371, t = (x) => x * Math.PI / 180; const dLat = t(c - a), dLon = t(d - b); const s = Math.sin(dLat / 2) ** 2 + Math.cos(t(a)) * Math.cos(t(c)) * Math.sin(dLon / 2) ** 2; return R * 2 * Math.asin(Math.sqrt(s)); }

  async function find() {
    if (!/^\d{4,5}$/.test(cp.trim())) { setState({ status: 'badcp', items: [], commune: '' }); return; }
    setState({ status: 'loading', items: [], commune: '' });
    try {
      // 1) géocode le code postal (centre de la commune)
      let lat = null, lon = null, commune = '';
      try {
        const g = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${cp.trim()}&fields=centre,nom&format=json`);
        const gj = await g.json();
        const c = (gj || [])[0];
        if (c) { commune = c.nom; if (c.centre) { lon = c.centre.coordinates[0]; lat = c.centre.coordinates[1]; } }
      } catch (e) {}
      // 2) CIO autour (rayon) ou par département si pas de géoloc
      const run = async (where, order) => {
        let url = `${CIO_BASE}?where=${encodeURIComponent(where)}&limit=20&select=${encodeURIComponent(SELECT)}`;
        if (order) url += `&order_by=${encodeURIComponent(order)}`;
        const r = await fetch(url); if (!r.ok) throw new Error('http'); return (await r.json()).results || [];
      };
      let rows;
      if (lat != null) {
        const pt = `geom'POINT(${lon} ${lat})'`;
        rows = await run(`type_etablissement="Information et orientation" and within_distance(position, ${pt}, 60km)`, `distance(position, ${pt})`);
      } else {
        rows = await run(`type_etablissement="Information et orientation" and code_postal like "${cp.trim().slice(0, 2)}%"`);
      }
      const items = rows.map((e) => {
        const la = parseFloat(e.latitude), lo = parseFloat(e.longitude);
        const dist = (lat != null && !isNaN(la)) ? hav(lat, lon, la, lo) : null;
        return { ...e, _dist: dist };
      });
      if (lat != null) items.sort((a, b) => (a._dist || 9e9) - (b._dist || 9e9));
      setState({ status: 'ok', items, commune });
    } catch (e) { setState({ status: 'error', items: [], commune: '' }); }
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, color: T.text, letterSpacing: -0.4, margin: '0 0 6px' }}>Trouve ton CIO</h2>
      <p style={{ fontFamily: FONT_UI, fontSize: 14.5, color: T.muted, margin: '0 0 14px', lineHeight: 1.45 }}>Le Centre d’Information et d’Orientation : des conseillers t’y reçoivent gratuitement, même en dehors de ton collège.</p>

      <div style={{ display: 'flex', gap: 9 }}>
        <input value={cp} onChange={(e) => setCp(e.target.value.replace(/\D/g, '').slice(0, 5))} onKeyDown={(e) => e.key === 'Enter' && find()} inputMode="numeric" placeholder="Ton code postal"
          style={{ flex: 1, minWidth: 0, padding: '13px 15px', borderRadius: 13, background: T.surface, border: `1px solid ${T.line}`, outline: 'none', fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 600, color: T.text }} />
        <button onClick={find} style={{ cursor: 'pointer', border: 'none', borderRadius: 13, padding: '0 20px', background: accent(hue), fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: '#0B0E16' }}>Chercher</button>
      </div>

      {state.status === 'badcp' && <div style={{ fontFamily: FONT_UI, fontSize: 13.5, color: T.muted, marginTop: 10 }}>Entre un code postal valide (4 ou 5 chiffres).</div>}
      {state.status === 'loading' && <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, marginTop: 12 }}>Recherche…</div>}
      {state.status === 'error' && (
        <div style={{ marginTop: 12 }}>
          <a href="https://www.onisep.fr/recherche-d-adresses-utiles" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', padding: '14px', borderRadius: 13, background: accent(hue, { a: 0.12 }), border: `1px solid ${accent(hue, { a: 0.3 })}`, fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: accent(hue, { l: themeMode() === 'light' ? 0.5 : 0.86, c: 0.08 }) }}>Annuaire officiel des CIO (Onisep)</a>
        </div>
      )}
      {state.status === 'ok' && state.items.length === 0 && <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, marginTop: 12 }}>Aucun CIO trouvé pour cette zone. Essaie un code postal voisin.</div>}

      {state.status === 'ok' && state.items.length > 0 && (
        <div style={{ marginTop: 14 }}>
          {state.commune && <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginBottom: 11 }}>{state.items.length} CIO autour de <strong style={{ color: T.text }}>{state.commune}</strong></div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {state.items.slice(0, 8).map((e, i) => {
              const q = encodeURIComponent(`${e.nom_etablissement} ${e.adresse_1 || ''} ${e.code_postal} ${e.nom_commune}`);
              return (
                <div key={i} style={{ padding: '14px 15px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text, lineHeight: 1.25 }}>{e.nom_etablissement}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 3 }}>{e.adresse_1 ? e.adresse_1 + ' · ' : ''}{e.code_postal} {e.nom_commune}</div>
                    </div>
                    {e._dist != null && <span style={{ flexShrink: 0, fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: accent(hue, { l: themeMode() === 'light' ? 0.5 : 0.82, c: 0.1 }) }}>{e._dist < 1 ? Math.round(e._dist * 1000) + ' m' : e._dist.toFixed(1).replace('.', ',') + ' km'}</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 11, flexWrap: 'wrap' }}>
                    {e.telephone && <a href={`tel:${(e.telephone + '').replace(/\s/g, '')}`} style={{ textDecoration: 'none', fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: accent(hue, { l: themeMode() === 'light' ? 0.5 : 0.82, c: 0.09 }), padding: '7px 11px', borderRadius: 10, background: accent(hue, { a: 0.1 }), border: `1px solid ${accent(hue, { a: 0.26 })}` }}>📞 {e.telephone}</a>}
                    <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: T.muted, padding: '7px 11px', borderRadius: 10, background: themeMode() === 'light' ? 'rgba(16,22,40,0.05)' : 'rgba(255,255,255,0.05)', border: `1px solid ${T.line}` }}>Itinéraire</a>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontFamily: FONT_UI, fontSize: 11.5, color: T.faint, marginTop: 12, lineHeight: 1.4 }}>Source : Annuaire de l’éducation (officiel).</div>
        </div>
      )}
    </div>
  );
}

function EventsScreen({ onBack }) {
  const hue = appHue();
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={420} opacity={0.28} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>À ne pas manquer</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 6px', lineHeight: 1.04 }}>Salons & portes ouvertes</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '0 0 22px', lineHeight: 1.45 }}>Rien ne remplace une visite. Les dates changent chaque année : ces agendas officiels sont filtrables par région et toujours à jour.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {EVENTS_LINKS.map((e, i) => (
            <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', padding: '16px 17px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17.5, color: T.text, letterSpacing: -0.2 }}>{e.t}</div>
              <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, margin: '5px 0 12px', lineHeight: 1.45 }}>{e.d}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: accent(hue, { l: themeMode() === 'light' ? 0.5 : 0.84, c: 0.09 }) }}>
                {e.cta}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          ))}
        </div>

        <CioFinder />

        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.faint, marginTop: 22, lineHeight: 1.4 }}>Sources officielles (Onisep, CCI) — dates et adresses toujours à jour.</div>
      </div>
    </div>
  );
}

// ── #4 Métiers / secteurs qui recrutent ────────────────────────
function TensionScreen({ onBack, onOpenMetiers }) {
  const hue = appHue();
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={420} opacity={0.28} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Le marché de l’emploi</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 6px', lineHeight: 1.04 }}>Les secteurs qui recrutent</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '0 0 22px', lineHeight: 1.45 }}>Des domaines où l’on trouve facilement un emploi ou un contrat d’apprentissage. Un métier qui recrute n’est pas forcément « le tien » — mais c’est une info utile.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {SECTEURS_TENSION.map((s, i) => (
            <div key={i} style={{ padding: '16px 17px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 9 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <Dot hue={s.hue} size={10} />
                  <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color: T.text, letterSpacing: -0.2 }}>{s.s}</span>
                </div>
                <Chip hue={s.hue} filled>{s.tag}</Chip>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {s.ex.map((m, k) => <span key={k} style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: T.body, padding: '7px 11px', borderRadius: 9, background: themeMode() === 'light' ? 'rgba(16,22,40,0.04)' : 'rgba(255,255,255,0.04)', border: `1px solid ${T.lineSoft}` }}>{m}</span>)}
              </div>
            </div>
          ))}
        </div>
        <a href={TENSION_META.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', marginTop: 16, padding: '14px', borderRadius: 14, background: accent(hue, { a: 0.12 }), border: `1px solid ${accent(hue, { a: 0.3 })}`, fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700, color: accent(hue, { l: themeMode() === 'light' ? 0.5 : 0.86, c: 0.08 }) }}>
          Données détaillées · France Travail
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.faint, marginTop: 12, lineHeight: 1.4 }}>Source : {TENSION_META.source} ({TENSION_META.year}). {TENSION_META.note}</div>
      </div>
    </div>
  );
}

// ── #5 Rappels (dates clés + dates perso) ──────────────────────
function NextReminderCard({ reminders, onOpen }) {
  const hue = appHue();
  const list = activeReminders(reminders);
  const next = list[0];
  if (!next) {
    return (
      <button onClick={onOpen} style={{
        display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', cursor: 'pointer',
        marginBottom: 14, padding: '14px 15px', borderRadius: 16, background: T.surface, border: `1px dashed ${accent(hue, { a: 0.4 })}`,
      }}>
        <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: accent(hue, { a: 0.14 }), border: `1px solid ${accent(hue, { a: 0.28 })}` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 8a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6zM10 20a2 2 0 004 0" stroke={accent(hue, { l: themeMode() === 'light' ? 0.5 : 0.84, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>Active tes rappels</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2 }}>Ne rate aucune échéance d’orientation.</div>
        </div>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    );
  }
  const soon = next.days <= 14;
  return (
    <button onClick={onOpen} style={{
      position: 'relative', width: '100%', textAlign: 'left', cursor: 'pointer', overflow: 'hidden',
      marginBottom: 14, padding: '15px 16px', borderRadius: 16,
      background: soon ? `linear-gradient(150deg, ${accent(45, { a: 0.18 })}, ${T.surface} 70%)` : T.surface,
      border: `1px solid ${soon ? accent(45, { a: 0.45 }) : T.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <div style={{ width: 46, flexShrink: 0, textAlign: 'center' }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 24, color: soon ? accent(45, { l: themeMode() === 'light' ? 0.5 : 0.82, c: 0.12 }) : T.text, lineHeight: 1 }}>{next.days}</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase', color: T.faint }}>{next.days <= 1 ? 'jour' : 'jours'}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: soon ? accent(45, { l: themeMode() === 'light' ? 0.5 : 0.8, c: 0.1 }) : T.faint }}>Prochaine échéance</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: T.text, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{next.title}</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 1 }}>{formatFrDate(next.date)}</div>
        </div>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </button>
  );
}

function RemindersScreen({ reminders, academie, onToggleKey, onAddCustom, onDeleteCustom, onEnableNotif, notifState, onBack }) {
  const hue = appHue();
  const acad = acadByName(academie);
  const enabled = (reminders && reminders.enabled) || [];
  const custom = (reminders && reminders.custom) || [];
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const upcoming = activeReminders(reminders);

  function add() {
    if (!title.trim() || !date) return;
    onAddCustom({ id: 'c' + Date.now(), title: title.trim(), date });
    setTitle(''); setDate('');
  }
  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={420} opacity={0.28} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Ne rien rater</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 6px', lineHeight: 1.04 }}>Mes rappels</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '0 0 20px', lineHeight: 1.45 }}>Active les échéances clés et ajoute tes propres dates (une JPO, un rendez-vous…).</p>

        {/* notifications */}
        <button onClick={onEnableNotif} disabled={notifState === 'granted' || notifState === 'unsupported'} style={{
          display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left',
          cursor: notifState === 'granted' || notifState === 'unsupported' ? 'default' : 'pointer',
          padding: '13px 15px', borderRadius: 14, marginBottom: 22,
          background: notifState === 'granted' ? accent(155, { a: 0.12 }) : T.surface,
          border: `1px solid ${notifState === 'granted' ? accent(155, { a: 0.36 }) : T.line}`,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M6 8a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6zM10 20a2 2 0 004 0" stroke={notifState === 'granted' ? accent(155, { l: themeMode() === 'light' ? 0.46 : 0.8, c: 0.12 }) : T.muted} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700, color: T.text }}>
              {notifState === 'granted' ? 'Notifications activées' : notifState === 'unsupported' ? 'Notifications non disponibles' : 'Activer les notifications'}
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 2, lineHeight: 1.35 }}>
              {notifState === 'granted' ? 'Tu seras alerté·e à l’approche des dates.' : notifState === 'unsupported' ? 'Ton navigateur ne les gère pas ici.' : 'Pour être prévenu·e à l’ouverture de l’app.'}
            </div>
          </div>
        </button>

        {upcoming.length > 0 && (
          <React.Fragment>
            <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 12 }}>À venir</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
              {upcoming.map((r) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 15px', borderRadius: 14, background: T.surface, border: `1px solid ${r.days <= 14 ? accent(45, { a: 0.4 }) : T.line}` }}>
                  <div style={{ width: 42, flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: r.days <= 14 ? accent(45, { l: themeMode() === 'light' ? 0.5 : 0.82, c: 0.12 }) : T.text, lineHeight: 1 }}>{r.days}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', color: T.faint }}>{r.days <= 1 ? 'jour' : 'jours'}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>{r.title}</div>
                    <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 1 }}>{formatFrDate(r.date)}{r.kind === 'key' ? ' · indicatif' : ''}</div>
                  </div>
                  {r.kind === 'custom' && (
                    <button onClick={() => onDeleteCustom(r.id)} aria-label="Supprimer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.faint, padding: 4, flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        )}

        {/* échéances clés activables */}
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 12 }}>Les échéances clés</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
          {REMINDER_KEYS.map((k) => {
            const on = enabled.includes(k.id);
            const dt = reminderDate(k.month, k.day);
            return (
              <button key={k.id} onClick={() => onToggleKey(k.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', cursor: 'pointer', padding: '13px 15px', borderRadius: 14, background: on ? accent(hue, { a: 0.12 }) : T.surface, border: `1.5px solid ${on ? accent(hue, { a: 0.6 }) : T.line}` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>{k.label}</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 1 }}>≈ {formatFrDate(dt)}</div>
                </div>
                <div style={{ width: 46, height: 28, borderRadius: 999, flexShrink: 0, position: 'relative', background: on ? accent(hue) : (themeMode() === 'light' ? 'rgba(16,22,40,0.12)' : 'rgba(255,255,255,0.12)'), transition: 'background .2s' }}>
                  <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ fontFamily: FONT_UI, fontSize: 11.5, color: T.faint, margin: '-16px 0 14px', lineHeight: 1.4 }}>Dates indicatives — les dates exactes (notamment l’affectation) varient selon l’académie{acad ? '' : ' : choisis la tienne dans « Établissements »'}.</div>
        {acad && (
          <a href={acad.site} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', margin: '0 0 26px', padding: '11px 14px', borderRadius: 12, background: accent(hue, { a: 0.08 }), border: `1px solid ${accent(hue, { a: 0.24 })}`, fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: accent(hue, { l: 0.84, c: 0.09 }) }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
            <span style={{ flex: 1 }}>Calendrier officiel · académie de {acad.name}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        )}

        {/* ajouter une date perso */}
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 12 }}>Ajouter ma date</div>
        <div style={{ padding: '14px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. JPO lycée Diderot" style={{ width: '100%', boxSizing: 'border-box', padding: '12px 13px', borderRadius: 11, background: themeMode() === 'light' ? 'rgba(16,22,40,0.04)' : 'rgba(255,255,255,0.05)', border: `1px solid ${T.line}`, outline: 'none', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 9 }} />
          <input type="date" value={date} min={todayStr} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 13px', borderRadius: 11, background: themeMode() === 'light' ? 'rgba(16,22,40,0.04)' : 'rgba(255,255,255,0.05)', border: `1px solid ${T.line}`, outline: 'none', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.text, colorScheme: themeMode() === 'light' ? 'light' : 'dark', marginBottom: 10 }} />
          <button onClick={add} disabled={!title.trim() || !date} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', cursor: (title.trim() && date) ? 'pointer' : 'not-allowed', opacity: (title.trim() && date) ? 1 : 0.5, background: accent(hue), fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: '#0B0E16' }}>Ajouter ce rappel</button>
        </div>
      </div>
    </div>
  );
}

// ── Réglages (thème, accent, animations, lecture facile) ───────
// Persistés avec le profil (voir setSetting dans App) — contrairement au
// panneau Tweaks, réservé à l'itération de design, ces réglages sont
// visibles et modifiables par l'élève, et survivent au rechargement.
const SETTINGS_ACCENTS = [
  { key: 'Indigo', hue: 280 },
  { key: 'Cyan', hue: 200 },
  { key: 'Ambre', hue: 45 },
  { key: 'Rose', hue: 350 },
];

function SettingsScreen({ theme, accent: accentKey, anim, a11y, onChange, onBack }) {
  const hue = appHue();
  const light = themeMode() === 'light';

  const Toggle = ({ on, onClick }) => (
    <button onClick={onClick} role="switch" aria-checked={on} style={{
      width: 46, height: 28, borderRadius: 999, flexShrink: 0, position: 'relative', border: 'none', cursor: 'pointer',
      background: on ? accent(hue) : (light ? 'rgba(16,22,40,0.12)' : 'rgba(255,255,255,0.12)'), transition: 'background .2s',
    }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
    </button>
  );

  const ToggleRow = ({ label, note, on, onClick }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 15px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>{label}</div>
        {note && <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2, lineHeight: 1.4 }}>{note}</div>}
      </div>
      <Toggle on={on} onClick={onClick} />
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.3} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Personnalisation</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 8px', lineHeight: 1.04 }}>Réglages</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '0 0 26px', lineHeight: 1.45 }}>Personnalise l’appli à ta façon. Ça reste sur cet appareil.</p>

        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 11 }}>Apparence</div>

        <div style={{ fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: T.body, margin: '0 0 9px' }}>Thème</div>
        <div style={{ display: 'flex', gap: 9, marginBottom: 18 }}>
          {['Sombre', 'Clair'].map((k) => {
            const on = theme === k;
            return (
              <button key={k} onClick={() => onChange('theme', k)} style={{
                flex: 1, cursor: 'pointer', padding: '13px', borderRadius: 13,
                fontFamily: FONT_UI, fontSize: 15, fontWeight: 700,
                color: on ? '#0B0E16' : T.muted, background: on ? accent(hue) : T.surface,
                border: `1.5px solid ${on ? accent(hue) : T.line}`,
              }}>{k}</button>
            );
          })}
        </div>

        <div style={{ fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: T.body, margin: '0 0 9px' }}>Accent</div>
        <div style={{ display: 'flex', gap: 9, marginBottom: 18 }}>
          {SETTINGS_ACCENTS.map((a) => {
            const on = accentKey === a.key;
            return (
              <button key={a.key} onClick={() => onChange('accent', a.key)} aria-label={a.key} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer',
                padding: '10px 6px', borderRadius: 13, background: T.surface,
                border: `1.5px solid ${on ? accent(a.hue) : T.line}`,
              }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, background: accent(a.hue), boxShadow: on ? `0 0 0 3px ${accent(a.hue, { a: 0.25 })}` : 'none' }} />
                <span style={{ fontFamily: FONT_UI, fontSize: 11.5, fontWeight: 700, color: on ? T.text : T.muted }}>{a.key}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
          <ToggleRow label="Animations" note="Transitions et effets à l’écran." on={anim !== false} onClick={() => onChange('anim', !(anim !== false))} />
        </div>

        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 11 }}>Accessibilité</div>
        <ToggleRow label="Lecture facile" note="Police plus lisible et espacement augmenté." on={!!a11y} onClick={() => onChange('a11y', !a11y)} />
      </div>
    </div>
  );
}

// ── Mon avis (questionnaire — Netlify Forms) ───────────────────
function StarRating({ value, onChange, hue }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = n <= value;
        return (
          <button key={n} onClick={() => onChange(n)} aria-label={n + ' sur 5'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill={on ? accent(hue) : 'none'} stroke={on ? accent(hue) : T.faint} strokeWidth="1.6" strokeLinejoin="round"><path d="M12 3l2.6 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.4-.5z"/></svg>
          </button>
        );
      })}
    </div>
  );
}

function FeedbackScreen({ onBack, onToast }) {
  const hue = appHue();
  const [role, setRole] = React.useState('');
  const [clarte, setClarte] = React.useState(0);
  const [utilite, setUtilite] = React.useState(0);
  const [testOk, setTestOk] = React.useState('');
  const [reco, setReco] = React.useState('');
  const [aime, setAime] = React.useState('');
  const [manque, setManque] = React.useState('');
  const [bug, setBug] = React.useState('');
  const [libre, setLibre] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const canSend = role && clarte && utilite;

  function submit() {
    if (!canSend || sending) return;
    setSending(true);
    const data = {
      'form-name': 'feedback',
      role, clarte: String(clarte), utilite: String(utilite),
      test_reussi: testOk, recommande: reco,
      a_aime: aime, manque, bug, commentaire: libre,
      date: new Date().toISOString(),
    };
    // sauvegarde locale de secours (rien n'est perdu)
    try { const k = 'orientation3e_feedbacks'; const arr = JSON.parse(localStorage.getItem(k) || '[]'); arr.push(data); localStorage.setItem(k, JSON.stringify(arr)); } catch (e) {}
    const body = new URLSearchParams(data).toString();
    // Envoi Netlify Forms (fonctionne une fois le site hébergé sur Netlify).
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      .then(() => { setSent(true); })
      .catch(() => { setSent(true); }) // hors Netlify : on remercie quand même (retour gardé en local)
      .finally(() => setSending(false));
  }

  if (sent) {
    return (
      <div style={{ position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', boxSizing: 'border-box', textAlign: 'center' }}>
        <Glow hue={155} top="28%" size={420} opacity={0.32} />
        <div style={{ position: 'relative', zIndex: 1 }} className="q-fade">
          <div style={{ width: 74, height: 74, borderRadius: 999, margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: accent(155, { a: 0.16 }), border: `1px solid ${accent(155, { a: 0.4 })}` }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L10 17.5L19 7" stroke={accent(155, { l: themeMode() === 'light' ? 0.46 : 0.8, c: 0.14 })} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 28, letterSpacing: -0.6, margin: '0 0 10px' }}>Merci beaucoup !</h1>
          <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '0 0 26px', lineHeight: 1.5, maxWidth: 300 }}>Ton avis est précieux : il va aider à améliorer l’app pour les prochains élèves.</p>
          <PrimaryBtn hue={hue} onClick={onBack}>Revenir à l’app</PrimaryBtn>
        </div>
      </div>
    );
  }

  const Label = ({ children, hint }) => (
    <div style={{ marginBottom: 11 }}>
      <span style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>{children}</span>
      {hint && <span style={{ fontFamily: FONT_UI, fontSize: 13, color: T.faint, marginLeft: 8 }}>{hint}</span>}
    </div>
  );
  const pillRow = (val, setVal, opts) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {opts.map((o) => {
        const on = val === o;
        return <button key={o} onClick={() => setVal(o)} style={{ cursor: 'pointer', fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, padding: '10px 15px', borderRadius: 12, color: on ? '#0B0E16' : T.body, background: on ? accent(hue) : T.surface, border: `1.5px solid ${on ? accent(hue) : T.line}` }}>{o}</button>;
      })}
    </div>
  );
  const area = (val, setVal, ph) => (
    <textarea value={val} onChange={(e) => setVal(e.target.value)} placeholder={ph} rows={3} style={{ width: '100%', boxSizing: 'border-box', resize: 'none', padding: '13px 14px', borderRadius: 13, background: T.surface, border: `1px solid ${T.line}`, outline: 'none', fontFamily: FONT_UI, fontSize: 15, color: T.text, lineHeight: 1.45 }} />
  );
  const block = { marginBottom: 26 };

  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={420} opacity={0.28} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Aide-nous à progresser</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 6px', lineHeight: 1.04 }}>Ton avis</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '0 0 26px', lineHeight: 1.45 }}>2 minutes pour nous dire ce que tu en penses. Anonyme.</p>

        <div style={block}><Label>Tu es…</Label>{pillRow(role, setRole, ['Élève', 'Parent', 'Prof / conseiller', 'Autre'])}</div>
        <div style={block}><Label hint="(obligatoire)">L’app est-elle claire ?</Label><StarRating value={clarte} onChange={setClarte} hue={hue} /></div>
        <div style={block}><Label hint="(obligatoire)">Est-elle utile pour s’orienter ?</Label><StarRating value={utilite} onChange={setUtilite} hue={hue} /></div>
        <div style={block}><Label>As-tu réussi à faire le test jusqu’au bout ?</Label>{pillRow(testOk, setTestOk, ['Oui, facilement', 'Oui, mais…', 'Non'])}</div>
        <div style={block}><Label>La recommanderais-tu à un·e élève de 3ᵉ ?</Label>{pillRow(reco, setReco, ['Oui', 'Peut-être', 'Non'])}</div>
        <div style={block}><Label>Ce que tu as aimé</Label>{area(aime, setAime, 'Un écran, une idée, un détail…')}</div>
        <div style={block}><Label>Ce qui manque ou pourrait être mieux</Label>{area(manque, setManque, 'Une info, une fonction, un mot peu clair…')}</div>
        <div style={block}><Label>Un bug à signaler ?</Label>{area(bug, setBug, 'Décris ce qui s’est passé, sur quel écran…')}</div>
        <div style={block}><Label>Commentaire libre</Label>{area(libre, setLibre, 'Tout ce que tu veux ajouter')}</div>

        <button onClick={submit} disabled={!canSend || sending} style={{ width: '100%', padding: '16px', borderRadius: 16, border: 'none', cursor: (!canSend || sending) ? 'not-allowed' : 'pointer', opacity: (!canSend || sending) ? 0.5 : 1, background: accent(hue), fontFamily: FONT_UI, fontSize: 16, fontWeight: 700, color: '#0B0E16' }}>
          {sending ? 'Envoi…' : (canSend ? 'Envoyer mon avis' : 'Note la clarté et l’utilité')}
        </button>
        <div style={{ fontFamily: FONT_UI, fontSize: 11.5, color: T.faint, marginTop: 12, textAlign: 'center', lineHeight: 1.4 }}>Réponses anonymes, utilisées seulement pour améliorer l’app.</div>
      </div>
    </div>
  );
}

Object.assign(window, { SpeakButton, FairnessBanner, RiasecScreen, RiasecResult, JournalScreen, EventsScreen, TensionScreen, NextReminderCard, RemindersScreen, SettingsScreen, FeedbackScreen });

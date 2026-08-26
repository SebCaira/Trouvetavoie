// extras.jsx — Écrans additionnels : Onboarding, Côté parents,
// Questions à poser, et le mini-quiz « est-ce fait pour moi ? ».

// ── Onboarding (3 écrans, premier lancement) ───────────────────
function OnboardingScreen({ onDone }) {
  const hue = appHue();
  const [step, setStep] = React.useState(0);
  const [prenom, setPrenom] = React.useState('');
  const [classe, setClasse] = React.useState('3e');
  const [goal, setGoal] = React.useState(null);

  const next = () => (step < 2 ? setStep(step + 1) : onDone({ prenom: prenom.trim(), classe, goal }));

  return (
    <div style={{ position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '70px 26px 40px', boxSizing: 'border-box', overflow: 'hidden' }}>
      <Glow hue={hue} top="-12%" size={520} opacity={0.42} />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* progression */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 36 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? accent(hue) : 'rgba(255,255,255,0.12)', transition: 'background .3s' }} />
          ))}
        </div>

        {step === 0 && (
          <div className="q-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: accent(hue, { l: 0.78, c: 0.1 }) }}>Bienvenue</div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 44, lineHeight: 1.04, letterSpacing: -1.4, margin: '16px 0 0' }}>Trouve ta voie après la 3ᵉ.</h1>
            <p style={{ fontFamily: FONT_UI, fontSize: 17, lineHeight: 1.5, color: T.muted, margin: '20px 0 0', textWrap: 'pretty' }}>Un test rapide, des fiches métiers, et tout ce qu’il faut savoir pour préparer ton orientation — sans pression, à ton rythme.</p>
          </div>
        )}

        {step === 1 && (
          <div className="q-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 34, lineHeight: 1.06, letterSpacing: -0.8, margin: 0 }}>On fait connaissance ?</h1>
            <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '12px 0 24px', lineHeight: 1.45 }}>Facultatif — c’est juste pour personnaliser l’app.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 16px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 18 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="8.5" r="3.4" stroke={T.faint} strokeWidth="1.7"/><path d="M5.5 19c0-3.1 2.9-5 6.5-5s6.5 1.9 6.5 5" stroke={T.faint} strokeWidth="1.7" strokeLinecap="round"/></svg>
              <input value={prenom} onChange={(e) => setPrenom(e.target.value.slice(0, 24))} placeholder="Ton prénom" style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT_UI, fontSize: 16, fontWeight: 600, color: T.text }} />
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: T.faint, marginBottom: 11 }}>Ta classe</div>
            <div style={{ display: 'flex', gap: 9 }}>
              {['4ᵉ', '3ᵉ', 'Lycée'].map((c) => {
                const on = classe === c;
                return (
                  <button key={c} onClick={() => setClasse(c)} style={{
                    flex: 1, cursor: 'pointer', padding: '13px', borderRadius: 13,
                    fontFamily: FONT_UI, fontSize: 15, fontWeight: 700,
                    color: on ? '#0B0E16' : T.muted, background: on ? accent(hue) : T.surface,
                    border: `1.5px solid ${on ? accent(hue) : T.line}`,
                  }}>{c}</button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="q-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 34, lineHeight: 1.06, letterSpacing: -0.8, margin: 0 }}>Qu’est-ce que tu cherches ?</h1>
            <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '12px 0 24px', lineHeight: 1.45 }}>Pour t’orienter vers ce qui t’aidera le plus.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {[
                { k: 'decouvrir', l: 'Découvrir les possibilités', d: 'Je pars de zéro, je veux explorer.' },
                { k: 'confirmer', l: 'Confirmer une idée', d: 'J’ai déjà une piste en tête.' },
                { k: 'reorienter', l: 'Changer de direction', d: 'Je veux revoir mon choix.' },
              ].map((o) => {
                const on = goal === o.k;
                return (
                  <button key={o.k} onClick={() => setGoal(o.k)} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left',
                    cursor: 'pointer', padding: '15px 16px', borderRadius: 15,
                    background: on ? accent(hue, { a: 0.14 }) : T.surface,
                    border: `1.5px solid ${on ? accent(hue, { a: 0.85 }) : T.line}`,
                  }}>
                    <span style={{ fontFamily: FONT_UI, fontSize: 16, fontWeight: 700, color: T.text }}>{o.l}</span>
                    <span style={{ fontFamily: FONT_UI, fontSize: 13.5, color: T.muted, marginTop: 3 }}>{o.d}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
          {step === 0 && <button onClick={() => onDone({})} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.muted }}>Passer</button>}
          <div style={{ flex: 1 }} />
          <button onClick={next} style={{
            cursor: 'pointer', border: 'none', borderRadius: 16, padding: '16px 30px',
            fontFamily: FONT_UI, fontSize: 16, fontWeight: 700, color: '#0B0E16', background: accent(hue),
            boxShadow: `0 10px 30px -8px ${accent(hue, { a: 0.55 })}`,
          }}>{step < 2 ? 'Continuer' : 'C’est parti'}</button>
        </div>
      </div>
    </div>
  );
}

// ── Côté parents ───────────────────────────────────────────────
function ParentsScreen({ onBack, onGlossaire }) {
  const hue = appHue();
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.3} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Pour les familles</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 8px', lineHeight: 1.04 }}>Côté parents</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '0 0 26px', lineHeight: 1.45 }}>L’essentiel de la procédure d’orientation, en clair.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {PARENTS.map((p, i) => (
            <div key={i} style={{ padding: '16px 18px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                <span style={{ width: 24, height: 24, flexShrink: 0, borderRadius: 8, background: accent(hue, { a: 0.16 }), color: accent(hue, { l: 0.84, c: 0.1 }), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_UI, fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17.5, color: T.text, margin: 0, letterSpacing: -0.3 }}>{p.t}</h3>
              </div>
              <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.body, margin: 0, lineHeight: 1.5 }}>{p.txt}</p>
            </div>
          ))}
        </div>

        <button onClick={onGlossaire} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', cursor: 'pointer',
          marginTop: 16, padding: '15px', borderRadius: 15, background: accent(hue, { a: 0.12 }), border: `1px solid ${accent(hue, { a: 0.3 })}`,
          fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: accent(hue, { l: 0.86, c: 0.08 }),
        }}>Un sigle vous échappe ? Voir le glossaire</button>
      </div>
    </div>
  );
}

// ── Questions à poser (JPO / prof principal) ───────────────────
function QuestionsPoserScreen({ onBack }) {
  const hue = appHue();
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.3} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>À emporter</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 8px', lineHeight: 1.04 }}>Les bonnes questions</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '0 0 26px', lineHeight: 1.45 }}>À poser en portes ouvertes, en salon, ou à ton prof principal.</p>

        {QUESTIONS_POSER.map((grp, gi) => (
          <div key={gi} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: accent(hue, { l: 0.8, c: 0.09 }), marginBottom: 11 }}>{grp.g}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {grp.items.map((q, i) => (
                <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: '13px 15px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}` }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1, flexShrink: 0 }}><path d="M8 10h8M8 14h5M5 4h14a1 1 0 011 1v11a1 1 0 01-1 1H9l-4 4V5a1 1 0 011-1z" stroke={accent(hue, { l: 0.8, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.body, lineHeight: 1.4 }}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mini-quiz « est-ce fait pour moi ? » (bottom sheet) ────────
function MetierFitSheet({ metier, hue, onClose }) {
  const [answers, setAnswers] = React.useState({});
  const [done, setDone] = React.useState(false);
  const total = FIT_QUESTIONS.length;
  const ouiCount = Object.values(answers).filter((v) => v === true).length;
  const answeredCount = Object.keys(answers).length;
  const verdict = fitVerdict(ouiCount);
  const toneCol = verdict.tone === 'go' ? 155 : verdict.tone === 'maybe' ? hue : 45;

  return (
    <div onClick={onClose} className="sheet-scrim" style={{ position: 'absolute', inset: 0, zIndex: 70, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'rgba(4,6,12,0.62)' }}>
      <div onClick={(e) => e.stopPropagation()} className="sheet-card" style={{ position: 'relative', background: T.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, border: `1px solid ${T.line}`, borderBottom: 'none', padding: '12px 22px 30px', maxHeight: '88%', overflowY: 'auto', boxShadow: '0 -18px 50px rgba(0,0,0,0.5)' }}>
        <div style={{ width: 40, height: 5, borderRadius: 9, background: 'rgba(255,255,255,0.18)', margin: '0 auto 18px' }} />
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: accent(hue, { l: 0.82, c: 0.1 }) }}>Est-ce fait pour moi ?</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 23, letterSpacing: -0.4, margin: '5px 0 18px', lineHeight: 1.1 }}>{metier.name}</h2>

        {!done ? (
          <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FIT_QUESTIONS.map((fq, i) => (
                <div key={i}>
                  <div style={{ fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 600, color: T.body, marginBottom: 9, lineHeight: 1.35 }}>{fq.q}</div>
                  <div style={{ display: 'flex', gap: 9 }}>
                    {[{ v: true, l: 'Oui' }, { v: false, l: 'Non' }].map((opt) => {
                      const on = answers[i] === opt.v;
                      return (
                        <button key={String(opt.v)} onClick={() => setAnswers((a) => ({ ...a, [i]: opt.v }))} style={{
                          flex: 1, cursor: 'pointer', padding: '11px', borderRadius: 12,
                          fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700,
                          color: on ? '#0B0E16' : T.muted,
                          background: on ? accent(opt.v ? 155 : 45) : T.surface2,
                          border: `1.5px solid ${on ? accent(opt.v ? 155 : 45) : T.line}`,
                        }}>{opt.l}</button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button disabled={answeredCount < total} onClick={() => setDone(true)} style={{
              width: '100%', marginTop: 20, padding: '16px', borderRadius: 15, border: 'none',
              cursor: answeredCount < total ? 'not-allowed' : 'pointer', opacity: answeredCount < total ? 0.5 : 1,
              fontFamily: FONT_UI, fontSize: 16, fontWeight: 700, color: '#0B0E16', background: accent(hue),
            }}>{answeredCount < total ? `Réponds aux ${total} questions (${answeredCount}/${total})` : 'Voir le verdict'}</button>
          </React.Fragment>
        ) : (
          <div className="q-fade">
            <div style={{ padding: '22px 20px', borderRadius: 18, background: accent(toneCol, { a: 0.12 }), border: `1px solid ${accent(toneCol, { a: 0.3 })}`, textAlign: 'center' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: accent(toneCol, { l: 0.84, c: 0.12 }), lineHeight: 1 }}>{ouiCount}<span style={{ fontSize: 22, color: T.muted }}> / {total}</span></div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, color: T.text, margin: '12px 0 8px', letterSpacing: -0.3 }}>{verdict.t}</h3>
              <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.body, margin: 0, lineHeight: 1.5 }}>{verdict.d}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => { setAnswers({}); setDone(false); }} style={{ flex: 1, cursor: 'pointer', padding: '14px', borderRadius: 14, background: 'transparent', border: `1px solid ${T.line}`, fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700, color: T.muted }}>Refaire</button>
              <button onClick={onClose} style={{ flex: 1, cursor: 'pointer', padding: '14px', borderRadius: 14, border: 'none', background: accent(hue), fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700, color: '#0B0E16' }}>Fermer</button>
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.faint, marginTop: 12, textAlign: 'center', lineHeight: 1.4 }}>Un indice pour t’aider à réfléchir, pas un verdict définitif.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Établissements près de chez moi (API Annuaire de l'éducation) ──
const ANNUAIRE_BASE = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records';
const ANNUAIRE_FALLBACK = 'https://annuaire-education.gouv.fr/';

function haversineKm(a, b, c, d) {
  const R = 6371, toR = (x) => x * Math.PI / 180;
  const dLat = toR(c - a), dLon = toR(d - b);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a)) * Math.cos(toR(c)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(s));
}

async function fetchEtabs({ postal, lat, lon, acadCodes }) {
  const select = 'nom_etablissement,type_etablissement,adresse_1,code_postal,nom_commune,telephone,latitude,longitude,libelle_nature,statut_public_prive,code_academie,libelle_academie';
  // Filtre académie côté serveur : on ne ramène que les lycées de l'académie
  // choisie, même quand le rayon géo déborde sur une académie voisine.
  const acadWhere = (acadCodes && acadCodes.length)
    ? ` and code_academie in (${acadCodes.map((c) => `"${c}"`).join(',')})`
    : '';
  const run = async (where, order) => {
    let url = `${ANNUAIRE_BASE}?where=${encodeURIComponent(where)}&limit=40&select=${encodeURIComponent(select)}`;
    if (order) url += `&order_by=${encodeURIComponent(order)}`;
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(url, { signal: ctrl.signal });
    clearTimeout(to);
    if (!r.ok) throw new Error('http ' + r.status);
    return (await r.json()).results || [];
  };
  if (lat != null && lon != null) {
    const pt = `geom'POINT(${lon} ${lat})'`;
    return run(`type_etablissement="Lycée" and within_distance(position, ${pt}, 35km)${acadWhere}`, `distance(position, ${pt})`);
  }
  let res = await run(`type_etablissement="Lycée" and code_postal="${postal}"${acadWhere}`);
  if (!res.length && /^\d{2}/.test(postal)) res = await run(`type_etablissement="Lycée" and code_postal like "${postal.slice(0, 2)}%"${acadWhere}`);
  return res;
}

async function geocodePostal(cp) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 7000);
  const r = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${cp}&fields=centre&format=json`, { signal: ctrl.signal });
  clearTimeout(to);
  if (!r.ok) throw new Error('geo ' + r.status);
  const j = await r.json();
  const c = (j || []).find((x) => x.centre && x.centre.coordinates);
  if (!c) return null;
  return { lon: c.centre.coordinates[0], lat: c.centre.coordinates[1] };
}

function natureTag(lib) {
  const s = (lib || '').toUpperCase();
  if (s.includes('PROFESSIONNEL')) return { k: 'pro', l: 'Pro' };
  if (s.includes('POLYVALENT')) return { k: 'poly', l: 'Polyvalent' };
  return { k: 'gt', l: 'Général & techno' };
}

function EtabNote({ children }) {
  return <div style={{ padding: '18px', borderRadius: 16, background: T.surface, border: `1px dashed ${T.line}`, fontFamily: FONT_UI, fontSize: 14.5, color: T.muted, lineHeight: 1.45 }}>{children}</div>;
}

function EtablissementsScreen({ onBack, initialFilter, context, academie, onSetAcademie }) {
  const hue = appHue();
  const acad = acadByName(academie);
  const [mode, setMode] = React.useState('cp');
  const [postal, setPostal] = React.useState('');
  const [state, setState] = React.useState({ status: 'idle', items: [], near: null });
  const [filter, setFilter] = React.useState(initialFilter || 'all');

  async function searchCP() {
    if (!/^\d{4,5}$/.test(postal.trim())) { setState({ status: 'badcp', items: [], near: null }); return; }
    setState({ status: 'loading', items: [], near: null });
    const acadCodes = acad ? acad.codes : null;
    try {
      let near = null;
      try { near = await geocodePostal(postal.trim()); } catch (e) { near = null; }
      if (near) {
        const items = await fetchEtabs({ lat: near.lat, lon: near.lon, acadCodes });
        setState({ status: 'ok', items, near });
      } else {
        const items = await fetchEtabs({ postal: postal.trim(), acadCodes });
        setState({ status: 'ok', items, near: null });
      }
    } catch (e) { setState({ status: 'error', items: [], near: null }); }
  }
  function searchGeo() {
    if (!navigator.geolocation) { setState({ status: 'nogeo', items: [], near: null }); return; }
    setState({ status: 'loading', items: [], near: null });
    const acadCodes = acad ? acad.codes : null;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const items = await fetchEtabs({ lat: latitude, lon: longitude, acadCodes });
        setState({ status: 'ok', items, near: { lat: latitude, lon: longitude } });
      } catch (e) { setState({ status: 'error', items: [], near: null }); }
    }, () => setState({ status: 'geoderef', items: [], near: null }), { timeout: 9000 });
  }

  let items = state.items.map((e) => {
    const lat = parseFloat(e.latitude), lon = parseFloat(e.longitude);
    const dist = state.near && !isNaN(lat) ? haversineKm(state.near.lat, state.near.lon, lat, lon) : null;
    return { ...e, _dist: dist, _tag: natureTag(e.libelle_nature) };
  });
  // Garde-fou : ne JAMAIS afficher un lycée d'une autre académie que celle choisie.
  if (acad) items = items.filter((e) => acadMatch(e, acad));
  if (filter !== 'all') items = items.filter((e) => (filter === 'pro' ? e._tag.k === 'pro' : e._tag.k !== 'pro'));
  if (state.near) items.sort((a, b) => (a._dist || 9e9) - (b._dist || 9e9));

  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.3} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Où étudier</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 30, letterSpacing: -0.8, margin: '8px 0 6px', lineHeight: 1.04 }}>Établissements près de chez toi</h1>
        {context ? (
          <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '0 0 18px', lineHeight: 1.45 }}>Pour préparer <strong style={{ color: accent(hue, { l: 0.84, c: 0.1 }) }}>{context}</strong> — les lycées de la bonne voie autour de toi.</p>
        ) : (
          <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: '0 0 18px', lineHeight: 1.45 }}>Les lycées autour de toi, depuis l’annuaire officiel de l’Éducation nationale.</p>
        )}

        {/* Choix de l'académie — mémorisé dans le profil, évite de mélanger les académies */}
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 8 }}>Mon académie</div>
        <div style={{ position: 'relative', marginBottom: acad ? 10 : 14 }}>
          <select value={academie || ''} onChange={(e) => onSetAcademie && onSetAcademie(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', appearance: 'none', WebkitAppearance: 'none', padding: '13px 40px 13px 15px', borderRadius: 13, background: acad ? accent(hue, { a: 0.1 }) : T.surface, border: `1.5px solid ${acad ? accent(hue, { a: 0.5 }) : T.line}`, outline: 'none', fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: T.text, colorScheme: themeMode() === 'light' ? 'light' : 'dark', cursor: 'pointer' }}>
            <option value="">Choisis ton académie…</option>
            {ACADEMIES.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><path d="M6 9l6 6 6-6" stroke={acad ? accent(hue, { l: 0.82, c: 0.1 }) : T.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        {acad ? (
          <a href={acad.site} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16, padding: '11px 14px', borderRadius: 12, background: accent(hue, { a: 0.08 }), border: `1px solid ${accent(hue, { a: 0.24 })}`, fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: accent(hue, { l: 0.84, c: 0.09 }) }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
            <span style={{ flex: 1 }}>Calendrier & affectation · académie de {acad.name}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        ) : (
          <div style={{ marginBottom: 16, padding: '12px 14px', borderRadius: 12, background: accent(45, { a: 0.1 }), border: `1px solid ${accent(45, { a: 0.32 })}`, fontFamily: FONT_UI, fontSize: 13, color: accent(45, { l: themeMode() === 'light' ? 0.46 : 0.84, c: 0.1 }), lineHeight: 1.4 }}>
            Choisis ton académie pour n’afficher que les lycées de ta zone — les établissements voisins peuvent dépendre d’une autre académie.
          </div>
        )}

        <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 13, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 14 }}>
          {[{ k: 'cp', l: 'Par code postal' }, { k: 'geo', l: 'Autour de moi' }].map((o) => {
            const on = mode === o.k;
            return <button key={o.k} onClick={() => setMode(o.k)} style={{ flex: 1, cursor: 'pointer', border: 'none', borderRadius: 10, padding: '10px', fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: on ? '#0B0E16' : T.muted, background: on ? accent(hue) : 'transparent' }}>{o.l}</button>;
          })}
        </div>

        {mode === 'cp' ? (
          <div style={{ display: 'flex', gap: 9, marginBottom: 18 }}>
            <input value={postal} onChange={(e) => setPostal(e.target.value.replace(/\D/g, '').slice(0, 5))} onKeyDown={(e) => e.key === 'Enter' && searchCP()} inputMode="numeric" placeholder="Code postal (ex. 75011)"
              style={{ flex: 1, minWidth: 0, padding: '13px 15px', borderRadius: 13, background: T.surface, border: `1px solid ${T.line}`, outline: 'none', fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 600, color: T.text }} />
            <button onClick={searchCP} style={{ cursor: 'pointer', border: 'none', borderRadius: 13, padding: '0 20px', background: accent(hue), fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: '#0B0E16' }}>Chercher</button>
          </div>
        ) : (
          <button onClick={searchGeo} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', cursor: 'pointer', marginBottom: 18, padding: '15px', borderRadius: 14, border: 'none', background: accent(hue), fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: '#0B0E16' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke="#0B0E16" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="#0B0E16" strokeWidth="1.8"/></svg>
            Utiliser ma position
          </button>
        )}

        {state.status === 'ok' && state.items.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[{ k: 'all', l: 'Tous' }, { k: 'gt', l: 'Général & techno' }, { k: 'pro', l: 'Professionnel' }].map((o) => {
              const on = filter === o.k;
              return <button key={o.k} onClick={() => setFilter(o.k)} style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, padding: '8px 13px', borderRadius: 999, color: on ? '#0B0E16' : accent(hue, { l: 0.82, c: 0.09 }), background: on ? accent(hue) : accent(hue, { a: 0.1 }), border: `1px solid ${on ? accent(hue) : accent(hue, { a: 0.28 })}` }}>{o.l}</button>;
            })}
          </div>
        )}

        {state.status === 'loading' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '24px 0', justifyContent: 'center' }}>
            <div className="spin" style={{ width: 26, height: 26, borderRadius: 999, border: `3px solid rgba(255,255,255,0.1)`, borderTopColor: accent(hue) }} />
            <span style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, fontWeight: 600 }}>Recherche…</span>
          </div>
        )}
        {state.status === 'badcp' && <EtabNote>Entre un code postal valide (4 ou 5 chiffres).</EtabNote>}
        {state.status === 'nogeo' && <EtabNote>La géolocalisation n’est pas disponible sur cet appareil. Essaie par code postal.</EtabNote>}
        {state.status === 'geoderef' && <EtabNote>Localisation refusée. Active-la, ou cherche par code postal.</EtabNote>}
        {state.status === 'error' && (
          <div style={{ padding: '20px 18px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 6 }}>Connexion à l’annuaire impossible ici</div>
            <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, lineHeight: 1.45, marginBottom: 14 }}>Dans cet aperçu, l’accès réseau est limité. Une fois l’appli en ligne, les résultats s’afficheront directement ici. En attendant, l’annuaire officiel reste accessible :</div>
            <a href={ANNUAIRE_FALLBACK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', padding: '14px', borderRadius: 13, background: accent(hue, { a: 0.12 }), border: `1px solid ${accent(hue, { a: 0.3 })}`, fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: accent(hue, { l: 0.86, c: 0.08 }) }}>
              Ouvrir l’annuaire-education.gouv.fr
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke={accent(hue, { l: 0.86, c: 0.08 })} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        )}
        {state.status === 'ok' && items.length === 0 && <EtabNote>Aucun lycée trouvé{acad ? ` dans l’académie de ${acad.name} pour cette zone` : ' pour cette zone'}. Essaie un code postal voisin ou « Autour de moi ».</EtabNote>}

        {state.status === 'ok' && items.length > 0 && (
          <React.Fragment>
            <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, color: T.faint, margin: '0 0 12px' }}>{items.length} établissement{items.length > 1 ? 's' : ''}{acad ? ` · académie de ${acad.name}` : ''}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((e, i) => {
                const q = encodeURIComponent(`${e.nom_etablissement} ${e.adresse_1 || ''} ${e.code_postal} ${e.nom_commune}`);
                return (
                  <div key={i} style={{ padding: '15px 16px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: T.text, lineHeight: 1.25 }}>{e.nom_etablissement}</div>
                        <div style={{ fontFamily: FONT_UI, fontSize: 13.5, color: T.muted, marginTop: 3 }}>{e.adresse_1 ? e.adresse_1 + ' · ' : ''}{e.code_postal} {e.nom_commune}</div>
                      </div>
                      {e._dist != null && <span style={{ flexShrink: 0, fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: accent(hue, { l: 0.82, c: 0.1 }) }}>{e._dist < 1 ? Math.round(e._dist * 1000) + ' m' : e._dist.toFixed(1).replace('.', ',') + ' km'}</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 11 }}>
                      <Chip hue={e._tag.k === 'pro' ? 45 : hue}>{e._tag.l}</Chip>
                      {e.statut_public_prive && <Chip>{e.statut_public_prive}</Chip>}
                      <div style={{ flex: 1 }} />
                      <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: accent(hue, { l: 0.82, c: 0.09 }), padding: '7px 11px', borderRadius: 10, background: accent(hue, { a: 0.1 }), border: `1px solid ${accent(hue, { a: 0.26 })}` }}>Itinéraire</a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.faint, marginTop: 14, lineHeight: 1.4 }}>Source : Annuaire de l’éducation (data.education.gouv.fr). Pour les CFA et l’apprentissage, consulte aussi l’Onisep.</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

// ── Interstitiel publicitaire (démo, pendant le calcul du résultat) ──
// Placeholder éthique : jeux pour enfants, NON ciblé, sans tracking.
// Au déploiement, remplacer par une régie (AdMob rewarded/interstitial) —
// voir DEPLOIEMENT.md. Désactivable via le Tweak « Pub (démo) ».
const AD_GAMES = [
  { name: 'Bloc Quest', tag: 'Puzzle · dès 7 ans', hue: 200, glyph: 'rect' },
  { name: 'Fruit Pop', tag: 'Arcade · dès 6 ans', hue: 350, glyph: 'circle' },
  { name: 'Petit Chef', tag: 'Jeu de cuisine · dès 8 ans', hue: 45, glyph: 'tri' },
];
function AdScreen({ onDone, durationS }) {
  const total = durationS || 30;
  const [left, setLeft] = React.useState(total);
  const game = React.useMemo(() => AD_GAMES[Math.floor(Math.random() * AD_GAMES.length)], []);
  React.useEffect(() => {
    const id = setInterval(() => setLeft((v) => {
      if (v <= 1) { clearInterval(id); setTimeout(onDone, 250); return 0; }
      return v - 1;
    }), 1000);
    return () => clearInterval(id);
  }, []);
  const canSkip = left <= total - 5;
  const g = game.hue;
  const glyph = game.glyph === 'circle'
    ? <circle cx="32" cy="32" r="20" fill="#fff" fillOpacity="0.95" />
    : game.glyph === 'tri'
      ? <path d="M32 12l20 38H12z" fill="#fff" fillOpacity="0.95" />
      : <rect x="14" y="14" width="36" height="36" rx="8" fill="#fff" fillOpacity="0.95" />;
  return (
    <div style={{ position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', padding: '54px 20px 26px', overflow: 'hidden', background: '#06070d' }}>
      {/* bandeau pub */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', padding: '4px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.1)' }}>Publicité</span>
        <span style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>
          {canSkip ? '' : `Résultat dans ${left}s`}
        </span>
      </div>

      {/* créa pleine carte */}
      <div style={{ flex: 1, borderRadius: 24, overflow: 'hidden', position: 'relative', background: `linear-gradient(160deg, ${accent(g, { l: 0.6, c: 0.17 })}, ${accent(g, { l: 0.4, c: 0.16 })})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: 24, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 40px rgba(0,0,0,0.3)' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">{glyph}</svg>
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 32, color: '#fff', marginTop: 22, letterSpacing: -0.5 }}>{game.name}</div>
        <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: 6 }}>{game.tag}</div>
        <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
          {[0, 1, 2, 3, 4].map((i) => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z"/></svg>)}
        </div>
        <div style={{ margintop: 4, fontFamily: FONT_UI, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>Gratuit · Sans achat intégré</div>
        <div style={{ marginTop: 22, padding: '13px 32px', borderRadius: 14, background: '#fff', color: accent(g, { l: 0.42, c: 0.16 }), fontFamily: FONT_UI, fontSize: 16, fontWeight: 800 }}>Installer</div>
        <div style={{ position: 'absolute', bottom: 14, fontFamily: FONT_UI, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Démo · publicité non ciblée, sans suivi</div>
      </div>

      {/* barre bas : skip / patiente */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
        <span style={{ fontFamily: FONT_UI, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>On prépare ton résultat…</span>
        <button onClick={canSkip ? onDone : undefined} disabled={!canSkip} style={{
          cursor: canSkip ? 'pointer' : 'default', border: 'none', borderRadius: 12, padding: '11px 18px',
          fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700,
          color: canSkip ? '#0B0E16' : 'rgba(255,255,255,0.5)',
          background: canSkip ? '#fff' : 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          {canSkip ? 'Passer ▸' : `Passer dans ${left - (total - 5)}s`}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingScreen, ParentsScreen, QuestionsPoserScreen, MetierFitSheet, EtablissementsScreen, AdScreen });

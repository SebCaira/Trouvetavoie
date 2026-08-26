// screens.jsx — Accueil, Quiz, Analyse, Résultats, Fiche filière

// ── Accueil ────────────────────────────────────────────────────
function HomeScreen({ prenom, reminders, onReminders, onStart, onExpress, onRiasec, onSteps, onEtab, onEvents, onTension }) {
  const tile = (label, sub, icon, onClick) => (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', gap: 9, textAlign: 'left', cursor: 'pointer',
      padding: '14px 14px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`,
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: accent(appHue(), { a: 0.14 }), border: `1px solid ${accent(appHue(), { a: 0.28 })}` }}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">{icon}</svg>
      </div>
      <div>
        <div style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: T.text, lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.muted, marginTop: 2, lineHeight: 1.3 }}>{sub}</div>
      </div>
    </button>
  );
  const ic = (l = 0.84) => accent(appHue(), { l, c: 0.1 });
  return (
    <div style={{
      position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column',
      padding: '70px 24px 40px', boxSizing: 'border-box', overflow: 'hidden',
    }}>
      <Glow hue={appHue()} top="-16%" size={520} opacity={0.42} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.4,
          textTransform: 'uppercase', color: accent(appHue(), { l: 0.78, c: 0.1 }),
        }}>{prenom ? `Salut ${prenom} · Après la 3ᵉ` : 'Orientation · Après la 3ᵉ'}</div>

        <h1 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text,
          fontSize: 52, lineHeight: 1.02, letterSpacing: -1.5, margin: '16px 0 0',
        }}>Trouve<br/>ta voie.</h1>

        <p style={{
          fontFamily: FONT_UI, fontSize: 17, lineHeight: 1.5, color: T.muted,
          margin: '18px 0 0', maxWidth: 320, textWrap: 'pretty',
        }}>10 questions pour découvrir les filières faites pour toi après le collège. Aucune mauvaise réponse — juste tes goûts.</p>

        {/* aperçu des voies */}
        <div style={{ marginTop: 26 }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: T.faint, marginBottom: 13 }}>
            5 voies passées au crible
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {FILIERE_ORDER.map((k) => (
              <Chip key={k} hue={FILIERES[k].hue}>
                <Dot hue={FILIERES[k].hue} size={7} />{FILIERES[k].name}
              </Chip>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <NextReminderCard reminders={reminders} onOpen={onReminders} />

        {/* grille d'accès rapides */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginBottom: 16 }}>
          {tile('Étapes clés', 'Vœux, affectation…', <React.Fragment><rect x="4" y="5" width="16" height="16" rx="3" stroke={ic()} strokeWidth="1.8"/><path d="M4 9h16M8 3v4M16 3v4" stroke={ic()} strokeWidth="1.8" strokeLinecap="round"/></React.Fragment>, onSteps)}
          {tile('Établissements', 'Lycées près de toi', <React.Fragment><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke={ic()} strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke={ic()} strokeWidth="1.8"/></React.Fragment>, onEtab)}
          {tile('Salons & JPO', 'Événements près de toi', <React.Fragment><rect x="3" y="6" width="18" height="14" rx="2" stroke={ic()} strokeWidth="1.8"/><path d="M3 10h18M8 3v4" stroke={ic()} strokeWidth="1.8" strokeLinecap="round"/><circle cx="16.5" cy="15" r="2" fill={ic()}/></React.Fragment>, onEvents)}
          {tile('Qui recrute ?', 'Secteurs porteurs', <React.Fragment><path d="M4 19V10M10 19V5M16 19v-6M21 19H3" stroke={ic()} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></React.Fragment>, onTension)}
        </div>

        <PrimaryBtn hue={appHue()} onClick={onStart}>Commencer le test</PrimaryBtn>
        <div style={{ display: 'flex', gap: 11, marginTop: 11 }}>
          <button onClick={onExpress} style={{
            flex: 1, padding: '14px 10px', cursor: 'pointer',
            background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 14,
            fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: T.muted,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke={ic(0.82)} strokeWidth="1.8" strokeLinejoin="round"/></svg>
            Test express
          </button>
          <button onClick={onRiasec} style={{
            flex: 1, padding: '14px 10px', cursor: 'pointer',
            background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 14,
            fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: T.muted,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={ic(0.82)} strokeWidth="1.8"/><path d="M15 9l-2 4-4 2 2-4z" fill={ic(0.82)}/></svg>
            Test intérêts
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────
function QuizScreen({ questions, qIndex, answers, onToggle, onNext, onPrev, onExit }) {
  const qs = questions || QUESTIONS;
  const total = qs.length;
  const q = qs[qIndex];
  const selected = Array.isArray(answers[qIndex]) ? answers[qIndex] : (answers[qIndex] == null ? [] : [answers[qIndex]]);
  const letters = ['A', 'B', 'C', 'D'];
  const isLast = qIndex === total - 1;

  return (
    <div key={qIndex} style={{
      position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column',
      padding: '70px 22px 30px', boxSizing: 'border-box',
    }}>
      {/* en-tête */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <BackBtn onClick={qIndex === 0 ? onExit : onPrev} />
        <div style={{ flex: 1 }}>
          <Progress value={(qIndex + 1) / total} />
        </div>
        <div style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: T.muted, minWidth: 42, textAlign: 'right' }}>
          {qIndex + 1}<span style={{ color: T.faint }}> / {total}</span>
        </div>
      </div>

      <div className="q-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 8 }}>
          <Chip>{q.kind}</Chip>
          <span style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 600, color: T.faint }}>1 ou 2 réponses</span>
        </div>

        <h2 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 600, color: T.text,
          fontSize: 30, lineHeight: 1.14, letterSpacing: -0.6, margin: '14px 0 22px',
          textWrap: 'balance',
        }}>{q.q}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {q.options.map((opt, i) => {
            const isSel = selected.includes(i);
            const rank = selected.indexOf(i) + 1; // 1 ou 2
            return (
              <button key={i} onClick={() => onToggle(i)} style={{
                display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                width: '100%', cursor: 'pointer', borderRadius: 16, padding: '15px 15px',
                fontFamily: FONT_UI, fontSize: 16.5, fontWeight: 600, lineHeight: 1.3,
                color: isSel ? T.text : T.body,
                background: isSel ? accent(appHue(), { a: 0.14 }) : T.surface,
                border: `1.5px solid ${isSel ? accent(appHue(), { a: 0.85 }) : T.line}`,
                boxShadow: isSel ? `0 8px 24px -10px ${accent(appHue(), { a: 0.6 })}` : 'none',
                transition: 'background .15s, border-color .15s, transform .1s',
                transform: isSel ? 'scale(0.995)' : 'scale(1)',
              }}>
                <span style={{
                  width: 30, height: 30, flexShrink: 0, borderRadius: isSel ? 9 : 9,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT_UI, fontSize: 14, fontWeight: 700,
                  color: isSel ? '#0B0E16' : T.muted,
                  background: isSel ? accent(appHue()) : (themeMode() === 'light' ? 'rgba(16,22,40,0.06)' : 'rgba(255,255,255,0.06)'),
                  transition: 'background .15s, color .15s',
                }}>
                  {isSel
                    ? <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 8.5L6 12L14 4" stroke="#0B0E16" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : letters[i]}
                </span>
                <span style={{ flex: 1 }}>{opt.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1, minHeight: 14 }} />
        <PrimaryBtn hue={appHue()} onClick={onNext} style={{ opacity: selected.length ? 1 : 0.45, pointerEvents: selected.length ? 'auto' : 'none' }}>
          {selected.length === 0 ? 'Choisis une réponse' : (isLast ? 'Voir mon résultat' : 'Continuer')}
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ── Analyse (transition) ───────────────────────────────────────
function ComputingScreen({ onDone }) {
  const msgs = ['On lit tes réponses…', 'On compare les voies…', 'On prépare ta reco…'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const a = setInterval(() => setI((v) => Math.min(v + 1, msgs.length - 1)), 430);
    const t = setTimeout(onDone, 1500);
    return () => { clearInterval(a); clearTimeout(t); };
  }, []);
  return (
    <div style={{
      position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 40, overflow: 'hidden',
    }}>
      <Glow hue={appHue()} top="30%" size={460} opacity={0.4} />
      <div className="spin" style={{
        width: 64, height: 64, borderRadius: 999,
        border: `3px solid rgba(255,255,255,0.08)`, borderTopColor: accent(appHue()),
        zIndex: 1,
      }} />
      <div style={{
        marginTop: 28, fontFamily: FONT_UI, fontSize: 17, fontWeight: 600, color: T.muted, zIndex: 1,
      }}>{msgs[i]}</div>
    </div>
  );
}

// ── Carte filière (résultat) ───────────────────────────────────
function FiliereCard({ item, primary, onClick }) {
  const f = FILIERES[item.key];
  const hue = f.hue;
  return (
    <button onClick={onClick} style={{
      position: 'relative', width: '100%', textAlign: 'left', cursor: 'pointer',
      borderRadius: 22, overflow: 'hidden', padding: primary ? '22px 22px 20px' : '17px 18px',
      background: primary
        ? `linear-gradient(160deg, ${accent(hue, { a: 0.2 })}, ${T.surface} 62%)`
        : T.surface,
      border: `1.5px solid ${primary ? accent(hue, { a: 0.55 }) : T.line}`,
      boxShadow: primary ? `0 18px 44px -18px ${accent(hue, { a: 0.7 })}` : 'none',
    }}>
      {primary && <Glow hue={hue} top="-60%" size={300} opacity={0.5} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <Chip hue={hue} filled>
            <Dot hue={hue} size={7} />{f.badge}
          </Chip>
          <div style={{ textAlign: 'right', lineHeight: 1 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: primary ? 26 : 20, color: accent(hue, { l: 0.82, c: 0.1 }) }}>{item.pct}%</div>
            <div style={{ fontFamily: FONT_UI, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', color: T.faint, marginTop: 2 }}>compatible</div>
          </div>
        </div>
        <h3 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text,
          fontSize: primary ? 30 : 22, letterSpacing: -0.5, margin: primary ? '14px 0 6px' : '11px 0 4px',
        }}>{f.name}</h3>
        <p style={{ fontFamily: FONT_UI, fontSize: primary ? 15.5 : 14, color: T.muted, margin: 0, lineHeight: 1.45 }}>{f.tagline}</p>
        {primary && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 18,
            fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: accent(hue, { l: 0.84, c: 0.09 }),
          }}>
            Découvrir cette filière
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path d="M1 7h13M9 2l5 5-5 5" stroke={accent(hue, { l: 0.84, c: 0.09 })} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        )}
      </div>
    </button>
  );
}

// ── Métiers : ligne + liste (réutilisé : résultats, fiche, profil) ──
function HeartIcon({ filled, hue }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={filled ? accent(hue) : 'none'}>
      <path d="M12 20.5C12 20.5 3.5 15 3.5 8.8C3.5 6.1 5.6 4 8.2 4C9.9 4 11.3 4.9 12 6.2C12.7 4.9 14.1 4 15.8 4C18.4 4 20.5 6.1 20.5 8.8C20.5 15 12 20.5 12 20.5Z"
        stroke={filled ? accent(hue) : T.faint} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

// Rangée métier : vignette secteur + nom + nb de voies, tappable → fiche.
function MetierRow({ m, hue, isFav, onToggleFav, onOpen }) {
  const fav = isFav(metierId(m));
  const nv = m.voies.length;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 12px', borderRadius: 15,
      background: T.surface, border: `1px solid ${T.line}`,
    }}>
      <button onClick={() => onOpen(m.id)} style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12,
        background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left',
      }}>
        <SectorThumb sector={m.sector} hue={hue} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: T.text }}>{m.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, fontFamily: FONT_UI, fontSize: 12.5, color: T.muted }}>
            <span>{SECTOR_LABEL[m.sector]}</span>
            <span style={{ width: 3, height: 3, borderRadius: 9, background: T.faint }} />
            <span>{nv} voie{nv > 1 ? 's' : ''} possible{nv > 1 ? 's' : ''}</span>
          </div>
        </div>
      </button>
      <button onClick={() => onToggleFav(m)} aria-label={fav ? 'Retirer des favoris' : 'Enregistrer'} style={{
        width: 38, height: 38, flexShrink: 0, borderRadius: 999, cursor: 'pointer',
        border: 'none', background: fav ? accent(hue, { a: 0.16 }) : 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s',
      }}>
        <HeartIcon filled={fav} hue={hue} />
      </button>
    </div>
  );
}

function MetierList({ fk, hue, isFav, onToggleFav, onOpen, max }) {
  const items = metiersForVoie(fk).slice(0, max || 99);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {items.map((m) => <MetierRow key={m.id} m={m} hue={hue} isFav={isFav} onToggleFav={onToggleFav} onOpen={onOpen} />)}
    </div>
  );
}

// ── Onglet Métiers : balade dans tous les métiers ──────────────
function MetiersScreen({ onOpenMetier, isFav, onToggleFav }) {
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = norm(query.trim());
  const base = filter === 'all' ? METIERS : metiersForVoie(filter);
  const list = q
    ? base.filter((m) => norm(m.name).includes(q) || norm(SECTOR_LABEL[m.sector]).includes(q))
    : base;
  const chips = [{ k: 'all', label: 'Toutes', hue: appHue() }].concat(
    FILIERE_ORDER.map((k) => ({ k, label: FILIERES[k].name, hue: FILIERES[k].hue }))
  );
  return (
    <div style={{ position: 'relative', minHeight: '100%', boxSizing: 'border-box', padding: '66px 22px 24px' }} className="q-fade">
      <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>
        Explorer
      </div>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 6px', lineHeight: 1.04 }}>
        Les métiers
      </h1>
      <p style={{ fontFamily: FONT_UI, fontSize: 15, color: T.muted, margin: 0, lineHeight: 1.45 }}>
        Toutes les voies qui y mènent, du CAP aux études longues. Touche un métier pour le détail.
      </p>

      {/* recherche */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginTop: 18,
        padding: '12px 14px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`,
      }}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><circle cx="9" cy="9" r="6.5" stroke={T.faint} strokeWidth="1.8"/><path d="M14 14l4 4" stroke={T.faint} strokeWidth="1.8" strokeLinecap="round"/></svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un métier, un secteur…"
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 600, color: T.text,
          }}
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Effacer" style={{
            width: 24, height: 24, flexShrink: 0, borderRadius: 999, cursor: 'pointer', border: 'none',
            background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={T.muted} strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        )}
      </div>

      {/* filtres par voie */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '14px -22px 0', padding: '0 22px 4px' }}>
        {chips.map((c) => {
          const on = filter === c.k;
          return (
            <button key={c.k} onClick={() => setFilter(c.k)} style={{
              flexShrink: 0, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, padding: '9px 14px', borderRadius: 999,
              color: on ? '#0B0E16' : accent(c.hue, { l: 0.82, c: 0.09 }),
              background: on ? accent(c.hue) : accent(c.hue, { a: 0.1 }),
              border: `1px solid ${on ? accent(c.hue) : accent(c.hue, { a: 0.28 })}`,
            }}>{c.label}</button>
          );
        })}
      </div>

      <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, color: T.faint, margin: '18px 0 12px' }}>
        {list.length} métier{list.length > 1 ? 's' : ''}{query ? ` pour « ${query.trim()} »` : ''}
      </div>
      {list.length ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {list.map((m) => (
            <MetierRow key={m.id} m={m} hue={FILIERES[m.voies[0]].hue} isFav={isFav} onToggleFav={onToggleFav} onOpen={onOpenMetier} />
          ))}
        </div>
      ) : (
        <div style={{ padding: '26px 18px', borderRadius: 16, background: T.surface, border: `1px dashed ${T.line}`, textAlign: 'center' }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>Aucun métier trouvé</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 13.5, color: T.muted, marginTop: 5, lineHeight: 1.4 }}>
            Essaie un autre mot, ou retire le filtre de voie.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tab bar (3 onglets) ────────────────────────────────────────
function TabBar({ tab, onTab }) {
  const items = [
    { k: 'profil', label: 'Profil', icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8.5" r="3.6" stroke={c} strokeWidth="1.8"/><path d="M5 20c0-3.4 3.1-5.5 7-5.5s7 2.1 7 5.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>
    ) },
    { k: 'voie', label: 'Ma voie', icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill="none"/></svg>
    ) },
    { k: 'metiers', label: 'Métiers', icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2.5" stroke={c} strokeWidth="1.8"/><path d="M8.5 7V5.5A1.5 1.5 0 0110 4h4a1.5 1.5 0 011.5 1.5V7M3 12h18" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>
    ) },
  ];
  return (
    <div style={{
      flexShrink: 0, display: 'flex', position: 'relative', zIndex: 30,
      padding: '9px 12px 24px', borderTop: `1px solid ${T.line}`,
      background: themeMode() === 'light' ? 'rgba(255,255,255,0.86)' : 'rgba(11,14,22,0.86)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    }}>
      {items.map((it) => {
        const on = tab === it.k;
        const col = on ? accent(appHue(), { l: 0.82, c: 0.11 }) : T.faint;
        return (
          <button key={it.k} onClick={() => onTab(it.k)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
          }}>
            {it.icon(col)}
            <span style={{ fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, color: col, letterSpacing: 0.2, whiteSpace: 'nowrap' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Fiche métier (bottom sheet) : TOUTES les voies + parcours ──
function MetierSheet({ metier, fromHue, onClose, onOpenVoie, onFit, onWhere, isFav, onToggleFav }) {
  const m = metier;
  const hue = fromHue != null ? fromHue : FILIERES[m.voies[0]].hue;
  const fav = isFav(metierId(m));
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 60, display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', background: 'rgba(4,6,12,0.62)',
    }} className="sheet-scrim">
      <div onClick={(e) => e.stopPropagation()} className="sheet-card" style={{
        position: 'relative', background: T.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26,
        border: `1px solid ${T.line}`, borderBottom: 'none', padding: '12px 22px 30px',
        maxHeight: '86%', overflowY: 'auto',
        boxShadow: '0 -18px 50px rgba(0,0,0,0.5)',
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 9, background: 'rgba(255,255,255,0.18)', margin: '0 auto 18px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <SectorThumb sector={m.sector} hue={hue} size={56} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 24, letterSpacing: -0.5, margin: 0, lineHeight: 1.05 }}>{m.name}</h2>
            <div style={{ fontFamily: FONT_UI, fontSize: 13.5, color: T.muted, marginTop: 4 }}>{SECTOR_LABEL[m.sector]}</div>
          </div>
          <button onClick={() => onToggleFav(m)} aria-label={fav ? 'Retirer des favoris' : 'Enregistrer'} style={{
            width: 42, height: 42, flexShrink: 0, borderRadius: 999, cursor: 'pointer',
            border: 'none', background: fav ? accent(hue, { a: 0.16 }) : 'rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <HeartIcon filled={fav} hue={hue} />
          </button>
        </div>

        {/* TOUTES les voies pour y arriver */}
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: T.faint, margin: '26px 0 12px' }}>
          Comment y arriver · {m.voies.length} voie{m.voies.length > 1 ? 's' : ''}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {m.voies.map((vk) => {
            const f = FILIERES[vk];
            return (
              <button key={vk} onClick={() => onOpenVoie(vk)} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', cursor: 'pointer',
                padding: '13px 14px', borderRadius: 14,
                background: accent(f.hue, { a: 0.1 }), border: `1px solid ${accent(f.hue, { a: 0.3 })}`,
              }}>
                <Dot hue={f.hue} size={9} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>{f.name}</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 1 }}>{f.badge}</div>
                </div>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={accent(f.hue, { l: 0.82, c: 0.09 })} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            );
          })}
        </div>

        {/* parcours d'études */}
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: T.faint, margin: '24px 0 10px' }}>
          Le parcours d’études
        </div>
        <p style={{ fontFamily: FONT_UI, fontSize: 15.5, lineHeight: 1.5, color: T.body, margin: 0 }}>{m.parcours}</p>

        {SALAIRES[m.id] && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 13, marginTop: 18, padding: '14px 16px',
            borderRadius: 15, background: T.surface2, border: `1px solid ${T.line}`,
          }}>
            <div style={{
              width: 40, height: 40, flexShrink: 0, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: accent(hue, { a: 0.14 }), border: `1px solid ${accent(hue, { a: 0.28 })}`,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M16 7.5C16 5.6 14.2 4.5 12 4.5S8 5.6 8 7.5s1.8 2.7 4 3.2 4 1.3 4 3.3-1.8 3-4 3-4-1.1-4-3" stroke={accent(hue, { l: 0.84, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: T.faint }}>Salaire débutant</div>
              <div style={{ fontFamily: FONT_UI, fontSize: 16, fontWeight: 700, color: T.text, marginTop: 2 }}>{SALAIRES[m.id]} <span style={{ fontSize: 12.5, fontWeight: 600, color: T.muted }}>brut / mois</span></div>
            </div>
          </div>
        )}
        <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.faint, marginTop: 9, lineHeight: 1.4 }}>
          Chiffres indicatifs. Données de référence et fiche complète sur l’Onisep.
        </div>

        <button onClick={() => onFit(m.id)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', cursor: 'pointer',
          marginTop: 14, padding: '15px', borderRadius: 15, background: accent(hue, { a: 0.14 }), border: `1px solid ${accent(hue, { a: 0.32 })}`,
          fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: accent(hue, { l: 0.86, c: 0.08 }),
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11a3 3 0 116 0c0 2-3 2.5-3 4.5M12 19h.01" stroke={accent(hue, { l: 0.86, c: 0.08 })} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Est-ce fait pour moi ?
        </button>

        <button onClick={() => onWhere(m.id)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', cursor: 'pointer',
          marginTop: 11, padding: '15px', borderRadius: 15, background: T.surface2, border: `1px solid ${T.line}`,
          fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: T.text,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke={T.text} strokeWidth="1.7" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke={T.text} strokeWidth="1.7"/></svg>
          Où la préparer près de chez moi ?
        </button>

        <a href={onisepUrl(m)} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none',
          marginTop: 14, padding: '15px', borderRadius: 15,
          fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: accent(hue, { l: 0.86, c: 0.08 }),
          background: accent(hue, { a: 0.12 }), border: `1px solid ${accent(hue, { a: 0.32 })}`,
        }}>
          Voir la fiche métier sur l’Onisep
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke={accent(hue, { l: 0.86, c: 0.08 })} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </div>
  );
}

// petit bouton profil (avatar) en haut à droite
function ProfilePill({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Mon profil" style={{
      width: 42, height: 42, borderRadius: 999, cursor: 'pointer', flexShrink: 0,
      border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={T.text} strokeWidth="1.8"/>
        <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" stroke={T.text} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

// ── Bloc « Points forts » (résultat + profil) ──────────────────
function PointsFortsBlock({ subjects, voieKey, hue, onEdit }) {
  const has = subjects && subjects.length > 0;
  if (!has) {
    return (
      <button onClick={onEdit} style={{
        display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', cursor: 'pointer',
        marginTop: 22, padding: '16px 16px', borderRadius: 16,
        background: T.surface, border: `1px dashed ${accent(hue, { a: 0.4 })}`,
      }}>
        <div style={{
          width: 40, height: 40, flexShrink: 0, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: accent(hue, { a: 0.14 }), border: `1px solid ${accent(hue, { a: 0.28 })}`,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" stroke={accent(hue, { l: 0.84, c: 0.1 })} strokeWidth="1.6" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>Ajoute tes matières fortes</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2 }}>Pour affiner ta voie avec tes points forts.</div>
        </div>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    );
  }
  const pf = pointsForts(subjects, voieKey);
  return (
    <div style={{ marginTop: 22, padding: '18px 18px 16px', borderRadius: 18, background: accent(hue, { a: 0.08 }), border: `1px solid ${accent(hue, { a: 0.24 })}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: accent(hue, { l: 0.82, c: 0.1 }) }}>Tes points forts</div>
        <button onClick={onEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: accent(hue, { l: 0.82, c: 0.09 }) }}>Modifier</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {pf.chosenLabels.map((l, i) => <Chip key={i} hue={hue} filled>{l}</Chip>)}
      </div>

      {pf.matchedLabels.length > 0 ? (
        <p style={{ fontFamily: FONT_UI, fontSize: 14.5, color: T.body, margin: '14px 0 0', lineHeight: 1.45 }}>
          Tes points forts en <strong>{pf.matchedLabels.join(' et ')}</strong> collent bien avec cette voie.
        </p>
      ) : (
        <p style={{ fontFamily: FONT_UI, fontSize: 14.5, color: T.muted, margin: '14px 0 0', lineHeight: 1.45 }}>
          Tu pourras valoriser ces matières quelle que soit ta voie — et elles nourrissent aussi les autres pistes à explorer.
        </p>
      )}

      {pf.specs.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: T.faint, marginBottom: 10 }}>À regarder dans cette voie</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {pf.specs.map((x, i) => (
              <span key={i} style={{
                fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 600, color: T.body,
                padding: '8px 12px', borderRadius: 10, background: T.surface, border: `1px solid ${T.line}`,
              }}>{x}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Résultats ──────────────────────────────────────────────────
function ResultScreen({ result, reasons, subjects, onEditSubjects, onCompare, onOpen, onOpenMetier, onRestart, onProfile, onShare, isFav, onToggleFav }) {
  const { main, alts, ranked } = result;
  const mainHue = FILIERES[main.key].hue;
  return (
    <div style={{
      position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column',
      padding: '70px 22px 40px', boxSizing: 'border-box',
    }}>
      <div className="q-fade">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>
              Ton résultat
            </div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 29, letterSpacing: -0.6, margin: '8px 0 0', lineHeight: 1.1 }}>
              La voie qui te ressemble
            </h1>
          </div>
          <ProfilePill onClick={onProfile} />
        </div>

        <FiliereCard item={main} primary onClick={() => onOpen(main.key)} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '12px 2px 0', fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: accent(155, { l: 0.78, c: 0.1 }) }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7.5L5.5 11L12 3.5" stroke={accent(155, { l: 0.78, c: 0.1 })} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Enregistré dans ton profil
        </div>

        <div style={{ marginTop: 18 }}><FairnessBanner compact /></div>

        {reasons && reasons.length > 0 && (
          <div style={{ marginTop: 22, padding: '18px 18px 16px', borderRadius: 18, background: accent(mainHue, { a: 0.08 }), border: `1px solid ${accent(mainHue, { a: 0.24 })}` }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: accent(mainHue, { l: 0.82, c: 0.1 }), marginBottom: 12 }}>
              Pourquoi cette voie ?
            </div>
            <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, marginBottom: 12, lineHeight: 1.45 }}>
              Parce que, dans le test, tu as notamment choisi :
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {reasons.map((r, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M2 8.5L6 12L14 4" stroke={accent(mainHue, { l: 0.82, c: 0.1 })} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.body, lineHeight: 1.35 }}>« {r} »</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <PointsFortsBlock subjects={subjects} voieKey={main.key} hue={mainHue} onEdit={onEditSubjects} />

        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: T.faint, margin: '26px 0 13px' }}>
          À explorer aussi
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {alts.map((a) => <FiliereCard key={a.key} item={a} onClick={() => onOpen(a.key)} />)}
        </div>

        {/* métiers possibles pour la voie principale */}
        <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: T.faint, margin: '28px 0 13px' }}>
          Des métiers possibles
        </div>
        <MetierList fk={main.key} hue={mainHue} isFav={isFav} onToggleFav={onToggleFav} onOpen={onOpenMetier} max={4} />
        <button onClick={() => onOpen(main.key)} style={{
          width: '100%', marginTop: 10, padding: '12px', cursor: 'pointer', background: 'transparent',
          border: `1px dashed ${T.line}`, borderRadius: 12, fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: T.muted,
        }}>Voir tous les métiers de la {FILIERES[main.key].name.toLowerCase()}</button>

        {/* spectre de compatibilité */}
        <div style={{ marginTop: 28, padding: '18px 18px 6px', background: T.surface, borderRadius: 18, border: `1px solid ${T.lineSoft}` }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: T.faint, marginBottom: 14 }}>
            Ton profil en un coup d’œil
          </div>
          {ranked.map((r) => {
            const f = FILIERES[r.key];
            return (
              <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 92, flexShrink: 0, fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: T.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.pct}%`, borderRadius: 999, background: accent(f.hue) }} />
                </div>
                <div style={{ width: 34, textAlign: 'right', fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, color: T.muted }}>{r.pct}%</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 22 }}>
          <PrimaryBtn hue={appHue()} onClick={onShare}>Partager mon résultat</PrimaryBtn>
        </div>
        <button onClick={onCompare} style={{
          width: '100%', marginTop: 11, padding: '15px', cursor: 'pointer',
          background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 16,
          fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.muted,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M8 4v16M16 4v16M4 8h8M12 16h8" stroke={accent(appHue(), { l: 0.82, c: 0.1 })} strokeWidth="1.8" strokeLinecap="round"/></svg>
          Comparer deux voies
        </button>
        <button onClick={onRestart} style={{
          width: '100%', marginTop: 11, padding: '15px', cursor: 'pointer',
          background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 16,
          fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 700, color: T.muted,
        }}>↺ Refaire le test</button>
      </div>
    </div>
  );
}

// ── Fiche filière (détail) ─────────────────────────────────────
function DetailScreen({ filiereKey, onBack, onOpenMetier, isVoieFav, onToggleVoieFav, isFav, onToggleFav }) {
  const f = FILIERES[filiereKey];
  const hue = f.hue;
  const Section = ({ label, children }) => (
    <div style={{ marginTop: 26 }}>
      <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: accent(hue, { l: 0.8, c: 0.09 }), marginBottom: 12 }}>{label}</div>
      {children}
    </div>
  );
  const Bullet = ({ children }) => (
    <li style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 11 }}>
      <span style={{ marginTop: 8, flexShrink: 0 }}><Dot hue={hue} size={7} /></span>
      <span style={{ fontFamily: FONT_UI, fontSize: 15.5, lineHeight: 1.45, color: T.body }}>{children}</span>
    </li>
  );
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={460} opacity={0.4} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 24px 0' }} className="q-fade">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 20 }}>
          <BackBtn onClick={onBack} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <SpeakButton hue={hue} getText={() => `${f.name}. ${f.tagline}. ${f.intro}`} />
          <button onClick={() => onToggleVoieFav(filiereKey)} aria-label={isVoieFav(filiereKey) ? 'Retirer des voies épinglées' : 'Épingler cette voie'} style={{
            display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer',
            padding: '9px 14px', borderRadius: 999,
            background: isVoieFav(filiereKey) ? accent(hue, { a: 0.16 }) : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isVoieFav(filiereKey) ? accent(hue, { a: 0.4 }) : T.line}`,
            fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: isVoieFav(filiereKey) ? accent(hue, { l: 0.84, c: 0.1 }) : T.muted,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={isVoieFav(filiereKey) ? accent(hue) : 'none'}><path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" stroke={isVoieFav(filiereKey) ? accent(hue) : T.muted} strokeWidth="1.8" strokeLinejoin="round"/></svg>
            {isVoieFav(filiereKey) ? 'Épinglée' : 'Épingler'}
          </button>
          </div>
        </div>

        <Chip hue={hue} filled><Dot hue={hue} size={7} />{f.badge}</Chip>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 38, letterSpacing: -1, margin: '16px 0 8px', lineHeight: 1.02 }}>{f.name}</h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 18, color: accent(hue, { l: 0.85, c: 0.08 }), fontWeight: 600, margin: 0, lineHeight: 1.35 }}>{f.tagline}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, color: T.muted }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke={T.muted} strokeWidth="1.4"/><path d="M7.5 4v3.7L10 9" stroke={T.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {f.duree}
        </div>

        <p style={{ fontFamily: FONT_UI, fontSize: 16, lineHeight: 1.55, color: T.body, margin: '22px 0 0', textWrap: 'pretty' }}>{f.intro}</p>

        {f.stats && (
          <Section label="Poursuite d’études & insertion">
            <div style={{ display: 'flex', gap: 11 }}>
              {f.stats.map((s, i) => (
                <div key={i} style={{
                  flex: 1, padding: '16px 15px', borderRadius: 16,
                  background: accent(hue, { a: 0.1 }), border: `1px solid ${accent(hue, { a: 0.26 })}`,
                }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 23, letterSpacing: -0.4, color: accent(hue, { l: 0.85, c: 0.1 }), lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 600, color: T.muted, marginTop: 7, lineHeight: 1.3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <a href={f.onisep} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none', marginTop: 12,
              fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 700, color: accent(hue, { l: 0.82, c: 0.09 }),
            }}>
              Repères, pas des garanties. Données officielles sur l’Onisep
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke={accent(hue, { l: 0.82, c: 0.09 })} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <div style={{ fontFamily: FONT_UI, fontSize: 11.5, color: T.faint, marginTop: 9, lineHeight: 1.4 }}>
              Source : {STATS_META.source}, {STATS_META.year}. {STATS_META.note}
            </div>
          </Section>
        )}

        <Section label="Ce que tu y fais">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {f.fais.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
          </ul>
        </Section>

        <Section label={f.listLabel}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {f.list.map((x, i) => (
              <span key={i} style={{
                fontFamily: FONT_UI, fontSize: 14, fontWeight: 600, color: T.body,
                padding: '9px 13px', borderRadius: 12, background: T.surface, border: `1px solid ${T.line}`,
              }}>{x}</span>
            ))}
          </div>
        </Section>

        <Section label={f.apresLabel}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {f.apres.map((x, i) => <Chip key={i} hue={hue}>{x}</Chip>)}
          </div>
        </Section>

        <Section label="Exemples de métiers">
          <MetierList fk={filiereKey} hue={hue} isFav={isFav} onToggleFav={onToggleFav} onOpen={onOpenMetier} />
          <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.faint, marginTop: 11, lineHeight: 1.4 }}>
            Touche un métier pour voir toutes les voies qui y mènent et son parcours d’études, ou le cœur pour l’enregistrer.
          </div>
        </Section>

        {(TEMOIGNAGES[filiereKey] || []).length > 0 && (
          <Section label="Ils sont passés par là">
            {TEMOIGNAGES[filiereKey].map((t, i) => (
              <div key={i} style={{
                position: 'relative', padding: '18px 18px 16px', borderRadius: 18,
                background: accent(hue, { a: 0.08 }), border: `1px solid ${accent(hue, { a: 0.24 })}`,
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 12, right: 14, opacity: 0.5 }}>
                  <path d="M9 7H5a2 2 0 00-2 2v3a2 2 0 002 2h2v3H4M19 7h-4a2 2 0 00-2 2v3a2 2 0 002 2h2v3h-3" stroke={accent(hue, { l: 0.82, c: 0.1 })} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontFamily: FONT_UI, fontSize: 15.5, lineHeight: 1.5, color: T.body, margin: '0 0 12px', fontStyle: 'italic', maxWidth: '90%' }}>« {t.txt} »</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: T.text }}>{t.qui}</span>
                  <span style={{ width: 3, height: 3, borderRadius: 9, background: T.faint }} />
                  <span style={{ fontFamily: FONT_UI, fontSize: 13, color: accent(hue, { l: 0.82, c: 0.09 }), fontWeight: 600 }}>{t.role}</span>
                </div>
              </div>
            ))}
            <div style={{ fontFamily: FONT_UI, fontSize: 12, color: T.faint, marginTop: 9 }}>Témoignages illustratifs.</div>
          </Section>
        )}

        <Section label="Pour toi si…">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {f.pour.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
          </ul>
        </Section>
      </div>
    </div>
  );
}

// ── Profil ─────────────────────────────────────────────────────
function ProfileScreen({ profile, asTab, onBack, onRetake, onShare, onOpen, onOpenMetier, onSetPrenom, onRecap, onEditSubjects, onGlossaire, onParents, onQuestions, onJournal, onAnonExport, isVoieFav, onToggleVoieFav, isFav, onToggleFav }) {
  const res = profile.result;
  const favs = profile.favorites || [];
  const dateStr = res ? new Date(res.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const mainHue = res ? FILIERES[res.mainKey].hue : appHue();

  const Label = ({ children }) => (
    <div style={{ fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', color: T.faint, margin: '30px 0 13px' }}>{children}</div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 44 }}>
      <Glow hue={appHue()} top="-16%" size={460} opacity={0.34} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          {!asTab && <BackBtn onClick={onBack} />}
          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: asTab ? 32 : 28, letterSpacing: -0.7, margin: 0, whiteSpace: 'nowrap' }}>Mon profil</h1>
        </div>

        <p style={{ fontFamily: FONT_UI, fontSize: 14.5, color: T.muted, margin: '0 2px', lineHeight: 1.45 }}>
          Tes résultats et tes métiers enregistrés, gardés sur cet appareil.
        </p>

        {/* prénom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 18, padding: '12px 14px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}` }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="8.5" r="3.4" stroke={T.faint} strokeWidth="1.7"/><path d="M5.5 19c0-3.1 2.9-5 6.5-5s6.5 1.9 6.5 5" stroke={T.faint} strokeWidth="1.7" strokeLinecap="round"/></svg>
          <input
            value={profile.prenom || ''}
            onChange={(e) => onSetPrenom(e.target.value.slice(0, 24))}
            placeholder="Ton prénom (facultatif)"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 600, color: T.text }}
          />
        </div>

        <Label>Mon dernier résultat</Label>
        {res ? (
          <React.Fragment>
            <button onClick={() => onOpen(res.mainKey)} style={{
              position: 'relative', width: '100%', textAlign: 'left', cursor: 'pointer', overflow: 'hidden',
              borderRadius: 20, padding: '18px 18px',
              background: `linear-gradient(160deg, ${accent(mainHue, { a: 0.2 })}, ${T.surface} 64%)`,
              border: `1.5px solid ${accent(mainHue, { a: 0.5 })}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <Chip hue={mainHue} filled><Dot hue={mainHue} size={7} />{FILIERES[res.mainKey].badge}</Chip>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, color: accent(mainHue, { l: 0.82, c: 0.1 }) }}>{res.mainPct}%</div>
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 25, letterSpacing: -0.5, margin: '12px 0 6px' }}>{FILIERES[res.mainKey].name}</h3>
              <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted }}>Test passé le {dateStr}</div>
            </button>
            <button onClick={onRetake} style={{
              width: '100%', marginTop: 11, padding: '14px', cursor: 'pointer',
              background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 14,
              fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.muted,
            }}>↺ Refaire le test</button>
          </React.Fragment>
        ) : (
          <div style={{ padding: '22px 18px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, textAlign: 'center' }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 15.5, fontWeight: 600, color: T.text, marginBottom: 4 }}>Tu n’as pas encore passé le test</div>
            <div style={{ fontFamily: FONT_UI, fontSize: 14, color: T.muted, marginBottom: 16, lineHeight: 1.45 }}>10 questions pour découvrir les voies faites pour toi.</div>
            <PrimaryBtn hue={appHue()} onClick={onRetake}>Commencer le test</PrimaryBtn>
          </div>
        )}

        {res && <PointsFortsBlock subjects={profile.subjects} voieKey={res.mainKey} hue={mainHue} onEdit={onEditSubjects} />}

        <Label>Métiers enregistrés{favs.length ? ` · ${favs.length}` : ''}</Label>
        {favs.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {favs.map((m) => metierById(m.id)).filter(Boolean).map((m) => <MetierRow key={m.id} m={m} hue={FILIERES[m.voies[0]].hue} isFav={isFav} onToggleFav={onToggleFav} onOpen={onOpenMetier} />)}
          </div>
        ) : (
          <div style={{ padding: '20px 18px', borderRadius: 18, background: T.surface, border: `1px dashed ${T.line}`, fontFamily: FONT_UI, fontSize: 14, color: T.muted, lineHeight: 1.45 }}>
            Aucun métier enregistré pour l’instant. Touche le cœur sur un métier dans une fiche filière pour le retrouver ici.
          </div>
        )}

        {res && (
          <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 11 }}>
            <PrimaryBtn hue={appHue()} onClick={onShare}>Partager mon résultat</PrimaryBtn>
            <button onClick={onRecap} style={{
              width: '100%', padding: '15px', cursor: 'pointer',
              background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 16,
              fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M7 8V3h10v5M7 18H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 14h10v7H7z" stroke={accent(appHue(), { l: 0.82, c: 0.1 })} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Récap pour mes parents
            </button>
          </div>
        )}

        {(profile.history || []).length > 1 && (
          <React.Fragment>
            <Label>Mes tests précédents</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {profile.history.slice(1, 6).map((h, i) => {
                const hf = FILIERES[h.mainKey];
                const d = new Date(h.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}` }}>
                    <Dot hue={hf.hue} size={9} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700, color: T.text }}>{hf.name}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 1 }}>{d}{h.mode === 'express' ? ' · test express' : ''}</div>
                    </div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: accent(hf.hue, { l: 0.82, c: 0.1 }) }}>{h.mainPct}%</div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}

        {(profile.voieFavs || []).length > 0 && (
          <React.Fragment>
            <Label>Voies épinglées</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {profile.voieFavs.map((k) => {
                const vf = FILIERES[k];
                return (
                  <button key={k} onClick={() => onOpen(k)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', cursor: 'pointer', padding: '13px 14px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}` }}>
                    <Dot hue={vf.hue} size={9} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>{vf.name}</div>
                      <div style={{ fontFamily: FONT_UI, fontSize: 12.5, color: T.muted, marginTop: 1 }}>{vf.badge}</div>
                    </div>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        )}

        <Label>Mon carnet &amp; ma progression</Label>
        {/* badges */}
        {(() => {
          const got = earnedBadges(profile);
          const n = Object.values(got).filter(Boolean).length;
          return (
            <div style={{ padding: '15px 16px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
                <span style={{ fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: T.text }}>Mes badges</span>
                <span style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: T.muted }}>{n} / {BADGES.length}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 10, rowGap: 16 }}>
                {BADGES.map((b) => {
                  const on = got[b.id];
                  const gl = {
                    star: <path d="M12 3l2.6 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.4-.5z" />,
                    compass: <React.Fragment><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 4-4 2 2-4z" fill="#0B0E16"/></React.Fragment>,
                    heart: <path d="M12 20S4 15 4 9a4 4 0 018-1 4 4 0 018 1c0 6-8 11-8 11z" />,
                    flag: <path d="M6 21V4h11l-2 4 2 4H6" />,
                    book: <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z" />,
                    check: <path d="M4 12l5 5L20 6" />,
                  }[b.icon];
                  return (
                    <div key={b.id} title={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: 0 }}>
                      <div style={{ width: 50, height: 50, flexShrink: 0, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? accent(appHue(), { a: 0.18 }) : (themeMode() === 'light' ? 'rgba(16,22,40,0.05)' : 'rgba(255,255,255,0.04)'), border: `1px solid ${on ? accent(appHue(), { a: 0.4 }) : T.line}`, opacity: on ? 1 : 0.5 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={on ? accent(appHue()) : 'none'} stroke={on ? accent(appHue()) : T.faint} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">{gl}</svg>
                      </div>
                      <div style={{ width: '100%', fontFamily: FONT_UI, fontSize: 11, fontWeight: 600, color: on ? T.muted : T.faint, marginTop: 7, lineHeight: 1.25, textWrap: 'balance' }}>{b.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        <button onClick={onJournal} style={{
          display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', cursor: 'pointer',
          padding: '14px 15px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 10,
        }}>
          <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: accent(appHue(), { a: 0.14 }), border: `1px solid ${accent(appHue(), { a: 0.28 })}` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4zM8 8h7M8 12h5" stroke={accent(appHue(), { l: themeMode() === 'light' ? 0.5 : 0.84, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>Mon journal de bord</div>
            <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2 }}>Notes de JPO, stages, rencontres</div>
          </div>
          {(profile.journal || []).length > 0 && <span style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: accent(appHue(), { l: themeMode() === 'light' ? 0.5 : 0.82, c: 0.1 }), background: accent(appHue(), { a: 0.14 }), borderRadius: 999, padding: '3px 9px' }}>{profile.journal.length}</span>}
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {res && (
          <button onClick={onAnonExport} style={{
            display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', cursor: 'pointer',
            padding: '14px 15px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`,
          }}>
            <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: accent(appHue(), { a: 0.14 }), border: `1px solid ${accent(appHue(), { a: 0.28 })}` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke={accent(appHue(), { l: themeMode() === 'light' ? 0.5 : 0.84, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>Résumé pour le conseil de classe</div>
              <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2 }}>Synthèse anonyme à copier / partager</div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}

        <Label>Pour comprendre</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            { l: 'Le glossaire des sigles', d: 'BTS, CFA, ÉduConnect, STMG…', on: onGlossaire, icon: <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4zM5 17a3 3 0 013-3h11" stroke={accent(appHue(), { l: themeMode() === 'light' ? 0.5 : 0.84, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
            { l: 'Côté parents', d: 'La procédure expliquée aux familles', on: onParents, icon: <path d="M9 11a3 3 0 100-6 3 3 0 000 6M3 20c0-3 2.7-5 6-5M16 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5M14 20c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={accent(appHue(), { l: 0.84, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
            { l: 'Les bonnes questions', d: 'À poser en JPO ou au prof principal', on: onQuestions, icon: <path d="M5 4h14a1 1 0 011 1v11a1 1 0 01-1 1H9l-4 4V5a1 1 0 011-1zM9 9h6M9 13h4" stroke={accent(appHue(), { l: 0.84, c: 0.1 })} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/> },
          ].map((r, i) => (
            <button key={i} onClick={r.on} style={{
              display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', cursor: 'pointer',
              padding: '14px 15px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`,
            }}>
              <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: accent(appHue(), { a: 0.14 }), border: `1px solid ${accent(appHue(), { a: 0.28 })}` }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{r.icon}</svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: T.text }}>{r.l}</div>
                <div style={{ fontFamily: FONT_UI, fontSize: 13, color: T.muted, marginTop: 2 }}>{r.d}</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={T.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
function SubjectsScreen({ subjects, voieKey, onToggle, onBack }) {
  const hue = appHue();
  const ids = subjects || [];
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.32} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 24px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>
          Pour affiner
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 8px', lineHeight: 1.04 }}>
          Tes matières fortes
        </h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '0 0 26px', lineHeight: 1.45 }}>
          Celles où tu es à l’aise. Ça ne change pas ta voie — ça met en avant les spécialités et séries qui pourraient te plaire.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SUBJECTS.map((s) => {
            const on = ids.includes(s.id);
            return (
              <button key={s.id} onClick={() => onToggle(s.id)} style={{
                display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', cursor: 'pointer',
                padding: '15px 16px', borderRadius: 15,
                background: on ? accent(hue, { a: 0.14 }) : T.surface,
                border: `1.5px solid ${on ? accent(hue, { a: 0.85 }) : T.line}`,
                transition: 'background .15s, border-color .15s',
              }}>
                <div style={{
                  width: 26, height: 26, flexShrink: 0, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: on ? accent(hue) : 'rgba(255,255,255,0.06)',
                }}>
                  {on && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8.5L6 12L14 4" stroke="#0B0E16" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ flex: 1, fontFamily: FONT_UI, fontSize: 16, fontWeight: 700, color: on ? T.text : T.body }}>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 24 }}>
          <PrimaryBtn hue={hue} onClick={onBack}>{ids.length ? `Valider (${ids.length})` : 'Plus tard'}</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

// ── Calendrier : les étapes clés de l'orientation ──────────────
function StepsScreen({ onBack, checked, testDone, onToggleCheck }) {
  const hue = appHue();
  const CAL_KEY = 'orientation3e_calmode';
  const [mode, setMode] = React.useState(() => {
    try { return localStorage.getItem(CAL_KEY) === 's' ? 's' : 't'; } catch (e) { return 't'; }
  });
  const pick = (m) => { setMode(m); try { localStorage.setItem(CAL_KEY, m); } catch (e) {} };
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.32} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 24px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>
          Le calendrier
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 34, letterSpacing: -1, margin: '8px 0 8px', lineHeight: 1.04 }}>
          Les étapes clés
        </h1>
        <p style={{ fontFamily: FONT_UI, fontSize: 15.5, color: T.muted, margin: '0 0 18px', lineHeight: 1.45 }}>
          Comment se déroule ton orientation, du collège au lycée.
        </p>

        {/* bascule trimestres / semestres */}
        <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 13, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 26 }}>
          {[{ k: 't', l: 'Trimestres' }, { k: 's', l: 'Semestres' }].map((o) => {
            const on = mode === o.k;
            return (
              <button key={o.k} onClick={() => pick(o.k)} style={{
                flex: 1, cursor: 'pointer', border: 'none', borderRadius: 10, padding: '10px',
                fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700,
                color: on ? '#0B0E16' : T.muted, background: on ? accent(hue) : 'transparent',
                transition: 'background .15s, color .15s',
              }}>{o.l}</button>
            );
          })}
        </div>

        <div style={{ position: 'relative', paddingLeft: 30 }}>
          {/* ligne verticale */}
          <div style={{ position: 'absolute', left: 9, top: 6, bottom: 30, width: 2, background: accent(hue, { a: 0.3 }) }} />
          {ETAPES.map((e, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 22 }}>
              <div style={{
                position: 'absolute', left: -30, top: 2, width: 20, height: 20, borderRadius: 999,
                background: T.bg, border: `2px solid ${accent(hue)}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: 999, background: accent(hue) }} />
              </div>
              <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: accent(hue, { l: 0.8, c: 0.09 }) }}>{e.when[mode]}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: T.text, margin: '3px 0 4px', letterSpacing: -0.3 }}>{e.t}</div>
              <div style={{ fontFamily: FONT_UI, fontSize: 14.5, color: T.muted, lineHeight: 1.45 }}>{e.txt}</div>
            </div>
          ))}
        </div>

        <a href={ETAPES_ONISEP} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none',
          marginTop: 6, padding: '15px', borderRadius: 15,
          fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: accent(hue, { l: 0.86, c: 0.08 }),
          background: accent(hue, { a: 0.12 }), border: `1px solid ${accent(hue, { a: 0.3 })}`,
        }}>
          Le détail de la procédure sur l’Onisep
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3M9 3H4M9 3V8" stroke={accent(hue, { l: 0.86, c: 0.08 })} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>

        {/* checklist des démarches */}
        {(() => {
          const isOn = (it) => (it.auto ? testDone : (checked || []).includes(it.id));
          const done = CHECKLIST.filter(isOn).length;
          const pct = Math.round(100 * done / CHECKLIST.length);
          return (
            <div style={{ marginTop: 34 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>Ma checklist</div>
                <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, color: accent(hue, { l: 0.82, c: 0.1 }) }}>{done} / {CHECKLIST.length}</div>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ height: '100%', width: `${pct}%`, borderRadius: 999, background: accent(hue), transition: 'width .35s cubic-bezier(.4,0,.2,1)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {CHECKLIST.map((it) => {
                  const on = isOn(it);
                  return (
                    <button key={it.id} onClick={() => !it.auto && onToggleCheck(it.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left',
                      cursor: it.auto ? 'default' : 'pointer', padding: '13px 14px', borderRadius: 14,
                      background: on ? accent(hue, { a: 0.1 }) : T.surface,
                      border: `1px solid ${on ? accent(hue, { a: 0.3 }) : T.line}`,
                    }}>
                      <div style={{
                        width: 24, height: 24, flexShrink: 0, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: on ? accent(hue) : 'transparent', border: on ? 'none' : `2px solid ${T.faint}`,
                      }}>
                        {on && <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 8.5L6 12L14 4" stroke="#0B0E16" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span style={{ flex: 1, fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, color: on ? T.text : T.body, textDecorationLine: on ? 'line-through' : 'none', textDecorationColor: accent(hue, { a: 0.5 }) }}>{it.label}</span>
                      {it.auto && <span style={{ fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: 0.4 }}>auto</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ── Récap imprimable (pour les parents) ────────────────────────
function RecapScreen({ profile, result, onBack, onPrint, onShareImage }) {
  const res = profile.result;
  if (!res) return null;
  const f = FILIERES[res.mainKey];
  const hue = f.hue;
  const dateStr = new Date(res.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const favs = (profile.favorites || []).map((m) => metierById(m.id)).filter(Boolean);
  const pf = pointsForts(profile.subjects, res.mainKey);
  const alts = (res.alts && res.alts.length)
    ? res.alts
    : (result && result.ranked ? result.ranked.filter((r) => r.key !== res.mainKey).slice(0, 2) : []);

  return (
    <div className="recap-root" style={{ position: 'relative', minHeight: '100%', boxSizing: 'border-box', paddingBottom: 40, background: T.bg }}>
      <div className="recap-chrome" style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', gap: 12, padding: '60px 22px 14px', background: `linear-gradient(${T.bg}, ${T.bg} 70%, transparent)` }}>
        <BackBtn onClick={onBack} />
        <div style={{ flex: 1 }} />
        <button onClick={onShareImage} aria-label="Partager en image" style={{
          display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer',
          padding: '11px 15px', borderRadius: 13, border: `1px solid ${T.line}`,
          background: T.surface, color: T.text,
          fontFamily: FONT_UI, fontSize: 14, fontWeight: 700,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8a3 3 0 10-2.8-4M6 12a3 3 0 100 6 3 3 0 000-6zM18 16a3 3 0 10.001 6.001A3 3 0 0018 16zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4" stroke={T.text} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Image
        </button>
        <button onClick={onPrint} style={{
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          padding: '11px 18px', borderRadius: 13, border: 'none',
          background: accent(appHue()), color: '#0B0E16',
          fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 700,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 8V3h10v5M7 18H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 14h10v7H7z" stroke="#0B0E16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Imprimer / PDF
        </button>
      </div>

      <div className="recap-sheet" style={{ margin: '0 16px', padding: '26px 24px 30px', borderRadius: 20, background: '#fff', color: '#0B0E16' }}>
        <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#8a8f9c' }}>
          Récap d’orientation · Après la 3ᵉ
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 26, letterSpacing: -0.6, margin: '6px 0 0', color: '#10131c' }}>
          {profile.prenom ? `Le projet de ${profile.prenom}` : 'Mon projet d’orientation'}
        </h1>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, color: '#6b7180', marginTop: 4 }}>Établi le {dateStr}</div>

        <div style={{ marginTop: 22, padding: '18px', borderRadius: 14, background: '#f4f5f8', borderLeft: `5px solid ${accent(hue, { l: 0.55, c: 0.16 })}` }}>
          <div style={{ fontFamily: FONT_UI, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: '#8a8f9c' }}>Voie recommandée</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 24, color: '#10131c', margin: '5px 0 3px' }}>{f.name} — {res.mainPct}%</div>
          <div style={{ fontFamily: FONT_UI, fontSize: 14, color: '#4a4f5c' }}>{f.badge} · {f.tagline}</div>
        </div>

        {alts.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: '#8a8f9c', marginBottom: 8 }}>À explorer aussi</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {alts.map((a) => (
                <span key={a.key} style={{ fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 600, color: '#10131c', padding: '7px 12px', borderRadius: 9, background: '#eef0f4' }}>
                  {FILIERES[a.key].name} · {a.pct}%
                </span>
              ))}
            </div>
          </div>
        )}

        {favs.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: '#8a8f9c', marginBottom: 8 }}>Métiers qui m’intéressent</div>
            <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
              {favs.map((m) => (
                <li key={m.id} style={{ fontFamily: FONT_UI, fontSize: 14.5, color: '#2a2f3a', marginBottom: 5, lineHeight: 1.4 }}>
                  <strong>{m.name}</strong> — {SECTOR_LABEL[m.sector]}{SALAIRES[m.id] ? ` · débute vers ${SALAIRES[m.id]}/mois` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {pf.chosenLabels.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontFamily: FONT_UI, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: '#8a8f9c', marginBottom: 8 }}>Mes points forts</div>
            <div style={{ fontFamily: FONT_UI, fontSize: 14.5, color: '#2a2f3a', lineHeight: 1.5 }}>
              {pf.chosenLabels.join(', ')}.
              {pf.specs.length > 0 && <span> À regarder : <strong>{pf.specs.join(', ')}</strong>.</span>}
            </div>
          </div>
        )}

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #e6e8ee', fontFamily: FONT_UI, fontSize: 12, color: '#8a8f9c', lineHeight: 1.5 }}>
          Document indicatif issu d’un test d’auto-positionnement — il ne remplace pas le dialogue avec le professeur principal et le psy-EN. Données de référence : Onisep.
        </div>
      </div>
    </div>
  );
}

// ── Glossaire des sigles ───────────────────────────────────────
function GlossaireScreen({ onBack }) {
  const hue = appHue();
  const [query, setQuery] = React.useState('');
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = norm(query.trim());
  const list = q ? GLOSSAIRE.filter((g) => norm(g.s).includes(q) || norm(g.n).includes(q)) : GLOSSAIRE;
  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <Glow hue={hue} top="-14%" size={440} opacity={0.3} />
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 20 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: T.faint }}>
          Les mots de l’orientation
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 32, letterSpacing: -0.8, margin: '8px 0 18px', lineHeight: 1.04 }}>
          Le glossaire
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 18 }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><circle cx="9" cy="9" r="6.5" stroke={T.faint} strokeWidth="1.8"/><path d="M14 14l4 4" stroke={T.faint} strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Chercher un sigle (BTS, CFA, ÉduConnect…)"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, color: T.text }} />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Effacer" style={{ width: 24, height: 24, flexShrink: 0, borderRadius: 999, cursor: 'pointer', border: 'none', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={T.muted} strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>

        {list.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {list.map((g, i) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}` }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16.5, color: accent(hue, { l: 0.84, c: 0.1 }), flexShrink: 0 }}>{g.s}</span>
                  <span style={{ fontFamily: FONT_UI, fontSize: 13.5, fontWeight: 600, color: T.muted, lineHeight: 1.3 }}>{g.n}</span>
                </div>
                <div style={{ fontFamily: FONT_UI, fontSize: 14.5, color: T.body, marginTop: 5, lineHeight: 1.45 }}>{g.d}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '24px 18px', borderRadius: 16, background: T.surface, border: `1px dashed ${T.line}`, textAlign: 'center', fontFamily: FONT_UI, fontSize: 14.5, color: T.muted }}>
            Aucun sigle trouvé pour « {query.trim()} ».
          </div>
        )}
      </div>
    </div>
  );
}

// ── Comparateur de deux voies ──────────────────────────────────
function CompareScreen({ initialA, initialB, onBack, onOpen }) {
  const [a, setA] = React.useState(initialA || 'gen');
  const [b, setB] = React.useState(initialB || 'pro');
  const fa = FILIERES[a], fb = FILIERES[b];

  const Selector = ({ value, set, other }) => (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 0 4px' }}>
      {FILIERE_ORDER.map((k) => {
        const on = value === k;
        const dim = k === other;
        return (
          <button key={k} onClick={() => !dim && set(k)} disabled={dim} style={{
            flexShrink: 0, cursor: dim ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: dim ? 0.35 : 1,
            fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 700, padding: '7px 11px', borderRadius: 999,
            color: on ? '#0B0E16' : accent(FILIERES[k].hue, { l: 0.82, c: 0.09 }),
            background: on ? accent(FILIERES[k].hue) : accent(FILIERES[k].hue, { a: 0.1 }),
            border: `1px solid ${on ? accent(FILIERES[k].hue) : accent(FILIERES[k].hue, { a: 0.28 })}`,
          }}>{FILIERES[k].name}</button>
        );
      })}
    </div>
  );

  const Row = ({ label, va, vb }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: FONT_UI, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: T.faint, marginBottom: 7 }}>{label}</div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, fontFamily: FONT_UI, fontSize: 14, color: T.body, lineHeight: 1.4 }}>{va}</div>
        <div style={{ width: 1, background: T.line, flexShrink: 0 }} />
        <div style={{ flex: 1, fontFamily: FONT_UI, fontSize: 14, color: T.body, lineHeight: 1.4 }}>{vb}</div>
      </div>
    </div>
  );

  const Head = ({ f }) => (
    <button onClick={() => onOpen(f.key)} style={{ flex: 1, textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
      <Dot hue={f.hue} size={9} />
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: T.text, margin: '7px 0 2px', letterSpacing: -0.3, lineHeight: 1.05 }}>{f.name}</div>
      <div style={{ fontFamily: FONT_UI, fontSize: 12, color: accent(f.hue, { l: 0.82, c: 0.09 }), fontWeight: 600 }}>{f.badge}</div>
    </button>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden', boxSizing: 'border-box', paddingBottom: 40 }}>
      <div style={{ position: 'relative', zIndex: 1, padding: '66px 22px 0' }} className="q-fade">
        <div style={{ marginBottom: 18 }}><BackBtn onClick={onBack} /></div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: T.text, fontSize: 30, letterSpacing: -0.8, margin: '0 0 18px', lineHeight: 1.04 }}>
          Comparer deux voies
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
          <Selector value={a} set={setA} other={b} />
          <Selector value={b} set={setB} other={a} />
        </div>

        <div style={{ display: 'flex', gap: 10, paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${T.line}` }}>
          <Head f={fa} />
          <div style={{ width: 1, background: T.line, flexShrink: 0 }} />
          <Head f={fb} />
        </div>

        <Row label="Objectif" va={fa.tagline} vb={fb.tagline} />
        <Row label="Durée" va={fa.duree} vb={fb.duree} />
        <Row label="Rythme" va={RYTHME[a]} vb={RYTHME[b]} />
        <Row label="Poursuite / insertion"
          va={fa.stats.map((s) => `${s.v} ${s.l}`).join(' · ')}
          vb={fb.stats.map((s) => `${s.v} ${s.l}`).join(' · ')} />
        <Row label="Et après" va={fa.apres.join(', ')} vb={fb.apres.join(', ')} />
        <Row label="Pour toi si" va={fa.pour[0]} vb={fb.pour[0]} />

        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <button onClick={() => onOpen(a)} style={{ flex: 1, padding: '13px', cursor: 'pointer', borderRadius: 13, border: `1px solid ${accent(fa.hue, { a: 0.4 })}`, background: accent(fa.hue, { a: 0.1 }), fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: accent(fa.hue, { l: 0.84, c: 0.09 }) }}>Fiche {fa.name}</button>
          <button onClick={() => onOpen(b)} style={{ flex: 1, padding: '13px', cursor: 'pointer', borderRadius: 13, border: `1px solid ${accent(fb.hue, { a: 0.4 })}`, background: accent(fb.hue, { a: 0.1 }), fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, color: accent(fb.hue, { l: 0.84, c: 0.09 }) }}>Fiche {fb.name}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, QuizScreen, ComputingScreen, ResultScreen, DetailScreen, ProfileScreen, MetierSheet, MetiersScreen, TabBar, StepsScreen, RecapScreen, PointsFortsBlock, SubjectsScreen, GlossaireScreen, CompareScreen });

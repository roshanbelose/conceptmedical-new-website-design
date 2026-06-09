// app.jsx — root with tweakable controls

const STORAGE_KEY = 'cm:audience';

// React context to share tweak values down the tree without prop-drilling
const TweaksCtx = React.createContext({});
function useT() { return React.useContext(TweaksCtx); }
window.useT = useT;

function App() {
  // ── tweaks ────────────────────────────────────────────────────────────────
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  // apply accent colors + density via CSS variables on root
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--hcp-accent', t.hcpAccent);
    r.style.setProperty('--patient-accent', t.patientAccent);
    r.style.setProperty('--section-pad', t.denseSpacing ? '64px' : '96px');
    r.classList.toggle('tw-no-italic', !t.italicAccents);
  }, [t.hcpAccent, t.patientAccent, t.denseSpacing, t.italicAccents]);

  // ── audience gate state ───────────────────────────────────────────────────
  const [audience, setAudience] = React.useState(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });
  const [gateOpen, setGateOpen] = React.useState(() => {
    try { return !localStorage.getItem(STORAGE_KEY); } catch { return true; }
  });
  const canDismiss = !!audience;

  const handleSelect = React.useCallback((choice) => {
    setAudience(choice);
    try { localStorage.setItem(STORAGE_KEY, choice); } catch {}
    setGateOpen(false);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }, []);

  const handleSwitchClick = React.useCallback(() => { setGateOpen(true); }, []);

  React.useEffect(() => {
    document.body.style.overflow = gateOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [gateOpen]);

  // ── motion layer: toggle cm-anim class + (re)initialise scroll reveals ────
  const reduceMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  React.useEffect(() => {
    const on = (t.animations !== false) && !reduceMotion;
    document.documentElement.classList.toggle('cm-anim', on);
    if (window.CMAnims && window.CMAnims.init) window.CMAnims.init();
  }, [t.animations, reduceMotion, audience, gateOpen, t.showTicker, t.showSocietyBand, t.showPullQuote, t.showEvidenceNav, t.denseSpacing]);

  const a = audience || 'hcp';

  // accent palettes — curated, all rooted in CM brand
  const hcpPalette = ['#1D4E9F', '#122248', '#2B6CB0', '#00B7F1'];
  const patientPalette = ['#00B7F1', '#1D4E9F', '#00B7F1', '#3B82A0'];

  // reset audience to re-show the gate
  const resetAudience = React.useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setAudience(null);
    setGateOpen(true);
  }, []);

  return (
    <TweaksCtx.Provider value={t}>
      <Header audience={a} onSwitch={handleSwitchClick} />
      {a === 'hcp' ? <HCPHome /> : <PatientHome />}
      <Footer audience={a} />
      {gateOpen && (
        <AudienceGate
          onSelect={handleSelect}
          onClose={() => setGateOpen(false)}
          canDismiss={canDismiss}
        />
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Experience" />
        <TweakRadio
          label="Active audience"
          value={a}
          options={[{ value: 'hcp', label: 'HCP' }, { value: 'patient', label: 'Patient' }]}
          onChange={(v) => handleSelect(v)}
        />
        <TweakButton label="Re-open audience gate" onClick={resetAudience} />

        <TweakSection label="Color" />
        <TweakColor
          label="HCP accent"
          value={t.hcpAccent}
          options={hcpPalette}
          onChange={(v) => setTweak('hcpAccent', v)}
        />
        <TweakColor
          label="Patient accent"
          value={t.patientAccent}
          options={patientPalette}
          onChange={(v) => setTweak('patientAccent', v)}
        />

        <TweakSection label="Sections" />
        <TweakToggle
          label="Outcomes ticker"
          value={t.showTicker}
          onChange={(v) => setTweak('showTicker', v)}
        />
        <TweakToggle
          label="Evidence sub-nav"
          value={t.showEvidenceNav}
          onChange={(v) => setTweak('showEvidenceNav', v)}
        />
        <TweakToggle
          label="Society band"
          value={t.showSocietyBand}
          onChange={(v) => setTweak('showSocietyBand', v)}
        />
        <TweakToggle
          label="Pull quote"
          value={t.showPullQuote}
          onChange={(v) => setTweak('showPullQuote', v)}
        />

        <TweakSection label="Motion" />
        <TweakToggle
          label="Scroll animations"
          value={t.animations !== false}
          onChange={(v) => setTweak('animations', v)}
        />

        <TweakSection label="Typography" />
        <TweakToggle
          label="Italic display accents"
          value={t.italicAccents}
          onChange={(v) => setTweak('italicAccents', v)}
        />
        <TweakToggle
          label="Dense spacing"
          value={t.denseSpacing}
          onChange={(v) => setTweak('denseSpacing', v)}
        />
      </TweaksPanel>
    </TweaksCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// gate.jsx — Audience selection modal (minimal: logo + prompt + 2 choices)

function AudienceGate({ onSelect, onClose, canDismiss = false }) {
  // close on Esc only when dismissable
  React.useEffect(() => {
    if (!canDismiss) return;
    const h = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [canDismiss, onClose]);

  return (
    <div className="gate-backdrop" role="dialog" aria-modal="true" aria-labelledby="gate-title" data-screen-label="Audience Gate">
      <div className="gate-modal-min">
        {canDismiss && (
          <button
            className="gate-close"
            onClick={() => onClose && onClose()}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        )}

        <div className="gate-brand">
          <img src={(window.__resources && window.__resources.gateLogo) || "assets/logo-cm-circle-v3-blue.png"} alt="Concept Medical" />
        </div>

        <h1 id="gate-title" className="gate-prompt">I am a…</h1>

        <div className="gate-options-min">
          <button
            className="gate-tile hcp"
            onClick={() => onSelect('hcp')}
            aria-label="Continue as healthcare professional"
          >
            <div className="gate-tile-ico" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {/* Stethoscope — chest piece echoes the CM brand circle */}
                <path d="M11 6 L11 16 C11 19.866 14.134 23 18 23 L22 23 C25.866 23 29 19.866 29 16 L29 6" />
                <circle cx="11" cy="5" r="1.6" fill="currentColor" stroke="none" />
                <circle cx="29" cy="5" r="1.6" fill="currentColor" stroke="none" />
                <path d="M20 23 L20 28" />
                <circle cx="20" cy="32" r="4" />
                <circle cx="20" cy="32" r="1.4" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div className="gate-tile-label">Healthcare Professional</div>
            <div className="gate-tile-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h12M11 4l5 5-5 5" />
              </svg>
            </div>
          </button>

          <button
            className="gate-tile patient"
            onClick={() => onSelect('patient')}
            aria-label="Continue as patient or caregiver"
          >
            <div className="gate-tile-ico" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {/* Two figures — patient + caregiver */}
                <circle cx="14" cy="13" r="4.2" />
                <path d="M5 32 v-2.5 a5.5 5.5 0 0 1 5.5 -5.5 h7 a5.5 5.5 0 0 1 5.5 5.5 V32" />
                <circle cx="28" cy="16" r="3.2" />
                <path d="M24 32 v-1.5 a3.8 3.8 0 0 1 3.8 -3.8 h0.4 a3.8 3.8 0 0 1 3.8 3.8 V32" />
              </svg>
            </div>
            <div className="gate-tile-label">Patient &amp; Caregiver</div>
            <div className="gate-tile-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h12M11 4l5 5-5 5" />
              </svg>
            </div>
          </button>
        </div>

        <div className="gate-compliance">
          <span className="ico" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 1.5l5.5 2.2v3.8c0 3.4-2.4 6.5-5.5 7.5-3.1-1-5.5-4.1-5.5-7.5V3.7L8 1.5z" />
              <path d="M5.5 8l1.7 1.7L11 6.3" />
            </svg>
          </span>
          <p className="body">
            By continuing, you confirm that the information you access is appropriate for your selected audience. Content for healthcare professionals is intended for licensed clinicians only. <strong>Product availability and approved indications vary by country.</strong> You agree to our <a href="#">Terms of Use</a>, <a href="#">Privacy Policy</a>, and use of cookies.
          </p>

          <div className="meta">
            <div className="badges">
              <span className="badge">ISO 13485</span>
              <span className="badge">CE</span>
              <span className="badge">US FDA</span>
              <span className="badge">PMDA</span>
            </div>
            <div className="region">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="6" cy="6" r="5" />
                <path d="M1 6h10M6 1a7 7 0 010 10M6 1a7 7 0 000 10" />
              </svg>
              Region: <strong style={{ color: 'var(--cm-blue-900)', fontWeight: 600, marginLeft: 4 }}>Global · EN</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.AudienceGate = AudienceGate;

// patient.jsx — Patients & Caregivers homepage: condition-first, plain-language

// PATIENT — same hook for accent + section toggles
function PatientHome() {
  const t = (typeof useT === 'function') ? useT() : {};
  const accent = t.patientAccent || '#00B7F1';
  return (
    <main data-screen-label="Patient Home" style={{ '--patient-accent': accent }}>

      {/* ============ HERO ============ */}
      <section className="pt-hero" id="pt-hero">
        <div className="container">
          <div className="pt-hero-grid">
            <div>
              <span className="eyebrow pt-eyebrow">For Patients &amp; Caregivers</span>
              <h1>
                Understanding your <em className="editorial">treatment</em> options for vascular disease.
              </h1>
              <p className="lead">
                If your physician has mentioned a drug-coated balloon, an angioplasty, or treatment for narrowed arteries — you're in the right place. We make the science easier to follow, so you can make informed choices with your doctor.
              </p>
              <div className="cta-row">
                <a href="#how" className="btn btn-primary" style={{ background: 'var(--cm-blue-200)' }}>How the treatment works <span className="arrow">→</span></a>
                <a href="#find-doctor" className="btn btn-ghost" style={{ color: 'var(--cm-blue-200)' }}>Find a doctor near you <span className="arrow">→</span></a>
              </div>

              <div className="reassurance">
                <div className="item">
                  <span className="check">✓</span>
                  <span>Used in <strong>75+ countries</strong></span>
                </div>
                <div className="item">
                  <span className="check">✓</span>
                  <span>Backed by <strong>35+ clinical trials</strong></span>
                </div>
                <div className="item">
                  <span className="check">✓</span>
                  <span>Always <strong>physician-prescribed</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-hero-visual">
              <div className="frame">
                <svg viewBox="0 0 320 240" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                  <defs>
                    <linearGradient id="vesselGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1D4E9F" />
                      <stop offset="100%" stopColor="#00B7F1" />
                    </linearGradient>
                  </defs>
                  {/* Stylised artery + balloon — illustrative */}
                  <path d="M 20 120 Q 80 80 160 120 T 300 120" stroke="#C9D0DC" strokeWidth="22" fill="none" strokeLinecap="round" />
                  <path d="M 20 120 Q 80 80 160 120 T 300 120" stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round" />
                  {/* narrowed section */}
                  <ellipse cx="160" cy="120" rx="32" ry="13" fill="url(#vesselGrad)" opacity="0.8" />
                  <ellipse cx="160" cy="120" rx="32" ry="13" fill="none" stroke="#1D4E9F" strokeWidth="2" strokeDasharray="4 3" />
                  {/* balloon catheter line */}
                  <line x1="160" y1="120" x2="160" y2="200" stroke="#1D4E9F" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="160" y="215" fontFamily="Poppins" fontSize="10" textAnchor="middle" fontWeight="600" fill="#1D4E9F" letterSpacing="0.1em">DRUG-COATED BALLOON</text>
                  <text x="160" y="60" fontFamily="Poppins" fontSize="10" textAnchor="middle" fontWeight="600" fill="#6B7589" letterSpacing="0.1em">NARROWED ARTERY</text>
                </svg>
              </div>
              <div className="placeholder-note">Illustrative · not to scale</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STAT STRIP ============ */}
      <section className="stat-strip">
        <div className="container">
          <div className="stat-strip-grid">
            <div className="stat-strip-cell">
              <div className="num">75<span className="suffix">+</span></div>
              <div className="label">Countries where the treatment is used</div>
            </div>
            <div className="stat-strip-cell">
              <div className="num">2008</div>
              <div className="label">The year Concept Medical was founded</div>
            </div>
            <div className="stat-strip-cell">
              <div className="num">35<span className="suffix">+</span></div>
              <div className="label">Clinical trials studying our technology</div>
            </div>
            <div className="stat-strip-cell">
              <div className="num">100<span className="suffix">+</span></div>
              <div className="label">Patents on drug-delivery innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONDITIONS ============ */}
      <section className="section" id="conditions">
        <div className="container">
          <SectionHead
            eyebrow="Conditions we treat"
            title='What condition are <em class="editorial">you</em> learning about?'
            lead="Drug-coated balloon treatment can address several conditions affecting your arteries and veins. Choose the one that applies to you."
            align="center"
          />
          <div className="condition-grid">
            {[
              {
                name: 'Peripheral Artery Disease',
                short: 'PAD',
                ico: <path d="M3 12s2-6 9-6 9 6 9 6-2 6-9 6-9-6-9-6z M12 9v6M9 12h6" />,
                desc: 'When arteries in your legs become narrowed, causing leg pain, cramps when walking, or wounds that won\'t heal.',
              },
              {
                name: 'Coronary Artery Disease',
                short: 'CAD',
                ico: <path d="M12 21s-7-4.5-7-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-7 11-7 11z" />,
                desc: 'When arteries that supply your heart become narrowed, causing chest pain (angina) or shortness of breath.',
              },
              {
                name: 'AV Fistula for Dialysis',
                short: 'AVF',
                ico: <path d="M5 6c4 0 6 3 6 6s-2 6-6 6M19 6c-4 0-6 3-6 6s2 6 6 6" />,
                desc: 'If you receive dialysis, the access point in your arm (a fistula) can develop a narrowing that affects treatment.',
              },
            ].map((c, i) => (
              <a className="cond-card" href="#" key={c.short}>
                <div className="ico">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{c.ico}</svg>
                </div>
                <div className="cond-name">{c.short}</div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                <span className="link">Learn more <span className="arrow">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section alt" id="how">
        <div className="container">
          <SectionHead
            eyebrow="How the treatment works"
            title='A <em class="editorial">small balloon</em> with a smart coating.'
            lead="The procedure is minimally invasive — your physician uses a small balloon, coated with a medicine called sirolimus, to open up the narrowed area in your artery."
            align="center"
          />
          <div className="steps-grid">
            <div className="step">
              <div className="num">1</div>
              <h4>Reaching the narrowed area</h4>
              <p>Through a tiny puncture (usually in the groin or wrist), your doctor guides a thin catheter through your blood vessels to the narrowed section, using X-ray imaging to see exactly where to go.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h4>Inflating the coated balloon</h4>
              <p>A small balloon, coated with sirolimus, is gently inflated for a short time. The pressure opens up the artery — and the coating transfers a precise dose of medicine into the wall of the vessel.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h4>Healing, without leaving anything behind</h4>
              <p>The balloon is removed. Nothing is left inside your artery. The medicine then helps keep the vessel open over the following months, supporting long-term healing.</p>
            </div>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 28, textAlign: 'center', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            This is a simplified description. Your physician will explain the exact procedure for your situation, including any risks and what to expect during recovery.
          </p>
        </div>
      </section>

      {/* ============ WHAT TO EXPECT ============ */}
      <section className="section" id="what-to-expect">
        <div className="container">
          <SectionHead
            eyebrow="What to expect"
            title='Before, during, <em class="editorial">and after</em> your procedure.'
            lead="Knowing what to expect can make a big difference. Here's a typical journey — your physician will tailor it to your situation."
          />
          <div className="condition-grid">
            {[
              {
                phase: 'Before',
                title: 'Preparing for the procedure',
                bullets: [
                  'Your physician explains the procedure and answers your questions',
                  'You may need blood tests, imaging, or a brief check-in visit',
                  'You\'ll receive instructions on eating, drinking, and medications',
                  'A caregiver can usually accompany you on the day of treatment',
                ],
              },
              {
                phase: 'During',
                title: 'The day of the procedure',
                bullets: [
                  'The procedure typically lasts 1–2 hours',
                  'You receive local anaesthesia — you\'re awake but comfortable',
                  'You may feel pressure, but not sharp pain, as the balloon inflates',
                  'You\'ll be monitored for a few hours afterwards',
                ],
              },
              {
                phase: 'After',
                title: 'Recovery and follow-up',
                bullets: [
                  'Most patients go home the same day or the next morning',
                  'Light activity within a day or two — your team will guide you',
                  'You\'ll have follow-up visits to check how the artery is healing',
                  'Take medications exactly as prescribed for the best long-term result',
                ],
              },
            ].map((p, i) => (
              <div className="cond-card" key={p.phase} style={{ cursor: 'default' }}>
                <div className="cond-name" style={{ color: i === 0 ? 'var(--cm-blue-500)' : i === 1 ? 'var(--cm-blue-200)' : 'var(--cm-blue-700)' }}>{p.phase}</div>
                <h3>{p.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {p.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: 14, color: 'var(--neutral-700)', padding: '8px 0 8px 22px', position: 'relative', lineHeight: 1.5 }}>
                      <span style={{ position: 'absolute', left: 0, top: 13, width: 12, height: 1.5, background: i === 0 ? 'var(--cm-blue-500)' : i === 1 ? 'var(--cm-blue-200)' : 'var(--cm-blue-700)' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PATIENT STORY (quote) ============ */}
      {t.showPullQuote !== false && (
        <PullQuote
          text='"I walked further on Saturday than I had in two years. My doctor explained what they were doing every step of the way, which made everything less scary."'
          cite="Patient · age 67 · peripheral artery disease"
        />
      )}

      {/* ============ FIND A DOCTOR ============ */}
      <section className="section" id="find-doctor">
        <div className="container">
          <div className="find-doctor">
            <div>
              <span className="eyebrow" style={{ color: 'var(--cm-blue-200)' }}>Find a doctor</span>
              <h3>Where this treatment is available near you.</h3>
              <p>The treatment is performed by interventional cardiologists, vascular surgeons, and interventional radiologists. Use the selector to find a hospital or clinic in your region that offers MagicTouch.</p>

              <div className="region-select">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--cm-blue-200)' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <select defaultValue="us-east">
                  <option value="us-east">United States · East Coast</option>
                  <option value="us-west">United States · West Coast</option>
                  <option value="us-central">United States · Central</option>
                  <option value="eu-uk">United Kingdom &amp; Ireland</option>
                  <option value="eu-de">Germany · Austria · Switzerland</option>
                  <option value="eu-fr">France &amp; Benelux</option>
                  <option value="apac-jp">Japan</option>
                  <option value="apac-in">India &amp; South Asia</option>
                  <option value="apac-other">Asia-Pacific · Other</option>
                  <option value="latam">Latin America</option>
                </select>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="#9AA3B5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>

              <div style={{ marginTop: 24 }}>
                <a href="#" className="btn btn-primary" style={{ background: 'var(--cm-blue-200)' }}>Show physicians <span className="arrow">→</span></a>
              </div>

              <p className="muted" style={{ fontSize: 12, marginTop: 18, maxWidth: 380 }}>
                We don't refer or recommend specific physicians. The list shows trained centres that offer MagicTouch in your region — your primary care doctor or insurance can help you choose.
              </p>
            </div>

            <div className="map-frame" aria-hidden="true">
              <svg viewBox="0 0 400 280" style={{ width: '100%', height: '100%', display: 'block' }}>
                {/* fake region dots */}
                {[
                  [80, 60], [120, 80], [200, 70], [260, 110], [310, 140],
                  [150, 140], [220, 170], [90, 180], [180, 220], [280, 200],
                  [340, 90], [70, 110]
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="14" fill="rgba(0,183,241,0.10)" />
                    <circle cx={x} cy={y} r="5" fill="#00B7F1" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section alt" id="resources">
        <div className="container">
          <SectionHead
            eyebrow="Questions you may have"
            title='Frequently asked <em class="editorial">questions</em>.'
            lead="Common questions from patients and caregivers. For anything specific to your situation, please ask your physician."
          />
          <div className="faq-grid">
            {[
              { q: 'Is the procedure painful?', a: 'Most patients report pressure rather than sharp pain. You receive local anaesthesia and may also be given medicine to keep you relaxed. Your team will check with you throughout the procedure.' },
              { q: 'How long does recovery take?', a: 'Many patients return to normal light activities within 1–2 days, although you should follow your physician\'s specific recovery plan. You\'ll have a follow-up visit a few weeks later.' },
              { q: 'What does the medicine on the balloon do?', a: 'The coating is a medicine called sirolimus, which has been used in cardiovascular medicine for over 15 years. It helps prevent the artery from narrowing again after the balloon opens it up.' },
              { q: 'Does anything stay inside my body?', a: 'No. The balloon and catheter are removed at the end of the procedure. Only a precise dose of medicine remains in the wall of the artery, where it gradually works to keep the vessel open.' },
              { q: 'Will I need to take medications afterwards?', a: 'You will likely be prescribed medications such as antiplatelets to support healing. It is very important to take them exactly as your physician instructs.' },
              { q: 'How is this different from a stent?', a: 'A stent is a small metal mesh tube that stays in the artery permanently. A drug-coated balloon delivers medicine and is then removed — nothing is left behind. Your physician will recommend the best option for you.' },
            ].map((f, i) => (
              <details className="faq-item" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <p className="muted" style={{ maxWidth: 580, margin: '0 auto 22px', fontSize: 14, lineHeight: 1.6 }}>
              Have a question we haven't answered? Your physician is the best person to ask — they know your medical history and can give you personalised information.
            </p>
            <a href="#" className="btn btn-secondary" style={{ borderColor: 'var(--cm-blue-200)', color: 'var(--cm-blue-200)' }}>Talk to your physician <span className="arrow">→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

window.PatientHome = PatientHome;

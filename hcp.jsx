// hcp.jsx — Healthcare Professional homepage: evidence-first

function HCPHome() {
  const t = (typeof useT === 'function') ? useT() : {};
  const accent = t.hcpAccent || '#1D4E9F';
  // expose accent locally via CSS vars so any descendant can use --hcp-accent
  return (
    <main data-screen-label="HCP Home" style={{ '--hcp-accent': accent }}>

      {/* ============ HERO ============ */}
      <section className="hcp-hero" id="hero">
        <div className="container">
          <div className="hcp-hero-grid">
            <div>
              <span className="hero-pill">
                <span className="dot" />
                SIRONA 36-month results
                <span className="sep" />
                CX Symposium 2026
                <span className="arrow">›</span>
              </span>
              <h1>
                Sirolimus DCB. <em className="editorial">Superior</em> to paclitaxel<br />
                in the femoropopliteal segment.
              </h1>
              <p className="lead">
                The SIRONA randomised trial — Sirolimus-coated balloon vs Paclitaxel-coated balloon in the SFA — reports its 36-month follow-up. 482 patients. 25 sites. Peer-reviewed.
              </p>
              <div className="cta-row">
                <a href="#" className="btn btn-primary">Read the SIRONA results <span className="arrow">→</span></a>
                <a href="#trials" className="btn btn-ghost">All clinical evidence <span className="arrow">→</span></a>
              </div>

              <div className="meta-row">
                <div className="meta-block">
                  <div className="k">Indications</div>
                  <div className="v">Coronary · Peripheral · AVF</div>
                </div>
                <div className="meta-block">
                  <div className="k">RCTs published</div>
                  <div className="v">3 head-to-head, 35+ total</div>
                </div>
                <div className="meta-block">
                  <div className="k">Reach</div>
                  <div className="v">75+ countries</div>
                </div>
              </div>
            </div>

            {/* Hero chart card */}
            <div className="hero-chart-card">
              <div className="head">
                <div>
                  <div className="eyebrow">SIRONA · primary endpoint</div>
                  <div className="title">Freedom from CD-TLR · 36 months</div>
                </div>
                <span className="journal-pill gold">JACC · 2026</span>
              </div>
              <KMChart width={520} height={240} />
              <div className="hero-chart-stats">
                <div className="stat-block">
                  <div className="num">88.2%</div>
                  <div className="label">MagicTouch PTA</div>
                  <div className="sub">Sirolimus-coated balloon</div>
                </div>
                <div className="stat-block comp">
                  <div className="num">80.2%</div>
                  <div className="label">Paclitaxel DCB</div>
                  <div className="sub">Active comparator</div>
                </div>
              </div>
              <div className="footnote">
                Log-rank p=0.03 · HR 0.60 (95% CI 0.36–0.97) · n=482 · 25 sites. Preliminary before CEC adjudication.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker hidden={t.showTicker === false} />

      {/* ============ THREE TRIAL CARDS ============ */}
      <section className="section" id="trials">
        <div className="container">
          <SectionHead
            eyebrow="Three RCTs · three indications"
            title='The <em class="editorial">evidence</em> at a glance.'
            lead="Each trial linked to its peer-reviewed publication and primary endpoint readout. One click to the paper, one click to the methods."
          />

          <div className="trial-grid">
            {/* SIRONA */}
            <article className="trial-card t-sirona">
              <span className="accent" aria-hidden="true" />
              <div className="meta-row">
                <span className="indication">Femoropopliteal · SFA</span>
                <span className="journal-pill gold">JACC · 2026</span>
              </div>
              <h3>SIRONA</h3>
              <p className="subtitle">Sirolimus vs Paclitaxel-coated balloon · n=482 · 25 sites · 36-month follow-up</p>
              <div className="chart-zone">
                <MiniKM />
                <div className="chart-cap">Freedom from CD-TLR · 0–36 months</div>
              </div>
              <div className="stat-row">
                <div className="big">88.2%</div>
                <div className="lab"><strong style={{ color: 'var(--cm-blue-900)' }}>vs 80.2%</strong> paclitaxel<br /><span style={{ color: 'var(--fg-muted)' }}>36-month freedom from CD-TLR</span></div>
              </div>
              <ul className="endpoints">
                <li><span>HR (95% CI)</span><span className="v">0.60 (0.36–0.97)</span></li>
                <li><span>Log-rank p</span><span className="v">0.03</span></li>
                <li><span>Sustained @ 3 years</span><span className="v">Yes</span></li>
              </ul>
              <div className="card-foot">
                <a className="read" href="#">Read SIRONA <span aria-hidden="true">→</span></a>
                <a className="btn btn-secondary" href="#" style={{ padding: '8px 14px', fontSize: 11 }}>Trial details</a>
              </div>
            </article>

            {/* SirPAD */}
            <article className="trial-card t-sirpad">
              <span className="accent" aria-hidden="true" />
              <div className="meta-row">
                <span className="indication">All-comer PAD</span>
                <span className="journal-pill">NEJM · 2026</span>
              </div>
              <h3>SirPAD</h3>
              <p className="subtitle">MagicTouch PTA vs uncoated balloon · n=1,252 · all-comer trial · 12-month primary</p>
              <div className="chart-zone">
                <RiskDifference width={280} height={110} value={-6.2} scale={[-12, 4]} color="var(--cm-blue-200)" />
                <div className="chart-cap">Absolute risk difference · MALE @ 12 mo</div>
              </div>
              <div className="stat-row">
                <div className="big">8.8%</div>
                <div className="lab"><strong style={{ color: 'var(--cm-blue-900)' }}>vs 15.0%</strong> uncoated<br /><span style={{ color: 'var(--fg-muted)' }}>MALE rate @ 12 months</span></div>
              </div>
              <ul className="endpoints">
                <li><span>Absolute risk diff.</span><span className="v">–6.2% (–9.5 to –2.9)</span></li>
                <li><span>P, superiority</span><span className="v">0.001</span></li>
                <li><span>Cohort</span><span className="v">All-comers · 12 mo</span></li>
              </ul>
              <div className="card-foot">
                <a className="read" href="#">Read in NEJM <span aria-hidden="true">→</span></a>
                <a className="btn btn-secondary" href="#" style={{ padding: '8px 14px', fontSize: 11 }}>Trial details</a>
              </div>
            </article>

            {/* IMPRESSION */}
            <article className="trial-card t-impression">
              <span className="accent" aria-hidden="true" />
              <div className="meta-row">
                <span className="indication">Vascular access · AVF</span>
                <span className="journal-pill green">Kidney Int. · 2025</span>
              </div>
              <h3>IMPRESSION</h3>
              <p className="subtitle">Sirolimus DCB vs plain balloon · arteriovenous fistula stenosis · 6-month TLPP</p>
              <div className="chart-zone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '14px 4px' }}>
                <DonutChart value={78} label="MagicTouch" size={108} color="#213E7B" />
                <DonutChart value={51} label="Plain PTA" size={108} color="#C9D0DC" />
              </div>
              <div className="stat-row">
                <div className="big" style={{ color: 'var(--cm-blue-700)' }}>78%</div>
                <div className="lab"><strong style={{ color: 'var(--cm-blue-900)' }}>vs 51%</strong> plain PTA<br /><span style={{ color: 'var(--fg-muted)' }}>Target-lesion primary patency @ 6 mo</span></div>
              </div>
              <ul className="endpoints">
                <li><span>HR (95% CI)</span><span className="v">0.42 (0.25–0.71)</span></li>
                <li><span>P, primary</span><span className="v">&lt;0.001</span></li>
                <li><span>Cohort</span><span className="v">AVF stenosis · n=170</span></li>
              </ul>
              <div className="card-foot">
                <a className="read" href="#" style={{ color: 'var(--cm-blue-700)' }}>Read publication <span aria-hidden="true">→</span></a>
                <a className="btn btn-secondary" href="#" style={{ padding: '8px 14px', fontSize: 11, color: 'var(--cm-blue-700)', borderColor: 'var(--cm-blue-700)' }}>Trial details</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ GLOBAL IMPACT BAND ============ */}
      <section className="impact-band">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-cell">
              <div className="impact-num">75<span className="suffix">+</span></div>
              <div className="impact-label">Countries</div>
              <div className="impact-sub">where MagicTouch is in clinical use</div>
            </div>
            <div className="impact-cell">
              <div className="impact-num">35<span className="suffix">+</span></div>
              <div className="impact-label">Clinical trials</div>
              <div className="impact-sub">RCTs &amp; registries, peer-reviewed</div>
            </div>
            <div className="impact-cell">
              <div className="impact-num">100<span className="suffix">+</span></div>
              <div className="impact-label">Patents</div>
              <div className="impact-sub">on sirolimus drug-delivery technology</div>
            </div>
            <div className="impact-cell">
              <div className="impact-num">2008</div>
              <div className="impact-label">Since</div>
              <div className="impact-sub">pioneering DCB technology globally</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HEAD-TO-HEAD COMPARISON ============ */}
      <section className="section alt" id="comparison">
        <div className="container">
          <SectionHead
            eyebrow="Head-to-head"
            title='Sirolimus DCB <em class="editorial">vs</em> Paclitaxel DCB · endpoint by endpoint.'
            lead="Pre-specified endpoints from the SIRONA randomised cohort. 482 patients, 1:1 randomisation, 36-month follow-up. Peer-reviewed."
          />
          <H2HCard />
        </div>
      </section>

      {/* ============ INDICATIONS GRID ============ */}
      <section className="section" id="indications">
        <div className="container">
          <SectionHead
            eyebrow="By indication"
            title='Where MagicTouch has <em class="editorial">evidence</em>.'
            lead="Six anatomical territories, six evidence packages. Click any indication for the full data set."
          />
          <div className="ind-grid">
            {[
              { a: 'Femoropopliteal · SFA', n: 'SIRONA — head-to-head vs paclitaxel', d: 'MagicTouch PTA', e: '1 RCT · 482 pts · 36 mo' },
              { a: 'Peripheral · all-comer PAD', n: 'SirPAD — largest SCB trial', d: 'MagicTouch PTA', e: '1 RCT · 1,252 pts · NEJM' },
              { a: 'AV fistula stenosis', n: 'IMPRESSION — AVF patency', d: 'MagicTouch AVF', e: '1 RCT · 170 pts' },
              { a: 'Coronary · ISR & small vessel', n: 'EASTBOURNE registry', d: 'MagicTouch SCB', e: '6 trials · 2,123 pts' },
              { a: 'Below the knee', n: 'PRELUDE-BTK', d: 'MagicTouch PTA', e: '1 ongoing · enrolling' },
              { a: 'Diabetic coronary subset', n: 'Abluminus DES+ meta-analysis', d: 'Abluminus DES+', e: '4 studies · pooled' },
            ].map((c, i) => (
              <a key={i} className="ind-card" href="#">
                <div className="anatomy">{c.a}</div>
                <h4>{c.n}</h4>
                <div className="device">{c.d}</div>
                <span className="ev-count">{c.e} <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {t.showSocietyBand !== false && <SocietyBand />}

      {t.showPullQuote !== false && (
        <PullQuote
          text='“For the first time, we have head-to-head, peer-reviewed evidence that a sirolimus-coated balloon is non-inferior to paclitaxel in the SFA — and sustained at three years.”'
          cite="Principal Investigator · SIRONA · CX Symposium 2026"
        />
      )}

      {/* ============ PUBLICATIONS ============ */}
      <section className="section alt" id="publications">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <SectionHead
              eyebrow="Publications"
              title='The <em class="editorial">peer-reviewed</em> record.'
              lead="Curated list of landmark publications — the full searchable library is one click away."
            />
            <a href="#" className="btn btn-secondary">All publications →</a>
          </div>
          <div className="pub-list">
            {[
              { y: '2026', j: 'JACC: Cardiovasc Interv', t: 'Sirolimus vs Paclitaxel DCB in femoropopliteal disease: 36-month outcomes of the SIRONA randomised trial' },
              { y: '2026', j: 'New England Journal of Medicine', t: 'Sirolimus-coated balloons in all-comer peripheral artery disease: the SirPAD randomised trial' },
              { y: '2025', j: 'Kidney International', t: 'Sirolimus drug-coated balloon for arteriovenous fistula stenosis: the IMPRESSION randomised trial' },
              { y: '2024', j: 'EuroIntervention', t: 'EASTBOURNE registry: 24-month outcomes of MagicTouch SCB in 2,123 patients' },
              { y: '2024', j: 'Circulation: Cardiovasc Interv', t: 'Long-term TLR following sirolimus-coated balloon angioplasty in DES in-stent restenosis' },
            ].map((p, i) => (
              <a className="pub-row" href="#" key={i}>
                <div className="yr">{p.y}</div>
                <div>
                  <div className="journal">{p.j}</div>
                  <div className="title-line">{p.t}</div>
                </div>
                <div className="read-cta">Read <span aria-hidden="true">→</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ----------- head-to-head sub-component -----------
function H2HCard() {
  const rows = [
    { e: 'Freedom from CD-TLR · 36 mo', a: '88.2%', b: '80.2%', av: 88, bv: 80 },
    { e: 'Primary patency · 36 mo', a: '74.7%', b: '73.2%', av: 75, bv: 73 },
    { e: 'Major amputation', a: '0.4%', b: '0.8%', av: 99.6, bv: 99.2, sub: 'inverted — lower is better' },
    { e: 'All-cause mortality · 36 mo', a: '6.1%', b: '7.3%', av: 93.9, bv: 92.7, sub: 'inverted — lower is better' },
    { e: 'Late lumen loss (mm)', a: '0.31', b: '0.39', av: 70, bv: 60 },
    { e: 'Long-tail safety signal', a: 'Sirolimus', b: 'Paclitaxel', av: 92, bv: 58, sub: 'class heritage · cytostatic vs cytotoxic' },
  ];
  const maxBar = 220; // visual bar width
  return (
    <div className="h2h-card">
      <div className="h2h-head">
        <div className="col">
          MagicTouch — Sirolimus DCB
          <div className="sub">Concept Medical · cytostatic</div>
        </div>
        <div className="vs">vs</div>
        <div className="col right">
          Paclitaxel DCB
          <div className="sub" style={{ textAlign: 'right' }}>Active comparator · cytotoxic</div>
        </div>
      </div>
      {rows.map((r, i) => (
        <div className="h2h-row" key={i}>
          <div className="bar-side left">
            <span className="val">{r.a}</span>
            <span className="bar" style={{ width: `${(r.av / 100) * maxBar}px` }} />
          </div>
          <div className="label">
            {r.e}
            {r.sub && <div className="sub">{r.sub}</div>}
          </div>
          <div className="bar-side right">
            <span className="bar" style={{ width: `${(r.bv / 100) * maxBar}px` }} />
            <span className="val">{r.b}</span>
          </div>
        </div>
      ))}
      <div className="h2h-foot">
        <span>Source: SIRONA 36-mo results · CX Symposium 2026 / JACC.</span>
        <span style={{ display: 'inline-flex', gap: 10 }}>
          <a href="#" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: 11 }}>Full methods</a>
          <a href="#" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 11 }}>Read publication</a>
        </span>
      </div>
    </div>
  );
}

window.HCPHome = HCPHome;

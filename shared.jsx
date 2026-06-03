// shared.jsx — Header, Footer, Ticker, SocietyBand, PullQuote, SectionHead

// HEADER — shared by both modes, changes nav set based on audience.
function Header({ audience, onSwitch, page = "home", onNav }) {
  const isHCP = audience === 'hcp';
  const navHCP = [
    { label: 'Home' },
    { label: 'Products', children: ['DCB', 'DES', 'Accessories'] },
    { label: 'Technology' },
    { label: 'Clinical Trials' },
    { label: 'About Concept Medical' },
  ];
  const navPT = [
    { label: 'Home' },
    { label: 'Conditions' },
    { label: 'Treatments' },
    { label: 'Find a Doctor' },
    { label: 'Patient Stories' },
    { label: 'Resources' },
  ];
  const nav = isHCP ? navHCP : navPT;

  return (
    <header className="cm-header" data-screen-label={isHCP ? "HCP Header" : "Patient Header"}>
      <div className="container">
        <div className="cm-header-inner">
          <a className="logo" href="#" onClick={(e) => { e.preventDefault(); onNav && onNav('home'); }}>
            <img src={(window.__resources && window.__resources.markCm) || "assets/mark-cm-blue.png"} alt="Concept Medical" className="logo-mark" />
          </a>
          <nav className="cm-nav">
            {nav.map((n, i) => (
              <NavItem
                key={n.label}
                item={n}
                active={i === 0 && page === 'home'}
              />
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              className={`audience-pill ${audience}`}
              onClick={onSwitch}
              aria-label="Switch audience"
              title="Switch audience"
            >
              <span className="swap-ico" />
              {isHCP ? 'For Healthcare Professionals' : 'For Patients & Caregivers'}
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#" className="btn btn-primary" style={{ padding: '12px 22px' }}>Contact <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </header>
  );
}

// Nav item with optional dropdown
function NavItem({ item, active }) {
  const hasChildren = item.children && item.children.length > 0;
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef(null);
  const handleEnter = () => { clearTimeout(closeTimer.current); setOpen(true); };
  const handleLeave = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  if (!hasChildren) {
    return (
      <a href="#" className={active ? 'active' : ''}>{item.label}</a>
    );
  }

  return (
    <div
      className={`nav-dropdown ${open ? 'is-open' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <a
        href="#"
        className={active ? 'active' : ''}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => { e.preventDefault(); setOpen(o => !o); }}
      >
        {item.label}
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6, opacity: 0.6, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 160ms ease' }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {open && (
        <div className="nav-menu" role="menu">
          {item.children.map((c, idx) => {
            const meta = PRODUCT_NAV_META[c] || {};
            return (
              <a key={c} href="#" className="nav-menu-item" role="menuitem">
                <span className="nav-menu-label">{c}</span>
                {meta.sub && <span className="nav-menu-sub">{meta.sub}</span>}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Helper copy for dropdown items
const PRODUCT_NAV_META = {
  'DCB': { sub: 'MagicTouch · Sirolimus drug-coated balloons' },
  'DES': { sub: 'Abluminus DES+ · Drug-eluting stents' },
  'Accessories': { sub: 'XtremeTouch · MIDAS · catheters & balloons' },
};

// EVIDENCE SUB-NAV — only for HCP
function EvidenceSubnav({ active = 'Trials' }) {
  const items = ['Trials', 'Endpoints', 'Comparison', 'Indications', 'Publications'];
  return (
    <div className="evidence-subnav">
      <div className="container">
        <div className="evidence-subnav-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span className="label">Clinical Evidence</span>
            <div className="links">
              {items.map(i => (
                <a key={i} href={`#${i.toLowerCase()}`} className={i === active ? 'active' : ''}>{i}</a>
              ))}
            </div>
          </div>
          <span className="meta">Last updated · EuroPCR 2026</span>
        </div>
      </div>
    </div>
  );
}

// OUTCOMES TICKER — subtle, factual ticker
function Ticker({ items, hidden = false }) {
  if (hidden) return null;
  const ti = items || [
    { l: 'SIRONA', t: '88.2% vs 80.2% · freedom from CD-TLR @ 36 mo' },
    { l: 'SirPAD', t: 'NEJM · –4.9% MALE risk difference, p=0.009' },
    { l: 'IMPRESSION', t: 'Superior AVF target-lesion patency vs plain PTA' },
    { l: 'MagicTouch', t: '35+ trials · 75+ countries · 9 indications' },
    { l: 'EuroPCR 2026', t: 'Symposium on demand · 12 abstracts presented' },
  ];
  return (
    <div className="ticker" role="region" aria-label="Latest clinical outcomes">
      <div className="ticker-track">
        {[...ti, ...ti].map((it, i) => (
          <span className="ticker-item" key={i}>
            <span className="label">{it.l}</span>
            <span>{it.t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// SOCIETY BAND — where the data was presented
function SocietyBand({ items, label = "Presented at" }) {
  const li = items || [
    { name: 'TCT 2025', sub: 'Washington' },
    { name: 'ESC HOTLINE', sub: 'London' },
    { name: 'EuroPCR 2026', sub: 'Paris' },
    { name: 'LINC 2026', sub: 'Leipzig' },
    { name: 'VIVA 2025', sub: 'Las Vegas' },
    { name: 'CX 2026', sub: 'London' },
  ];
  return (
    <div className="society-band">
      <div className="container">
        <div className="label" style={{ marginBottom: 18 }}>{label}</div>
        <div className="society-row">
          {li.map(s => (
            <div className="item" key={s.name}>{s.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// PULL QUOTE — over navy background image
function PullQuote({ text, cite }) {
  return (
    <div className="pull-quote">
      <div className="pq-inner">
        <div className="mark">"</div>
        <blockquote>{text}</blockquote>
        <cite>{cite}</cite>
      </div>
    </div>
  );
}

// SECTION HEAD — eyebrow + title + lead, used everywhere
function SectionHead({ eyebrow, title, lead, dark = false, align = 'left' }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? 720 : 'none', margin: align === 'center' ? '0 auto' : 0, marginBottom: 40 }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} style={align === 'center' ? { margin: '12px auto 18px' } : null} />}
      {lead && <p className="section-lead" style={align === 'center' ? { margin: '0 auto' } : null}>{lead}</p>}
    </div>
  );
}

// FOOTER — white, four content columns + subscribe & certifications
function Footer({ audience }) {
  const isHCP = audience === 'hcp';

  const cols = [
    {
      h: 'Products',
      items: [
        { l: 'MagicTouch · DCB' },
        { l: 'Abluminus DES+' },
        { l: 'XtremeTouch · Accessories' },
        { l: 'Pipeline' },
      ],
    },
    isHCP
      ? {
          h: 'Clinical Trials',
          items: [
            { l: 'SIRONA' },
            { l: 'SirPAD' },
            { l: 'IMPRESSION' },
            { l: 'EASTBOURNE' },
            { l: 'Publications' },
          ],
        }
      : {
          h: 'Conditions',
          items: [
            { l: 'Peripheral artery disease' },
            { l: 'Coronary artery disease' },
            { l: 'AV fistula' },
            { l: 'Below the knee' },
            { l: 'Patient stories' },
          ],
        },
    {
      h: 'Company',
      items: [
        { l: 'About Concept Medical' },
        { l: 'Envision Scientific' },
        { l: 'Careers' },
        { l: 'Newsroom' },
        { l: 'Contact' },
      ],
    },
    {
      h: 'Resources',
      items: [
        { l: 'Privacy Policy' },
        { l: 'Terms of Use' },
        { l: 'Disclaimer' },
        { l: 'Cookie Settings' },
      ],
    },
  ];

  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="container">
        <div className="footer-grid">
          {cols.map((c) => (
            <div className="footer-col" key={c.h}>
              <h5>{c.h}</h5>
              <ul>
                {c.items.map((it) => (
                  <li key={it.l}><a href="#">{it.l}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-right">
            <div className="footer-subscribe">
              <div className="footer-subscribe-label">Subscribe to Newsletter</div>
              <div className="footer-subscribe-sub">
                Clinical evidence, congress recaps, and product updates — once a month.
              </div>
              <form className="footer-subscribe-input" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" aria-label="Email address" />
                <button type="submit" aria-label="Subscribe">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="footer-certs">
              <a href="#" className="cert-img-link" aria-label="Great Place To Work · Certified · Nov 2025 to Nov 2026 · India">
                <img src={(window.__resources && window.__resources.badgeGptw) || "assets/badge-gptw.png"} alt="Great Place To Work Certified" />
              </a>
              <a href="#" className="cert-img-link" aria-label="Dun & Bradstreet ESG Registered">
                <img src={(window.__resources && window.__resources.badgeEsg) || "assets/badge-esg.png"} alt="Dun & Bradstreet ESG Registered" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-logo" aria-label="Concept Medical">
            <img src={(window.__resources && window.__resources.markCm) || "assets/mark-cm-blue.png"} alt="" />
          </div>
          <div className="footer-copyright">
            © 2026. All rights reserved by Concept Medical&nbsp;&nbsp;|&nbsp;&nbsp;CIN: U24230GJ2008PTC055730
          </div>
          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 5 3.66 9.13 8.44 9.88V14.9h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.9h-2.33v6.98C18.34 21.13 22 17 22 12c0-5.52-4.48-10-10-10z" /></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, EvidenceSubnav, Ticker, SocietyBand, PullQuote, SectionHead, Footer });

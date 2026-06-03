// charts.jsx — clean SVG chart primitives in CM brand style

// Kaplan-Meier curve — step function descending
function KMChart({ width = 520, height = 240, dataA, dataB, labelA = "MagicTouch PTA", labelB = "Paclitaxel DCB", colorA = "#1D4E9F", colorB = "#9AA3B5", yAxis = [70, 100], xMonths = 36, padL = 44, padR = 24, padT = 18, padB = 34 }) {
  // dataA/B as arrays of {m, y} OR generated from a list of step drops
  const aData = dataA || [
    { m: 0, y: 100 }, { m: 6, y: 99.2 }, { m: 12, y: 96.5 }, { m: 18, y: 93.8 }, { m: 24, y: 91.2 }, { m: 30, y: 89.8 }, { m: 36, y: 88.2 }
  ];
  const bData = dataB || [
    { m: 0, y: 100 }, { m: 6, y: 97.5 }, { m: 12, y: 93.0 }, { m: 18, y: 89.0 }, { m: 24, y: 85.0 }, { m: 30, y: 82.5 }, { m: 36, y: 80.2 }
  ];
  const w = width, h = height;
  const [yMin, yMax] = yAxis;
  const sx = m => padL + (m / xMonths) * (w - padL - padR);
  const sy = y => padT + ((yMax - y) / (yMax - yMin)) * (h - padT - padB);
  // build stepped path
  const stepPath = (data) => {
    let d = '';
    data.forEach((p, i) => {
      if (i === 0) d += `M ${sx(p.m).toFixed(1)} ${sy(p.y).toFixed(1)}`;
      else {
        const prev = data[i - 1];
        d += ` L ${sx(p.m).toFixed(1)} ${sy(prev.y).toFixed(1)}`;
        d += ` L ${sx(p.m).toFixed(1)} ${sy(p.y).toFixed(1)}`;
      }
    });
    return d;
  };
  const yTicks = [];
  for (let y = yMin; y <= yMax; y += 5) yTicks.push(y);
  const xTicks = [0, 6, 12, 18, 24, 30, 36];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }} aria-label="Kaplan-Meier curve">
      {/* gridlines */}
      {yTicks.map(y => (
        <line key={y} x1={padL} y1={sy(y)} x2={w - padR} y2={sy(y)} stroke="#EEF1F6" strokeWidth="1" />
      ))}
      {/* axes */}
      <line x1={padL} y1={padT} x2={padL} y2={h - padB} stroke="#C9D0DC" strokeWidth="1" />
      <line x1={padL} y1={h - padB} x2={w - padR} y2={h - padB} stroke="#C9D0DC" strokeWidth="1" />
      {/* y ticks */}
      {yTicks.map(y => (
        <g key={y}>
          <text x={padL - 8} y={sy(y) + 4} textAnchor="end" fontFamily="Poppins" fontSize="10" fill="#6B7589">{y}</text>
        </g>
      ))}
      {/* x ticks */}
      {xTicks.map(m => (
        <g key={m}>
          <line x1={sx(m)} y1={h - padB} x2={sx(m)} y2={h - padB + 4} stroke="#C9D0DC" />
          <text x={sx(m)} y={h - padB + 18} textAnchor="middle" fontFamily="Poppins" fontSize="10" fill="#6B7589">{m}{m === 0 ? '' : 'mo'}</text>
        </g>
      ))}
      {/* curves */}
      <path d={stepPath(bData)} stroke={colorB} strokeWidth="2" fill="none" strokeDasharray="5 4" strokeLinejoin="round" />
      <path d={stepPath(aData)} stroke={colorA} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      {/* endpoint dots */}
      <circle cx={sx(aData[aData.length - 1].m)} cy={sy(aData[aData.length - 1].y)} r="4" fill={colorA} />
      <circle cx={sx(bData[bData.length - 1].m)} cy={sy(bData[bData.length - 1].y)} r="4" fill={colorB} />
      {/* end-of-curve labels */}
      <text x={sx(aData[aData.length - 1].m) - 4} y={sy(aData[aData.length - 1].y) - 10} fontFamily="Poppins" fontSize="11" fontWeight="600" fill={colorA} textAnchor="end">{labelA} · {aData[aData.length - 1].y}%</text>
      <text x={sx(bData[bData.length - 1].m) - 4} y={sy(bData[bData.length - 1].y) + 16} fontFamily="Poppins" fontSize="11" fontWeight="500" fill={colorB} textAnchor="end">{labelB} · {bData[bData.length - 1].y}%</text>
      {/* axis labels */}
      <text x={padL} y={padT - 4} fontFamily="Poppins" fontSize="10" fontWeight="600" fill="#6B7589" letterSpacing="0.08em">% FREEDOM FROM CD-TLR</text>
      <text x={w - padR} y={h - 4} fontFamily="Poppins" fontSize="10" fill="#9AA3B5" textAnchor="end">Months</text>
    </svg>
  );
}

// Compact KM curve for cards — no labels, just shape
function MiniKM({ width = 280, height = 100, dataA, dataB, colorA = "#1D4E9F", colorB = "#9AA3B5" }) {
  const aData = dataA || [
    { m: 0, y: 100 }, { m: 6, y: 99.2 }, { m: 12, y: 96.5 }, { m: 18, y: 93.8 }, { m: 24, y: 91.2 }, { m: 30, y: 89.8 }, { m: 36, y: 88.2 }
  ];
  const bData = dataB || [
    { m: 0, y: 100 }, { m: 6, y: 97.5 }, { m: 12, y: 93.0 }, { m: 18, y: 89.0 }, { m: 24, y: 85.0 }, { m: 30, y: 82.5 }, { m: 36, y: 80.2 }
  ];
  const w = width, h = height, padL = 4, padR = 4, padT = 6, padB = 6;
  const yMin = 70, yMax = 102, xMax = 36;
  const sx = m => padL + (m / xMax) * (w - padL - padR);
  const sy = y => padT + ((yMax - y) / (yMax - yMin)) * (h - padT - padB);
  const stepPath = (data) => {
    let d = '';
    data.forEach((p, i) => {
      if (i === 0) d += `M ${sx(p.m).toFixed(1)} ${sy(p.y).toFixed(1)}`;
      else {
        const prev = data[i - 1];
        d += ` L ${sx(p.m).toFixed(1)} ${sy(prev.y).toFixed(1)}`;
        d += ` L ${sx(p.m).toFixed(1)} ${sy(p.y).toFixed(1)}`;
      }
    });
    return d;
  };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <path d={stepPath(bData)} stroke={colorB} strokeWidth="1.8" fill="none" strokeDasharray="4 3" strokeLinejoin="round" />
      <path d={stepPath(aData)} stroke={colorA} strokeWidth="2.4" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

// Bar pair — vertical, two bars compared
function BarsCompare({ width = 280, height = 130, values = [88.2, 80.2], labels = ["MagicTouch", "Paclitaxel"], colors = ["#1D4E9F", "#9AA3B5"], suffix = "%", showLabels = true }) {
  const w = width, h = height, padT = 22, padB = showLabels ? 36 : 12, padL = 14, padR = 14;
  const max = Math.max(...values) * 1.12;
  const gap = 26;
  const bw = (w - padL - padR - gap) / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <line x1={padL} y1={h - padB} x2={w - padR} y2={h - padB} stroke="#E1E6EE" strokeWidth="1" />
      {values.map((v, i) => {
        const x = padL + i * (bw + gap);
        const bh = (v / max) * (h - padT - padB);
        const y = h - padB - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} fill={colors[i]} rx="1" />
            <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontFamily="Poppins" fontSize="14" fontWeight="700" fill={colors[i]}>{v}{suffix}</text>
            {showLabels && (
              <text x={x + bw / 2} y={h - padB + 16} textAnchor="middle" fontFamily="Poppins" fontSize="10" fill="#6B7589" letterSpacing="0.04em">{labels[i]}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Donut — single value
function DonutChart({ value = 78, label = "Patency", size = 110, color = "#1D4E9F", track = "#E1E6EE" }) {
  const r = size / 2 - 8, c = 2 * Math.PI * r, cx = size / 2, cy = size / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size, display: 'block' }}>
      <circle cx={cx} cy={cy} r={r} stroke={track} strokeWidth="8" fill="none" />
      <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth="8" fill="none"
        strokeDasharray={`${(value / 100) * c} ${c}`} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt" />
      <text x={cx} y={cy + 2} textAnchor="middle" fontFamily="Poppins" fontSize="22" fontWeight="700" fill="#0E1119" letterSpacing="-0.02em">{value}%</text>
      <text x={cx} y={cy + 20} textAnchor="middle" fontFamily="Poppins" fontSize="9" fontWeight="600" letterSpacing="0.1em" fill="#6B7589">{label.toUpperCase()}</text>
    </svg>
  );
}

// Diverging risk-difference bar — for SirPAD style: a value below zero
function RiskDifference({ width = 280, height = 110, value = -6.2, scale = [-12, 4], color = "#1D4E9F", neutralColor = "#9AA3B5" }) {
  const w = width, h = height, padL = 18, padR = 18, padT = 18, padB = 30;
  const [lo, hi] = scale;
  const sx = v => padL + ((v - lo) / (hi - lo)) * (w - padL - padR);
  const zeroX = sx(0);
  const valX = sx(value);
  const barY = (h - padT - padB) / 2 + padT;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* axis */}
      <line x1={padL} y1={h - padB} x2={w - padR} y2={h - padB} stroke="#E1E6EE" strokeWidth="1" />
      {/* zero line */}
      <line x1={zeroX} y1={padT - 4} x2={zeroX} y2={h - padB + 4} stroke="#C9D0DC" strokeWidth="1.5" />
      <text x={zeroX} y={h - padB + 18} textAnchor="middle" fontFamily="Poppins" fontSize="10" fill="#6B7589">0%</text>
      <text x={zeroX} y={padT - 6} textAnchor="middle" fontFamily="Poppins" fontSize="9" fill="#9AA3B5" letterSpacing="0.06em">NO DIFFERENCE</text>
      {/* value bar */}
      <rect x={Math.min(zeroX, valX)} y={barY - 14} width={Math.abs(valX - zeroX)} height={28} fill={color} rx="1" />
      {/* value label */}
      <text x={valX} y={barY + 5} textAnchor={value < 0 ? "end" : "start"} dx={value < 0 ? -6 : 6} fontFamily="Poppins" fontSize="15" fontWeight="700" fill={color}>{value > 0 ? '+' : ''}{value}%</text>
      {/* CI markers */}
      <text x={padL} y={h - padB + 18} textAnchor="start" fontFamily="Poppins" fontSize="9" fill="#9AA3B5">favors MagicTouch</text>
      <text x={w - padR} y={h - padB + 18} textAnchor="end" fontFamily="Poppins" fontSize="9" fill="#9AA3B5">favors comparator →</text>
    </svg>
  );
}

Object.assign(window, { KMChart, MiniKM, BarsCompare, DonutChart, RiskDifference });

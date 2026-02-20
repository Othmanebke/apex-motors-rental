/* ── Porsche 911 — chic luxury silhouette, midnight black + gold ── */
export default function Porsche911() {
  const fwx = 148, fwy = 132   // front wheel centre
  const rwx = 388, rwy = 132   // rear wheel centre

  /* 5-spoke turbine rim helper */
  const TurbineRim = ({ cx, cy, ri, ro, strokeW }) =>
    [0, 72, 144, 216, 288].map(a => {
      const r0 = (a)          * Math.PI / 180
      const rQ = (a + 30)     * Math.PI / 180
      const rE = (a)          * Math.PI / 180
      const mid = (ri + ro) / 2
      return (
        <path
          key={a}
          d={`M ${cx + Math.cos(r0) * ri} ${cy + Math.sin(r0) * ri} Q ${cx + Math.cos(rQ) * mid} ${cy + Math.sin(rQ) * mid} ${cx + Math.cos(rE) * ro} ${cy + Math.sin(rE) * ro}`}
          stroke="#686868" strokeWidth={strokeW} fill="none" strokeLinecap="round"
        />
      )
    })

  return (
    <svg viewBox="0 0 520 168" xmlns="http://www.w3.org/2000/svg" className="porsche-svg">

      {/* ── Shadows ── */}
      <ellipse cx="148" cy="160" rx="105" ry="7" fill="rgba(0,0,0,0.28)" />
      <ellipse cx="388" cy="160" rx="110" ry="7" fill="rgba(0,0,0,0.28)" />

      {/* ── Body silhouette — complete outline with wheel arch cutouts ── */}
      <path
        d="M 26 134 L 22 120 Q 23 102 38 94 L 56 86 L 96 80 L 134 76
           L 152 48 Q 164 24 182 18 L 312 14 L 350 15
           Q 376 16 396 36 L 414 54 Q 440 66 458 78
           Q 472 84 484 100 L 490 118 L 490 134
           Q 474 134 442 134 Q 442 98 388 98 Q 334 98 334 134
           L 192 134 Q 192 98 148 98 Q 104 98 104 134 Z"
        fill="#111111" stroke="#2a2a2a" strokeWidth="1.2"
      />

      {/* ── Upper body tonal gradient band ── */}
      <path
        d="M 96 80 L 134 76 L 152 48 Q 164 24 182 18 L 312 14 L 352 15 Q 328 26 272 30 L 192 34 L 162 52 L 150 68 Z"
        fill="rgba(255,255,255,0.04)"
      />

      {/* ── Windshield ── */}
      <path
        d="M 150 51 Q 163 26 182 20 L 308 16 L 308 56 Q 254 62 202 66 L 170 68 Z"
        fill="#0c1d2c" stroke="#1b3248" strokeWidth="1.1" opacity="0.96"
      />
      {/* windshield gloss */}
      <path d="M 166 34 Q 232 20 296 17" stroke="rgba(255,255,255,0.15)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>

      {/* ── A-pillar ── */}
      <line x1="170" y1="68" x2="150" y2="51" stroke="#0f0f0f" strokeWidth="3.5"/>

      {/* ── Rear window ── */}
      <path
        d="M 310 16 L 350 15 Q 374 16 394 36 L 412 54 L 362 61 Z"
        fill="#0c1d2c" stroke="#1b3248" strokeWidth="1" opacity="0.92"
      />
      {/* rear glass gloss */}
      <path d="M 320 18 Q 356 17 386 30" stroke="rgba(255,255,255,0.09)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>

      {/* ── Gold body pinstripe ── */}
      <path d="M 104 133 Q 260 127 490 133" stroke="#B8860B" strokeWidth="1.6" fill="none" opacity="0.65"/>

      {/* ── Door crease line ── */}
      <path d="M 136 84 Q 280 80 445 88" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none"/>

      {/* ── Front bumper / splitter ── */}
      <path d="M 26 134 L 22 120 Q 23 102 38 94 L 55 87 L 62 87 L 56 134" fill="#0b0b0b" stroke="#222" strokeWidth="1"/>
      {/* gold splitter lip */}
      <line x1="23" y1="136" x2="64" y2="131" stroke="#B8860B" strokeWidth="2.4" strokeLinecap="round"/>

      {/* ── Headlight cluster ── */}
      <path d="M 34 102 Q 40 92 60 92 L 62 104 Q 50 108 36 113 Z" fill="#e6ddb8" opacity="0.88"/>
      {/* DRL strip */}
      <path d="M 30 100 Q 45 88 64 91" stroke="#ffe4a0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75"/>
      {/* headlight chrome rim */}
      <path d="M 32 103 Q 40 91 62 93" stroke="#C9A227" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>

      {/* ── Rear bumper / diffuser ── */}
      <path d="M 480 102 Q 490 112 490 134 L 462 134 Q 462 112 468 100 Z" fill="#0d0d0d" stroke="#1e1e1e" strokeWidth="1"/>
      {/* taillight strip */}
      <path d="M 484 108 Q 490 116 490 130" stroke="#CC0000" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 486 110 Q 490 117 490 128" stroke="#ff5555" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65"/>

      {/* ── "APEX MOTORS" door badge ── */}
      <text x="200" y="112" fill="rgba(184,134,11,0.45)" fontSize="8" fontFamily="'Montserrat',sans-serif" fontWeight="800" letterSpacing="3.5">APEX MOTORS</text>
      {/* 911 badge */}
      <text x="356" y="74" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="2">911</text>

      {/* ── FRONT WHEEL ── */}
      <circle cx={fwx} cy={fwy} r="34" fill="#0d0d0d" stroke="#1e1e1e" strokeWidth="1.2"/>
      {/* brake disc */}
      <circle cx={fwx} cy={fwy} r="22" fill="none" stroke="#2a2a2a" strokeWidth="5"/>
      {/* turbine spokes */}
      <TurbineRim cx={fwx} cy={fwy} ri={10} ro={28} strokeW={4} />
      {/* outer rim lip */}
      <circle cx={fwx} cy={fwy} r="30" fill="none" stroke="#3c3c3c" strokeWidth="1"/>
      {/* centre cap */}
      <circle cx={fwx} cy={fwy} r="8" fill="#141414" stroke="#3a3a3a" strokeWidth="1.2"/>
      <circle cx={fwx} cy={fwy} r="3.5" fill="#B8860B"/>

      {/* ── REAR WHEEL (wider) ── */}
      <circle cx={rwx} cy={rwy} r="36" fill="#0d0d0d" stroke="#1e1e1e" strokeWidth="1.2"/>
      <circle cx={rwx} cy={rwy} r="24" fill="none" stroke="#2a2a2a" strokeWidth="5"/>
      <TurbineRim cx={rwx} cy={rwy} ri={11} ro={30} strokeW={4.5} />
      <circle cx={rwx} cy={rwy} r="32" fill="none" stroke="#3c3c3c" strokeWidth="1"/>
      <circle cx={rwx} cy={rwy} r="9" fill="#141414" stroke="#3a3a3a" strokeWidth="1.2"/>
      <circle cx={rwx} cy={rwy} r="4" fill="#B8860B"/>
      {/* red brake caliper hint */}
      <path
        d={`M ${rwx - 8} ${rwy + 27} A 27 27 0 0 0 ${rwx + 8} ${rwy + 27}`}
        stroke="#990000" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7"
      />
    </svg>
  )
}

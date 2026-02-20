export default function Porsche911() {
  return (
    <svg viewBox="0 0 500 160" xmlns="http://www.w3.org/2000/svg" className="porsche-svg">
      <ellipse cx="132" cy="148" rx="78" ry="9" fill="rgba(0,0,0,0.45)" />
      <ellipse cx="360" cy="148" rx="84" ry="9" fill="rgba(0,0,0,0.45)" />
      <path d="M 18 118 L 22 102 Q 28 90 36 84 L 48 78 Q 60 70 70 58 L 90 40 Q 102 20 130 18 L 240 16 Q 262 15 278 26 L 308 56 Q 320 70 334 76 L 368 80 Q 398 82 432 94 L 448 108 L 452 118 Q 440 122 360 122 A 38 38 0 0 1 280 122 L 210 122 Q 190 122 132 122 A 36 36 0 0 1 52 122 L 18 122 Z" fill="#CC0000" stroke="#990000" strokeWidth="1.5"/>
      <path d="M 330 82 Q 360 78 400 90 L 420 100 L 430 112 Q 400 108 360 108 A 38 38 0 0 1 282 108 L 290 78 Z" fill="#BB0000"/>
      <path d="M 18 118 L 22 102 Q 26 92 34 87 L 50 83 L 52 92 Q 44 96 38 104 L 34 118 Z" fill="#AA0000"/>
      <rect x="50" y="112" width="230" height="8" rx="4" fill="#990000"/>
      <path d="M 93 56 Q 102 28 130 22 L 236 20 Q 256 19 270 32 L 298 60 L 240 66 Q 195 70 140 68 L 93 56 Z" fill="#0d1b2a" stroke="#1a3050" strokeWidth="1.2"/>
      <path d="M 170 66 L 175 21" stroke="#0a1520" strokeWidth="2.5"/>
      <path d="M 32 87 Q 44 81 56 83 L 54 96 Q 44 100 34 97 Z" fill="#fffde0"/>
      <path d="M 30 83 Q 50 76 64 79" stroke="#fffbe6" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
      <path d="M 388 86 Q 428 90 450 100 L 448 112 Q 424 108 386 104 Z" fill="#ff2020"/>
      <path d="M 390 87 Q 428 91 448 100" stroke="#ff6060" strokeWidth="1.5" opacity="0.7"/>
      <path d="M 132 120 L 130 72 Q 130 64 136 60 L 165 66 L 170 120" stroke="#AA0000" strokeWidth="1" fill="none"/>
      <path d="M 72 56 Q 150 44 260 42 Q 295 42 308 52" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 124 20 Q 200 16 258 20" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="132" cy="127" r="28" fill="#1a1a1a"/>
      <circle cx="132" cy="127" r="20" fill="#262626" stroke="#444" strokeWidth="1.5"/>
      <circle cx="132" cy="127" r="9" fill="#111" stroke="#555" strokeWidth="1"/>
      <circle cx="132" cy="127" r="3.5" fill="#888"/>
      {[0,60,120,180,240,300].map(a => { const rad = a*Math.PI/180; return <line key={a} x1={132+Math.cos(rad)*9} y1={127+Math.sin(rad)*9} x2={132+Math.cos(rad)*19} y2={127+Math.sin(rad)*19} stroke="#555" strokeWidth="3" strokeLinecap="round"/> })}
      <circle cx="360" cy="127" r="30" fill="#1a1a1a"/>
      <circle cx="360" cy="127" r="22" fill="#262626" stroke="#444" strokeWidth="1.5"/>
      <circle cx="360" cy="127" r="10" fill="#111" stroke="#555" strokeWidth="1"/>
      <circle cx="360" cy="127" r="4" fill="#888"/>
      {[0,60,120,180,240,300].map(a => { const rad = a*Math.PI/180; return <line key={a} x1={360+Math.cos(rad)*10} y1={127+Math.sin(rad)*10} x2={360+Math.cos(rad)*21} y2={127+Math.sin(rad)*21} stroke="#555" strokeWidth="3.5" strokeLinecap="round"/> })}
      <circle cx="432" cy="115" r="5.5" fill="#222" stroke="#555" strokeWidth="1"/>
      <circle cx="444" cy="115" r="5.5" fill="#222" stroke="#555" strokeWidth="1"/>
      <circle cx="432" cy="115" r="3" fill="#111"/>
      <circle cx="444" cy="115" r="3" fill="#111"/>
      <text x="294" y="76" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="1">911</text>
      <text x="140" y="102" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="Montserrat,sans-serif" fontWeight="800" letterSpacing="2">APEX</text>
      <line x1="0" y1="90" x2="60" y2="88" stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round"/>
      <line x1="0" y1="100" x2="45" y2="98" stroke="rgba(255,255,255,0.05)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

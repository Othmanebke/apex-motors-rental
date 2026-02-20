/**
 * TireTracks — traces de pneu décoratives, style luxury gold
 * variant="topleft" | "faq"
 */
export default function TireTracks({ variant = 'topleft' }) {
  /**
   * Tread unit — 6 slim oval imprints (2 rows × 3 cols)
   * Mimics a real performance tyre's contact patch, very subtle gold.
   */
  const Tread = ({ x, y, rotate = 0, delay = 0 }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <g
        className="tread-unit"
        style={{
          animationDelay: `${delay}s`,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      >
        {/* row 1 — three elongated ovals */}
        <ellipse cx="9"  cy="4"  rx="8.5" ry="3" />
        <ellipse cx="30" cy="4"  rx="8.5" ry="3" />
        <ellipse cx="51" cy="4"  rx="8.5" ry="3" />
        {/* row 2 — offset slightly for realism */}
        <ellipse cx="9"  cy="15" rx="8.5" ry="3" />
        <ellipse cx="30" cy="15" rx="8.5" ry="3" />
        <ellipse cx="51" cy="15" rx="8.5" ry="3" />
      </g>
    </g>
  )

  if (variant === 'topleft') {
    return (
      <div className="tire-deco tire-deco--topleft" aria-hidden="true">
        <svg
          width="260"
          height="320"
          viewBox="0 0 260 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="rgba(184,134,11,0.18)">
            {/* Piste gauche — diagonale vers le bas-droite */}
            <Tread x={10}  y={0}   rotate={-30} delay={0.5}  />
            <Tread x={35}  y={38}  rotate={-30} delay={0.65} />
            <Tread x={60}  y={76}  rotate={-30} delay={0.8}  />
            <Tread x={85}  y={114} rotate={-30} delay={0.95} />
            <Tread x={110} y={152} rotate={-30} delay={1.1}  />
            <Tread x={135} y={190} rotate={-30} delay={1.25} />
            <Tread x={160} y={228} rotate={-30} delay={1.4}  />
            {/* Piste droite — parallèle (+70px en x) */}
            <Tread x={80}  y={0}   rotate={-30} delay={0.58} />
            <Tread x={105} y={38}  rotate={-30} delay={0.73} />
            <Tread x={130} y={76}  rotate={-30} delay={0.88} />
            <Tread x={155} y={114} rotate={-30} delay={1.03} />
            <Tread x={180} y={152} rotate={-30} delay={1.18} />
            <Tread x={205} y={190} rotate={-30} delay={1.33} />
          </g>
        </svg>
      </div>
    )
  }

  // variant === 'faq'
  return (
    <div className="tire-deco tire-deco--faq" aria-hidden="true">
      <svg
        width="340"
        height="160"
        viewBox="0 0 340 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="rgba(184,134,11,0.14)">
          {/* Piste gauche — quasi horizontale, légère pente */}
          <Tread x={0}   y={30}  rotate={-8} delay={0.2}  />
          <Tread x={72}  y={18}  rotate={-8} delay={0.35} />
          <Tread x={144} y={6}   rotate={-8} delay={0.5}  />
          <Tread x={216} y={-6}  rotate={-8} delay={0.65} />
          {/* Piste droite */}
          <Tread x={0}   y={100} rotate={-8} delay={0.28} />
          <Tread x={72}  y={88}  rotate={-8} delay={0.43} />
          <Tread x={144} y={76}  rotate={-8} delay={0.58} />
          <Tread x={216} y={64}  rotate={-8} delay={0.73} />
        </g>
      </svg>
    </div>
  )
}

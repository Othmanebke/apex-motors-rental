/**
 * TireTracks — traces de pneu décoratives en SVG rouge animées
 * variant="topleft" | "faq"
 */
export default function TireTracks({ variant = 'topleft' }) {
  // Outer <g> handles position, inner <g> gets the CSS animation
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
        {/* rangée 1 */}
        <rect x="0"  y="0"  width="18" height="8" rx="2" />
        <rect x="22" y="0"  width="18" height="8" rx="2" />
        <rect x="44" y="0"  width="18" height="8" rx="2" />
        {/* rangée 2 */}
        <rect x="0"  y="12" width="18" height="8" rx="2" />
        <rect x="22" y="12" width="18" height="8" rx="2" />
        <rect x="44" y="12" width="18" height="8" rx="2" />
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
          <g fill="rgba(230,57,70,0.2)">
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
        <g fill="rgba(230,57,70,0.15)">
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

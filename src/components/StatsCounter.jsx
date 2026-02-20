import { useEffect, useRef, useState } from 'react'

/* ── Thin-line SVG icons — luxury monoline style ── */
const IconCar = () => (
  <svg viewBox="0 0 48 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="stat-svg-icon">
    {/* body */}
    <path d="M 3 19 L 4 14 Q 5 11 8 10 L 12 9 L 18 4 Q 21 2 27 2 L 37 2 Q 40 2 42 4 L 45 10 Q 46 12 46 15 L 46 19" />
    {/* underbody */}
    <path d="M 3 19 L 46 19" />
    {/* windscreen divider */}
    <path d="M 26 9 L 26 2" strokeOpacity="0.5"/>
    {/* front bumper */}
    <path d="M 3 19 Q 2 21 4 22 L 11 22" />
    {/* rear bumper */}
    <path d="M 46 19 Q 47 21 45 22 L 37 22" />
    {/* front wheel */}
    <circle cx="13" cy="22" r="4"/>
    <circle cx="13" cy="22" r="1.5"/>
    {/* rear wheel */}
    <circle cx="37" cy="22" r="4"/>
    <circle cx="37" cy="22" r="1.5"/>
  </svg>
)

const IconUsers = () => (
  <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="stat-svg-icon">
    {/* primary person */}
    <circle cx="24" cy="8" r="6"/>
    <path d="M 12 30 Q 12 20 24 20 Q 36 20 36 30"/>
    {/* secondary left (ghost) */}
    <circle cx="10" cy="11" r="4.5" strokeOpacity="0.4"/>
    <path d="M 2 30 Q 2 23 10 23" strokeOpacity="0.4"/>
    {/* secondary right (ghost) */}
    <circle cx="38" cy="11" r="4.5" strokeOpacity="0.4"/>
    <path d="M 46 30 Q 46 23 38 23" strokeOpacity="0.4"/>
  </svg>
)

const IconStar = () => (
  <svg viewBox="0 0 48 46" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="stat-svg-icon">
    {/* large star */}
    <polygon points="24,3 29.5,18 45,18 32.5,27.5 37,43 24,34 11,43 15.5,27.5 3,18 18.5,18" />
    {/* inner glow ring */}
    <circle cx="24" cy="23" r="6" strokeOpacity="0.3"/>
  </svg>
)

const IconDiamond = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="stat-svg-icon">
    {/* diamond */}
    <path d="M 24 4 L 44 20 L 24 44 L 4 20 Z"/>
    {/* inner facet */}
    <path d="M 4 20 L 44 20" strokeOpacity="0.35"/>
    <path d="M 13 10 L 24 20 L 35 10" strokeOpacity="0.35"/>
    {/* center highlight */}
    <circle cx="24" cy="28" r="3.5" strokeOpacity="0.25"/>
  </svg>
)

const STATS = [
  { end: 14,  suffix: '',  label: 'Véhicules premium',  Icon: IconCar,    decimal: 0 },
  { end: 500, suffix: '+', label: 'Clients satisfaits', Icon: IconUsers,  decimal: 0 },
  { end: 4.9, suffix: '',  label: 'Note moyenne',        Icon: IconStar,   decimal: 1 },
  { end: 7,   suffix: '+', label: "Années d'expertise",  Icon: IconDiamond,decimal: 0 },
]

function useCountUp(end, duration = 2000, started = false, decimal = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(parseFloat((eased * end).toFixed(decimal)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration, decimal])
  return val
}

function StatItem({ stat, started, isLast }) {
  const val = useCountUp(stat.end, 2000, started, stat.decimal)
  const { Icon, suffix, decimal, label } = stat
  return (
    <>
      <div className="stat-counter__item">
        <div className="stat-counter__icon-wrap">
          <Icon />
        </div>
        <span className="stat-counter__val">
          {decimal ? val.toFixed(decimal) : Math.round(val)}{suffix}
        </span>
        <span className="stat-counter__label">{label}</span>
      </div>
      {!isLast && <div className="stat-counter__sep" aria-hidden="true" />}
    </>
  )
}

export default function StatsCounter() {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="stat-counter-section" ref={ref}>
      <div className="stat-counter__inner">
        <div className="stat-counter__grid">
          {STATS.map((s, i) => (
            <StatItem key={i} stat={s} started={started} isLast={i === STATS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

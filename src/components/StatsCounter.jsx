import { useEffect, useRef, useState } from 'react'

const STATS = [
  { end: 14,   suffix: '',   label: 'véhicules premium',   icon: '🏎️' },
  { end: 500,  suffix: '+',  label: 'clients satisfaits',  icon: '⭐' },
  { end: 4.9,  suffix: '',   label: 'note moyenne',         icon: '✨', decimal: 1 },
  { end: 7,    suffix: '+',  label: "années d'expertise",   icon: '🏆' },
]

function useCountUp(end, duration = 1800, started = false, decimal = 0) {
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

function StatItem({ stat, started }) {
  const val = useCountUp(stat.end, 1800, started, stat.decimal || 0)
  return (
    <div className="stat-counter__item">
      <span className="stat-counter__icon">{stat.icon}</span>
      <span className="stat-counter__val">
        {stat.decimal ? val.toFixed(stat.decimal) : Math.round(val)}{stat.suffix}
      </span>
      <span className="stat-counter__label">{stat.label}</span>
    </div>
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
      <div className="stat-counter__grid">
        {STATS.map((s, i) => (
          <StatItem key={i} stat={s} started={started} />
        ))}
      </div>
    </section>
  )
}

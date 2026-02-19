import { useState, useMemo, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { cars, getBookedRanges, OPTIONS } from '../data/cars'
import ReservationModal from '../components/ReservationModal'
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameMonth, isSameDay, isToday, isBefore, addMonths,
  isWithinInterval, startOfDay,
} from 'date-fns'
import { fr } from 'date-fns/locale'

// ── helpers ──────────────────────────────────────────────────────────────────
function isBooked(date, ranges) {
  const d = startOfDay(date)
  return ranges.some(r => isWithinInterval(d, { start: startOfDay(r.start), end: startOfDay(r.end) }))
}
function inRange(date, start, end) {
  if (!start || !end) return false
  const d = startOfDay(date)
  const s = startOfDay(start)
  const e = startOfDay(end)
  return isWithinInterval(d, { start: s <= e ? s : e, end: s <= e ? e : s })
}

// ── Mini availability calendar ───────────────────────────────────────────────
function AvailCalendar({ carId, onRangeSelect }) {
  const bookedRanges = useMemo(() => getBookedRanges(carId), [carId])
  const [baseMonth, setBaseMonth] = useState(new Date())
  const [selecting, setSelecting] = useState(null) // {start}
  const [range, setRange] = useState({ start: null, end: null })
  const [hovered, setHovered] = useState(null)

  const months = [baseMonth, addMonths(baseMonth, 1)]

  const handleDayClick = useCallback((day) => {
    const today = startOfDay(new Date())
    if (isBefore(day, today)) return
    if (isBooked(day, bookedRanges)) return

    if (!selecting) {
      setSelecting({ start: day })
      setRange({ start: day, end: null })
    } else {
      if (isBefore(day, selecting.start)) {
        setRange({ start: day, end: selecting.start })
        onRangeSelect?.({ start: day, end: selecting.start })
      } else {
        setRange({ start: selecting.start, end: day })
        onRangeSelect?.({ start: selecting.start, end: day })
      }
      setSelecting(null)
    }
  }, [selecting, bookedRanges, onRangeSelect])

  return (
    <div className="avail-cal">
      <div className="avail-cal__header">
        <button className="avail-cal__nav" onClick={() => setBaseMonth(m => addMonths(m, -1))} aria-label="Mois précédent">‹</button>
        <span className="avail-cal__legend">
          <span className="legend-dot legend-dot--available" /> Disponible
          <span className="legend-dot legend-dot--booked" /> Réservé
          {range.start && range.end && (
            <span className="legend-dot legend-dot--selected" />
          )}
        </span>
        <button className="avail-cal__nav" onClick={() => setBaseMonth(m => addMonths(m, 1))} aria-label="Mois suivant">›</button>
      </div>

      <div className="avail-cal__months">
        {months.map((month, mi) => {
          const start = startOfMonth(month)
          const end = endOfMonth(month)
          const days = eachDayOfInterval({ start, end })
          const firstDow = (start.getDay() + 6) % 7 // Monday-first
          const today = startOfDay(new Date())

          return (
            <div key={mi} className="avail-cal__month">
              <div className="avail-cal__month-name">
                {format(month, 'MMMM yyyy', { locale: fr })}
              </div>
              <div className="avail-cal__dow-row">
                {['L','M','M','J','V','S','D'].map((d, i) => (
                  <span key={i} className="avail-cal__dow">{d}</span>
                ))}
              </div>
              <div className="avail-cal__grid">
                {Array.from({ length: firstDow }).map((_, i) => (
                  <span key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                  const booked   = isBooked(day, bookedRanges)
                  const past     = isBefore(day, today) && !isToday(day)
                  const todayDay = isToday(day)
                  const isStart  = range.start && isSameDay(day, range.start)
                  const isEnd    = range.end   && isSameDay(day, range.end)
                  const inSel    = range.start && range.end && inRange(day, range.start, range.end)
                  const inHov    = selecting && hovered && inRange(day, selecting.start, hovered)

                  let cls = 'avail-day'
                  if (past)    cls += ' avail-day--past'
                  if (booked)  cls += ' avail-day--booked'
                  if (!booked && !past) cls += ' avail-day--available'
                  if (todayDay) cls += ' avail-day--today'
                  if (isStart || isEnd) cls += ' avail-day--edge'
                  if (inSel)   cls += ' avail-day--in-range'
                  if (inHov)   cls += ' avail-day--hover-range'

                  return (
                    <button
                      key={day.toISOString()}
                      className={cls}
                      disabled={booked || past}
                      onClick={() => handleDayClick(day)}
                      onMouseEnter={() => setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                      aria-label={format(day, 'dd MMMM yyyy', { locale: fr })}
                    >
                      {format(day, 'd')}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {range.start && range.end && (
        <div className="avail-cal__summary">
          Du <strong>{format(range.start, 'dd MMM', { locale: fr })}</strong> au{' '}
          <strong>{format(range.end, 'dd MMM yyyy', { locale: fr })}</strong>
          <button className="avail-cal__clear" onClick={() => { setRange({ start: null, end: null }); onRangeSelect?.(null) }}>
            ✕ Effacer
          </button>
        </div>
      )}

      {selecting && !range.end && (
        <p className="avail-cal__hint">Cliquez sur une date de fin de location</p>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CarDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = cars.find(c => c.id === Number(id))

  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('apexWishlist') || '[]') } catch { return [] }
  })
  const [activeImg, setActiveImg] = useState(0)
  const [selectedRange, setSelectedRange] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCar, setModalCar] = useState(null)

  if (!car) {
    return (
      <div className="detail-not-found">
        <h2>Véhicule introuvable</h2>
        <Link to="/cars" className="btn-red">← Retour au catalogue</Link>
      </div>
    )
  }

  const isFav = wishlist.includes(car.id)
  const toggleFav = () => {
    const next = isFav ? wishlist.filter(x => x !== car.id) : [...wishlist, car.id]
    setWishlist(next)
    localStorage.setItem('apexWishlist', JSON.stringify(next))
  }

  const days = selectedRange
    ? Math.max(1, Math.round((selectedRange.end - selectedRange.start) / 86400000) + 1)
    : 1

  const optionsCost = selectedOptions.reduce((acc, optId) => {
    const opt = OPTIONS.find(o => o.id === optId)
    return opt ? acc + opt.priceDay * days : acc
  }, 0)

  const totalPrice = car.priceDay * days + optionsCost

  const toggleOption = (optId) => {
    setSelectedOptions(prev =>
      prev.includes(optId) ? prev.filter(x => x !== optId) : [...prev, optId]
    )
  }

  const openReservation = () => {
    setModalCar(car)
    setModalOpen(true)
  }

  const segmentBadge = {
    Luxe:        { label: 'Luxe', cls: 'badge--gold' },
    Premium:     { label: 'Premium', cls: 'badge--silver' },
    Généraliste: { label: 'Économique', cls: 'badge--green' },
  }[car.segment] || { label: car.segment, cls: '' }

  const gallery = car.gallery || [car.image]

  return (
    <div className="car-detail">
      {/* ── BREADCRUMB ── */}
      <div className="detail-breadcrumb">
        <Link to="/">Accueil</Link> / <Link to="/cars">Catalogue</Link> / <span>{car.name}</span>
      </div>

      {/* ── HERO ── */}
      <section className="detail-hero">
        <div className="detail-hero__gallery">
          <div className="detail-hero__main">
            <img src={gallery[activeImg]} alt={car.name} />
            <button
              className={`heart-btn detail-heart ${isFav ? 'active' : ''}`}
              onClick={toggleFav}
              aria-label={isFav ? 'Retirer des coups de cœur' : 'Ajouter aux coups de cœur'}
            >
              <HeartIcon filled={isFav} />
              <span>{isFav ? 'Coup de cœur !' : 'Coup de cœur'}</span>
            </button>
          </div>
          {gallery.length > 1 && (
            <div className="detail-hero__thumbs">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  className={`detail-thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${car.name} vue ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-hero__info">
          <div className="detail-badges">
            <span className={`detail-badge ${segmentBadge.cls}`}>{segmentBadge.label}</span>
            <span className="detail-badge badge--cat">{car.category}</span>
            {car.tags.map(t => (
              <span key={t} className="car-tag">{t}</span>
            ))}
          </div>

          <h1 className="detail-title">{car.name}</h1>
          <p className="detail-brand">{car.brand}</p>
          <p className="detail-desc">{car.description}</p>

          {/* ── SPECS ── */}
          <div className="detail-specs">
            <div className="detail-spec">
              <span className="detail-spec__icon">⚡</span>
              <span className="detail-spec__val">{car.specs.power}</span>
              <span className="detail-spec__lbl">Puissance</span>
            </div>
            <div className="detail-spec">
              <span className="detail-spec__icon">🏁</span>
              <span className="detail-spec__val">{car.specs.acceleration}</span>
              <span className="detail-spec__lbl">0 – 100 km/h</span>
            </div>
            <div className="detail-spec">
              <span className="detail-spec__icon">🔝</span>
              <span className="detail-spec__val">{car.specs.topSpeed}</span>
              <span className="detail-spec__lbl">Vitesse max</span>
            </div>
            <div className="detail-spec">
              <span className="detail-spec__icon">💺</span>
              <span className="detail-spec__val">{car.specs.seats}</span>
              <span className="detail-spec__lbl">Places</span>
            </div>
            <div className="detail-spec detail-spec--wide">
              <span className="detail-spec__icon">⚙️</span>
              <span className="detail-spec__val">{car.specs.gearbox}</span>
              <span className="detail-spec__lbl">Boîte</span>
            </div>
          </div>

          {/* ── FEATURES ── */}
          {car.features && (
            <ul className="detail-features">
              {car.features.map(f => (
                <li key={f}><span className="feature-check">✓</span> {f}</li>
              ))}
            </ul>
          )}

          {/* ── PRICE CTA ── */}
          <div className="detail-price-cta">
            <div className="detail-price">
              <span className="detail-price__amount">{car.priceDay}€</span>
              <span className="detail-price__unit">/jour</span>
            </div>
            <button className="btn-red detail-reserve-btn" onClick={openReservation}>
              Réserver maintenant
            </button>
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY CALENDAR ── */}
      <section className="detail-section">
        <h2 className="detail-section__title">Disponibilités en temps réel</h2>
        <p className="detail-section__sub">Sélectionnez vos dates de début et de fin de location</p>
        <AvailCalendar carId={car.id} onRangeSelect={setSelectedRange} />
      </section>

      {/* ── PRICE CALCULATOR ── */}
      {selectedRange && (
        <section className="detail-section detail-calculator">
          <h2 className="detail-section__title">Calculateur de tarif</h2>

          <div className="calc-grid">
            <div className="calc-info">
              <div className="calc-row">
                <span>Location ({days} jour{days > 1 ? 's' : ''})</span>
                <span className="calc-price">{car.priceDay * days}€</span>
              </div>

              <div className="calc-options">
                <p className="calc-options__title">Options</p>
                {OPTIONS.map(opt => (
                  <label key={opt.id} className="calc-option">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(opt.id)}
                      onChange={() => toggleOption(opt.id)}
                    />
                    <span className="calc-option__label">
                      {opt.label}
                      <span className="calc-option__price">+{opt.priceDay}€/j → {opt.priceDay * days}€</span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="calc-total">
                <span>Total estimé</span>
                <span className="calc-total__price">{totalPrice}€</span>
              </div>

              <button className="btn-red calc-reserve" onClick={openReservation}>
                Confirmer la réservation
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── BACK ── */}
      <div className="detail-back">
        <button className="detail-back__btn" onClick={() => navigate(-1)}>← Retour au catalogue</button>
      </div>

      {modalOpen && modalCar && (
        <ReservationModal car={modalCar} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

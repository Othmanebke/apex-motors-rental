import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { cars, FILTERS, SORT_OPTIONS } from '../data/cars'
import ReservationModal from '../components/ReservationModal'
import SkeletonCard from '../components/SkeletonCard'

const CARS_PER_PAGE = 9

// ── Coup de cœur helpers ──────────────────────────────────────────────────────
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('apexWishlist') || '[]') } catch { return [] }
}
function saveWishlist(arr) {
  localStorage.setItem('apexWishlist', JSON.stringify(arr))
}

// ── Heart button ──────────────────────────────────────────────────────────────
function HeartBtn({ carId, wishlist, onToggle }) {
  const active = wishlist.includes(carId)
  return (
    <button
      className={`heart-btn ${active ? 'active' : ''}`}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); onToggle(carId) }}
      aria-label={active ? 'Retirer des coups de cœur' : 'Ajouter aux coups de cœur'}
      title={active ? 'Coup de cœur !' : 'Coup de cœur'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimCounter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = Math.ceil(target / 40)
      const timer = setInterval(() => {
        start = Math.min(start + step, target)
        setVal(start)
        if (start >= target) clearInterval(timer)
      }, 30)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Segment badge color ───────────────────────────────────────────────────────
const segCls = { Luxe: 'badge--gold', Premium: 'badge--silver', Généraliste: 'badge--green' }
// ── CompareBar ─────────────────────────────────────────────────────────
function CompareBar({ list, onRemove, onCompare, onClear }) {
  return (
    <div className={`compare-bar ${list.length > 0 ? 'compare-bar--visible' : ''}`}>
      <div className="compare-bar__cars">
        {list.map(car => (
          <div key={car.id} className="compare-bar__item">
            <img src={car.image} alt={car.name} />
            <span>{car.name}</span>
            <button onClick={() => onRemove(car.id)} aria-label="Retirer">×</button>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 3 - list.length) }).map((_, i) => (
          <div key={`slot-${i}`} className="compare-bar__slot">Ajouter +</div>
        ))}
      </div>
      <div className="compare-bar__actions">
        <span className="compare-bar__hint">Sélectionnez jusqu'à 3 voitures</span>
        <button className="compare-bar__btn-clear" onClick={onClear}>Effacer</button>
        <button
          className="btn-red compare-bar__btn"
          disabled={list.length < 2}
          onClick={onCompare}
        >
          Comparer {list.length > 0 ? `(${list.length})` : ''}
        </button>
      </div>
    </div>
  )
}

// ── CompareModal ─────────────────────────────────────────────────────────
const COMPARE_KEYS = [
  { key: 'priceDay', label: 'Prix / jour', fmt: v => `${v}€` },
  { key: 'category', label: 'Catégorie' },
  { key: 'segment', label: 'Segment' },
  { key: 'specs.power', label: 'Puissance' },
  { key: 'specs.acceleration', label: '0–100 km/h' },
  { key: 'specs.topSpeed', label: 'Vitesse max' },
  { key: 'specs.seats', label: 'Places' },
  { key: 'specs.gearbox', label: 'Boîte' },
]
function getVal(car, key) {
  if (key.includes('.')) { const [a, b] = key.split('.'); return car[a]?.[b] ?? '—' }
  return car[key] ?? '—'
}

function CompareModal({ list, onClose }) {
  return (
    <div className="compare-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="compare-modal">
        <div className="compare-modal__header">
          <h2>Comparateur</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                {list.map(car => (
                  <th key={car.id}>
                    <img src={car.image} alt={car.name} className="compare-th-img" />
                    <div className="compare-th-name">{car.name}</div>
                    <div className="compare-th-brand">{car.brand}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_KEYS.map(row => {
                const vals = list.map(car => row.fmt ? row.fmt(getVal(car, row.key)) : getVal(car, row.key))
                return (
                  <tr key={row.key}>
                    <td className="compare-row-label">{row.label}</td>
                    {vals.map((v, i) => {
                      const best = row.key === 'priceDay'
                        ? v === `${Math.min(...list.map(c => c.priceDay))}€`
                        : false
                      return <td key={i} className={best ? 'compare-best' : ''}>{v}</td>
                    })}
                  </tr>
                )
              })}
              <tr>
                <td className="compare-row-label">Action</td>
                {list.map(car => (
                  <td key={car.id}>
                    <Link to={`/cars/${car.id}`} className="compare-detail-btn" onClick={onClose}>Voir le détail</Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default function CarsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilters, setActiveFilters] = useState({
    make: 'Toutes marques',
    segment: 'Tous segments',
    category: 'Toutes catégories',
  })
  const [sort, setSort] = useState('price-asc')
  const [page, setPage] = useState(1)
  const [selectedCar, setSelectedCar] = useState(null)
  const [wishlist, setWishlist] = useState(getWishlist)
  const [favOnly, setFavOnly] = useState(false)
  const [compareList, setCompareList] = useState([])  // max 3
  const [compareOpen, setCompareOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const heroRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(false)

  const searchQ  = searchParams.get('q')    || ''
  const favsParam = searchParams.get('favs') === '1'

  // Activer "coup de cœur" si URL contient ?favs=1
  useEffect(() => {
    if (favsParam) setFavOnly(true)
  }, [favsParam])

  // Skeleton loader initial + filter debounce
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [searchQ, activeFilters, sort, favOnly, page])

  useEffect(() => { setPage(1) }, [searchQ, activeFilters, sort, favOnly])

  const toggleCompare = (car) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === car.id)) return prev.filter(c => c.id !== car.id)
      if (prev.length >= 3) return prev
      return [...prev, car]
    })
  }

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeroVisible(true); obs.disconnect() }
    }, { threshold: 0.05 })
    if (heroRef.current) obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [])

  const toggleFav = (id) => {
    const next = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id]
    setWishlist(next)
    saveWishlist(next)
  }

  const clearSearch = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    setSearchParams(next)
  }

  const resetFilters = () => {
    setActiveFilters({ make: 'Toutes marques', segment: 'Tous segments', category: 'Toutes catégories' })
    setFavOnly(false)
    clearSearch()
  }

  const isFiltered = favOnly || searchQ ||
    activeFilters.make !== 'Toutes marques' ||
    activeFilters.segment !== 'Tous segments' ||
    activeFilters.category !== 'Toutes catégories'

  // Filter
  let filtered = cars.filter((car) => {
    const makeOk   = activeFilters.make === 'Toutes marques' || car.type === activeFilters.make
    const segOk    = activeFilters.segment === 'Tous segments' || car.segment === activeFilters.segment
    const catOk    = activeFilters.category === 'Toutes catégories' || car.category === activeFilters.category
    const favOk    = !favOnly || wishlist.includes(car.id)
    const searchOk = !searchQ || [car.name, car.brand, car.category, car.segment, ...car.tags]
      .join(' ').toLowerCase().includes(searchQ.toLowerCase())
    return makeOk && segOk && catOk && favOk && searchOk
  })

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === 'price-asc')   return a.priceDay - b.priceDay
    if (sort === 'price-desc')  return b.priceDay - a.priceDay
    if (sort === 'power-desc') {
      const pw = c => parseInt(c.specs.power)
      return pw(b) - pw(a)
    }
    return 0
  })

  const totalPages = Math.ceil(filtered.length / CARS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE)

  return (
    <div className="cars-page">

      {/* ── ANIMATED HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className={`cars-hero ${heroVisible ? 'cars-hero--visible' : ''}`}>
        <div className="cars-hero__bg">
          <div className="cars-hero__orb cars-hero__orb--1" />
          <div className="cars-hero__orb cars-hero__orb--2" />
          <div className="cars-hero__line" />
        </div>
        <div className="cars-hero__content">
          <div className="cars-hero__eyebrow">Catalogue complet</div>
          <h1 className="cars-hero__title">
            {searchQ
              ? <><span>Résultats pour </span><em className="hero-q">« {searchQ} »</em></>
              : <><span>Notre flotte</span><br /><em>d'exception</em></>
            }
          </h1>
          <p className="cars-hero__sub">
            De la citadine économique à la supercar exclusive — trouvez le véhicule идеal pour chaque occasion.
          </p>
          {searchQ && (
            <button className="cars-hero__clear" onClick={clearSearch}>✕ Effacer la recherche</button>
          )}
          <div className="cars-hero__stats">
            <div className="hero-stat">
              <strong><AnimCounter target={14} /></strong>
              <span>Véhicules</span>
            </div>
            <div className="hero-stat">
              <strong><AnimCounter target={8} /></strong>
              <span>Marques</span>
            </div>
            <div className="hero-stat">
              <strong><AnimCounter target={48} suffix="€" /></strong>
              <span>Dès / jour</span>
            </div>
            <div className="hero-stat">
              <strong><AnimCounter target={100} suffix="%" /></strong>
              <span>Satisfaits</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ──────────────────────────────────────────────── */}
      <div className="filter-bar-cars">
        <div className="filter-bar-cars__left">
          {Object.entries(FILTERS).map(([key, options]) => (
            <select
              key={key}
              className="filter-dropdown"
              value={activeFilters[key]}
              onChange={(e) => setActiveFilters(prev => ({ ...prev, [key]: e.target.value }))}
            >
              {options.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          ))}

          <button
            className={`fav-filter-btn ${favOnly ? 'active' : ''}`}
            onClick={() => setFavOnly(v => !v)}
            title="Afficher mes coups de cœur uniquement"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={favOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Coups de cœur
            {wishlist.length > 0 && <span className="fav-count">{wishlist.length}</span>}
          </button>

          {isFiltered && (
            <button className="filter-dropdown filter-reset" onClick={resetFilters}>✕ Réinitialiser</button>
          )}
        </div>

        <div className="filter-bar-cars__right">
          <select className="filter-dropdown" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <span className="filter-count">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* ── GRID ──────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="cars-listing">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : paginated.length === 0 ? (
        <div className="cars-empty">
          <p>Aucun véhicule ne correspond à votre recherche.</p>
          <button className="btn-red" onClick={resetFilters}>Voir tous les véhicules</button>
        </div>
      ) : (
        <div className="cars-listing">
          {paginated.map((car) => {
            const inCompare = compareList.some(c => c.id === car.id)
            return (
              <article key={car.id} className={`car-card${inCompare ? ' car-card--compare' : ''}`}>
                <button
                  className={`compare-toggle-btn${inCompare ? ' active' : ''}`}
                  onClick={() => toggleCompare(car)}
                  title={inCompare ? 'Retirer de la comparaison' : 'Ajouter à la comparaison'}
                >
                  {inCompare ? '✓' : '⊕'}
                </button>
                <Link to={`/cars/${car.id}`} className="car-card__img-wrap">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  <div className="car-card__tags">
                    {car.tags.map(t => <span key={t} className="car-tag">{t}</span>)}
                  </div>
                  <span className={`car-card__segment-badge ${segCls[car.segment] || ''}`}>
                    {car.segment}
                  </span>
                  <HeartBtn carId={car.id} wishlist={wishlist} onToggle={toggleFav} />
                </Link>

                <div className="car-card__body">
                  <div className="car-card__meta">
                    <span className="car-card__category">{car.category}</span>
                    <span className="car-card__brand">{car.brand}</span>
                  </div>
                  <h3 className="car-card__name">{car.name}</h3>

                  <div className="car-card__specs">
                    <div className="car-spec">
                      <span className="car-spec__val">{car.specs.power}</span>
                      <span className="car-spec__lbl">Puissance</span>
                    </div>
                    <div className="car-spec">
                      <span className="car-spec__val">{car.specs.acceleration}</span>
                      <span className="car-spec__lbl">0–100</span>
                    </div>
                    <div className="car-spec">
                      <span className="car-spec__val">{car.specs.topSpeed}</span>
                      <span className="car-spec__lbl">Vmax</span>
                    </div>
                    <div className="car-spec">
                      <span className="car-spec__val">{car.specs.seats}</span>
                      <span className="car-spec__lbl">Places</span>
                    </div>
                  </div>

                  <div className="car-card__footer">
                    <div className="car-card__price">
                      <span className="car-card__price-from">À partir de</span>
                      <span className="car-card__price-amount">{car.priceDay}€</span>
                      <span className="car-card__price-unit">/jour</span>
                    </div>
                    <div className="car-card__actions">
                      <Link to={`/cars/${car.id}`} className="car-card__detail-btn">Détails</Link>
                      <button className="btn-red car-card__reserve-btn" onClick={() => setSelectedCar(car)}>
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* ── PAGINATION ──────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`page-btn${page === i + 1 ? ' active' : ''}`} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
        </div>
      )}

      {selectedCar && (
        <ReservationModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      {/* ── COMPARE BAR ── */}
      <CompareBar
        list={compareList}
        onRemove={id => setCompareList(prev => prev.filter(c => c.id !== id))}
        onCompare={() => setCompareOpen(true)}
        onClear={() => setCompareList([])}
      />

      {/* ── COMPARE MODAL ── */}
      {compareOpen && (
        <CompareModal list={compareList} onClose={() => setCompareOpen(false)} />
      )}
    </div>
  )
}

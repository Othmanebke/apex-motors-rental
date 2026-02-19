import { useState } from 'react'
import { cars, FILTERS } from '../data/cars'
import ReservationModal from '../components/ReservationModal'

const CARS_PER_PAGE = 6

export default function CarsPage() {
  const [activeFilters, setActiveFilters] = useState({ make: 'All Makes', type: 'All Types', provider: 'All Providers' })
  const [page, setPage] = useState(1)
  const [selectedCar, setSelectedCar] = useState(null)

  const filtered = cars.filter((car) => {
    const makeOk = activeFilters.make === 'All Makes' || car.type === activeFilters.make
    const typeOk = activeFilters.type === 'All Types' || car.category === activeFilters.type
    return makeOk && typeOk
  })

  const paginated = filtered.slice(0, page * CARS_PER_PAGE)
  const hasMore = paginated.length < filtered.length

  return (
    <div className="cars-page">
      <div className="cars-page-hero">
        <h1>Cars</h1>
      </div>

      {/* Filter bar */}
      <div className="filter-bar-cars">
        {Object.entries(FILTERS).map(([key, options]) => (
          <div key={key} style={{ position: 'relative', display: 'inline-block' }}>
            <select
              className="filter-dropdown"
              value={activeFilters[key]}
              onChange={(e) => { setActiveFilters(prev => ({ ...prev, [key]: e.target.value })); setPage(1) }}
              style={{ appearance: 'none', paddingRight: '1.5rem', cursor: 'pointer' }}
            >
              {options.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <span style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.6rem', pointerEvents: 'none', color: activeFilters[key] !== options[0] ? '#000' : 'var(--gray)' }}>▾</span>
          </div>
        ))}
        {Object.values(activeFilters).some(v => !v.startsWith('All')) && (
          <button
            className="filter-dropdown"
            style={{ color: 'var(--gray)', borderColor: 'rgba(255,255,255,0.05)' }}
            onClick={() => setActiveFilters({ make: 'All Makes', type: 'All Types', provider: 'All Providers' })}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Car grid */}
      <div className="cars-listing">
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0', color: 'var(--gray)' }}>
            No vehicles match your filters.
          </div>
        ) : (
          paginated.map((car) => (
            <div key={car.id} className="car-listing-card" onClick={() => setSelectedCar(car)}>
              <div className="car-listing-img">
                <img src={car.image} alt={car.name} loading="lazy" />
                <div className="car-listing-tags">
                  {car.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="car-listing-body">
                <div>
                  <div className="car-listing-name">{car.name}</div>
                  <div className="car-listing-offer">Last Offer &rsaquo;</div>
                </div>
                <div className="car-listing-price">
                  <div className="from">From</div>
                  <div className="price">${car.priceDay.toLocaleString()}/day</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filtered.length / CARS_PER_PAGE) }, (_, i) => (
          <button
            key={i}
            className={`page-btn${page === i + 1 ? ' active' : ''}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {hasMore && (
          <button className="page-btn" onClick={() => setPage(p => p + 1)}>›</button>
        )}
      </div>

      {selectedCar && (
        <ReservationModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  )
}

import { cars } from '../data/cars'
import { Link } from 'react-router-dom'

export default function ChooseYourRide({ onBook }) {
  return (
    <section className="section-choose">
      <div className="header-row" style={{ maxWidth: 1200, margin: '0 auto 2.5rem', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p className="section-label">Our Fleet</p>
          <h2 className="section-title">Choose Your Ride</h2>
        </div>
        <Link to="/cars">
          <button className="pill-btn outline">View All →</button>
        </Link>
      </div>

      <div className="cars-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        {cars.slice(0, 4).map((car) => (
          <div key={car.id} className="car-tile" onClick={() => onBook(car)}>
            <img src={car.image} alt={car.name} loading="lazy" />
            <div className="car-tile-overlay" />
            <button className="pill-btn dark book-btn-tile" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
              Reserve →
            </button>
            <div className="car-tile-info">
              <div>
                <div className="car-tile-tags">
                  {car.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="car-tile-name">{car.name}</div>
                <div className="car-tile-brand">{car.brand}</div>
              </div>
              <div className="car-tile-price">
                <div className="amount">${car.priceDay.toLocaleString()}</div>
                <div className="per">/ day</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

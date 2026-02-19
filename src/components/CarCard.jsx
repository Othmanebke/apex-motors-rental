function CarCard({ car }) {
  const handleReserve = () => {
    alert(`Réservation pour : ${car.brand} ${car.name}\nPrix : ${car.price}/jour\n\nNotre équipe vous contactera sous 24h.`)
  }

  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={`${car.brand} ${car.name}`} loading="lazy" />
        {car.badge && <div className="car-badge">{car.badge}</div>}
      </div>
      <div className="car-content">
        <div className="car-brand">{car.brand}</div>
        <h3 className="car-name">{car.name}</h3>

        <div className="car-specs">
          {car.specs.map((spec, index) => (
            <div className="spec" key={index}>
              <div className="spec-icon">{spec.icon}</div>
              <div className="spec-value">{spec.value}</div>
              <div className="spec-label">{spec.label}</div>
            </div>
          ))}
        </div>

        <div className="car-price">
          <div>
            <div className="price-amount">{car.price}</div>
            <div className="price-period">par jour</div>
          </div>
        </div>

        <button className="car-btn" onClick={handleReserve}>
          Réserver Maintenant
        </button>
      </div>
    </div>
  )
}

export default CarCard

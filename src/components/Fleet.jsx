import CarCard from './CarCard'

function Fleet({ cars }) {
  return (
    <section className="fleet" id="fleet">
      <div className="section-header">
        <div className="section-subtitle">Notre Flotte</div>
        <h2 className="section-title">Véhicules Premium</h2>
      </div>

      {cars.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--silver)', fontSize: '1.2rem' }}>
          Aucun véhicule ne correspond à vos critères.
        </p>
      ) : (
        <div className="fleet-grid">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Fleet

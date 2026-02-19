const TILES = [
  {
    id: 1,
    tall: true,
    label: 'Exclusive Models',
    img: 'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?q=80&w=2074&auto=format&fit=crop',
    alt: 'Dark luxury car',
  },
  {
    id: 2,
    tall: false,
    label: 'Premium Interiors',
    img: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?q=80&w=2074&auto=format&fit=crop',
    alt: 'Steering wheel',
  },
  {
    id: 3,
    tall: false,
    label: 'Track Experience',
    img: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2080&auto=format&fit=crop',
    alt: 'Lamborghini on track',
  },
]

export default function PremiumService() {
  return (
    <section className="section-premium">
      <div className="premium-header">
        <div>
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Premium service,<br />zero hassle</h2>
        </div>
        <button className="pill-btn outline">Explore All Services →</button>
      </div>

      <div className="premium-mosaic">
        {TILES.map((tile) => (
          <div key={tile.id} className={`p-tile${tile.tall ? ' tall' : ' short'}`}>
            <img src={tile.img} alt={tile.alt} loading="lazy" />
            <div className="p-tile-overlay" />
            <div className="p-tile-label">{tile.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

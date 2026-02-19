const TILES = [
  {
    id: 1,
    tall: true,
    label: 'Modèles exclusifs',
    img: 'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?q=80&w=2074&auto=format&fit=crop',
    alt: 'Voiture de luxe',
  },
  {
    id: 2,
    tall: false,
    label: 'Intérieurs premium',
    img: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?q=80&w=2074&auto=format&fit=crop',
    alt: 'Volant',
  },
  {
    id: 3,
    tall: false,
    label: 'Expérience circuit',
    img: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2080&auto=format&fit=crop',
    alt: 'Lamborghini sur circuit',
  },
]

export default function PremiumService() {
  return (
    <section className="section-premium">
      <div className="premium-header">
        <div>
          <p className="section-label">Pourquoi nous choisir</p>
          <h2 className="section-title">Service premium,<br />zéro complication</h2>
        </div>
        <button className="pill-btn outline">Découvrir nos services →</button>
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

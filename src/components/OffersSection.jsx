import { Link } from 'react-router-dom'

const OFFERS = [
  {
    id: 'weekend',
    icon: '🏁',
    label: 'Forfait Week-end',
    duration: '2 jours',
    discount: '-10%',
    desc: 'Partez dès le vendredi soir, retour le lundi matin. Idéal pour une escapade sportive.',
    perks: ['Kilométrage illimité', 'Assurance incluse', 'Livraison gratuite'],
    color: 'var(--racing-red)',
  },
  {
    id: 'semaine',
    icon: '🗓️',
    label: 'Forfait Semaine',
    duration: '7 jours',
    discount: '-20%',
    desc: "Une semaine complète pour explorer la France ou l'Europe au volant d'un véhicule premium.",
    perks: ['Kilométrage illimité', 'Assurance tous risques', 'Livraison + chauffeur 1 trajet'],
    color: '#d4af37',
    featured: true,
  },
  {
    id: 'mois',
    icon: '🌍',
    label: 'Forfait Mensuel',
    duration: '30 jours',
    discount: '-35%',
    desc: "Pour les longues missions, voyages ou simplement profiter d'un véhicule haut de gamme au quotidien.",
    perks: ['Kilométrage illimité', 'Assurance tous risques', 'Chauffeur 3 trajets', 'GPS & Wi-Fi offerts'],
    color: '#5cb85c',
  },
]

export default function OffersSection() {
  return (
    <section className="offers-section" id="offers">
      <div className="section-eyebrow">Nos forfaits</div>
      <h2 className="section-title">Des offres taillées<br /><em>pour chaque besoin</em></h2>
      <p className="section-sub">Plus vous louez longtemps, plus vous économisez. Nos tarifs préférentiels s'adaptent à votre rythme.</p>

      <div className="offers-grid">
        {OFFERS.map(offer => (
          <div key={offer.id} className={`offer-card ${offer.featured ? 'offer-card--featured' : ''}`}>
            {offer.featured && <div className="offer-card__ribbon">Meilleure offre</div>}
            <div className="offer-card__header" style={{ '--offer-color': offer.color }}>
              <span className="offer-card__icon">{offer.icon}</span>
              <div>
                <div className="offer-card__label">{offer.label}</div>
                <div className="offer-card__duration">{offer.duration}</div>
              </div>
              <div className="offer-card__discount">{offer.discount}</div>
            </div>
            <p className="offer-card__desc">{offer.desc}</p>
            <ul className="offer-card__perks">
              {offer.perks.map(p => (
                <li key={p}><span className="offer-perk-check">✓</span> {p}</li>
              ))}
            </ul>
            <Link to="/cars" className="offer-card__cta">
              Réserver avec ce forfait →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const IconWeekend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
)
const IconWeek = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="15" x2="16" y2="15"/>
  </svg>
)
const IconMonth = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    <polyline points="21 3 21 9 15 9"/>
  </svg>
)

const OFFERS = [
  {
    id: 'weekend',
    Icon: IconWeekend,
    label: 'Forfait Week-end',
    duration: '2 jours',
    discount: '10',
    desc: 'Partez dès le vendredi soir, retour le lundi matin. Idéal pour une escapade sportive.',
    perks: ['Kilométrage illimité', 'Assurance incluse', 'Livraison gratuite'],
    color: 'var(--racing-red)',
  },
  {
    id: 'semaine',
    Icon: IconWeek,
    label: 'Forfait Semaine',
    duration: '7 jours',
    discount: '20',
    desc: "Une semaine complète pour explorer la France ou l'Europe au volant d'un véhicule premium.",
    perks: ['Kilométrage illimité', 'Assurance tous risques', 'Livraison + chauffeur 1 trajet'],
    color: '#c9a227',
    featured: true,
  },
  {
    id: 'mois',
    Icon: IconMonth,
    label: 'Forfait Mensuel',
    duration: '30 jours',
    discount: '35',
    desc: "Pour les longues missions ou simplement profiter d'un véhicule haut de gamme au quotidien.",
    perks: ['Kilométrage illimité', 'Assurance tous risques', 'Chauffeur 3 trajets', 'GPS & Wi-Fi offerts'],
    color: '#4a9d6f',
  },
]

export default function OffersSection() {
  const { user, setForfait } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  return (
    <section className="offers-section" id="offers">
      <div className="section-label">Nos forfaits</div>
      <h2 className="section-title">Des offres taillées<br /><em>pour chaque besoin</em></h2>
      <p className="offers-section__sub">Plus vous louez longtemps, plus vous économisez — des tarifs préférentiels adaptés à votre rythme.</p>

      <div className="offers-grid">
        {OFFERS.map(offer => (
          <div
            key={offer.id}
            className={`offer-card ${offer.featured ? 'offer-card--featured' : ''}`}
            style={{ '--offer-color': offer.color }}
          >
            {offer.featured && <div className="offer-card__ribbon">Meilleure offre</div>}

            <div className="offer-card__header">
              <span className="offer-card__icon"><offer.Icon /></span>
              <div>
                <div className="offer-card__label">{offer.label}</div>
                <div className="offer-card__duration">{offer.duration}</div>
              </div>
            </div>

            <div className="offer-card__discount">
              <sup>-</sup>{offer.discount}<sup>%</sup>
            </div>

            <p className="offer-card__desc">{offer.desc}</p>

            <ul className="offer-card__perks">
              {offer.perks.map(p => (
                <li key={p} className="offer-perk-check">{p}</li>
              ))}
            </ul>

            <button
              className={`offer-card__cta${user?.forfait === offer.id ? ' offer-card__cta--active' : ''}`}
              onClick={() => {
                if (user) {
                  setForfait(offer.id)
                  showToast(`Forfait ${offer.label} activé ! 🎉`, 'success')
                } else {
                  navigate('/register')
                }
              }}
            >
              {user?.forfait === offer.id ? '✓ Forfait actif' : user ? 'Activer ce forfait' : 'S’inscrire pour profiter'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

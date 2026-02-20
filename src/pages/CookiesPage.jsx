import { Link } from 'react-router-dom'

const COOKIE_TYPES = [
  {
    type: 'Cookies essentiels',
    required: true,
    desc: 'Indispensables au fonctionnement du site. Ils permettent la navigation, la gestion de session et la sécurité. Ils ne peuvent pas être désactivés.',
    examples: ['Session utilisateur', 'Token d\'authentification', 'Préférences de langue'],
  },
  {
    type: 'Cookies fonctionnels',
    required: false,
    desc: 'Permettent de mémoriser vos préférences (véhicules favoris, filtres) pour améliorer votre expérience entre les visites.',
    examples: ['Favoris (ocarsWishlist)', 'Historique de réservations (ocarsHistory)', 'Dernières recherches'],
  },
  {
    type: 'Cookies analytiques',
    required: false,
    desc: 'Nous aident à comprendre comment les visiteurs utilisent le site, en collectant des données anonymisées. Aucun cookie tiers de tracking n\'est utilisé.',
    examples: ['Pages visitées (anonymisé)', 'Durée de session (anonymisé)'],
  },
]

export default function CookiesPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <div className="legal-page__back">
          <Link to="/">← Retour à l'accueil</Link>
        </div>
        <h1 className="legal-page__title">Politique de Cookies</h1>
        <p className="legal-page__date">Dernière mise à jour : 20 février 2026</p>

        <div className="legal-page__body">
          <div className="legal-section">
            <h2 className="legal-section__title">Qu'est-ce qu'un cookie ?</h2>
            <p className="legal-section__text">
              Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet au site de mémoriser vos préférences et d'améliorer votre expérience de navigation. Les cookies ne contiennent aucune information permettant de vous identifier directement.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Les cookies que nous utilisons</h2>
            <div className="cookie-table">
              {COOKIE_TYPES.map((c, i) => (
                <div key={i} className="cookie-row">
                  <div className="cookie-row__head">
                    <span className="cookie-row__type">{c.type}</span>
                    {c.required
                      ? <span className="cookie-row__badge cookie-row__badge--required">Requis</span>
                      : <span className="cookie-row__badge">Optionnel</span>}
                  </div>
                  <p className="cookie-row__desc">{c.desc}</p>
                  <ul className="cookie-row__examples">
                    {c.examples.map((ex, j) => <li key={j}>{ex}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Comment gérer vos cookies ?</h2>
            <p className="legal-section__text">
              Vous pouvez à tout moment modifier les paramètres de votre navigateur pour accepter ou refuser les cookies. Notez que le refus de certains cookies peut altérer le fonctionnement du site. Pour plus d'informations, consultez l'aide de votre navigateur (Chrome, Firefox, Safari, Edge).
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Durée de conservation</h2>
            <p className="legal-section__text">
              Les cookies fonctionnels sont conservés pour une durée maximale de 12 mois. Les cookies de session sont supprimés à la fermeture du navigateur.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Contact</h2>
            <p className="legal-section__text">
              Pour toute question relative à notre politique cookies, contactez-nous à <a href="mailto:rgpd@ocars.fr">rgpd@ocars.fr</a>.
            </p>
          </div>
        </div>

        <div className="legal-page__links">
          <Link to="/cgu">CGU</Link>
          <span>·</span>
          <Link to="/mentions-legales">Mentions légales</Link>
        </div>
      </div>
    </div>
  )
}

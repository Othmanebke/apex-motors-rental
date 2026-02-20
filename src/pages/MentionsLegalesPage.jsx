import { Link } from 'react-router-dom'

export default function MentionsLegalesPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <div className="legal-page__back">
          <Link to="/">← Retour à l'accueil</Link>
        </div>
        <h1 className="legal-page__title">Mentions Légales</h1>
        <p className="legal-page__date">Dernière mise à jour : 20 février 2026</p>

        <div className="legal-page__body">
          <div className="legal-section">
            <h2 className="legal-section__title">Éditeur du site</h2>
            <p className="legal-section__text">
              <strong>O'cars SAS</strong><br />
              12 avenue des Champs-Élysées, 75008 Paris<br />
              RCS Paris B 123 456 789<br />
              Capital social : 50 000 €<br />
              TVA intracommunautaire : FR 12 345678901<br />
              Téléphone : +33 1 42 00 00 00<br />
              Email : contact@ocars.fr
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Directeur de la publication</h2>
            <p className="legal-section__text">
              M. Alexandre Moreau, Président d'O'cars SAS.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Hébergement</h2>
            <p className="legal-section__text">
              Ce site est hébergé par Vercel Inc.<br />
              340 Pine Street, Suite 2600, San Francisco, CA 94104, États-Unis.<br />
              <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a>
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Données personnelles (RGPD)</h2>
            <p className="legal-section__text">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : <a href="mailto:rgpd@ocars.fr">rgpd@ocars.fr</a>. Les données collectées sont utilisées exclusivement pour la gestion des réservations et ne sont jamais cédées à des tiers.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Cookies</h2>
            <p className="legal-section__text">
              Ce site utilise des cookies fonctionnels pour améliorer votre expérience de navigation. Aucun cookie publicitaire n'est utilisé. <Link to="/cookies">En savoir plus sur notre politique cookies.</Link>
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Propriété intellectuelle</h2>
            <p className="legal-section__text">
              L'ensemble des éléments constitutifs du site (design, textes, visuels, code) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable écrite d'O'cars.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="legal-section__title">Limitation de responsabilité</h2>
            <p className="legal-section__text">
              O'cars s'efforce de maintenir des informations exactes et à jour mais ne peut garantir l'exactitude ou l'exhaustivité des informations diffusées. La société décline toute responsabilité en cas de dommage résultant de l'utilisation du site.
            </p>
          </div>
        </div>

        <div className="legal-page__links">
          <Link to="/cgu">CGU</Link>
          <span>·</span>
          <Link to="/cookies">Politique cookies</Link>
        </div>
      </div>
    </div>
  )
}

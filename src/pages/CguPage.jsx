import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Article 1 — Objet',
    text: `Les présentes conditions générales d'utilisation (CGU) régissent l'accès et l'utilisation du site O'cars, service de location de véhicules premium. En utilisant ce site, vous acceptez sans réserve les présentes CGU.`,
  },
  {
    title: 'Article 2 — Accès au service',
    text: `Le service est accessible 24h/24 et 7j/7, sous réserve des opérations de maintenance. O'cars se réserve le droit de suspendre l'accès sans préavis pour des raisons techniques ou de sécurité.`,
  },
  {
    title: 'Article 3 — Création de compte',
    text: `Pour réserver un véhicule, vous devez créer un compte en fournissant des informations exactes et à jour. Vous êtes responsable de la confidentialité de vos identifiants. Tout accès avec vos identifiants est réputé effectué par vous.`,
  },
  {
    title: 'Article 4 — Réservations',
    text: `Toute réservation est soumise à validation par notre équipe. La confirmation vous est adressée par email dans un délai de 30 minutes. O'cars se réserve le droit de refuser toute réservation sans justification.`,
  },
  {
    title: 'Article 5 — Conditions financières',
    text: `Les tarifs sont indiqués en euros TTC. Le paiement s'effectue en ligne au moment de la réservation. En cas d'annulation plus de 72h avant la prise en charge, un remboursement intégral est effectué. En deçà, des frais d'annulation peuvent s'appliquer.`,
  },
  {
    title: 'Article 6 — Responsabilité du locataire',
    text: `Le locataire s'engage à restituer le véhicule dans l'état dans lequel il l'a réceptionné. Tout dommage non constaté à la prise en charge sera facturé. Le locataire doit être titulaire d'un permis de conduire valide depuis plus de 2 ans.`,
  },
  {
    title: 'Article 7 — Propriété intellectuelle',
    text: `L'ensemble du contenu de ce site (textes, images, logos, SVG) est la propriété exclusive d'O'cars. Toute reproduction sans autorisation écrite est interdite.`,
  },
  {
    title: 'Article 8 — Droit applicable',
    text: `Les présentes CGU sont régies par le droit français. Tout litige sera soumis à la compétence exclusive des tribunaux de Paris.`,
  },
]

export default function CguPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <div className="legal-page__back">
          <Link to="/">← Retour à l'accueil</Link>
        </div>
        <h1 className="legal-page__title">Conditions Générales d'Utilisation</h1>
        <p className="legal-page__date">Dernière mise à jour : 20 février 2026</p>

        <div className="legal-page__body">
          {sections.map((s, i) => (
            <div key={i} className="legal-section">
              <h2 className="legal-section__title">{s.title}</h2>
              <p className="legal-section__text">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="legal-page__links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <span>·</span>
          <Link to="/cookies">Politique cookies</Link>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

const FAQS = [
  {
    q: 'Quels documents sont nécessaires pour louer un véhicule ?',
    a: 'Il vous faut un permis de conduire valide (obtenu depuis au moins 2 ans), une pièce d’identité en cours de validité (carte nationale ou passeport) et une carte bancaire à votre nom pour le prélèvement de la caution.',
  },
  {
    q: 'Comment fonctionne la caution ?',
    a: 'Une empreinte bancaire (sans débit) est prise à la signature du contrat. Son montant varie selon le véhicule (de 300 € pour une citadine à plusieurs milliers pour un véhicule de luxe). Elle est automatiquement libérée après retour du véhicule sans dommage.',
  },
  {
    q: 'L’assurance est-elle incluse dans le prix ?',
    a: 'Oui, une assurance responsabilité civile de base est systématiquement incluse. Nous proposons en option une assurance tous risques (collision, vol, dommages) pour rouler l’esprit tranquille. Certaines cartes bancaires premium couvrent également les sinistres — renseignez-vous auprès de votre banque.',
  },
  {
    q: 'Puis-je ajouter un conducteur supplémentaire ?',
    a: 'Oui, lors de la réservation ou à la prise en charge. Le conducteur additionnel doit présenter son permis valide et satisfaire aux mêmes conditions d’âge. Des frais journaliers s’appliquent selon la formule choisie.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section-faq">
      <div className="faq-container">
        <div className="faq-header">
          <p className="section-label">Vous avez des questions ?</p>
          <h2 className="section-title">Questions fréquemment posées</h2>
        </div>
        {FAQS.map((item, i) => (
          <div key={i} className={`faq-item${open === i ? ' faq-open' : ''}`}>
            <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              <span>{item.q}</span>
              <span className={`faq-icon${open === i ? ' open' : ''}`}>+</span>
            </button>
            <div className={`faq-answer${open === i ? ' open' : ''}`}>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

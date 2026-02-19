import { useState } from 'react'

const TESTIMONIALS = [
  {
    id: 1,
    stars: 5,
    text: 'Service impeccable du début à la fin. La Lamborghini a été livrée propre et avec le plein. Je recommande à 100\u00a0% pour toute occasion spéciale.',
    name: 'Thomas Marchand',
    title: 'Chef d\'entreprise',
    emoji: '👨‍💼',
  },
  {
    id: 2,
    stars: 5,
    text: 'J’ai loué une Porsche 911 pour un week-end. Véhicule en parfait état, équipe très professionnelle. Réservation en ligne super fluide. Je reviendrai !',
    name: 'Camille Fontaine',
    title: 'Architecte & passionnée auto',
    emoji: '👩‍💻',
  },
  {
    id: 3,
    stars: 5,
    text: 'La meilleure agence de location de voitures de luxe que j’ai essayée. Transparence totale sur les tarifs, zéro mauvaise surprise. La McLaren était sensationnelle.',
    name: 'Karim El Amrani',
    title: 'Réalisateur',
    emoji: '🎬',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="section-testimonials">
      <div className="testimonials-header">
        <p className="section-label">Ce que disent nos clients</p>
          <h2 className="section-title">Avis réels,<br />roulez en confiance</h2>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="testimonial-card">
            <div className="stars">{'★'.repeat(t.stars)}</div>
            <p className="testimonial-text">« {t.text} »</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.emoji}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-title">{t.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="testimonials-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`dot${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  )
}

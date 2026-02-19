import { useState } from 'react'

const TESTIMONIALS = [
  {
    id: 1,
    stars: 5,
    text: 'Absolutely phenomenal experience. The Lamborghini Huracán was delivered right to my hotel, spotlessly clean and fueled up. Will definitely rent again for my next LA trip.',
    name: 'James Whitfield',
    title: 'CEO, Whitfield Capital',
    emoji: '👨‍💼',
  },
  {
    id: 2,
    stars: 5,
    text: 'I rented the Porsche 911 GT3 for a weekend track day. The car was in immaculate condition and the team handled everything perfectly. Premium service at every step.',
    name: 'Sarah Chen',
    title: 'Architect & Car Enthusiast',
    emoji: '👩‍💻',
  },
  {
    id: 3,
    stars: 5,
    text: 'Best luxury car rental in Los Angeles, no question. The McLaren 720S was absolutely thrilling. The booking process was seamless and the staff incredibly professional.',
    name: 'Marcus Deleon',
    title: 'Film Producer',
    emoji: '🎬',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="section-testimonials">
      <div className="testimonials-header">
        <p className="section-label">What Clients Say</p>
        <h2 className="section-title">Real Testimonials,<br />Ride with confidence</h2>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="testimonial-card">
            <div className="stars">{'★'.repeat(t.stars)}</div>
            <p className="testimonial-text">"{t.text}"</p>
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

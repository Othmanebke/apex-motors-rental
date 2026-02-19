import { useState } from 'react'

const FAQS = [
  {
    q: 'What documents do I need to rent a car?',
    a: 'You will need a valid driver\'s license (held for at least 3 years), a government-issued ID or passport, and a major credit card in your name for the security deposit.',
  },
  {
    q: 'What is your age requirement?',
    a: 'Drivers must be at least 25 years old. For vehicles above $2,000/day, a minimum age of 28 applies. All drivers must hold a valid license.',
  },
  {
    q: 'Can I add an additional driver?',
    a: 'Yes, additional drivers can be added during booking or at pickup. Each additional driver must meet the same age and license requirements and will be charged a nominal daily fee.',
  },
  {
    q: 'What happens if I return the car late?',
    a: 'Late returns are charged at the daily rate pro-rated hourly. We recommend contacting our team as soon as possible if you anticipate a delay, as we may need the vehicle for another client.',
  },
  {
    q: 'Is insurance included in the rental price?',
    a: 'A basic third-party liability insurance is included. We strongly recommend upgrading to our Full Coverage option for complete peace of mind, covering collision, theft, and damage.',
  },
  {
    q: 'How does the home delivery service work?',
    a: 'Our team delivers the vehicle to your specified address within 90 minutes of booking confirmation. We cover deliveries within 50 miles of Los Angeles. A concierge will hand over the keys and walk you through the car.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section-faq">
      <div className="faq-container">
        <div className="faq-header">
          <p className="section-label">Got Questions?</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        {FAQS.map((item, i) => (
          <div key={i} className="faq-item">
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

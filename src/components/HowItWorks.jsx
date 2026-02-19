const STEPS = [
  {
    num: '01',
    title: 'Choose Your Vehicle',
    desc: 'Browse our fleet of premium sports cars and supercars. Filter by brand, type, or budget to find your perfect match.',
  },
  {
    num: '02',
    title: 'Pick Your Dates',
    desc: 'Select your rental period using our real-time calendar. Check availability and get an instant price calculation.',
  },
  {
    num: '03',
    title: 'Confirm & Pay',
    desc: 'Secure your booking with a simple online payment. We accept all major cards and digital wallets.',
  },
  {
    num: '04',
    title: 'Get It Delivered',
    desc: 'Your car arrives at your door within 90 minutes, fully fueled and ready to drive. Enjoy the ride.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-steps">
      <div className="steps-header">
        <p className="section-label">Simple Process</p>
        <h2 className="section-title">Get Rolling in 4 Steps</h2>
      </div>

      <div className="steps-layout">
        <div className="steps-image">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
            alt="McLaren"
          />
        </div>
        <div className="steps-list">
          {STEPS.map((s) => (
            <div key={s.num} className="step-item">
              <div className="step-num">{s.num}</div>
              <div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

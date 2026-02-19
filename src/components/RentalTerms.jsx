export default function RentalTerms() {
  const terms = [
    { label: 'Minimum Age', value: '25 years' },
    { label: 'License', value: 'Valid since 3+ yrs' },
    { label: 'Deposit', value: '$2,000' },
    { label: 'Fuel Policy', value: 'Full-to-Full' },
    { label: 'Mileage', value: '300 mi/day' },
    { label: 'Insurance', value: 'Full coverage' },
  ]

  return (
    <section className="section-terms" id="terms">
      <div className="terms-grid">
        <div className="terms-left">
          <p className="section-label">Before You Go</p>
          <h2 className="terms-title">Rental Terms</h2>
          <p>
            We want your experience to be seamless from start to finish.
            Please review our rental conditions carefully before booking your vehicle.
            Our team is available 24/7 to answer any questions.
          </p>
          <button className="pill-btn outline">Read Full Terms →</button>
        </div>

        <div className="terms-card">
          <div className="driver-head">
            <div
              className="driver-avatar"
              style={{ background: 'linear-gradient(135deg,#333,#1a1a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              👤
            </div>
            <div>
              <div className="driver-name">Standard Driver Profile</div>
              <div className="driver-role">Requirements overview</div>
            </div>
          </div>
          <div className="terms-items">
            {terms.map((t) => (
              <div className="term-item" key={t.label}>
                <div className="ti-label">{t.label}</div>
                <div className="ti-value">{t.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <section className="section-cta">
      <div className="cta-bg">
        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop"
          alt="Lamborghini"
        />
      </div>
      <div className="cta-content">
        <div className="cta-icon">🚀</div>
        <h2 className="cta-title">
          Book your premium car<br />
          and have it delivered<br />
          in 90 minutes
        </h2>
        <Link to="/cars">
          <button className="pill-btn white" style={{ fontSize: '0.9rem' }}>
            Reserve Now →
          </button>
        </Link>
      </div>
    </section>
  )
}

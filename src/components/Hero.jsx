function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          CONDUISEZ
          <br />
          L&apos;EXCELLENCE
        </h1>
        <p className="hero-subtitle">Location de voitures de sport premium</p>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">Véhicules Premium</div>
          </div>
          <div className="stat">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Service Client</div>
          </div>
          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>

        <div className="hero-cta">
          <a href="#fleet" className="cta-primary">
            Découvrir la Flotte
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

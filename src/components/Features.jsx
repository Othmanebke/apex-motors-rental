import { features } from '../data/features'

function Features() {
  return (
    <section className="features" id="features">
      <div className="section-header">
        <div className="section-subtitle">Services Premium</div>
        <h2 className="section-title">Pourquoi Nous Choisir</h2>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.id}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features

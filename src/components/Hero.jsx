import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2200&auto=format&fit=crop"
          alt="Location voiture premium"
        />
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">Location de voitures premium</p>
        <h1>Conduisez l'<em>Exceptionnel</em><br />Partout en France</h1>
        <p className="hero-sub">
          Du citadin pratique au supercar de rêve — livraison à domicile,
          sans frais cachés, en toute simplicité.
        </p>
        <Link to="/cars">
          <button className="pill-btn white">Réserver maintenant →</button>
        </Link>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2200&auto=format&fit=crop"
          alt="Premium Car"
        />
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">Premium Car Rental</p>
        <h1>Premium Car Rental<br />in Los Angeles</h1>
        <p className="hero-sub">
          Experience the thrill of driving the world's most exclusive vehicles.
          Delivered to your door in 90 minutes.
        </p>
        <Link to="/cars">
          <button className="pill-btn white">Book Now →</button>
        </Link>
      </div>
    </section>
  )
}

import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Luxury</Link>
      <ul className="navbar-links">
        <li><Link to="/cars" className={pathname === '/cars' ? 'active' : ''}>Cars</Link></li>
        <li><Link to="/#terms" className="">Rental Terms</Link></li>
        <li><Link to="/#news" className="">News</Link></li>
      </ul>
      <div className="navbar-right">
        <button className="navbar-icon" title="Search">🔍</button>
        <button className="navbar-icon" title="Favorites">♡</button>
        <button className="navbar-icon" title="Notifications">🔔</button>
        <Link to="/cars">
          <button className="pill-btn white" style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem' }}>
            Book Now
          </button>
        </Link>
      </div>
    </nav>
  )
}

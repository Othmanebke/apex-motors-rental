import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconHeart = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const IconMenu = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        <span className="logo-dot" />
        Luxury
      </Link>

      <ul className="navbar-links">
        <li><Link to="/cars" className={pathname === '/cars' ? 'active' : ''}>Cars</Link></li>
        <li><Link to="/#terms">Rental Terms</Link></li>
        <li><Link to="/#news">News</Link></li>
      </ul>

      <div className="navbar-right">
        <button className="navbar-icon" title="Search"><IconSearch /></button>
        <button className="navbar-icon" title="Favorites"><IconHeart /></button>
        <button className="navbar-icon navbar-icon--menu" title="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          <IconMenu />
        </button>
        <Link to="/cars">
          <button className="pill-btn red-btn">Book Now</button>
        </Link>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/cars" onClick={() => setMenuOpen(false)}>Cars</Link>
          <a href="/#terms" onClick={() => setMenuOpen(false)}>Rental Terms</a>
          <a href="/#news" onClick={() => setMenuOpen(false)}>News</a>
        </div>
      )}
    </nav>
  )
}

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

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
const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconChevron = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)
const IconCar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V9l2.5-5h11L17 9v6a2 2 0 0 1-2 2h-2"/>
    <circle cx="7.5" cy="17.5" r="2.5"/>
    <circle cx="14.5" cy="17.5" r="2.5"/>
  </svg>
)
const IconTag = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
)
const IconBooking = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="14" x2="16" y2="14"/>
  </svg>
)

function getWishlistCount() {
  try { return JSON.parse(localStorage.getItem('apexWishlist') || '[]').length } catch { return 0 }
}

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [favCount, setFavCount] = useState(getWishlistCount)
  const [logeOpen, setLogeOpen] = useState(false)
  const searchRef = useRef(null)
  const logeRef = useRef(null)
  const initials = user ? `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase() : ''

  useEffect(() => {
    const handler = (e) => {
      if (logeRef.current && !logeRef.current.contains(e.target)) setLogeOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Sync badge quand le localStorage change (même onglet ou autre page)
  useEffect(() => {
    const sync = () => setFavCount(getWishlistCount())
    window.addEventListener('storage', sync)
    // Polling léger pour détecter les changements dans le même onglet
    const id = setInterval(sync, 800)
    return () => { window.removeEventListener('storage', sync); clearInterval(id) }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    navigate(`/cars?q=${encodeURIComponent(searchQuery.trim())}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        <span className="logo-dot" />
        Luxury
      </Link>

      <ul className="navbar-links">
        <li><Link to="/" className={pathname === '/' ? 'active' : ''}>Accueil</Link></li>
        <li className="navbar-loge" ref={logeRef}>
          <button
            className={`navbar-loge__trigger${logeOpen ? ' open' : ''}`}
            onClick={() => setLogeOpen(v => !v)}
          >
            Explorer
            <span className={`loge-chevron${logeOpen ? ' rotated' : ''}`}><IconChevron /></span>
          </button>
          <div className={`navbar-loge__panel${logeOpen ? ' visible' : ''}`}>
            <Link to="/cars" className="loge-item" onClick={() => setLogeOpen(false)}>
              <span className="loge-item__icon"><IconCar /></span>
              <span>Nos voitures</span>
            </Link>
            <a href="/#offers" className="loge-item" onClick={() => setLogeOpen(false)}>
              <span className="loge-item__icon"><IconTag /></span>
              <span>Forfaits</span>
            </a>
            <Link to="/reservations" className="loge-item" onClick={() => setLogeOpen(false)}>
              <span className="loge-item__icon"><IconBooking /></span>
              <span>Mes réservations</span>
            </Link>
          </div>
        </li>
      </ul>

      <div className="navbar-right">
        {searchOpen ? (
          <form onSubmit={handleSearch} className="navbar-search-form">
            <input
              ref={searchRef}
              type="text"
              className="navbar-search-input"
              placeholder="Rechercher une voiture…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="navbar-icon" title="Rechercher"><IconSearch /></button>
            <button type="button" className="navbar-icon" onClick={() => { setSearchOpen(false); setSearchQuery('') }} title="Fermer">
              <IconClose />
            </button>
          </form>
        ) : (
          <>
            <button className="navbar-icon" title="Rechercher" onClick={() => setSearchOpen(true)}><IconSearch /></button>
            <button
              className="navbar-icon navbar-heart"
              title={favCount > 0 ? `${favCount} coup${favCount > 1 ? 's' : ''} de cœur` : 'Coups de cœur'}
              onClick={() => navigate('/cars?favs=1')}
            >
              <IconHeart />
              {favCount > 0 && <span className="navbar-heart-badge">{favCount}</span>}
            </button>
            <button className="navbar-icon navbar-icon--menu" title="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              <IconMenu />
            </button>
            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="navbar-avatar"
                title={`${user.prenom || ''} ${user.nom || ''} — Mon espace`}
              >
                {initials}
              </Link>
            ) : (
              <Link to="/login" className="pill-btn red-btn" style={{ textDecoration: 'none' }}>Connexion</Link>
            )}
          </>
        )}
      </div>

      {menuOpen && !searchOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/cars" onClick={() => setMenuOpen(false)}>Nos voitures</Link>
          <a href="/#offers" onClick={() => setMenuOpen(false)}>Forfaits</a>
          <Link to="/reservations" onClick={() => setMenuOpen(false)}>Mes réservations</Link>
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMenuOpen(false)} style={{ color: '#c9a227', fontWeight: 600 }}>
                {user.role === 'admin' ? '⚙ Admin' : `👤 ${user.prenom}`}
              </Link>
              <button onClick={() => { logout(); setMenuOpen(false) }} style={{ background: 'none', border: 'none', color: 'var(--racing-red)', fontWeight: 600, cursor: 'pointer', padding: '0', textAlign: 'left', fontSize: '0.9rem' }}>Déconnexion</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{ color: 'var(--racing-red)', fontWeight: 600 }}>Connexion →</Link>
          )}
        </div>
      )}
    </nav>
  )
}

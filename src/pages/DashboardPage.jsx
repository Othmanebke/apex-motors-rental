import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { cars } from '../data/cars'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

/* ─── helpers ─── */
function getHistory() { try { return JSON.parse(localStorage.getItem('apexHistory') || '[]') } catch { return [] } }
function getWishlist() { try { return JSON.parse(localStorage.getItem('apexWishlist') || '[]') } catch { return [] } }
const STATUS_CLS = { confirmed: 'status--confirmed', pending: 'status--pending', cancelled: 'status--cancelled' }
const STATUS_LBL = { confirmed: 'Confirmée', pending: 'En attente', cancelled: 'Annulée' }

const FORFAITS = {
  weekend: { label: 'Week-end', discount: 10, color: 'var(--racing-red)' },
  semaine: { label: 'Semaine',  discount: 20, color: '#c9a227' },
  mois:    { label: 'Mensuel',  discount: 35, color: '#4a9d6f' },
}

const NAV_ITEMS = [
  { id: 'overview',  label: 'Aperçu',       icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'locations', label: 'Mes locations', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { id: 'favoris',   label: 'Favoris',       icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z' },
  { id: 'forfait',   label: 'Mon forfait',   icon: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01' },
  { id: 'profil',    label: 'Profil',        icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
]

function NavIcon({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

/* ═══════════════════════════════════════════
   TAB: APERÇU
═══════════════════════════════════════════ */
function OverviewTab({ user, history, wishlist }) {
  const activeCount = history.filter(r => r.status === 'confirmed').length
  const totalSpent  = history.filter(r => r.status !== 'cancelled').reduce((s, r) => s + (r.total || 0), 0)
  const lastThree   = history.slice(0, 3)
  const forfait     = user.forfait ? FORFAITS[user.forfait] : null

  return (
    <div className="dash-overview">
      <h2 className="dash-section-title">
        Bonjour, <span>{user.prenom}</span> 👋
      </h2>

      {/* Stats */}
      <div className="dash-stats">
        <div className="dash-stat">
          <span className="dash-stat__val">{history.length}</span>
          <span className="dash-stat__lbl">Locations totales</span>
        </div>
        <div className="dash-stat">
          <span className="dash-stat__val">{activeCount}</span>
          <span className="dash-stat__lbl">En cours / confirmées</span>
        </div>
        <div className="dash-stat">
          <span className="dash-stat__val dash-stat__val--red">{totalSpent.toLocaleString('fr-FR')} €</span>
          <span className="dash-stat__lbl">Total dépensé</span>
        </div>
        <div className="dash-stat">
          <span className="dash-stat__val">{wishlist.length}</span>
          <span className="dash-stat__lbl">Favoris</span>
        </div>
      </div>

      {/* Forfait banner */}
      {forfait ? (
        <div className="dash-forfait-banner" style={{ '--fc': forfait.color }}>
          <div className="dash-forfait-banner__left">
            <div className="dash-forfait-banner__badge">Forfait actif</div>
            <div className="dash-forfait-banner__name">{forfait.label}</div>
            <div className="dash-forfait-banner__disc">-{forfait.discount}% sur toutes vos locations</div>
          </div>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01"/>
          </svg>
        </div>
      ) : (
        <div className="dash-no-forfait">
          <div>
            <p className="dash-no-forfait__title">Aucun forfait actif</p>
            <p className="dash-no-forfait__sub">Economisez jusqu'à <strong>35%</strong> en souscrivant à un forfait.</p>
          </div>
          <Link to="/#offers" className="dash-no-forfait__btn">Voir les forfaits</Link>
        </div>
      )}

      {/* Recent reservations */}
      {lastThree.length > 0 && (
        <div>
          <h3 className="dash-sub-title">Dernières locations</h3>
          <div className="dash-recent">
            {lastThree.map(res => {
              const car = cars.find(c => c.id === res.carId)
              return (
                <div key={res.id} className="dash-recent-item">
                  <img src={car?.image} alt={car?.name} className="dash-recent-item__img" />
                  <div className="dash-recent-item__body">
                    <span className="dash-recent-item__name">{car?.name || 'Véhicule'}</span>
                    <span className="dash-recent-item__dates">
                      {format(new Date(res.startDate), 'dd MMM', { locale: fr })} → {format(new Date(res.endDate), 'dd MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  <span className={`res-status ${STATUS_CLS[res.status]}`}>{STATUS_LBL[res.status]}</span>
                  <span className="dash-recent-item__price">{res.total?.toLocaleString('fr-FR')} €</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {history.length === 0 && (
        <div className="dash-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>
          </svg>
          <p>Aucune location pour l'instant.</p>
          <Link to="/cars" className="btn-red" style={{ fontSize: '0.85rem', padding: '0.55rem 1.2rem' }}>Parcourir la flotte</Link>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB: LOCATIONS
═══════════════════════════════════════════ */
function LocationsTab({ history, onCancel }) {
  if (history.length === 0) return (
    <div className="dash-empty">
      <p>Aucune location.</p>
      <Link to="/cars" className="btn-red" style={{ fontSize: '0.85rem', padding: '0.55rem 1.2rem' }}>Réserver un véhicule</Link>
    </div>
  )
  return (
    <div className="dash-locations">
      {history.map(res => {
        const car = cars.find(c => c.id === res.carId)
        return (
          <div key={res.id} className={`dash-loc-card ${res.status === 'cancelled' ? 'dash-loc-card--cancelled' : ''}`}>
            <div className="dash-loc-card__img-wrap">
              <img src={car?.image} alt={car?.name} />
            </div>
            <div className="dash-loc-card__body">
              <div className="dash-loc-card__top">
                <div>
                  <div className="dash-loc-card__name">{car?.name || 'Véhicule inconnu'}</div>
                  <div className="dash-loc-card__brand">{car?.brand} • {car?.category}</div>
                </div>
                <span className={`res-status ${STATUS_CLS[res.status]}`}>{STATUS_LBL[res.status]}</span>
              </div>
              <div className="dash-loc-dates">
                <span>{format(new Date(res.startDate), 'dd MMM yyyy', { locale: fr })}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                <span>{format(new Date(res.endDate), 'dd MMM yyyy', { locale: fr })}</span>
                <span className="dash-loc-days">{res.days}j</span>
              </div>
              <div className="dash-loc-footer">
                <div className="dash-loc-options">{res.options?.map(o => <span key={o} className="res-option-tag">{o}</span>)}</div>
                <div className="dash-loc-total">{res.total?.toLocaleString('fr-FR')} €</div>
              </div>
              {res.status !== 'cancelled' && (
                <button className="res-cancel-btn" style={{ alignSelf: 'flex-start' }} onClick={() => onCancel(res.id)}>
                  Annuler
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB: FAVORIS
═══════════════════════════════════════════ */
function FavorisTab({ wishlist }) {
  const favCars = cars.filter(c => wishlist.includes(c.id))
  if (favCars.length === 0) return (
    <div className="dash-empty">
      <p>Aucun favori sauvegardé.</p>
      <Link to="/cars" className="btn-red" style={{ fontSize: '0.85rem', padding: '0.55rem 1.2rem' }}>Parcourir la flotte</Link>
    </div>
  )
  return (
    <div className="dash-favs">
      {favCars.map(car => (
        <Link to={`/cars/${car.id}`} key={car.id} className="dash-fav-card">
          <img src={car.image} alt={car.name} />
          <div className="dash-fav-card__body">
            <div className="dash-fav-card__name">{car.name}</div>
            <div className="dash-fav-card__brand">{car.brand}</div>
            <div className="dash-fav-card__price">{car.priceDay.toLocaleString('fr-FR')} €/j</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB: FORFAIT
═══════════════════════════════════════════ */
function ForfaitTab({ user }) {
  const { setForfait } = useAuth()
  const { showToast } = useToast()

  const subscribe = (id) => {
    setForfait(id)
    showToast(`Forfait ${FORFAITS[id].label} activé — ${FORFAITS[id].discount}% de réduction !`, 'success')
  }

  return (
    <div className="dash-forfait-tab">
      {user.forfait && (
        <div className="dash-active-forfait" style={{ '--fc': FORFAITS[user.forfait].color }}>
          <div className="dash-active-forfait__badge">Forfait actif</div>
          <h3 className="dash-active-forfait__name">Forfait {FORFAITS[user.forfait].label}</h3>
          <p className="dash-active-forfait__disc">
            Vous bénéficiez de <strong style={{ color: FORFAITS[user.forfait].color }}>-{FORFAITS[user.forfait].discount}%</strong> sur toutes vos locations.
          </p>
          {user.forfaitSince && (
            <p className="dash-active-forfait__since">
              Actif depuis le {format(new Date(user.forfaitSince), 'dd MMMM yyyy', { locale: fr })}
            </p>
          )}
          <button className="dash-active-forfait__change" onClick={() => subscribe(null)}>
            Résilier le forfait
          </button>
        </div>
      )}

      <h3 className="dash-sub-title" style={{ marginBottom: '1rem' }}>
        {user.forfait ? 'Changer de forfait' : 'Choisir un forfait'}
      </h3>
      <div className="dash-forfait-grid">
        {Object.entries(FORFAITS).map(([id, f]) => (
          <div
            key={id}
            className={`dash-forfait-card ${user.forfait === id ? 'dash-forfait-card--active' : ''}`}
            style={{ '--fc': f.color }}
          >
            <div className="dash-forfait-card__discount">-{f.discount}%</div>
            <div className="dash-forfait-card__name">{f.label}</div>
            <div className="dash-forfait-card__desc">
              {id === 'weekend' && 'Idéal pour les escapades courtes de 1 à 2 jours.'}
              {id === 'semaine' && 'Pour les voyages d\'une semaine avec réduction substantielle.'}
              {id === 'mois' && 'Économie maximale pour les locations longue durée.'}
            </div>
            {user.forfait === id
              ? <div className="dash-forfait-card__active-lbl">✓ Votre forfait actuel</div>
              : <button className="dash-forfait-card__btn" onClick={() => subscribe(id)}>Activer ce forfait</button>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB: PROFIL
═══════════════════════════════════════════ */
function ProfilTab({ user }) {
  const { updateUser } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ nom: user.nom, prenom: user.prenom, email: user.email })
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    updateUser({ nom: form.nom, prenom: form.prenom })
    setSaved(true)
    showToast('Profil mis à jour.', 'success')
    setTimeout(() => setSaved(false), 2500)
  }

  const initials = `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase()

  return (
    <div className="dash-profil">
      <div className="dash-profil__avatar-row">
        <div className="dash-profil__avatar">{initials}</div>
        <div>
          <div className="dash-profil__fullname">{user.prenom} {user.nom}</div>
          <div className="dash-profil__email">{user.email}</div>
          <div className="dash-profil__since">Membre depuis {format(new Date(user.createdAt), 'MMMM yyyy', { locale: fr })}</div>
        </div>
      </div>

      <form onSubmit={save} className="dash-profil__form">
        <div className="auth-row">
          <div className="auth-field">
            <label className="auth-label">Prénom</label>
            <input type="text" className="auth-input" value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))} required />
          </div>
          <div className="auth-field">
            <label className="auth-label">Nom</label>
            <input type="text" className="auth-input" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} required />
          </div>
        </div>
        <div className="auth-field">
          <label className="auth-label">Email</label>
          <input type="email" className="auth-input" value={form.email} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--gray)', marginTop: '0.3rem', display: 'block' }}>L'email ne peut pas être modifié.</span>
        </div>
        <button type="submit" className="auth-submit" style={{ maxWidth: 220 }}>
          {saved ? '✓ Sauvegardé' : 'Sauvegarder'}
        </button>
      </form>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [allHistory, setAllHistory] = useState(getHistory)
  const [wishlist] = useState(getWishlist)

  // Filter reservations belonging to this user
  const history = allHistory.filter(r => r.userId === user?.id)

  const cancelRes = (id) => {
    const next = allHistory.map(r => r.id === id ? { ...r, status: 'cancelled' } : r)
    setAllHistory(next)
    localStorage.setItem('apexHistory', JSON.stringify(next))
    showToast('Réservation annulée.', 'info')
  }

  const handleLogout = () => {
    logout()
    showToast('Déconnexion réussie.', 'info')
    navigate('/')
  }

  const initials = `${user?.prenom?.[0] || ''}${user?.nom?.[0] || ''}`.toUpperCase()

  return (
    <div className="dash-page">
      {/* ─── Sidebar ─── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar__top">
          <div className="dash-sidebar__avatar">{initials}</div>
          <div className="dash-sidebar__name">{user?.prenom} {user?.nom}</div>
          <div className="dash-sidebar__email">{user?.email}</div>
        </div>

        <nav className="dash-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`dash-nav__item ${tab === item.id ? 'active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <NavIcon d={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar__footer">
          <Link to="/cars" className="dash-sidebar__link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V9l2.5-5h11L17 9v6a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="14.5" cy="17.5" r="2.5"/>
            </svg>
            Nos véhicules
          </Link>
          <button className="dash-sidebar__logout" onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <main className="dash-main">
        {tab === 'overview'  && <OverviewTab user={user} history={history} wishlist={wishlist} />}
        {tab === 'locations' && <LocationsTab history={history} onCancel={cancelRes} />}
        {tab === 'favoris'   && <FavorisTab wishlist={wishlist} />}
        {tab === 'forfait'   && <ForfaitTab user={user} />}
        {tab === 'profil'    && <ProfilTab user={user} />}
      </main>
    </div>
  )
}

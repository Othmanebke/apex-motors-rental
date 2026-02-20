import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { cars } from '../data/cars'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

function getHistory() { try { return JSON.parse(localStorage.getItem('apexHistory') || '[]') } catch { return [] } }
function getUsers()   { try { return JSON.parse(localStorage.getItem('apexUsers')   || '[]') } catch { return [] } }

const STATUS_CLS = { confirmed: 'status--confirmed', pending: 'status--pending', cancelled: 'status--cancelled' }
const STATUS_LBL = { confirmed: 'Confirmée', pending: 'En attente', cancelled: 'Annulée' }

const NAV_ITEMS = [
  { id: 'overview',   label: 'Tableau de bord', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'bookings',   label: 'Réservations',    icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { id: 'fleet',      label: 'Flotte',          icon: 'M5 17H3a2 2 0 0 1-2-2V9l2.5-5h11L17 9v6a2 2 0 0 1-2 2h-2M7.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM14.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' },
  { id: 'clients',    label: 'Clients',         icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
]

function NavIcon({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

/* ═══════════════════════════════════════════
   TAB: OVERVIEW
═══════════════════════════════════════════ */
function OverviewTab({ history, users }) {
  const totalRevenue = history.filter(r => r.status !== 'cancelled').reduce((s, r) => s + (r.total || 0), 0)
  const confirmed = history.filter(r => r.status === 'confirmed').length
  const cancelled = history.filter(r => r.status === 'cancelled').length
  const recent = history.slice(0, 5)

  return (
    <div>
      <h2 className="dash-section-title">Tableau de bord <span style={{ color: 'var(--racing-red)' }}>Admin</span></h2>

      <div className="admin-kpis">
        <div className="admin-kpi">
          <div className="admin-kpi__val admin-kpi__val--red">{totalRevenue.toLocaleString('fr-FR')} €</div>
          <div className="admin-kpi__lbl">Chiffre d'affaires</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi__val">{history.length}</div>
          <div className="admin-kpi__lbl">Réservations totales</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi__val">{confirmed}</div>
          <div className="admin-kpi__lbl">Confirmées</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi__val">{users.length}</div>
          <div className="admin-kpi__lbl">Clients inscrits</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi__val">{cars.length}</div>
          <div className="admin-kpi__lbl">Véhicules en flotte</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi__val">{cancelled}</div>
          <div className="admin-kpi__lbl">Annulées</div>
        </div>
      </div>

      <h3 className="dash-sub-title">Dernières réservations</h3>
      {recent.length === 0 ? (
        <p style={{ color: 'var(--gray)', fontSize: '0.88rem' }}>Aucune réservation enregistrée.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Véhicule</th><th>Dates</th><th>Durée</th><th>Total</th><th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(res => {
                const car = cars.find(c => c.id === res.carId)
                return (
                  <tr key={res.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img src={car?.image} alt="" style={{ width: 40, height: 28, objectFit: 'cover', borderRadius: 5 }} />
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{car?.name || '—'}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
                      {format(new Date(res.startDate), 'dd MMM', { locale: fr })} → {format(new Date(res.endDate), 'dd MMM yy', { locale: fr })}
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{res.days}j</td>
                    <td style={{ fontWeight: 700, color: 'var(--racing-red)' }}>{res.total?.toLocaleString('fr-FR')} €</td>
                    <td><span className={`res-status ${STATUS_CLS[res.status]}`}>{STATUS_LBL[res.status]}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB: ALL BOOKINGS
═══════════════════════════════════════════ */
function BookingsTab({ history, onCancel }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const displayed = history.filter(r => {
    const car = cars.find(c => c.id === r.carId)
    const matchFilter = filter === 'all' || r.status === filter
    const matchSearch = !search || car?.name.toLowerCase().includes(search.toLowerCase()) || car?.brand.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <h2 className="dash-section-title">Toutes les réservations</h2>
      <div className="admin-filters">
        <input
          type="text"
          className="auth-input"
          style={{ maxWidth: 260, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
          placeholder="Rechercher un véhicule…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['all','confirmed','pending','cancelled'].map(f => (
            <button key={f} className={`res-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'Toutes' : STATUS_LBL[f]}
            </button>
          ))}
        </div>
      </div>
      {displayed.length === 0 ? <p style={{ color: 'var(--gray)', fontSize: '0.88rem', padding: '2rem 0' }}>Aucune réservation.</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Véhicule</th><th>Client</th><th>Dates</th><th>Options</th><th>Total</th><th>Statut</th><th></th></tr>
            </thead>
            <tbody>
              {displayed.map(res => {
                const car = cars.find(c => c.id === res.carId)
                const user = getUsers().find(u => u.id === res.userId)
                return (
                  <tr key={res.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img src={car?.image} alt="" style={{ width: 40, height: 28, objectFit: 'cover', borderRadius: 5 }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{car?.name || '—'}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>{res.days}j</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
                      {user ? `${user.prenom} ${user.nom}` : '—'}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>
                      {format(new Date(res.startDate), 'dd/MM/yy', { locale: fr })} → {format(new Date(res.endDate), 'dd/MM/yy', { locale: fr })}
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>
                      {res.options?.length > 0 ? res.options.join(', ') : '—'}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--racing-red)' }}>{res.total?.toLocaleString('fr-FR')} €</td>
                    <td><span className={`res-status ${STATUS_CLS[res.status]}`}>{STATUS_LBL[res.status]}</span></td>
                    <td>
                      {res.status !== 'cancelled' && (
                        <button style={{ fontSize: '0.72rem', color: 'var(--racing-red)', padding: '0.2rem 0.5rem', border: '1px solid rgba(230,57,70,0.3)', borderRadius: 6 }} onClick={() => onCancel(res.id)}>
                          Annuler
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB: FLEET
═══════════════════════════════════════════ */
function FleetTab({ history }) {
  return (
    <div>
      <h2 className="dash-section-title">Flotte — {cars.length} véhicules</h2>
      <div className="admin-fleet">
        {cars.map(car => {
          const nbResa = history.filter(r => r.carId === car.id && r.status !== 'cancelled').length
          const revenue = history.filter(r => r.carId === car.id && r.status !== 'cancelled').reduce((s, r) => s + (r.total || 0), 0)
          return (
            <div key={car.id} className="admin-fleet-card">
              <img src={car.image} alt={car.name} className="admin-fleet-card__img" />
              <div className="admin-fleet-card__body">
                <div className="admin-fleet-card__name">{car.name}</div>
                <div className="admin-fleet-card__brand">{car.brand} • {car.category}</div>
                <div className="admin-fleet-card__stats">
                  <span>{car.priceDay.toLocaleString('fr-FR')} €/j</span>
                  <span>{nbResa} loc.</span>
                  <span style={{ color: 'var(--racing-red)' }}>{revenue.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
              <Link to={`/cars/${car.id}`} className="admin-fleet-card__link">Voir →</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB: CLIENTS
═══════════════════════════════════════════ */
function ClientsTab({ users, history }) {
  if (users.length === 0) return <p style={{ color: 'var(--gray)', fontSize: '0.88rem', padding: '2rem 0' }}>Aucun client inscrit.</p>
  return (
    <div>
      <h2 className="dash-section-title">{users.length} client{users.length !== 1 ? 's' : ''} inscrits</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Client</th><th>Email</th><th>Forfait</th><th>Locations</th><th>Total dépensé</th><th>Inscrit le</th></tr>
          </thead>
          <tbody>
            {users.map(u => {
              const ures = history.filter(r => r.userId === u.id && r.status !== 'cancelled')
              const total = ures.reduce((s, r) => s + (r.total || 0), 0)
              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                        {(u.prenom?.[0] || '') + (u.nom?.[0] || '')}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{u.prenom} {u.nom}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{u.email}</td>
                  <td>
                    {u.forfait
                      ? <span className="res-status status--confirmed" style={{ fontSize: '0.68rem' }}>{u.forfait}</span>
                      : <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>—</span>
                    }
                  </td>
                  <td style={{ fontSize: '0.82rem' }}>{ures.length}</td>
                  <td style={{ fontWeight: 700, color: 'var(--racing-red)', fontSize: '0.85rem' }}>{total.toLocaleString('fr-FR')} €</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{format(new Date(u.createdAt), 'dd/MM/yyyy')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function AdminPage() {
  const { logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [history, setHistory] = useState(getHistory)
  const users = getUsers()

  const cancelRes = (id) => {
    const next = history.map(r => r.id === id ? { ...r, status: 'cancelled' } : r)
    setHistory(next)
    localStorage.setItem('apexHistory', JSON.stringify(next))
    showToast('Réservation annulée.', 'info')
  }

  const handleLogout = () => {
    logout()
    showToast('Déconnexion.', 'info')
    navigate('/')
  }

  return (
    <div className="dash-page">
      <aside className="dash-sidebar dash-sidebar--admin">
        <div className="dash-sidebar__top">
          <div className="dash-sidebar__avatar dash-sidebar__avatar--admin">A</div>
          <div className="dash-sidebar__name">Administration</div>
          <div className="dash-sidebar__email">admin@apex.fr</div>
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
          <Link to="/" className="dash-sidebar__link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            Site public
          </Link>
          <button className="dash-sidebar__logout" onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="dash-main">
        {tab === 'overview' && <OverviewTab history={history} users={users} />}
        {tab === 'bookings' && <BookingsTab history={history} onCancel={cancelRes} />}
        {tab === 'fleet'    && <FleetTab history={history} />}
        {tab === 'clients'  && <ClientsTab users={users} history={history} />}
      </main>
    </div>
  )
}

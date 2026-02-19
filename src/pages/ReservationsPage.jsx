import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cars } from '../data/cars'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

function getHistory() {
  try { return JSON.parse(localStorage.getItem('apexHistory') || '[]') } catch { return [] }
}

const STATUS_LABEL = { confirmed: 'Confirmée', pending: 'En attente', cancelled: 'Annulée' }
const STATUS_CLS   = { confirmed: 'status--confirmed', pending: 'status--pending', cancelled: 'status--cancelled' }

const IconCal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>
  </svg>
)
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconX = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const TABS = [
  { key: 'all',       label: 'Toutes' },
  { key: 'confirmed', label: 'Confirmées' },
  { key: 'pending',   label: 'En attente' },
  { key: 'cancelled', label: 'Annulées' },
]

export default function ReservationsPage() {
  const [history, setHistory] = useState(getHistory)
  const [tab, setTab] = useState('all')

  useEffect(() => {
    const sync = () => setHistory(getHistory())
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const cancelReservation = (id) => {
    const next = history.map(r => r.id === id ? { ...r, status: 'cancelled' } : r)
    setHistory(next)
    localStorage.setItem('apexHistory', JSON.stringify(next))
  }

  const clearAll = () => {
    if (!window.confirm('Supprimer tout l\'historique ?')) return
    setHistory([])
    localStorage.removeItem('apexHistory')
  }

  const totalSpent = history
    .filter(r => r.status !== 'cancelled')
    .reduce((s, r) => s + (r.total || 0), 0)

  const activeCount = history.filter(r => r.status === 'confirmed').length

  const displayed = tab === 'all' ? history : history.filter(r => r.status === tab)

  return (
    <div className="reservations-page">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div className="res-hero">
        <div className="res-hero__inner">
          <div className="res-hero__left">
            <div className="res-hero__eyebrow">
              <span className="res-hero__dot" />
              Espace personnel
            </div>
            <h1 className="res-hero__title">Mes réservations</h1>
            <p className="res-hero__sub">Retrouvez, suivez et gérez toutes vos locations en un coup d'œil.</p>
          </div>
          <div className="res-stats">
            <div className="res-stat">
              <span className="res-stat__val">{history.length}</span>
              <span className="res-stat__lbl">Réservation{history.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="res-stat res-stat--sep" />
            <div className="res-stat">
              <span className="res-stat__val">{activeCount}</span>
              <span className="res-stat__lbl">Active{activeCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="res-stat res-stat--sep" />
            <div className="res-stat">
              <span className="res-stat__val res-stat__val--red">{totalSpent.toLocaleString('fr-FR')} €</span>
              <span className="res-stat__lbl">Total dépensé</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ──────────────────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="res-tabs">
          {TABS.map(t => {
            const count = t.key === 'all' ? history.length : history.filter(r => r.status === t.key).length
            return (
              <button
                key={t.key}
                className={`res-tab${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
                {count > 0 && <span className="res-tab__count">{count}</span>}
              </button>
            )
          })}
        </div>
      )}

      {/* ── LIST ──────────────────────────────────────────────────── */}
      {history.length === 0 ? (
        <div className="reservations-empty">
          <div className="res-empty-visual">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="15" x2="16" y2="15"/>
            </svg>
          </div>
          <h2>Aucune réservation</h2>
          <p>Vous n'avez pas encore effectué de réservation.<br />Parcourez notre flotte et réservez en quelques clics.</p>
          <Link to="/cars" className="btn-red">Voir les véhicules</Link>
        </div>
      ) : displayed.length === 0 ? (
        <div className="reservations-empty">
          <p>Aucune réservation dans cette catégorie.</p>
        </div>
      ) : (
        <>
          <div className="reservations-list">
            {displayed.map(res => {
              const car = cars.find(c => c.id === res.carId)
              const start = new Date(res.startDate)
              const end   = new Date(res.endDate)
              return (
                <article key={res.id} className={`res-card ${res.status === 'cancelled' ? 'res-card--cancelled' : ''}`}>

                  {/* IMAGE */}
                  <div className="res-card__img-wrap">
                    <img src={car?.image || ''} alt={car?.name || 'Véhicule'} className="res-card__img" />
                    <span className={`res-card__badge ${STATUS_CLS[res.status] || ''}`}>
                      {res.status === 'confirmed' && <IconCheck />}
                      {res.status === 'cancelled' && <IconX />}
                      {STATUS_LABEL[res.status] || res.status}
                    </span>
                  </div>

                  {/* BODY */}
                  <div className="res-card__body">
                    <div className="res-card__top">
                      <div>
                        <div className="res-card__name">{car?.name || 'Véhicule inconnu'}</div>
                        <div className="res-card__brand">{car?.brand} • {car?.category}</div>
                      </div>
                      <div className="res-card__id">#{res.id?.slice(-6).toUpperCase()}</div>
                    </div>

                    {/* TIMELINE */}
                    <div className="res-timeline">
                      <div className="res-timeline__block">
                        <span className="res-timeline__lbl">Début</span>
                        <span className="res-timeline__date">{format(start, 'EEE dd MMM', { locale: fr })}</span>
                        <span className="res-timeline__year">{format(start, 'yyyy')}</span>
                      </div>
                      <div className="res-timeline__arrow">
                        <div className="res-timeline__line" />
                        <span className="res-timeline__days">{res.days}j</span>
                        <div className="res-timeline__line" />
                        <IconArrow />
                      </div>
                      <div className="res-timeline__block">
                        <span className="res-timeline__lbl">Fin</span>
                        <span className="res-timeline__date">{format(end, 'EEE dd MMM', { locale: fr })}</span>
                        <span className="res-timeline__year">{format(end, 'yyyy')}</span>
                      </div>
                    </div>

                    {/* OPTIONS + PRICE */}
                    <div className="res-card__footer">
                      <div className="res-card__options">
                        {res.options?.length > 0
                          ? res.options.map(o => <span key={o} className="res-option-tag">{o}</span>)
                          : <span className="res-option-tag res-option-tag--empty">Aucune option</span>
                        }
                      </div>
                      <div className="res-card__total">{res.total?.toLocaleString('fr-FR')} €</div>
                    </div>

                    {/* ACTIONS */}
                    <div className="res-card__actions">
                      {car && (
                        <Link to={`/cars/${car.id}`} className="res-card__detail-btn">
                          Voir le véhicule
                        </Link>
                      )}
                      {res.status !== 'cancelled' && (
                        <button className="res-cancel-btn" onClick={() => cancelReservation(res.id)}>
                          <IconX /> Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="reservations-footer">
            <span className="res-footer__count">{displayed.length} réservation{displayed.length !== 1 ? 's' : ''} affichée{displayed.length !== 1 ? 's' : ''}</span>
            <button className="res-clear-btn" onClick={clearAll}>
              <IconTrash /> Supprimer l'historique
            </button>
          </div>
        </>
      )}
    </div>
  )
}


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

export default function ReservationsPage() {
  const [history, setHistory] = useState(getHistory)

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

  return (
    <div className="reservations-page">
      <div className="reservations-hero">
        <h1>Mes réservations</h1>
        <p>Retrouvez ici toutes vos locations passées et en cours.</p>
      </div>

      {history.length === 0 ? (
        <div className="reservations-empty">
          <div className="res-empty-icon">📋</div>
          <h3>Aucune réservation</h3>
          <p>Vous n'avez pas encore effectué de réservation.</p>
          <Link to="/cars" className="btn-red">Parcourir les véhicules</Link>
        </div>
      ) : (
        <>
          <div className="reservations-list">
            {history.map(res => {
              const car = cars.find(c => c.id === res.carId)
              return (
                <div key={res.id} className={`res-card ${res.status === 'cancelled' ? 'res-card--cancelled' : ''}`}>
                  <div className="res-card__img">
                    <img src={car?.image || ''} alt={car?.name || 'Véhicule'} />
                  </div>
                  <div className="res-card__body">
                    <div className="res-card__top">
                      <div>
                        <div className="res-card__name">{car?.name || 'Véhicule inconnu'}</div>
                        <div className="res-card__brand">{car?.brand}</div>
                      </div>
                      <span className={`res-status ${STATUS_CLS[res.status] || ''}`}>
                        {STATUS_LABEL[res.status] || res.status}
                      </span>
                    </div>
                    <div className="res-card__meta">
                      <div className="res-meta-item">
                        <span className="res-meta-label">Du</span>
                        <span>{format(new Date(res.startDate), 'dd MMM yyyy', { locale: fr })}</span>
                      </div>
                      <div className="res-meta-sep">→</div>
                      <div className="res-meta-item">
                        <span className="res-meta-label">Au</span>
                        <span>{format(new Date(res.endDate), 'dd MMM yyyy', { locale: fr })}</span>
                      </div>
                      <div className="res-meta-item">
                        <span className="res-meta-label">Durée</span>
                        <span>{res.days} jour{res.days > 1 ? 's' : ''}</span>
                      </div>
                      <div className="res-meta-item res-meta-item--price">
                        <span className="res-meta-label">Total</span>
                        <span className="res-total">{res.total.toLocaleString('fr-FR')} €</span>
                      </div>
                    </div>
                    {res.options?.length > 0 && (
                      <div className="res-card__options">
                        {res.options.map(o => <span key={o} className="res-option-tag">{o}</span>)}
                      </div>
                    )}
                    {res.status !== 'cancelled' && (
                      <button className="res-cancel-btn" onClick={() => cancelReservation(res.id)}>
                        Annuler la réservation
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="reservations-footer">
            <button className="res-clear-btn" onClick={clearAll}>🗑 Supprimer l'historique</button>
          </div>
        </>
      )}
    </div>
  )
}

import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { OPTIONS } from '../data/cars'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { differenceInDays, addMonths, startOfMonth, getDay, getDaysInMonth, format, isBefore, isToday } from 'date-fns'
import { fr } from 'date-fns/locale'

const FORFAIT_DISCOUNTS = { weekend: 10, semaine: 20, mois: 35 }

/* ─── Mini Calendar ─── */
function Calendar({ startDate, endDate, onSelect }) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const days = ['Lu','Ma','Me','Je','Ve','Sa','Di']

  const monthStart = startOfMonth(viewDate)
  const firstDay = (getDay(monthStart) + 6) % 7 // Monday-based
  const totalDays = getDaysInMonth(viewDate)

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)

  const buildDate = (d) => new Date(viewDate.getFullYear(), viewDate.getMonth(), d)

  const getClass = (d) => {
    if (!d) return 'cal-day empty'
    const date = buildDate(d)
    const isPast = isBefore(date, new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    if (isPast) return 'cal-day past'
    const isStart = startDate && format(date, 'yyyy-MM-dd') === format(startDate, 'yyyy-MM-dd')
    const isEnd = endDate && format(date, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')
    const inRange = startDate && endDate && date > startDate && date < endDate
    if (isStart || isEnd) return 'cal-day selected'
    if (inRange) return 'cal-day in-range'
    if (isToday(date)) return 'cal-day today'
    return 'cal-day'
  }

  const handleClick = (d) => {
    if (!d) return
    const date = buildDate(d)
    const today0 = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    if (isBefore(date, today0)) return
    onSelect(date)
  }

  return (
    <div>
      <div className="cal-header">
        <button className="cal-nav" onClick={() => setViewDate(addMonths(viewDate, -1))}>‹</button>
        <span className="cal-month">{format(viewDate, 'MMMM yyyy', { locale: fr })}</span>
        <button className="cal-nav" onClick={() => setViewDate(addMonths(viewDate, 1))}>›</button>
      </div>
      <div className="cal-grid">
        {days.map(d => <div key={d} className="cal-day-label">{d}</div>)}
        {cells.map((d, i) => (
          <button key={i} className={getClass(d)} onClick={() => handleClick(d)}>
            {d || ''}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Modal ─── */
export default function ReservationModal({ car, onClose }) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [pickingEnd, setPickingEnd] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [step, setStep] = useState(1) // 1=dates, 2=options, 3=recap, 4=payment, 5=done
  const [payName, setPayName]       = useState('')
  const [payCard, setPayCard]       = useState('')
  const [payExpiry, setPayExpiry]   = useState('')
  const [payCVV, setPayCVV]         = useState('')
  const [payLoading, setPayLoading] = useState(false)
  const [payError, setPayError]     = useState('')

  const handleDateSelect = useCallback((date) => {
    if (!startDate || pickingEnd) {
      if (!startDate) {
        setStartDate(date)
        setPickingEnd(true)
      } else {
        if (date <= startDate) { setStartDate(date); setEndDate(null) }
        else { setEndDate(date); setPickingEnd(false) }
      }
    } else {
      setStartDate(date); setEndDate(null); setPickingEnd(true)
    }
  }, [startDate, pickingEnd])

  const days = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate)) : 0
  const basePrice = days * car.priceDay
  const optionsTotal = selectedOptions.reduce((sum, id) => {
    const opt = OPTIONS.find(o => o.id === id)
    return sum + (opt ? opt.priceDay * days : 0)
  }, 0)
  const total = basePrice + optionsTotal
  const discountPct = user?.forfait ? (FORFAIT_DISCOUNTS[user.forfait] || 0) : 0
  const discountAmt = Math.round(total * discountPct / 100)
  const discountedTotal = total - discountAmt

  const toggleOption = (id) => {
    setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const handleConfirm = () => {
    // Sauvegarder dans l'historique localStorage
    const reservation = {
      id: `res_${Date.now()}`,
      carId: car.id,
      userId: user?.id || null,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      days,
      total: discountedTotal,
      forfaitUsed: user?.forfait || null,
      discountPct,
      options: selectedOptions.map(id => OPTIONS.find(o => o.id === id)?.label).filter(Boolean),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    try {
      const existing = JSON.parse(localStorage.getItem('ocarsHistory') || '[]')
      localStorage.setItem('ocarsHistory', JSON.stringify([reservation, ...existing]))
    } catch {}
    showToast('Réservation confirmée !', 'success')
    setStep(5)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">
            {step === 1 && 'Sélectionner les dates'}
            {step === 2 && 'Options supplémentaires'}
            {step === 3 && 'Récapitulatif'}
            {step === 4 && 'Paiement sécurisé'}
            {step === 5 && 'Réservation confirmée'}
          </span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Car Preview */}
        <div className="modal-car-preview">
          <img src={car.image} alt={car.name} />
          <div>
            <div className="modal-car-name">{car.name}</div>
            <div className="modal-car-brand">{car.brand}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gray)', marginTop: '0.2rem' }}>
              {car.priceDay.toLocaleString('fr-FR')} €/jour
            </div>
          </div>
        </div>

        {/* ─── STEP 1: Dates + Calendar ─── */}
        {step === 1 && (
          <div className="calendar-section">
            <p className="input-label" style={{ marginBottom: '0.75rem' }}>
              {!startDate ? 'Sélectionnez la date de début' : pickingEnd ? 'Sélectionnez la date de fin' : 'Dates sélectionnées ✓'}
            </p>
            <div className="date-inputs">
              <div>
                <p className="input-label">Début</p>
                <div className="date-input" style={{ cursor: 'default', color: startDate ? 'var(--white)' : 'var(--gray2)' }}>
                  {startDate ? format(startDate, 'dd/MM/yyyy') : 'Choisir date'}
                </div>
              </div>
              <div>
                <p className="input-label">Retour</p>
                <div className="date-input" style={{ cursor: 'default', color: endDate ? 'var(--white)' : 'var(--gray2)' }}>
                  {endDate ? format(endDate, 'dd/MM/yyyy') : 'Choisir date'}
                </div>
              </div>
            </div>
            <Calendar startDate={startDate} endDate={endDate} onSelect={handleDateSelect} />
            {days > 0 && (
              <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: 'var(--card)', borderRadius: 10, border: '1px solid var(--border)', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--gray)' }}>{days} jour{days > 1 ? 's' : ''} sélectionné{days > 1 ? 's' : ''}</span>
                <span style={{ fontWeight: 700 }}>{basePrice.toLocaleString('fr-FR')} €</span>
              </div>
            )}
            <button
              className="pill-btn white"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem', padding: '1rem', borderRadius: 10, fontSize: '0.9rem' }}
              disabled={!startDate || !endDate}
              onClick={() => setStep(2)}
            >
              Continuer →
            </button>
          </div>
        )}

        {/* ─── STEP 2: Options ─── */}
        {step === 2 && (
          <div>
            <p className="input-label" style={{ marginBottom: '1rem' }}>Personnalisez votre location avec des options</p>
            <div className="options-grid">
              {OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className={`option-item${selectedOptions.includes(opt.id) ? ' selected' : ''}`}
                  onClick={() => toggleOption(opt.id)}
                >
                  <div className="option-check">{selectedOptions.includes(opt.id) ? '✓' : ''}</div>
                  <div className="option-label">{opt.label}</div>
                  <div className="option-price">+{opt.priceDay} €/jour</div>
                </div>
              ))}
            </div>

            <div className="price-summary">
              <div className="price-row">
                <span className="pl">{car.name}</span>
                <span className="pv">{car.priceDay.toLocaleString('fr-FR')} € × {days}j</span>
              </div>
              <div className="price-row">
                <span className="pl">Location de base</span>
                <span className="pv">{basePrice.toLocaleString('fr-FR')} €</span>
              </div>
              {selectedOptions.map(id => {
                const opt = OPTIONS.find(o => o.id === id)
                return (
                  <div className="price-row" key={id}>
                    <span className="pl">{opt.label}</span>
                    <span className="pv">+{(opt.priceDay * days).toLocaleString('fr-FR')} €</span>
                  </div>
                )
              })}
              <div className="price-row total">
                <span className="pl">Total</span>
                <span className="pv">{total.toLocaleString('fr-FR')} €</span>
              </div>
              {discountPct > 0 && (
                <div className="price-row" style={{ color: '#4a9d6f' }}>
                  <span className="pl">Forfait {user.forfait} −{discountPct}%</span>
                  <span className="pv">−{discountAmt.toLocaleString('fr-FR')} €</span>
                </div>
              )}
              {discountPct > 0 && (
                <div className="price-row total" style={{ color: '#4a9d6f' }}>
                  <span className="pl">Total réduit</span>
                  <span className="pv">{discountedTotal.toLocaleString('fr-FR')} €</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="pill-btn dark" style={{ flex: 1, justifyContent: 'center', padding: '1rem', borderRadius: 10 }} onClick={() => setStep(1)}>
                ← Retour
              </button>
              <button className="pill-btn white" style={{ flex: 2, justifyContent: 'center', padding: '1rem', borderRadius: 10, fontSize: '0.9rem' }} onClick={() => setStep(3)}>
                Récapitulatif →
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Confirm ─── */}
        {step === 3 && (
          <div>
            <div className="price-summary">
              <div className="price-row"><span className="pl">Véhicule</span><span className="pv">{car.name}</span></div>
              <div className="price-row">
                <span className="pl">Début</span>
                <span className="pv">{startDate && format(startDate, 'dd/MM/yyyy')}</span>
              </div>
              <div className="price-row">
                <span className="pl">Retour</span>
                <span className="pv">{endDate && format(endDate, 'dd/MM/yyyy')}</span>
              </div>
              <div className="price-row">
                <span className="pl">Durée</span>
                <span className="pv">{days} jour{days > 1 ? 's' : ''}</span>
              </div>
              <div className="price-row"><span className="pl">Location de base</span><span className="pv">{basePrice.toLocaleString('fr-FR')} €</span></div>
              {selectedOptions.map(id => {
                const opt = OPTIONS.find(o => o.id === id)
                return <div className="price-row" key={id}><span className="pl">{opt.label}</span><span className="pv">+{(opt.priceDay * days).toLocaleString('fr-FR')} €</span></div>
              })}
              <div className="price-row total">
                <span className="pl">Total à régler</span>
                <span className="pv">{total.toLocaleString('fr-FR')} €</span>
              </div>              {discountPct > 0 && (
                <div className="price-row" style={{ color: '#4a9d6f' }}>
                  <span className="pl">Forfait {user.forfait} −{discountPct}%</span>
                  <span className="pv">−{discountAmt.toLocaleString('fr-FR')} €</span>
                </div>
              )}
              {discountPct > 0 && (
                <div className="price-row total" style={{ color: '#4a9d6f' }}>
                  <span className="pl">Vous payez</span>
                  <span className="pv">{discountedTotal.toLocaleString('fr-FR')} €</span>
                </div>
              )}            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="pill-btn dark" style={{ flex: 1, justifyContent: 'center', padding: '1rem', borderRadius: 10 }} onClick={() => setStep(2)}>
                ← Retour
              </button>
              <button
                className="pill-btn white"
                style={{ flex: 2, justifyContent: 'center', padding: '1rem', borderRadius: 10, fontSize: '0.9rem' }}
                onClick={handleConfirm}
              >
                Confirmer la réservation 🚗
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Payment ─── */}
        {step === 4 && (
          <div className="pay-form">
            <div className="pay-input-group">
              <label className="pay-label">Titulaire de la carte</label>
              <input
                className="pay-input"
                type="text"
                placeholder="Jean Dupont"
                value={payName}
                onChange={e => setPayName(e.target.value)}
              />
            </div>
            <div className="pay-input-group pay-card-type">
              <label className="pay-label">Numéro de carte</label>
              <input
                className="pay-input"
                type="text"
                inputMode="numeric"
                maxLength={19}
                placeholder="4242 4242 4242 4242"
                value={payCard}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 16)
                  setPayCard(v.replace(/(\d{4})(?=\d)/g, '$1 '))
                }}
              />
              <span className="pay-card-icon">
                {payCard.startsWith('4') ? 'VISA' : payCard.startsWith('5') ? 'MC' : ''}
              </span>
            </div>
            <div className="pay-row">
              <div className="pay-input-group">
                <label className="pay-label">Expiration (MM/AA)</label>
                <input
                  className="pay-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="08/28"
                  value={payExpiry}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                    setPayExpiry(v.length > 2 ? `${v.slice(0,2)}/${v.slice(2)}` : v)
                  }}
                />
              </div>
              <div className="pay-input-group">
                <label className="pay-label">CVV</label>
                <input
                  className="pay-input"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="•••"
                  value={payCVV}
                  onChange={e => setPayCVV(e.target.value.replace(/\D/g, '').slice(0, 4))}
                />
              </div>
            </div>

            {payError && <div className="pay-error">{payError}</div>}

            <div className="pay-secure">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Paiement 100 % sécurisé • SSL chiffré
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button className="pill-btn dark" style={{ flex: 1, justifyContent: 'center', padding: '1rem', borderRadius: 10 }} onClick={() => setStep(3)} disabled={payLoading}>
                ← Retour
              </button>
              <button
                className="pill-btn white pay-btn"
                style={{ flex: 2, padding: '1rem', borderRadius: 10, fontSize: '0.92rem', opacity: payLoading ? 0.7 : 1 }}
                disabled={payLoading}
                onClick={() => {
                  if (!payName.trim()) { setPayError('Nom du titulaire requis.'); return }
                  if (payCard.replace(/\s/g,'').length < 16) { setPayError('Numéro de carte invalide.'); return }
                  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payExpiry)) { setPayError('Date invalide (MM/AA).'); return }
                  if (payCVV.length < 3) { setPayError('CVV invalide.'); return }
                  setPayError('')
                  setPayLoading(true)
                  setTimeout(() => { setPayLoading(false); handleConfirm() }, 2000)
                }}
              >
                {payLoading
                  ? <><span className="pay-spin" />Traitement...</>
                  : `Payer ${discountedTotal.toLocaleString('fr-FR')} €`
                }
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 5: Done ─── */}
        {step === 5 && (
          <div className="modal-done">
            <div className="modal-done__icon">🎉</div>
            <h3 className="modal-done__title">Réservation confirmée !</h3>
            <p className="modal-done__sub">Notre équipe vous contacte dans les <strong>30 minutes</strong>.</p>
            <div className="modal-done__recap">
              <div className="modal-done__row"><span>Véhicule</span><strong>{car.name}</strong></div>
              <div className="modal-done__row"><span>Du</span><strong>{startDate && format(startDate, 'dd/MM/yyyy')}</strong></div>
              <div className="modal-done__row"><span>Au</span><strong>{endDate && format(endDate, 'dd/MM/yyyy')}</strong></div>
              <div className="modal-done__row"><span>Durée</span><strong>{days} jour{days > 1 ? 's' : ''}</strong></div>
              <div className="modal-done__row modal-done__row--total"><span>Total</span><strong>{discountedTotal.toLocaleString('fr-FR')} €</strong></div>
            </div>
            <div className="modal-done__actions">
              <Link to="/reservations" className="modal-done__btn-link" onClick={onClose}>Voir mes réservations →</Link>
              <button className="modal-done__btn-close" onClick={onClose}>Fermer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

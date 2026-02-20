import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

export default function ForgotPage() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
    showToast('Email de réinitialisation envoyé !', 'success')
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
      </div>

      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="logo-dot" />
          Luxury
        </Link>

        <div className="auth-card__header">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔑</div>
          <h1 className="auth-card__title">Mot de passe oublié</h1>
          <p className="auth-card__sub">
            {sent
              ? 'Vérifiez votre boîte mail — un lien vous a été envoyé.'
              : 'Entrez votre email, on s\'occupe du reste.'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handle} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                type="email"
                className="auth-input"
                placeholder="vous@exemple.fr"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <span className="auth-spinner" /> : 'Envoyer le lien'}
            </button>
          </form>
        ) : (
          <div className="forgot-sent">
            <div className="forgot-sent__icon">📬</div>
            <p>Email envoyé à <strong>{email}</strong></p>
            <p style={{ color: 'var(--gray)', fontSize: '0.82rem', marginTop: '0.5rem' }}>
              Le lien expire dans 15 minutes.
            </p>
          </div>
        )}

        <p className="auth-switch" style={{ marginTop: '1.5rem' }}>
          <Link to="/login" className="auth-switch__link">← Retour à la connexion</Link>
        </p>
      </div>
    </div>
  )
}

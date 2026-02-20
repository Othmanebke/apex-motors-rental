import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (form.password.length < 6) { setError('Le mot de passe doit faire au moins 6 caractères.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 480))
    const res = register(form)
    setLoading(false)
    if (!res.ok) { setError(res.error); return }
    showToast("Compte créé — bienvenue chez O'cars !", 'success')
    navigate('/dashboard')
  }

  const f = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
      </div>

      <div className="auth-card auth-card--wide">
        <Link to="/" className="auth-logo">
          <span className="logo-dot" />O'cars</Link>

        <div className="auth-card__header">
          <h1 className="auth-card__title">Créer un compte</h1>
          <p className="auth-card__sub">Rejoignez O'cars et profitez d'avantages exclusifs.</p>
        </div>

        <form onSubmit={handle} className="auth-form">
          <div className="auth-row">
            <div className="auth-field">
              <label className="auth-label">Prénom</label>
              <input type="text" className="auth-input" placeholder="Jean" value={form.prenom} onChange={f('prenom')} required />
            </div>
            <div className="auth-field">
              <label className="auth-label">Nom</label>
              <input type="text" className="auth-input" placeholder="Dupont" value={form.nom} onChange={f('nom')} required />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input type="email" className="auth-input" placeholder="vous@exemple.fr" value={form.email} onChange={f('email')} required />
          </div>

          <div className="auth-row">
            <div className="auth-field">
              <label className="auth-label">Mot de passe</label>
              <div className="auth-input-wrap">
                <input type={showPwd ? 'text' : 'password'} className="auth-input" placeholder="••••••••" value={form.password} onChange={f('password')} required />
                <button type="button" className="auth-eye" onClick={() => setShowPwd(v => !v)}>
                  {showPwd
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <div className="auth-field">
              <label className="auth-label">Confirmer</label>
              <input type={showPwd ? 'text' : 'password'} className="auth-input" placeholder="••••••••" value={form.confirm} onChange={f('confirm')} required />
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Créer mon compte'}
          </button>
        </form>

        <p className="auth-switch">
          Déjà un compte ?{' '}
          <Link to="/login" className="auth-switch__link">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

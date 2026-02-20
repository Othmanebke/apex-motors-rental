import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Porsche911 from '../components/Porsche911'

/* ── Engine rumble via Web Audio API ── */
function playEngineSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const master = ctx.createGain(); master.gain.setValueAtTime(0, ctx.currentTime); master.connect(ctx.destination)
    // Rev up
    master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.06)
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.55)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.95)
    const freqs = [55, 82, 110, 165]
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = i % 2 === 0 ? 'sawtooth' : 'square'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 3.2, ctx.currentTime + 0.3)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + 0.9)
      gain.gain.setValueAtTime(0.25 - i * 0.04, ctx.currentTime)
      osc.connect(gain); gain.connect(master)
      osc.start(); osc.stop(ctx.currentTime + 0.95)
    })
    setTimeout(() => ctx.close(), 1100)
  } catch {}
}
function OAuthPopup({ provider, onClose, onSuccess }) {
  const isGoogle = provider === 'google'
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1) // 1=email, 2=loading, 3=done
  const [error, setError] = useState('')

  const emailDomain = isGoogle ? 'gmail.com' : 'facebook.com'
  const accentColor = isGoogle ? '#4285F4' : '#1877F2'

  const guessName = (mail) => {
    const base = mail.split('@')[0]
    const parts = base.replace(/[._\-+]/g, ' ').split(' ').filter(Boolean)
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    const prenom = cap(parts[0] || 'Utilisateur')
    const nom = parts.length > 1 ? cap(parts[parts.length - 1]) : cap(isGoogle ? 'Google' : 'Facebook')
    return { prenom, nom }
  }

  const handleContinue = async () => {
    if (!email.trim()) { setError('Veuillez entrer votre email.'); return }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email.trim())) { setError('Adresse email invalide.'); return }
    setError('')
    setStep(2)
    await new Promise(r => setTimeout(r, 1600))
    setStep(3)
    await new Promise(r => setTimeout(r, 580))
    const { prenom, nom } = guessName(email.trim())
    onSuccess({ email: email.trim().toLowerCase(), prenom, nom, provider })
  }

  return (
    <div className="oauth-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="oauth-popup">
        {/* Header */}
        <div className="oauth-popup__header" style={{ borderTopColor: accentColor }}>
          {isGoogle ? (
            <svg width="28" height="28" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M47.53 24.56c0-1.64-.15-3.22-.42-4.74H24v8.97h13.19c-.57 3.01-2.28 5.56-4.85 7.27v6.04h7.85c4.59-4.23 7.34-10.46 7.34-17.54z"/>
              <path fill="#34A853" d="M24 48c6.61 0 12.15-2.19 16.2-5.93l-7.85-6.04C30.2 37.64 27.26 38.4 24 38.4c-6.36 0-11.74-4.3-13.66-10.07H2.26v6.23C6.3 42.72 14.57 48 24 48z"/>
              <path fill="#FBBC05" d="M10.34 28.33A14.44 14.44 0 0 1 9.6 24c0-1.5.26-2.95.74-4.33v-6.23H2.26A24.01 24.01 0 0 0 0 24c0 3.87.93 7.53 2.26 10.56l8.08-6.23z"/>
              <path fill="#EA4335" d="M24 9.6c3.58 0 6.79 1.23 9.32 3.65l6.98-6.98C36.14 2.39 30.61 0 24 0 14.57 0 6.3 5.28 2.26 13.44l8.08 6.23C12.26 13.9 17.64 9.6 24 9.6z"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12a12 12 0 1 0-13.875 11.86v-8.384H7.077V12h3.048V9.357c0-3.007 1.792-4.669 4.532-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385A12.01 12.01 0 0 0 24 12z"/>
            </svg>
          )}
          <div>
            <div className="oauth-popup__provider">{isGoogle ? 'Google' : 'Facebook'}</div>
            <div className="oauth-popup__sub">Connexion sécurisée</div>
          </div>
          <button className="oauth-popup__close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="oauth-popup__body">
          {step === 1 && (
            <>
              <p className="oauth-popup__title">
                Entrez votre adresse {isGoogle ? 'Gmail' : 'Facebook'}
              </p>
              <p className="oauth-popup__hint">
                Apex Motors utilisera votre email pour créer ou retrouver votre compte.
              </p>
              <div className="oauth-popup__field">
                <input
                  type="email"
                  autoFocus
                  className="oauth-popup__input"
                  placeholder={`vous@${emailDomain}`}
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleContinue()}
                />
              </div>
              {error && <p className="oauth-popup__error">{error}</p>}
              <div className="oauth-popup__actions">
                <button className="oauth-popup__cancel" onClick={onClose}>Annuler</button>
                <button
                  className="oauth-popup__confirm"
                  style={{ background: accentColor }}
                  onClick={handleContinue}
                >
                  Continuer
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="oauth-popup__loading">
              <div className="oauth-popup__spinner" style={{ borderTopColor: accentColor }} />
              <p>Authentification en cours…</p>
              <p className="oauth-popup__hint">Vérification sécurisée de votre compte {isGoogle ? 'Google' : 'Facebook'}</p>
            </div>
          )}

          {step === 3 && (
            <div className="oauth-popup__loading">
              <div className="oauth-popup__check" style={{ color: accentColor }}>✓</div>
              <p>Authentifié !</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="oauth-popup__footer">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Connexion chiffrée SSL • Apex Motors ne stocke pas votre mot de passe
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   EYE ICON
───────────────────────────────────────────── */
const IconEyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const IconEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

/* ─────────────────────────────────────────────
   MAIN AUTH PAGE
───────────────────────────────────────────── */
export default function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, register, socialLogin } = useAuth()
  const { showToast } = useToast()

  const [mode, setMode]               = useState(location.pathname.startsWith('/register') ? 'register' : 'login')
  const [formVisible, setFormVisible] = useState(true)
  const [porscheActive, setPorscheActive] = useState(false)
  const [porscheDir, setPorscheDir]   = useState('right') // 'right' | 'left'
  const [oauthProvider, setOauthProvider] = useState(null)

  // ── Login state
  const [lForm, setLForm]     = useState({ email: '', password: '' })
  const [lError, setLError]   = useState('')
  const [lLoading, setLLoading] = useState(false)
  const [showPwdL, setShowPwdL] = useState(false)

  // ── Register state
  const [rForm, setRForm]     = useState({ nom: '', prenom: '', email: '', password: '', confirm: '' })
  const [rError, setRError]   = useState('')
  const [rLoading, setRLoading] = useState(false)
  const [showPwdR, setShowPwdR] = useState(false)

  /* ── Switch between login / register with Porsche ── */
  const switchMode = (newMode) => {
    if (newMode === mode || porscheActive) return
    setPorscheDir(newMode === 'register' ? 'right' : 'left')
    setFormVisible(false)
    setPorscheActive(true)
    playEngineSound()
    setTimeout(() => {
      setMode(newMode)
      navigate(`/${newMode}`, { replace: true })
    }, 500)
    setTimeout(() => {
      setFormVisible(true)
      setPorscheActive(false)
    }, 980)
  }

  /* ── Login submit ── */
  const handleLogin = async (e) => {
    e.preventDefault()
    setLError('')
    setLLoading(true)
    await new Promise(r => setTimeout(r, 420))
    const res = login(lForm.email, lForm.password)
    setLLoading(false)
    if (!res.ok) { setLError(res.error); return }
    showToast('Connexion réussie — bienvenue !', 'success')
    navigate(lForm.email === 'admin@apex.fr' ? '/admin' : '/dashboard')
  }

  /* ── Register submit ── */
  const handleRegister = async (e) => {
    e.preventDefault()
    setRError('')
    if (rForm.password !== rForm.confirm) { setRError('Les mots de passe ne correspondent pas.'); return }
    if (rForm.password.length < 6) { setRError('Minimum 6 caractères.'); return }
    setRLoading(true)
    await new Promise(r => setTimeout(r, 480))
    const res = register(rForm)
    setRLoading(false)
    if (!res.ok) { setRError(res.error); return }
    showToast('Compte créé — bienvenue chez Apex ! 🏎️', 'success')
    navigate('/dashboard')
  }

  /* ── Social OAuth success ── */
  const handleOAuthSuccess = (userData) => {
    setOauthProvider(null)
    const res = socialLogin(userData)
    if (!res.ok) { showToast(res.error, 'error'); return }
    const provName = userData.provider === 'google' ? 'Google' : 'Facebook'
    showToast(`Connexion ${provName} réussie ! 🎉`, 'success')
    navigate('/dashboard')
  }

  const lf = (k) => (e) => setLForm(p => ({ ...p, [k]: e.target.value }))
  const rf = (k) => (e) => setRForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div className="auth-page">
      {/* ── Background orbs ── */}
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
        <div className="auth-bg__orb auth-bg__orb--3" />
      </div>

      {/* ── Porsche transition overlay ── */}
      {porscheActive && (
        <div className="porsche-overlay">
          <div className={`porsche-car porsche-car--${porscheDir}`}>
            <Porsche911 />
          </div>
          {/* Tire tracks */}
          <div className={`porsche-tracks porsche-tracks--${porscheDir}`} />
        </div>
      )}

      {/* ── OAuth popup ── */}
      {oauthProvider && (
        <OAuthPopup
          provider={oauthProvider}
          onClose={() => setOauthProvider(null)}
          onSuccess={handleOAuthSuccess}
        />
      )}

      {/* ── Auth card ── */}
      <div className={`auth-card${mode === 'register' ? ' auth-card--wide' : ''} ${formVisible ? 'auth-card--visible' : 'auth-card--hidden'}`}>
        <Link to="/" className="auth-logo">
          <span className="logo-dot" />
          Luxury
        </Link>

        {/* ── Mode toggle tabs ── */}
        <div className="auth-tabs">
          <button
            className={`auth-tab${mode === 'login' ? ' auth-tab--active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Se connecter
          </button>
          <button
            className={`auth-tab${mode === 'register' ? ' auth-tab--active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Créer un compte
          </button>
          <div className={`auth-tab__slider${mode === 'register' ? ' auth-tab__slider--right' : ''}`} />
        </div>

        {/* ── Subtitle ── */}
        <p className="auth-card__sub" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          {mode === 'login'
            ? 'Accédez à votre espace personnel.'
              : "Rejoignez Apex Motors et profitez d'avantages exclusifs."}
        </p>

        {/* ── Social buttons ── */}
        <div className="auth-social">
          <button
            className="auth-social__btn auth-social__btn--google"
            onClick={() => setOauthProvider('google')}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M47.53 24.56c0-1.64-.15-3.22-.42-4.74H24v8.97h13.19c-.57 3.01-2.28 5.56-4.85 7.27v6.04h7.85c4.59-4.23 7.34-10.46 7.34-17.54z"/>
              <path fill="#34A853" d="M24 48c6.61 0 12.15-2.19 16.2-5.93l-7.85-6.04C30.2 37.64 27.26 38.4 24 38.4c-6.36 0-11.74-4.3-13.66-10.07H2.26v6.23C6.3 42.72 14.57 48 24 48z"/>
              <path fill="#FBBC05" d="M10.34 28.33A14.44 14.44 0 0 1 9.6 24c0-1.5.26-2.95.74-4.33v-6.23H2.26A24.01 24.01 0 0 0 0 24c0 3.87.93 7.53 2.26 10.56l8.08-6.23z"/>
              <path fill="#EA4335" d="M24 9.6c3.58 0 6.79 1.23 9.32 3.65l6.98-6.98C36.14 2.39 30.61 0 24 0 14.57 0 6.3 5.28 2.26 13.44l8.08 6.23C12.26 13.9 17.64 9.6 24 9.6z"/>
            </svg>
            Continuer avec Google
          </button>
          <button
            className="auth-social__btn auth-social__btn--facebook"
            onClick={() => setOauthProvider('facebook')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#fff" d="M24 12a12 12 0 1 0-13.875 11.86v-8.384H7.077V12h3.048V9.357c0-3.007 1.792-4.669 4.532-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385A12.01 12.01 0 0 0 24 12z"/>
            </svg>
            Continuer avec Facebook
          </button>
        </div>

        <div className="auth-divider"><span>ou continuer avec un email</span></div>

        {/* ══════════════════════════════
            LOGIN FORM
        ══════════════════════════════ */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                type="email"
                className="auth-input"
                placeholder="vous@exemple.fr"
                value={lForm.email}
                onChange={lf('email')}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Mot de passe</label>
              <div className="auth-input-wrap">
                <input
                  type={showPwdL ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="••••••••"
                  value={lForm.password}
                  onChange={lf('password')}
                  required
                />
                <button type="button" className="auth-eye" onClick={() => setShowPwdL(v => !v)}>
                  {showPwdL ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            {lError && <p className="auth-error">{lError}</p>}

            <button type="submit" className="auth-submit" disabled={lLoading}>
              {lLoading ? <span className="auth-spinner" /> : 'Se connecter'}
            </button>

            <p style={{ textAlign: 'right', margin: '0.1rem 0 0' }}>
              <Link to="/forgot" className="auth-forgot-link">Mot de passe oublié ?</Link>
            </p>

            <div className="auth-divider"><span>accès démo admin</span></div>
            <button
              type="button"
              className="auth-demo__btn"
              onClick={() => setLForm({ email: 'admin@apex.fr', password: 'apex2026' })}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Remplir Admin
            </button>
          </form>
        )}

        {/* ══════════════════════════════
            REGISTER FORM
        ══════════════════════════════ */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="auth-row">
              <div className="auth-field">
                <label className="auth-label">Prénom</label>
                <input type="text" className="auth-input" placeholder="Jean" value={rForm.prenom} onChange={rf('prenom')} required />
              </div>
              <div className="auth-field">
                <label className="auth-label">Nom</label>
                <input type="text" className="auth-input" placeholder="Dupont" value={rForm.nom} onChange={rf('nom')} required />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input type="email" className="auth-input" placeholder="vous@exemple.fr" value={rForm.email} onChange={rf('email')} required />
            </div>

            <div className="auth-row">
              <div className="auth-field">
                <label className="auth-label">Mot de passe</label>
                <div className="auth-input-wrap">
                  <input type={showPwdR ? 'text' : 'password'} className="auth-input" placeholder="••••••••" value={rForm.password} onChange={rf('password')} required />
                  <button type="button" className="auth-eye" onClick={() => setShowPwdR(v => !v)}>
                    {showPwdR ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Confirmer</label>
                <input type={showPwdR ? 'text' : 'password'} className="auth-input" placeholder="••••••••" value={rForm.confirm} onChange={rf('confirm')} required />
              </div>
            </div>

            {rError && <p className="auth-error">{rError}</p>}

            <button type="submit" className="auth-submit" disabled={rLoading}>
              {rLoading ? <span className="auth-spinner" /> : 'Créer mon compte 🏎️'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

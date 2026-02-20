import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

/* ─────────────────────────────────────────────
   PORSCHE 911 SVG  (facing right, red)
───────────────────────────────────────────── */
function Porsche911() {
  return (
    <svg viewBox="0 0 500 160" xmlns="http://www.w3.org/2000/svg" className="porsche-svg">
      {/* Ground shadows */}
      <ellipse cx="132" cy="148" rx="78" ry="9" fill="rgba(0,0,0,0.45)" />
      <ellipse cx="360" cy="148" rx="84" ry="9" fill="rgba(0,0,0,0.45)" />

      {/* ── Main body ── */}
      <path
        d="M 18 118
           L 22 102 Q 28 90 36 84
           L 48 78 Q 60 70 70 58
           L 90 40 Q 102 20 130 18
           L 240 16 Q 262 15 278 26
           L 308 56 Q 320 70 334 76
           L 368 80 Q 398 82 432 94
           L 448 108 L 452 118
           Q 440 122 360 122 A 38 38 0 0 1 280 122
           L 210 122 Q 190 122 132 122 A 36 36 0 0 1 52 122
           L 18 122 Z"
        fill="#CC0000"
        stroke="#990000"
        strokeWidth="1.5"
      />

      {/* ── Rear haunches / fender flare ── */}
      <path
        d="M 330 82 Q 360 78 400 90 L 420 100 L 430 112 Q 400 108 360 108 A 38 38 0 0 1 282 108 L 290 78 Z"
        fill="#BB0000"
      />

      {/* ── Front underbumper trim ── */}
      <path d="M 18 118 L 22 102 Q 26 92 34 87 L 50 83 L 52 92 Q 44 96 38 104 L 34 118 Z"
        fill="#AA0000" />

      {/* ── Side sill / rocker ── */}
      <rect x="50" y="112" width="230" height="8" rx="4" fill="#990000" />

      {/* ── Windows ── */}
      <path
        d="M 93 56 Q 102 28 130 22 L 236 20 Q 256 19 270 32 L 298 60 L 240 66 Q 195 70 140 68 L 93 56 Z"
        fill="#0d1b2a"
        stroke="#1a3050"
        strokeWidth="1.2"
      />

      {/* ── A-pillar / B-pillar separation ── */}
      <path d="M 170 66 L 175 21" stroke="#0a1520" strokeWidth="2.5" />

      {/* ── Front headlight cluster ── */}
      <path d="M 32 87 Q 44 81 56 83 L 54 96 Q 44 100 34 97 Z" fill="#fffde0" />
      <path d="M 30 90 Q 28 94 30 97 L 34 97 Q 30 94 31 90 Z" fill="#fff" opacity="0.9" />
      <ellipse cx="44" cy="90" rx="7" ry="5" fill="#fff" opacity="0.3" />

      {/* ── DRL strip ── */}
      <path d="M 30 83 Q 50 76 64 79" stroke="#fffbe6" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

      {/* ── Rear lights (full width LED bar) ── */}
      <path d="M 388 86 Q 428 90 450 100 L 448 112 Q 424 108 386 104 Z" fill="#ff2020" />
      <path d="M 390 87 Q 428 91 448 100" stroke="#ff6060" strokeWidth="1.5" opacity="0.7" />
      {/* ── Rear light inner detail ── */}
      <path d="M 408 90 Q 440 95 448 104" stroke="#ff9999" strokeWidth="1" opacity="0.5" />

      {/* ── Door detail line ── */}
      <path d="M 132 120 L 130 72 Q 130 64 136 60 L 165 66 L 170 120" stroke="#AA0000" strokeWidth="1" fill="none" />

      {/* ── Body highlight / sheen ── */}
      <path
        d="M 72 56 Q 150 44 260 42 Q 295 42 308 52"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 124 20 Q 200 16 258 20"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Front wheel ── */}
      <circle cx="132" cy="127" r="28" fill="#1a1a1a" />
      <circle cx="132" cy="127" r="20" fill="#262626" stroke="#444" strokeWidth="1.5" />
      <circle cx="132" cy="127" r="9" fill="#111" stroke="#555" strokeWidth="1" />
      <circle cx="132" cy="127" r="3.5" fill="#888" />
      {[0,60,120,180,240,300].map(a => {
        const rad = a * Math.PI / 180
        return (
          <line key={a}
            x1={132 + Math.cos(rad) * 9}  y1={127 + Math.sin(rad) * 9}
            x2={132 + Math.cos(rad) * 19} y2={127 + Math.sin(rad) * 19}
            stroke="#555" strokeWidth="3" strokeLinecap="round"
          />
        )
      })}

      {/* ── Rear wheel ── */}
      <circle cx="360" cy="127" r="30" fill="#1a1a1a" />
      <circle cx="360" cy="127" r="22" fill="#262626" stroke="#444" strokeWidth="1.5" />
      <circle cx="360" cy="127" r="10" fill="#111" stroke="#555" strokeWidth="1" />
      <circle cx="360" cy="127" r="4" fill="#888" />
      {[0,60,120,180,240,300].map(a => {
        const rad = a * Math.PI / 180
        return (
          <line key={a}
            x1={360 + Math.cos(rad) * 10} y1={127 + Math.sin(rad) * 10}
            x2={360 + Math.cos(rad) * 21} y2={127 + Math.sin(rad) * 21}
            stroke="#555" strokeWidth="3.5" strokeLinecap="round"
          />
        )
      })}

      {/* ── Exhaust (twin) ── */}
      <circle cx="432" cy="115" r="5.5" fill="#222" stroke="#555" strokeWidth="1" />
      <circle cx="444" cy="115" r="5.5" fill="#222" stroke="#555" strokeWidth="1" />
      <circle cx="432" cy="115" r="3" fill="#111" />
      <circle cx="444" cy="115" r="3" fill="#111" />

      {/* ── "911" badge on rear ── */}
      <text x="294" y="76" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="1">911</text>

      {/* ── Apex logo on door ── */}
      <text x="140" y="102" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="Montserrat,sans-serif" fontWeight="800" letterSpacing="2">APEX</text>

      {/* ── Speed lines (motion blur effect) ── */}
      <line x1="0" y1="90" x2="60" y2="88" stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round" />
      <line x1="0" y1="100" x2="45" y2="98" stroke="rgba(255,255,255,0.05)" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="108" x2="30" y2="107" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   OAUTH POPUP  (Google / Facebook)
───────────────────────────────────────────── */
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

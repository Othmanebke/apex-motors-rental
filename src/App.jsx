import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Porsche911 from './components/Porsche911'
import HomePage from './pages/HomePage'
import CarsPage from './pages/CarsPage'
import CarDetailPage from './pages/CarDetailPage'
import ReservationsPage from './pages/ReservationsPage'
import NotFoundPage from './pages/NotFoundPage'
import AuthPage from './pages/AuthPage'
import ForgotPage from './pages/ForgotPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.18, ease: 'easeIn' } },
}

const NO_NAVBAR = ['/login', '/register', '/forgot', '/dashboard', '/admin']

/* ── Custom Wheel Cursor ── */
function CustomCursor() {
  const cursorRef = useRef(null)
  const [spinning, setSpinning] = useState(false)
  const spinTimer = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`
      }
      setSpinning(true)
      clearTimeout(spinTimer.current)
      spinTimer.current = setTimeout(() => setSpinning(false), 180)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={cursorRef} className={`custom-cursor${spinning ? ' custom-cursor--spin' : ''}`}>
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
        <circle cx="20" cy="20" r="17" stroke="#CC0000" strokeWidth="2.5"/>
        <circle cx="20" cy="20" r="5" fill="#CC0000"/>
        {[0,60,120,180,240,300].map(a => {
          const rad = a * Math.PI / 180
          return <line key={a}
            x1={20 + Math.cos(rad) * 5}  y1={20 + Math.sin(rad) * 5}
            x2={20 + Math.cos(rad) * 15} y2={20 + Math.sin(rad) * 15}
            stroke="#CC0000" strokeWidth="2.2" strokeLinecap="round"/>
        })}
        <circle cx="20" cy="20" r="17" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      </svg>
    </div>
  )
}

/* ── Konami Porsche Easter Egg ── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
function KonamiPorsche() {
  const [active, setActive] = useState(false)
  const [dir, setDir] = useState('right')
  const seq = useRef([])
  useEffect(() => {
    const onKey = (e) => {
      seq.current.push(e.key)
      if (seq.current.length > KONAMI.length) seq.current.shift()
      if (seq.current.join(',') === KONAMI.join(',')) {
        seq.current = []
        const d = Math.random() > 0.5 ? 'right' : 'left'
        setDir(d); setActive(true)
        setTimeout(() => setActive(false), 1100)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  if (!active) return null
  return (
    <div className="porsche-overlay">
      <div className={`porsche-car porsche-car--${dir}`}><Porsche911 /></div>
      <div className={`porsche-tracks porsche-tracks--${dir}`} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const hideChrome = NO_NAVBAR.some(p => location.pathname.startsWith(p))
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {!hideChrome && <Footer />}
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

function AppShell() {
  const location = useLocation()
  const hideChrome = NO_NAVBAR.some(p => location.pathname.startsWith(p))
  return (
    <>
      <CustomCursor />
      <KonamiPorsche />
      {!hideChrome && <Navbar />}
      <AnimatedRoutes />
    </>
  )
}



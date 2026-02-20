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
import CguPage from './pages/CguPage'
import MentionsLegalesPage from './pages/MentionsLegalesPage'
import CookiesPage from './pages/CookiesPage'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.18, ease: 'easeIn' } },
}

const NO_NAVBAR = ['/login', '/register', '/forgot', '/dashboard', '/admin']

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
          <Route path="/cgu" element={<CguPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
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
      <KonamiPorsche />
      {!hideChrome && <Navbar />}
      <AnimatedRoutes />
    </>
  )
}



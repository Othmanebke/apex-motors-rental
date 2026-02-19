import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])

  return (
    <div className={`notfound ${visible ? 'notfound--visible' : ''}`}>
      <div className="notfound__bg">
        <div className="notfound__orb notfound__orb--1" />
        <div className="notfound__orb notfound__orb--2" />
      </div>
      <div className="notfound__content">
        <div className="notfound__code">
          <span className="notfound__4">4</span>
          <span className="notfound__wheel">
            <svg viewBox="0 0 80 80" className="notfound__tire" aria-hidden="true">
              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="5" fill="none" />
              <circle cx="40" cy="40" r="18" fill="currentColor" opacity="0.15" />
              <circle cx="40" cy="40" r="6" fill="currentColor" />
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <line
                  key={deg}
                  x1="40" y1="22"
                  transform={`rotate(${deg} 40 40)`}
                  x2="40" y2="34"
                  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
                />
              ))}
            </svg>
          </span>
          <span className="notfound__4">4</span>
        </div>
        <h1 className="notfound__title">Page introuvable</h1>
        <p className="notfound__sub">
          Cette route n'existe pas dans notre catalogue. Peut-être cherchiez-vous une de nos voitures d'exception&nbsp;?
        </p>
        <div className="notfound__actions">
          <Link to="/" className="notfound__btn notfound__btn--outline">← Accueil</Link>
          <Link to="/cars" className="btn-red notfound__btn">Voir les voitures</Link>
        </div>
      </div>
    </div>
  )
}

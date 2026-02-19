import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-name">Luxury</div>
          <p>Location de voitures premium en France. Mercedes-AMG, Porsche, Ferrari, Lamborghini et bien d’autres, livrés chez vous.</p>
          <div className="footer-addr">
            12 avenue des Champs-Élysées<br />
            75008 Paris, France<br />
            <br />
            +33 1 42 00 00 00<br />
            contact@luxury-cars.fr
          </div>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <Link to="/cars">Nos voitures</Link>
          <a href="#terms">Conditions de location</a>
          <a href="#steps">Comment ça marche ?</a>
          <a href="#testimonials">Témoignages</a>
          <a href="#news">Actualités</a>
        </div>

        <div className="footer-col">
          <h4>Aide</h4>
          <a href="#">Louer une voiture</a>
          <a href="#">Retour du véhicule</a>
          <a href="#">Aide conducteur</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-newsletter">
          <h4>Restez informés de nos offres et actualités</h4>
          <p>Inscrivez-vous à notre newsletter. Sans spam, promis.</p>
          <div className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Votre e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="pill-btn white"
              style={{ padding: '0.6rem 1rem', fontSize: '0.78rem', flexShrink: 0 }}
              onClick={() => { if (email) { alert('Inscription réussie !'); setEmail('') } }}
            >
              S’inscrire
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Luxury. Tous droits réservés.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit' }}>Politique de confidentialité</a>
          <a href="#" style={{ color: 'inherit' }}>Conditions générales</a>
        </div>
      </div>
    </footer>
  )
}

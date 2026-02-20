import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__logo">APEX MOTORS</div>
          <p className="site-footer__tagline">
            Location de voitures premium.<br />
            Livraison partout en France.
          </p>
          <div className="site-footer__contact">
            <a href="tel:+33142000000">+33 1 42 00 00 00</a>
            <a href="mailto:contact@apex-motors.fr">contact@apex-motors.fr</a>
          </div>
        </div>

        <div className="site-footer__col">
          <h5>Navigation</h5>
          <Link to="/cars">Nos véhicules</Link>
          <Link to="/reservations">Réservations</Link>
          <Link to="/register">Créer un compte</Link>
          <Link to="/dashboard">Mon espace</Link>
        </div>

        <div className="site-footer__col">
          <h5>Légal</h5>
          <Link to="/cgu">CGU</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/cookies">Politique cookies</Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Apex Motors. Tous droits réservés.</span>
      </div>
    </footer>
  )
}

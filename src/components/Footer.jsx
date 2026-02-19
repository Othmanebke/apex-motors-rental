function Footer() {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>APEX MOTORS</h3>
          <p>
            Location de voitures de sport premium. Mercedes-AMG, Audi Sport, BMW M, Porsche,
            Ferrari, Lamborghini et plus encore.
          </p>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <a href="#">Location Courte Durée</a>
          <a href="#">Location Longue Durée</a>
          <a href="#">Forfaits Week-end</a>
          <a href="#">Événements Spéciaux</a>
        </div>

        <div className="footer-section">
          <h4>Informations</h4>
          <a href="#">À Propos</a>
          <a href="#">FAQ</a>
          <a href="#">Conditions</a>
          <a href="#">Assurance</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <a href="tel:+33142860000">+33 1 42 86 00 00</a>
          <a href="mailto:contact@apexmotors.fr">contact@apexmotors.fr</a>
          <a href="#">Paris — Monaco — Genève</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Apex Motors. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer

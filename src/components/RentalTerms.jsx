export default function RentalTerms() {
  const terms = [
    { label: 'Âge minimum', value: '21 ans' },
    { label: 'Permis de conduire', value: 'Valide depuis 2 ans min.' },
    { label: 'Caution', value: 'Dès 300 € selon véhicule' },
    { label: 'Carburant', value: 'Plein → Plein' },
    { label: 'Kilométrage', value: 'Illimité ou forfait selon offre' },
    { label: 'Assurance', value: 'RC incluse, options dispo' },
  ]

  return (
    <section className="section-terms" id="terms">
      <div className="terms-grid">
        <div className="terms-left">
          <p className="section-label">Avant de partir</p>
          <h2 className="terms-title">Conditions de location</h2>
          <p>
            Nous voulons que votre expérience soit simple de bout en bout.
            Consultez nos conditions avant de réserver.
            Notre équipe est disponible 7j/7 pour répondre à vos questions.
          </p>
          <button className="pill-btn outline">Lire les conditions complètes →</button>
        </div>

        <div className="terms-card">
          <div className="driver-head">
            <div
              className="driver-avatar"
              style={{ background: 'linear-gradient(135deg,#333,#1a1a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              👤
            </div>
            <div>
              <div className="driver-name">Profil conducteur standard</div>
              <div className="driver-role">Récapitulatif des exigences</div>
            </div>
          </div>
          <div className="terms-items">
            {terms.map((t) => (
              <div className="term-item" key={t.label}>
                <div className="ti-label">{t.label}</div>
                <div className="ti-value">{t.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    num: '01',
    title: 'Choisissez votre véhicule',
    desc: 'Parcourez notre flotte : citadines, SUV, berlines ou supercars. Filtrez par catégorie, budget ou disponibilité et trouvez le véhicule qui vous correspond.',
  },
  {
    num: '02',
    title: 'Vérifiez vos documents',
    desc: 'Munissez-vous de votre permis de conduire valide, d’une pièce d’identité et d’une carte bancaire pour le prélèvement de la caution. Simple et rapide.',
  },
  {
    num: '03',
    title: 'Confirmez et payez',
    desc: 'Sélectionnez vos dates, vos options (assurance, conducteur supplémentaire, GPS…) et réglez en ligne en toute sécurité. Confirmation instantanée.',
  },
  {
    num: '04',
    title: 'Récupérez ou faites livrer',
    desc: 'Retirez votre véhicule en agence ou optez pour la livraison à domicile. Le plein est fait, le véhicule est inspecte et prêt à prendre la route.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-steps">
      <div className="steps-header">
        <p className="section-label">Simple &amp; Rapide</p>
        <h2 className="section-title">Louez en 4 étapes</h2>
      </div>

      <div className="steps-layout">
        <div className="steps-image">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
            alt="McLaren"
          />
        </div>
        <div className="steps-list">
          {STEPS.map((s) => (
            <div key={s.num} className="step-item">
              <div className="step-num">{s.num}</div>
              <div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

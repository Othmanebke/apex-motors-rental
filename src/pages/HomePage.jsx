import { useState } from 'react'
import Hero from '../components/Hero'
import ChooseYourRide from '../components/ChooseYourRide'
import RentalTerms from '../components/RentalTerms'
import Testimonials from '../components/Testimonials'
import HowItWorks from '../components/HowItWorks'
import PremiumService from '../components/PremiumService'
import FAQ from '../components/FAQ'
import NewsSection from '../components/NewsSection'
import CtaBanner from '../components/CtaBanner'
import ReservationModal from '../components/ReservationModal'
import TireTracks from '../components/TireTracks'

export default function HomePage() {
  const [selectedCar, setSelectedCar] = useState(null)

  return (
    <>
      {/* Traces de pneu haut gauche — décoratives */}
      <TireTracks variant="topleft" />

      <Hero />
      <ChooseYourRide onBook={setSelectedCar} />
      <RentalTerms />
      <Testimonials />
      <HowItWorks />
      <PremiumService />

      {/* Traces de pneu près de la FAQ */}
      <div style={{ position: 'relative' }}>
        <TireTracks variant="faq" />
        <FAQ />
      </div>

      <NewsSection />
      <CtaBanner />
      {selectedCar && (
        <ReservationModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </>
  )
}

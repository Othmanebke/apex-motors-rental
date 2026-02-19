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
      <Hero />
      <ChooseYourRide onBook={setSelectedCar} />
      <RentalTerms />
      <Testimonials />
      <HowItWorks />
      <PremiumService />
      {/* Traces de pneu fixes — visibles depuis la section Conditions */}
      <TireTracks variant="faq" />
      <FAQ />
      <NewsSection />
      <CtaBanner />
      {selectedCar && (
        <ReservationModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </>
  )
}

import { useState } from 'react'
import Hero from '../components/Hero'
import StatsCounter from '../components/StatsCounter'
import ChooseYourRide from '../components/ChooseYourRide'
import RentalTerms from '../components/RentalTerms'
import Testimonials from '../components/Testimonials'
import HowItWorks from '../components/HowItWorks'
import PremiumService from '../components/PremiumService'
import FAQ from '../components/FAQ'
import NewsSection from '../components/NewsSection'
import CtaBanner from '../components/CtaBanner'
import OffersSection from '../components/OffersSection'
import ReservationModal from '../components/ReservationModal'

export default function HomePage() {
  const [selectedCar, setSelectedCar] = useState(null)

  return (
    <>
      <Hero />
      <StatsCounter />
      <ChooseYourRide onBook={setSelectedCar} />
      <OffersSection />
      <RentalTerms />
      <Testimonials />
      <HowItWorks />
      <PremiumService />
      <FAQ />
      <NewsSection />
      <CtaBanner />
      {selectedCar && (
        <ReservationModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </>
  )
}

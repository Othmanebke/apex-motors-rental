import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import Fleet from './components/Fleet'
import Features from './components/Features'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import { cars as allCars } from './data/cars'

function App() {
  const [filteredCars, setFilteredCars] = useState(allCars)

  const handleFilter = ({ brand, type, budget }) => {
    let result = [...allCars]

    if (brand !== 'Toutes') {
      result = result.filter((car) => car.type === brand)
    }

    if (type !== 'Tous') {
      result = result.filter((car) => car.category === type)
    }

    if (budget !== 'Tous') {
      result = result.filter((car) => {
        const priceNum = parseInt(car.price.replace(/[^0-9]/g, ''), 10)
        if (budget === '200€ - 500€') return priceNum >= 200 && priceNum <= 500
        if (budget === '500€ - 1000€') return priceNum > 500 && priceNum <= 1000
        if (budget === '1000€ - 2000€') return priceNum > 1000 && priceNum <= 2000
        if (budget === '2000€+') return priceNum > 2000
        return true
      })
    }

    setFilteredCars(result)
  }

  return (
    <>
      <Navbar />
      <Hero />
      <FilterBar onFilter={handleFilter} />
      <Fleet cars={filteredCars} />
      <Features />
      <CtaSection />
      <Footer />
    </>
  )
}

export default App

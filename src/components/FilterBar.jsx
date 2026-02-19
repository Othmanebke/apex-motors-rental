import { useState } from 'react'
import { brands, types, budgets } from '../data/cars'

function FilterBar({ onFilter }) {
  const [selectedBrand, setSelectedBrand] = useState('Toutes')
  const [selectedType, setSelectedType] = useState('Tous')
  const [selectedBudget, setSelectedBudget] = useState('Tous')

  const handleFilter = () => {
    onFilter({ brand: selectedBrand, type: selectedType, budget: selectedBudget })
  }

  return (
    <section className="filter-bar">
      <div className="filter-content">
        <div className="filter-group">
          <label className="filter-label">Marque</label>
          <select
            className="filter-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Type</label>
          <select
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Budget/Jour</label>
          <select
            className="filter-select"
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
          >
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <button className="filter-btn" onClick={handleFilter}>
          Filtrer
        </button>
      </div>
    </section>
  )
}

export default FilterBar

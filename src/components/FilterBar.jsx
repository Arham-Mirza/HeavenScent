const priceOptions = [
  { id: 'all', label: 'All price points' },
  { id: 'under-150', label: '< $150' },
  { id: '150-250', label: '$150 – $250' },
  { id: '250-plus', label: '$250+' },
]

export default function FilterBar({ brands, categories, activeFilters, onFilterChange }) {
  const toggleMulti = (type, value) => {
    const current = new Set(activeFilters[type])
    if (current.has(value)) {
      current.delete(value)
    } else {
      current.add(value)
    }
    onFilterChange({ ...activeFilters, [type]: Array.from(current) })
  }

  const selectPrice = (value) => {
    onFilterChange({ ...activeFilters, price: value === 'all' ? null : value })
  }

  const clearFilters = () => onFilterChange({ brands: [], categories: [], price: null })

  const hasFilters = activeFilters.brands.length || activeFilters.categories.length || activeFilters.price

  return (
    <section className="filters-panel" aria-label="Filter fragrances">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Curate the lineup</p>
          <h2>Filter by brand, family & price</h2>
          <p className="panel-subtitle">Layer chips to narrow the carousel instantly.</p>
        </div>
        {hasFilters && (
          <button className="text-link" type="button" onClick={clearFilters}>
            Reset filters
          </button>
        )}
      </header>

      <div className="filters-grid">
        <article className="filter-card">
          <p className="filter-label">Brand</p>
          <div className="chip-grid">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                className={`chip ${activeFilters.brands.includes(brand) ? 'active' : ''}`}
                onClick={() => toggleMulti('brands', brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </article>

        <article className="filter-card">
          <p className="filter-label">Category</p>
          <div className="chip-grid">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`chip ${activeFilters.categories.includes(category) ? 'active' : ''}`}
                onClick={() => toggleMulti('categories', category)}
              >
                {category}
              </button>
            ))}
          </div>
        </article>

        <article className="filter-card">
          <p className="filter-label">Price</p>
          <div className="chip-grid">
            {priceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`chip ${activeFilters.price === option.id || (!activeFilters.price && option.id === 'all') ? 'active' : ''}`}
                onClick={() => selectPrice(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

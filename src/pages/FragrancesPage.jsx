import { useState, useMemo } from 'react'

export default function FragrancesPage({ fragrances, onAddToCart, onAddToWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories from all fragrances
  const categories = useMemo(() => {
    const categorySet = new Set(fragrances.map((f) => f.category))
    return ['all', ...Array.from(categorySet).sort()]
  }, [fragrances])

  // Filter fragrances by selected category
  const displayedFragrances = useMemo(() => {
    if (selectedCategory === 'all') return fragrances
    return fragrances.filter((f) => f.category === selectedCategory)
  }, [selectedCategory, fragrances])

  return (
    <section className="catalog-panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Fragrance Wardrobe</p>
          <h2>Available Fragrances</h2>
        </div>
      </header>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      <div className="catalog-grid">
        {displayedFragrances.map((item) => (
          <article key={item.id} className="catalog-card">
            <div 
              className="catalog-image" 
              style={{ 
                background: item.palette?.backdrop 
                  ? `linear-gradient(135deg, ${item.palette.backdrop[0]}, ${item.palette.backdrop[2]})` 
                  : '#0b0b12' 
              }}
            >
              {item.image ? (
                <img src={item.image} alt={`${item.name} bottle`} loading="lazy" />
              ) : (
                <div className="catalog-placeholder">
                  <span>{item.brand}</span>
                </div>
              )}
            </div>
            <div className="catalog-body">
              <p className="catalog-brand">{item.brand}</p>
              <h3>{item.name}</h3>
              <p className="catalog-tagline">{item.tagline}</p>
              <ul className="catalog-meta">
                <li>{item.category}</li>
                <li>{item.priceLabel}</li>
              </ul>
              <div className="catalog-actions">
                <button className="wishlist-icon-btn" type="button" onClick={() => onAddToWishlist?.(item)} title="Add to wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <button className="pill-button" type="button" onClick={() => onAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

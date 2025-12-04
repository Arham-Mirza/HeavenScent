import { useState, useMemo } from 'react'
import { trendingFragrances } from '../data/fragrances.js'

export default function CollectionsPage({ onAddToCart, onAddToWishlist }) {
  const [selectedBrand, setSelectedBrand] = useState('all')

  // Get unique brands from all fragrances
  const brands = useMemo(() => {
    const brandSet = new Set(trendingFragrances.map((f) => f.brand))
    return ['all', ...Array.from(brandSet).sort()]
  }, [])

  // Filter fragrances by selected brand
  const displayedFragrances = useMemo(() => {
    if (selectedBrand === 'all') return trendingFragrances
    return trendingFragrances.filter((f) => f.brand === selectedBrand)
  }, [selectedBrand])

  return (
    <div className="collections-page">
      <div className="collections-header">
        <h1>Collections</h1>
        <p>Explore our Fragrances</p>
      </div>

      <div className="brand-filter">
        {brands.map((brand) => {
          const logoPath = brand === 'all' ? null : `/brands/${brand.toLowerCase().replace(/\s+/g, '-')}.png`
          return (
            <button
              key={brand}
              className={`brand-button ${selectedBrand === brand ? 'active' : ''}`}
              onClick={() => setSelectedBrand(brand)}
            >
              <div className="brand-logo-placeholder">
                {logoPath ? (
                  <img 
                    src={logoPath} 
                    alt={`${brand} logo`} 
                    onError={(e) => {
                      // Fallback to initial if image doesn't exist
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <span className="brand-initial" style={{ display: logoPath ? 'none' : 'flex' }}>
                  {brand[0].toUpperCase()}
                </span>
              </div>
              <span className="brand-name">{brand === 'all' ? 'All Brands' : brand}</span>
            </button>
          )
        })}
      </div>

      <div className="collections-grid">
        {displayedFragrances.map((fragrance) => (
          <div key={fragrance.id} className="collection-card">
            <div
              className="collection-card-image"
              style={{
                background: `linear-gradient(135deg, ${fragrance.palette.backdrop[0]}, ${fragrance.palette.backdrop[2]})`,
              }}
            >
              {fragrance.image ? (
                <img src={fragrance.image} alt={fragrance.name} />
              ) : (
                <div className="image-placeholder">
                  <span>Image Coming Soon</span>
                </div>
              )}
            </div>
            <div className="collection-card-content">
              <span className="collection-brand">{fragrance.brand}</span>
              <h3 className="collection-name">{fragrance.name}</h3>
              <p className="collection-category">{fragrance.category}</p>
              <p className="collection-tagline">{fragrance.tagline}</p>
              <div className="collection-footer">
                <span className="collection-price">{fragrance.priceLabel}</span>
                <div className="catalog-actions">
                  <button
                    className="wishlist-icon-btn"
                    onClick={() => onAddToWishlist?.(fragrance)}
                    title="Add to Wishlist"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                  <button
                    className="pill-button add-to-cart-btn"
                    onClick={() => onAddToCart?.(fragrance)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

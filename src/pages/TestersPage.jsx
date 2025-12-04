import { trendingFragrances } from '../data/fragrances.js'

export default function TestersPage({ onAddToCart }) {
  // Create tester versions of all fragrances
  const testers = trendingFragrances.map((fragrance) => ({
    ...fragrance,
    id: `${fragrance.id}-tester`,
    name: `${fragrance.name} - Tester`,
    priceLabel: '$10 · 10ml',
    priceValue: 10,
    isTester: true,
  }))

  return (
    <div className="testers-page">
      <div className="testers-header">
        <h1>Fragrance Testers</h1>
        <p>Try before you buy - 10ml testers for just $10 each</p>
        <div className="testers-info">
          <div className="info-badge">
            
            
          </div>
        </div>
      </div>

      <div className="testers-grid">
        {testers.map((tester) => (
          <div key={tester.id} className="tester-card">
            <div
              className="tester-card-image"
              style={{
                background: tester.palette?.backdrop
                  ? `linear-gradient(135deg, ${tester.palette.backdrop[0]}, ${tester.palette.backdrop[2]})`
                  : '#0b0b12',
              }}
            >
              {tester.image ? (
                <img src={tester.image} alt={tester.name} />
              ) : (
                <div className="image-placeholder">
                  <span>Image Coming Soon</span>
                </div>
              )}
              <div className="tester-badge">10ml Tester</div>
            </div>
            <div className="tester-card-content">
              <span className="tester-brand">{tester.brand}</span>
              <h3 className="tester-name">{tester.name}</h3>
              <p className="tester-category">{tester.category}</p>
              <p className="tester-tagline">{tester.tagline}</p>
              <div className="tester-footer">
                <span className="tester-price">$10</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart?.(tester)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

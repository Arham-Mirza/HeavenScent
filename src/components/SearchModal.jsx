export default function SearchModal({ isOpen, searchResults, onClose, onAddToCart }) {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="search-modal">
        <div className="search-modal-header">
          <h2>Search Results</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {searchResults.length === 0 ? (
          <div className="search-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <p>No fragrances found</p>
            <span>Try searching with a different keyword</span>
          </div>
        ) : (
          <div className="search-results-grid">
            {searchResults.map((fragrance) => (
              <div key={fragrance.id} className="search-result-card">
                <div
                  className="search-result-image"
                  style={{
                    background: fragrance.palette?.backdrop
                      ? `linear-gradient(135deg, ${fragrance.palette.backdrop[0]}, ${fragrance.palette.backdrop[2]})`
                      : '#0b0b12',
                  }}
                >
                  {fragrance.image ? (
                    <img src={fragrance.image} alt={fragrance.name} />
                  ) : (
                    <div className="image-placeholder">
                      <span>{fragrance.brand}</span>
                    </div>
                  )}
                </div>
                <div className="search-result-content">
                  <span className="search-result-brand">{fragrance.brand}</span>
                  <h3 className="search-result-name">{fragrance.name}</h3>
                  <p className="search-result-category">{fragrance.category}</p>
                  <p className="search-result-tagline">{fragrance.tagline}</p>
                  <div className="search-result-footer">
                    <span className="search-result-price">{fragrance.priceLabel}</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        onAddToCart(fragrance)
                        onClose()
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

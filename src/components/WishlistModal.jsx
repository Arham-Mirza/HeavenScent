export default function WishlistModal({ isOpen, items, onClose, onRemove, onAddToCart }) {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <aside className="wishlist-modal">
        <header className="wishlist-modal-header">
          <div>
            <h2>Your Wishlist</h2>
            <p className="wishlist-modal-subtitle">
              {items.length === 0 ? 'No items saved yet' : `${items.length} ${items.length === 1 ? 'item' : 'items'} saved`}
            </p>
          </div>
          <button className="wishlist-modal-close" type="button" onClick={onClose} aria-label="Close wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="wishlist-modal-body">
          {items.length === 0 ? (
            <div className="wishlist-empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <p>Your wishlist is empty</p>
              <span>Save your favorite fragrances for later</span>
            </div>
          ) : (
            <ul className="wishlist-modal-items">
              {items.map((item) => (
                <li key={item.id} className="wishlist-modal-item">
                  <div
                    className="wishlist-item-image"
                    style={{
                      background: item.palette?.backdrop
                        ? `linear-gradient(135deg, ${item.palette.backdrop[0]}, ${item.palette.backdrop[2]})`
                        : '#0b0b12',
                    }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="image-placeholder">
                        <span>{item.brand}</span>
                      </div>
                    )}
                  </div>
                  <div className="wishlist-item-info">
                    <span className="wishlist-item-brand">{item.brand}</span>
                    <p className="wishlist-item-name">{item.name}</p>
                    <span className="wishlist-item-price">{item.priceLabel}</span>
                  </div>
                  <div className="wishlist-item-actions">
                    <button
                      className="wishlist-add-to-cart"
                      type="button"
                      onClick={() => onAddToCart(item)}
                      title="Add to cart"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </button>
                    <button
                      className="wishlist-remove"
                      type="button"
                      onClick={() => onRemove(item.id)}
                      title="Remove from wishlist"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  )
}

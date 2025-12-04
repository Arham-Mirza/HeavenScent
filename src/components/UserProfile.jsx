export default function UserProfile({ user, onLogout, onClose }) {
  const orderHistory = user?.orderHistory || []

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <aside className="profile-modal">
        <header className="profile-modal-header">
          <div>
            <h2>My Profile</h2>
            <p className="profile-modal-subtitle">{user?.email}</p>
          </div>
          <button className="profile-modal-close" type="button" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="profile-modal-body">
          <div className="profile-info">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3>{user?.name}</h3>
              <p className="profile-member-since">
                Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="profile-section">
            <h4>Order History</h4>
            {orderHistory.length === 0 ? (
              <p className="profile-empty">No orders yet. Start shopping to see your history here.</p>
            ) : (
              <ul className="order-history-list">
                {orderHistory.map((order) => (
                  <li key={order.reference} className="order-item">
                    <div className="order-header">
                      <span className="order-ref">{order.reference}</span>
                      <span className="order-date">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="order-details">
                      <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                      <span className="order-total">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <footer className="profile-modal-footer">
          <button className="ghost-button wide" type="button" onClick={onLogout}>
            Sign Out
          </button>
        </footer>
      </aside>
    </>
  )
}

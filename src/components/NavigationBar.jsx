import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Fragrances', to: '/fragrances' },
  { label: 'Collections', to: '/collections' },
  { label: 'Testers', to: '/testers' },
]

export default function NavigationBar({ cartCount = 0, wishlistCount = 0, onCartClick, onWishlistClick, onSearch, currentUser, onLoginClick, onProfileClick }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch?.(searchQuery)
      setSearchQuery('')
      setShowSearch(false)
    }
  }
  return (
    <header className="nav-shell">
      <NavLink to="/" className="brand-mark">
        <svg className="brand-logo" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
            <linearGradient id="glassGradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          {/* Modern perfume bottle */}
          <path d="M20 6h8v4h-8z" fill="url(#logoGradient)" opacity="0.95"/>
          <rect x="19" y="10" width="10" height="3" rx="1.5" fill="url(#logoGradient)"/>
          <path d="M17 13h14v20c0 2.5-1.5 4-4 4h-6c-2.5 0-4-1.5-4-4V13z" fill="url(#logoGradient)" opacity="0.85"/>
          {/* Glass shine effect */}
          <ellipse cx="24" cy="18" rx="4" ry="2.5" fill="url(#glassGradient)"/>
          <rect x="20" y="16" width="2" height="10" rx="1" fill="rgba(255,255,255,0.08)"/>
          {/* Decorative sparkles */}
          <circle cx="38" cy="12" r="2" fill="var(--accent-secondary)" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="42" cy="18" r="1.5" fill="var(--accent-primary)" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="10" cy="14" r="1.2" fill="var(--accent-secondary)" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <span className="brand-title">HeavenScent</span>
      </NavLink>
      <nav className="nav-links" aria-label="Primary">
        {links.map((entry) =>
          entry.to ? (
            <NavLink key={entry.label} to={entry.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {entry.label}
            </NavLink>
          ) : (
            <button key={entry.label} className="nav-link" type="button">
              {entry.label}
            </button>
          ),
        )}
      </nav>
      <div className="nav-cta">
        <div className="search-wrapper">
          {showSearch ? (
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-submit" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              <button type="button" className="search-close" onClick={() => setShowSearch(false)} aria-label="Close search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </form>
          ) : (
            <button className="search-button" type="button" onClick={() => setShowSearch(true)} aria-label="Open search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          )}
        </div>
        {currentUser ? (
          <button className="user-button" type="button" onClick={onProfileClick} aria-label="View profile">
            <span className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
          </button>
        ) : (
          <button className="login-button" type="button" onClick={onLoginClick}>
            Sign In
          </button>
        )}
        <button className="wishlist-button" type="button" onClick={onWishlistClick} aria-label="View wishlist">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
        </button>
        <button className="cart-button" type="button" onClick={onCartClick} aria-label="View cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}

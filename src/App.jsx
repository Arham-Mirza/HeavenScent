import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar.jsx'
import HeroCarousel from './components/HeroCarousel.jsx'
import FragranceNotes from './components/FragranceNotes.jsx'
import CartPanel from './components/CartPanel.jsx'
import CartModal from './components/CartModal.jsx'
import CheckoutSheet from './components/CheckoutSheet.jsx'
import FilterBar from './components/FilterBar.jsx'
import ReviewsSection from './components/ReviewsSection.jsx'
import NewsletterBanner from './components/NewsletterBanner.jsx'
import PromoCodeBanner from './components/PromoCodeBanner.jsx'
import SupportHub from './components/SupportHub.jsx'
import ThankYouModal from './components/ThankYouModal.jsx'
import LoginModal from './components/LoginModal.jsx'
import UserProfile from './components/UserProfile.jsx'
import SearchModal from './components/SearchModal.jsx'
import WishlistModal from './components/WishlistModal.jsx'
import FragrancesPage from './pages/FragrancesPage.jsx'
import CollectionsPage from './pages/CollectionsPage.jsx'
import TestersPage from './pages/TestersPage.jsx'
import { trendingFragrances, homePageFragrances } from './data/fragrances.js'
import { initialReviews } from './data/reviews.js'
import './App.css'

export default function App() {
  const [activeId, setActiveId] = useState(homePageFragrances[0].id)
  const [filters, setFilters] = useState({ brands: [], categories: [], price: null })
  const [cartItems, setCartItems] = useState([])
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState('idle')
  const [receipt, setReceipt] = useState(null)
  const [reviews, setReviews] = useState(initialReviews)
  const [showThankYou, setShowThankYou] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [wishlistItems, setWishlistItems] = useState([])
  const [isWishlistOpen, setWishlistOpen] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('heavenscent_current_user')
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('heavenscent_current_user')
      }
    }
  }, [])

  const filteredFragrances = useMemo(() => {
    return homePageFragrances.filter((item) => {
      const brandMatch = !filters.brands.length || filters.brands.includes(item.brand ?? item.house)
      const categoryMatch = !filters.categories.length || filters.categories.includes(item.category ?? 'Unknown')

      let priceMatch = true
      if (filters.price === 'under-150') priceMatch = item.priceValue < 150
      else if (filters.price === '150-250') priceMatch = item.priceValue >= 150 && item.priceValue <= 250
      else if (filters.price === '250-plus') priceMatch = item.priceValue > 250

      return brandMatch && categoryMatch && priceMatch
    })
  }, [filters])

  useEffect(() => {
    if (!filteredFragrances.length) return
    const exists = filteredFragrances.some((item) => item.id === activeId)
    if (!exists) {
      setActiveId(filteredFragrances[0].id)
    }
  }, [filteredFragrances, activeId])

  const activeFragrance = useMemo(
    () => filteredFragrances.find((item) => item.id === activeId) ?? filteredFragrances[0] ?? trendingFragrances[0],
    [activeId, filteredFragrances],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems],
  )

  const handleAddToCart = (fragrance) => {
    if (!fragrance) return
    setCartItems((items) => {
      const existing = items.find((entry) => entry.id === fragrance.id)
      if (existing) {
        return items.map((entry) =>
          entry.id === fragrance.id ? { ...entry, qty: entry.qty + 1 } : entry,
        )
      }
      return [
        ...items,
        {
          id: fragrance.id,
          name: fragrance.name,
          price: fragrance.priceValue ?? 0,
          qty: 1,
        },
      ]
    })
    setOrderStatus('idle')
  }

  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items
        .map((entry) =>
          entry.id === id ? { ...entry, qty: Math.max(0, entry.qty + delta) } : entry,
        )
        .filter((entry) => entry.qty > 0),
    )
    setOrderStatus('idle')
  }

  const handleRemoveFromCart = (id) => {
    setCartItems((items) => items.filter((entry) => entry.id !== id))
    setOrderStatus('idle')
  }

  const handleCheckoutSubmit = (form) => {
    if (!cartItems.length) return
    setOrderStatus('processing')

    setTimeout(() => {
      const reference = `COD-${Date.now().toString().slice(-6)}`
      const orderSnapshot = {
        ...form,
        items: cartItems,
        total: cartTotal,
        reference,
        date: new Date().toISOString(),
      }

      if (currentUser) {
        const users = JSON.parse(localStorage.getItem('heavenscent_users') || '[]')
        const userIndex = users.findIndex(u => u.id === currentUser.id)
        if (userIndex !== -1) {
          users[userIndex].orderHistory = users[userIndex].orderHistory || []
          users[userIndex].orderHistory.unshift(orderSnapshot)
          localStorage.setItem('heavenscent_users', JSON.stringify(users))
          localStorage.setItem('heavenscent_current_user', JSON.stringify(users[userIndex]))
          setCurrentUser(users[userIndex])
        }
      }

      setReceipt(orderSnapshot)
      setCartItems([])
      setOrderStatus('success')
      setCheckoutOpen(false)
      setCartOpen(false)
      setShowThankYou(true)
    }, 750)
  }

  const handleReviewSubmit = (payload) => {
    if (!activeFragrance) return
    const entry = {
      ...payload,
      id: `rev-${Date.now()}`,
      fragranceId: activeFragrance.id,
      date: new Date().toISOString(),
    }
    setReviews((prev) => [entry, ...prev])
  }

  const handleThankYouClose = () => setShowThankYou(false)

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('heavenscent_current_user')
    setCurrentUser(null)
    setShowProfile(false)
  }

  const handleAddToWishlist = (fragrance) => {
    if (!fragrance) return
    setWishlistItems((items) => {
      const exists = items.find((item) => item.id === fragrance.id)
      if (exists) return items
      return [...items, fragrance]
    })
  }

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const [isCartOpen, setCartOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [showSearchModal, setShowSearchModal] = useState(false)

  const totalCartItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  )

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowSearchModal(false)
      return
    }
    const results = trendingFragrances.filter(
      (fragrance) =>
        fragrance.name.toLowerCase().includes(query.toLowerCase()) ||
        fragrance.brand.toLowerCase().includes(query.toLowerCase()) ||
        fragrance.house.toLowerCase().includes(query.toLowerCase()) ||
        fragrance.category?.toLowerCase().includes(query.toLowerCase()),
    )
    setSearchResults(results)
    setShowSearchModal(true)
  }

  const displayedFragrances = filteredFragrances

  return (
    <div className="app-shell">
      <NavigationBar 
        cartCount={totalCartItems}
        wishlistCount={wishlistItems.length}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
        onSearch={handleSearch}
        currentUser={currentUser}
        onLoginClick={() => setShowLogin(true)}
        onProfileClick={() => setShowProfile(true)}
      />
      <main className="main-region">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroCarousel
                  slides={displayedFragrances.length ? displayedFragrances : homePageFragrances}
                  activeId={activeId}
                  onActiveChange={setActiveId}
                  onAddToCart={handleAddToCart}
                />
                <FragranceNotes fragrance={activeFragrance} />
                <FilterBar
                  brands={[...new Set(homePageFragrances.map((item) => item.brand ?? item.house))]}
                  categories={[...new Set(homePageFragrances.map((item) => item.category ?? 'Signature'))]}
                  activeFilters={filters}
                  onFilterChange={setFilters}
                />
                <ReviewsSection
                  fragranceId={activeFragrance?.id}
                  fragranceName={activeFragrance?.name}
                  reviews={reviews}
                  onSubmit={handleReviewSubmit}
                />
                <NewsletterBanner />
                <PromoCodeBanner />
                <SupportHub />
              </>
            }
          />
          <Route
            path="/fragrances"
            element={<FragrancesPage fragrances={trendingFragrances} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />}
          />
          <Route
            path="/collections"
            element={<CollectionsPage onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />}
          />
          <Route
            path="/testers"
            element={<TestersPage onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />}
          />
        </Routes>
        <CartPanel
          items={cartItems}
          total={cartTotal}
          onIncrease={(id) => handleQuantityChange(id, 1)}
          onDecrease={(id) => handleQuantityChange(id, -1)}
          onRemove={handleRemoveFromCart}
          onCheckout={() => setCheckoutOpen(true)}
          orderStatus={orderStatus}
          receipt={receipt}
        />
      </main>
      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onIncrease={(id) => handleQuantityChange(id, 1)}
        onDecrease={(id) => handleQuantityChange(id, -1)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckoutSubmit}
        orderStatus={orderStatus}
      />
      <CheckoutSheet
        isOpen={isCheckoutOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
        status={orderStatus}
      />
      <ThankYouModal open={showThankYou} receipt={receipt} onClose={handleThankYouClose} />
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLogin={handleLogin}
      />
      {showProfile && currentUser && (
        <UserProfile 
          user={currentUser} 
          onLogout={handleLogout} 
          onClose={() => setShowProfile(false)}
        />
      )}
      <SearchModal
        isOpen={showSearchModal}
        searchResults={searchResults}
        onClose={() => setShowSearchModal(false)}
        onAddToCart={handleAddToCart}
      />
      <WishlistModal
        isOpen={isWishlistOpen}
        items={wishlistItems}
        onClose={() => setWishlistOpen(false)}
        onRemove={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />
      <footer className="footer">
        <span>© {new Date().getFullYear()} HeavenScent Parfums</span>
        <span>Crafted with deliberate minimalism.</span>
      </footer>
    </div>
  )
}

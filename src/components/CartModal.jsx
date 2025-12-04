import { useState, useEffect } from 'react'

const initialForm = {
  fullName: '',
  phone: '',
  city: '',
  address: '',
  notes: '',
}

export default function CartModal({ isOpen, items, total, onClose, onIncrease, onDecrease, onRemove, onCheckout, orderStatus }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [discount, setDiscount] = useState(0)

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  useEffect(() => {
    if (!isOpen) {
      setShowCheckout(false)
      setForm(initialForm)
      setCouponCode('')
      setCouponApplied(false)
      setCouponError('')
      setDiscount(0)
    }
  }, [isOpen])

  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase()
    if (trimmedCode === 'HEAVEN10') {
      const discountAmount = total * 0.1
      setDiscount(discountAmount)
      setCouponApplied(true)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
      setCouponApplied(false)
      setDiscount(0)
    }
  }

  const finalTotal = total - discount

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!items.length || orderStatus === 'processing') return
    onCheckout({ ...form, couponApplied, discount, finalTotal })
  }

  if (!isOpen) return null

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <aside className="cart-modal">
        <header className="cart-modal-header">
          <div>
            <h2>{showCheckout ? 'Checkout' : 'Your Cart'}</h2>
            <p className="cart-modal-subtitle">
              {showCheckout ? 'Cash on delivery payment' : 'Review and manage your items'}
            </p>
          </div>
          <button className="cart-modal-close" type="button" onClick={onClose} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="cart-modal-body">
          {!showCheckout ? (
            items.length === 0 ? (
              <p className="cart-empty-state">Your cart is empty. Start browsing fragrances to add items.</p>
            ) : (
              <ul className="cart-modal-items">
                {items.map((item) => (
                  <li key={item.id} className="cart-modal-item">
                    <div className="cart-modal-item-info">
                      <p className="cart-modal-item-name">{item.name}</p>
                      <span className="cart-modal-item-price">{currency.format(item.price)}</span>
                    </div>
                    <div className="cart-modal-item-controls">
                      <div className="cart-qty-controls">
                        <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Reduce ${item.name}`}>
                          –
                        </button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name}`}>
                          +
                        </button>
                      </div>
                      <button className="cart-modal-remove" type="button" onClick={() => onRemove(item.id)}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <form className="cart-checkout-form" onSubmit={handleSubmit}>
              <label>
                Full name
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jordan Winters"
                />
              </label>
              <label>
                Phone number
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+1 212 555 0112" />
              </label>
              <label>
                City / Region
                <input name="city" value={form.city} onChange={handleChange} required placeholder="New York" />
              </label>
              <label>
                Delivery address
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Residence or boutique pickup instructions"
                />
              </label>
              <label>
                Optional notes
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Gate code, fragrance layering requests, etc."
                />
              </label>
              <div className="coupon-section">
                <label>
                  Coupon Code
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter HEAVEN10 for 10% off"
                      disabled={couponApplied}
                    />
                    <button
                      type="button"
                      className="coupon-apply-btn"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode.trim()}
                    >
                      {couponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </label>
                {couponApplied && (
                  <p className="coupon-success">✓ Coupon applied! You saved {currency.format(discount)}</p>
                )}
                {couponError && <p className="coupon-error">{couponError}</p>}
              </div>
            </form>
          )}
        </div>

        <footer className="cart-modal-footer">
          {!showCheckout && (
            <div className="cart-modal-total">
              <span>Total</span>
              <strong>{currency.format(total)}</strong>
            </div>
          )}
          {showCheckout && (
            <div className="cart-modal-total-breakdown">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{currency.format(total)}</span>
              </div>
              {couponApplied && (
                <div className="total-row discount-row">
                  <span>Discount (HEAVEN10)</span>
                  <span>-{currency.format(discount)}</span>
                </div>
              )}
              <div className="total-row final-total">
                <span>Total</span>
                <strong>{currency.format(finalTotal)}</strong>
              </div>
            </div>
          )}
          {showCheckout ? (
            <div className="cart-modal-checkout-actions">
              <button className="ghost-button" type="button" onClick={() => setShowCheckout(false)}>
                Back to Cart
              </button>
              <button
                className="pill-button"
                type="submit"
                disabled={orderStatus === 'processing'}
                onClick={handleSubmit}
              >
                {orderStatus === 'processing' ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          ) : (
            <button
              className="pill-button wide"
              type="button"
              disabled={items.length === 0}
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
          )}
        </footer>
      </aside>
    </>
  )
}

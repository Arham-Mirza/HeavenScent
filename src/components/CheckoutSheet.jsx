import { useEffect, useState } from 'react'

const initialForm = {
  fullName: '',
  phone: '',
  city: '',
  address: '',
  notes: '',
}

export default function CheckoutSheet({ isOpen, items, total, onClose, onSubmit, status }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const disabled = !items.length || status === 'processing'
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (disabled) return
    onSubmit(form)
  }

  return (
    <div className="checkout-sheet" role="dialog" aria-modal="true" aria-label="Cash on delivery checkout">
      <div className="checkout-card">
        <div className="checkout-head">
          <div>
            <p className="eyebrow">Finalize COD request</p>
            <h3>Delivery information</h3>
          </div>
          <button className="ghost-button" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="panel-subtitle">
          Cash on delivery is the default payment method. We will verify via phone before dispatch.
        </p>
        <form className="checkout-form" onSubmit={handleSubmit}>
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
          <div className="checkout-summary">
            <div>
              <span>Items: </span>
              <strong>{items.length}</strong>
            </div>
            <div>
              <span>Total: </span>
              <strong>{currency.format(total)}</strong>
            </div>
          </div>
          <button className="pill-button" type="submit" disabled={disabled}>
            {status === 'processing' ? 'Reserving order…' : 'Place cash on delivery order'}
          </button>
        </form>
      </div>
    </div>
  )
}

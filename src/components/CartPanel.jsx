import { Fragment } from 'react'

export default function CartPanel({
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  orderStatus,
  receipt,
}) {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const formattedTotal = currency.format(total)

  return (
    <section className="cart-panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Boutique cart</p>
          <h2>Cash on delivery checkout</h2>
          <p className="panel-subtitle">Reserve your bottles and settle upon delivery.</p>
        </div>
      </header>

      {items.length === 0 ? (
        <p className="status-line">Your cart is empty. Add a fragrance to begin.</p>
      ) : (
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <p className="cart-name">{item.name}</p>
                <span className="cart-price">{currency.format(item.price)}</span>
              </div>
              <div className="cart-qty">
                <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Reduce ${item.name}`}>
                  –
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name}`}>
                  +
                </button>
                <button className="cart-remove" type="button" onClick={() => onRemove?.(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <span>Estimated total</span>
        <strong>{formattedTotal}</strong>
      </div>

      <button
        className="pill-button wide"
        type="button"
        disabled={!items.length || orderStatus === 'processing'}
        onClick={onCheckout}
      >
        {orderStatus === 'processing' ? 'Preparing COD slip…' : 'Checkout · Cash on delivery'}
      </button>

      {orderStatus === 'success' && receipt && (
        <div className="receipt-card" aria-live="polite">
          <p className="eyebrow">Order confirmed</p>
          <h3>Reference {receipt.reference}</h3>
          <p className="panel-subtitle">We will call to confirm delivery and payment in cash.</p>
          <ul>
            {receipt.items.map((entry) => (
              <Fragment key={entry.id}>
                <li className="receipt-row">
                  <span>
                    {entry.name} · x{entry.qty}
                  </span>
                  <span>{currency.format(entry.price * entry.qty)}</span>
                </li>
              </Fragment>
            ))}
          </ul>
          <div className="receipt-total">
            <span>Total due on delivery</span>
            <strong>{currency.format(receipt.total)}</strong>
          </div>
          <p className="status-line">Delivery contact: {receipt.fullName} · {receipt.phone}</p>
        </div>
      )}
    </section>
  )
}

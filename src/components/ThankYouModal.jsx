export default function ThankYouModal({ open, receipt, onClose }) {
  if (!open || !receipt) return null

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className="thankyou-overlay" role="alertdialog" aria-modal="true" aria-label="Order confirmation">
      <div className="thankyou-card">
        <p className="eyebrow">Thank you</p>
        <h3>Your order is Placed!</h3>
        <p className="panel-subtitle">Reference {receipt.reference}. Package will be delivered within 2-5 business days.</p>
        <ul className="thankyou-items">
          {receipt.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} · x{item.qty}
              </span>
              <span>{currency.format(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="status-line">Cash due on delivery: {currency.format(receipt.total)}</p>
        <button className="pill-button" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

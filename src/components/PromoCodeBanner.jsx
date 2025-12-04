import { useState } from 'react'

export default function PromoCodeBanner() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('HEAVEN10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="promo-banner" aria-label="Promotional offer">
      <div className="promo-content">
        <div className="promo-text">
          <p className="eyebrow">Limited time offer</p>
          <h3>Save 10% on your first order</h3>
          <p className="promo-subtitle">Use code at checkout for an exclusive discount on all fragrances.</p>
        </div>
        <div className="promo-code-wrapper">
          <div className="promo-code-display">
            <span className="promo-code-label">Promo Code</span>
            <code className="promo-code">HEAVEN10</code>
          </div>
          <button className="pill-button" type="button" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </section>
  )
}

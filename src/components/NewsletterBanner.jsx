import { useState } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(true)
  const [status, setStatus] = useState('idle')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!consent) return
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 600)
  }

  return (
    <section className="newsletter-panel" aria-label="Newsletter subscription">
      <div>
        <p className="eyebrow">Stay in the know</p>
        <h2>Receive private drops & early access</h2>
        <p className="panel-subtitle">One curated email per month, featuring limited releases and care rituals.</p>
      </div>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="yourname@email.com"
          required
        />
        <button className="pill-button" type="submit" disabled={status === 'submitting'}>
          {status === 'success' ? 'Subscribed' : status === 'submitting' ? 'Adding…' : 'Notify me'}
        </button>
        <label className="consent-row">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>I agree to receive emails from HeavenScent. Unsubscribe anytime.</span>
        </label>
        {status === 'success' && <p className="status-line">Welcome — first update arrives soon.</p>}
      </form>
    </section>
  )
}

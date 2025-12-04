import { useState } from 'react'

export default function SupportHub() {
  const [message, setMessage] = useState({ name: '', email: '', topic: 'Order', body: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setMessage((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setMessage({ name: '', email: '', topic: 'Order', body: '' })
    }, 700)
  }

  return (
    <section className="support-panel" aria-label="Customer support">
      <div className="support-grid">
        <div className="support-card support-card--info">
          <p className="eyebrow">Concierge chat</p>
          <h3>Live assistance</h3>
          <p className="panel-subtitle">Mon–Sat · 9a–9p EST. Connect with a HeavenScent specialist instantly.</p>
          <div className="contact-actions">
            <a className="pill-button" href="https://wa.me/+971503659139" target="_blank" rel="noreferrer">
              Start WhatsApp chat
            </a>
            <a className="ghost-button" href="tel:+971503659139">
              Call +971 50 365 9139
            </a>
          </div>
          <p className="status-line">Prefer email? Leave a note and we reply within 1 business day.</p>
        </div>
        <form className="support-card support-card--form" onSubmit={handleSubmit}>
          <p className="eyebrow">Contact form</p>
          <h3>Message us</h3>
          <label>
            Name
            <input name="name" value={message.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={message.email} onChange={handleChange} required />
          </label>
          <label>
            Topic
            <select name="topic" value={message.topic} onChange={handleChange}>
              <option value="Order">Order status</option>
              <option value="Consultation">Fragrance consultation</option>
              <option value="Care">Care & storage</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="body"
              value={message.body}
              onChange={handleChange}
              rows={3}
              required
              placeholder="Tell us how we can help"
            />
          </label>
          <button className="pill-button" type="submit" disabled={status === 'sending'}>
            {status === 'sent' ? 'Message delivered' : status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  )
}

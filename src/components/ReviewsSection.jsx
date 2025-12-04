import { useMemo, useState } from 'react'

export default function ReviewsSection({ fragranceId, fragranceName, reviews, onSubmit }) {
  const [form, setForm] = useState({ name: '', title: '', comment: '', rating: 5 })

  const relevantReviews = useMemo(
    () => reviews.filter((review) => review.fragranceId === fragranceId),
    [reviews, fragranceId],
  )

  const averageRating = useMemo(() => {
    if (!relevantReviews.length) return null
    const total = relevantReviews.reduce((sum, review) => sum + review.rating, 0)
    return (total / relevantReviews.length).toFixed(1)
  }, [relevantReviews])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!fragranceId) return
    onSubmit({ ...form, rating: Number(form.rating) })
    setForm({ name: '', title: '', comment: '', rating: 5 })
  }

  return (
    <section className="reviews-panel" aria-label="Customer reviews">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Reviews & ratings</p>
          <h2>{fragranceName ? `${fragranceName}` : 'Select a fragrance'}</h2>
          <p className="panel-subtitle">Share impressions with the community.</p>
        </div>
        {averageRating && (
          <div className="rating-pill">
            <span>{averageRating}</span>
            <small>/ 5 from {relevantReviews.length} reviews</small>
          </div>
        )}
      </header>

      <div className="reviews-grid">
        <div className="reviews-list">
          {relevantReviews.length === 0 && <p className="status-line">Be the first to review this fragrance.</p>}
          {relevantReviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-header">
                <strong>{review.title}</strong>
                <span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
              </div>
              <p className="review-body">{review.comment}</p>
              <div className="review-meta">
                <span>{review.name}</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </article>
          ))}
        </div>
        <form className="review-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
          </label>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Headline" />
          </label>
          <label>
            Rating
            <select name="rating" value={form.rating} onChange={handleChange}>
              {[5, 4, 3, 2, 1].map((score) => (
                <option key={score} value={score}>
                  {score} Star{score > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </label>
          <label>
            Review
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Share longevity, projection, layering tips, etc."
            />
          </label>
          <button className="pill-button" type="submit" disabled={!fragranceId}>
            Submit review
          </button>
        </form>
      </div>
    </section>
  )
}

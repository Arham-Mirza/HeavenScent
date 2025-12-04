import { useEffect } from 'react'
import BottleMockup from './BottleMockup.jsx'

const AUTO_ADVANCE_MS = 6400

export default function HeroCarousel({ slides, activeId, onActiveChange, onAddToCart }) {
  const foundIndex = slides.findIndex((slide) => slide.id === activeId)
  const activeIndex = foundIndex === -1 ? 0 : foundIndex
  const activeSlide = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    if (!slides.length) return undefined

    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length
      onActiveChange(slides[nextIndex].id)
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(timer)
  }, [activeIndex, slides, onActiveChange])

  return (
    <section className="hero" aria-label="Trending fragrances">
      <div
        className="hero-backdrop"
        style={{
          background: `radial-gradient(circle at 18% -5%, ${activeSlide.palette.accent} 0%, transparent 45%), linear-gradient(120deg, ${activeSlide.palette.backdrop[0]}, ${activeSlide.palette.backdrop[1]}, ${activeSlide.palette.backdrop[2]})`,
        }}
      />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Trending fragrances</p>
          <h1 className="hero-title">{activeSlide.name}</h1>
          <p className="hero-tagline">{activeSlide.tagline}</p>
          <p className="hero-copytext">{activeSlide.copy}</p>
          <div className="hero-meta">
            <div className="stat-pair">
              <span className="stat-label">Sillage</span>
              <span className="stat-value">{activeSlide.stats.sillage}</span>
            </div>
            <div className="stat-pair">
              <span className="stat-label">Longevity</span>
              <span className="stat-value">{activeSlide.stats.longevity}</span>
            </div>
            <div className="stat-pair">
              <span className="stat-label">Edition</span>
              <span className="stat-value">{activeSlide.priceLabel}</span>
            </div>
          </div>
          <div className="hero-actions">
            <button className="pill-button" type="button" onClick={() => onAddToCart?.(activeSlide)}>
              Add to Cart
            </button>
          </div>
          <div className="hero-slider" role="tablist" aria-label="Trending fragrance selector">
            {slides.map((slide) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={slide.id === activeId}
                className={`list-item ${slide.id === activeId ? 'active' : ''}`}
                onClick={() => onActiveChange(slide.id)}
                type="button"
              >
                <span>{slide.name}</span>
                <small>{slide.tagline}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <BottleMockup
            palette={activeSlide.palette}
            label={activeSlide.name}
            house={activeSlide.house}
            image={activeSlide.image}
          />
          <div className="carousel-dots">
            {slides.map((slide, index) => (
              <span key={slide.id} className={`dot ${index === activeIndex ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

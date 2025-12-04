export default function BottleMockup({ palette, label, house, image }) {
  const hasPhoto = Boolean(image)

  return (
    <figure className={`bottle-stack ${hasPhoto ? 'bottle-stack--photo' : ''}`} aria-label={`${label} bottle mockup`}>
      <div
        className="bottle-glow"
        style={{
          background: `radial-gradient(circle, ${palette.accent} 0%, transparent 65%)`,
        }}
      />
      {hasPhoto ? (
        <img className="bottle-photo" src={image} alt={`${label} bottle`} loading="lazy" />
      ) : (
        <div className="bottle-outline">
          <div className="bottle-cap" style={{ background: palette.secondary }} />
          <div className="bottle-neck" />
          <div className="bottle-body" style={{ background: palette.glass }}>
            <div
              className="bottle-liquid"
              style={{
                background: `linear-gradient(160deg, ${palette.liquid}, ${palette.primary})`,
              }}
            />
            <div className="bottle-label">
              <p>{label}</p>
              <span>{house}</span>
            </div>
          </div>
        </div>
      )}
    </figure>
  )
}

import { useEffect, useState } from 'react'
import { fetchFragranceProfile } from '../services/fragranceNotesApi.js'

const noteOrder = ['top', 'heart', 'base']

export default function FragranceNotes({ fragrance }) {
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!fragrance) return undefined

    let ignore = false
    setStatus('loading')
    setError(null)

    fetchFragranceProfile(fragrance.id)
      .then((data) => {
        if (ignore) return
        setProfile(data)
        setStatus('ready')
      })
      .catch((err) => {
        if (ignore) return
        setError(err.message)
        setStatus('error')
      })

    return () => {
      ignore = true
    }
  }, [fragrance])

  const title = fragrance?.name ?? 'Fragrance'

  return (
    <section className="notes-panel" aria-live="polite">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Notes & accords</p>
          <h2>{title}</h2>
          <p className="panel-subtitle">Curated breakdown of its architecture.</p>
        </div>
        <div className="panel-meta">
          <span>{fragrance?.stats?.sillage}</span>
          <span>{fragrance?.stats?.longevity}</span>
        </div>
      </div>

      {status === 'loading' && <p className="status-line">Calibrating accords…</p>}
      {status === 'error' && (
        <p className="status-line error">
          We could not load the notes. {error ?? 'Please try again.'}
        </p>
      )}

      {status === 'ready' && profile && (
        <div className="notes-content">
          <div className="notes-columns">
            {noteOrder.map((tier) => (
              <div key={tier} className="note-column">
                <p className="column-title">{tier === 'heart' ? 'Heart' : tier.charAt(0).toUpperCase() + tier.slice(1)}</p>
                <div className="notes-grid">
                  {(profile.notes[tier] ?? []).map((note) => (
                    <span key={note} className="note-pill">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="accord-grid">
            {profile.accords.map((accord) => (
              <div key={accord.name} className="accord-chip">
                <div className="accord-label">
                  <span>{accord.name}</span>
                  <small>{accord.intensity}%</small>
                </div>
                <div className="accord-meter">
                  <span
                    className="meter-fill"
                    style={{ width: `${accord.intensity}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rating-bars">
            <div className="rating-bar">
              <span>Longevity</span>
              <div className="rating-track">
                <span className="rating-fill" style={{ width: `${profile.rating.longevity * 100}%` }} />
              </div>
            </div>
            <div className="rating-bar">
              <span>Sillage</span>
              <div className="rating-track">
                <span className="rating-fill" style={{ width: `${profile.rating.sillage * 100}%` }} />
              </div>
            </div>
          </div>

          <p className="story-blurb">{profile.story}</p>
        </div>
      )}
    </section>
  )
}

const NOTES_ENDPOINT = '/api/fragrance-notes.json'

export async function fetchFragranceProfile(id) {
  const response = await fetch(NOTES_ENDPOINT, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error('Unable to load fragrance notes.')
  }

  const payload = await response.json()
  const profile = payload.fragrances.find((item) => item.id === id)

  if (!profile) {
    throw new Error('Fragrance profile not found.')
  }

  return profile
}

export async function submitAccordSuggestion(id, suggestion) {
  await new Promise((resolve) => setTimeout(resolve, 520))

  return {
    id,
    ...suggestion,
    submittedAt: new Date().toISOString(),
    status: 'queued',
  }
}

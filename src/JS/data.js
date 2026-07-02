export async function loadItems() {
  const response = await fetch('/data/items.json')

  if (!response.ok) {
    throw new Error('Unable to load catalog items.')
  }

  return response.json()
}

const API_URL = `${import.meta.env.VITE_CSL_API_URL}`
const API_SUBSCRIPTION_KEY = `${import.meta.env.VITE_CSL_API_SUBSCRIPTION_KEY}`

function areParamsValid(searchParams) {
  const { name, full_address } = searchParams
  return (name.length > 0 || full_address.length > 0)
}

function getSearchUrl(searchParams) {
  const searchParamsString = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  return `${API_URL}?${searchParamsString}`
}

export function getParams(request) {
  const url = new URL(request.url);
  const name = (url.searchParams.get('name') ?? '').trim()
  let fuzzy_name = (url.searchParams.get('fuzzy_name') ?? url.searchParams.get('fuzzyName') ?? '').trim()
  fuzzy_name = (fuzzy_name === 'true') ? 'true' : ''
  const full_address = (url.searchParams.get('full_address') ?? '').trim()
  return { name, fuzzy_name, full_address }
}

export async function getEntries(searchParams) {
  if (areParamsValid(searchParams)) {
    return fetch(getSearchUrl(searchParams), {
      headers: {
        'subscription-key': API_SUBSCRIPTION_KEY
      }
    }).then(response => response.json())
  } else {
    return { results: [] }
  }


}

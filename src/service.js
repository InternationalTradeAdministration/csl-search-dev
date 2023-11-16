const API_URL = `${import.meta.env.VITE_CSL_API_URL}`
const API_SUBSCRIPTION_KEY = `${import.meta.env.VITE_CSL_API_SUBSCRIPTION_KEY}`

export function areParamsValid(searchParams) {
  const { name, full_address } = searchParams ?? { name: '', full_address: '' }
  return ((name?.length > 0) || (full_address?.length > 0))
}

export function getSearchParamsString(searchParams) {
  return Object.entries(searchParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
}

function getSearchUrl(searchParams) {
  return `${API_URL}?${getSearchParamsString(searchParams)}`
}

export function filterParams(searchParams) {
  const filteredEntries = Object.entries(searchParams)
    .filter(([, value]) => String(value).length > 0)
  return Object.fromEntries(filteredEntries)
}

export function getParams(request) {
  const url = new URL(request.url);
  const name = (url.searchParams.get('name') ?? '').trim()
  let fuzzy_name = (url.searchParams.get('fuzzy_name') ?? url.searchParams.get('fuzzyName') ?? '').trim()
  fuzzy_name = (fuzzy_name === 'true') ? 'true' : ''
  const full_address = (url.searchParams.get('full_address') ?? '').trim()
  const offset = Number.parseInt((url.searchParams.get('offset') ?? '0').trim()) || 0
  return { name, fuzzy_name, full_address, offset }
}

async function fakeNetwork() {
  return new Promise((res) => setTimeout(res, 3000))
}

export async function getResponse(searchParams) {
  if (areParamsValid(searchParams)) {
    return fetch(getSearchUrl(searchParams), {
      headers: {
        'subscription-key': API_SUBSCRIPTION_KEY
      }
    })
      .then(response => response.json())
    // .then((json) => new Promise(resolve => setTimeout(resolve, 2000, json)))
  } else {
    return { results: [] }
  }


}

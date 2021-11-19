/* eslint-disable no-underscore-dangle */
import debounce from 'lodash.debounce'

export function startTracking(router) {
  router.events.on('routeChangeComplete', (path, { shallow }) => {
    const [pathname] = path.split('?')
    setTimeout(() => {
      window._paq = window._paq || []
      window._paq.push(['setCustomUrl', pathname])
      window._paq.push(['setDocumentTitle', document.title])
      window._paq.push(['deleteCustomVariables', 'page'])
      // exclude router changes because of changing search query, which are shallow
      if (!shallow) {
        window._paq.push(['trackPageView'])
      }
    }, 0)
  })
}

export function trackSearchQuery(query, category) {
  const throttleTrackSearch = debounce(() => {
    window._paq = window._paq || []
    window._paq.push(['trackSiteSearch', query, category])
  }, 500)

  if (query !== '') {
    throttleTrackSearch()
  }

  return throttleTrackSearch
}

export function pushCustomEvent(category, action, name, value) {
  window._paq = window._paq || []
  window._paq.push(['trackEvent', category, action, name, value])
}

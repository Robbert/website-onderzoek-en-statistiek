/* eslint-disable no-underscore-dangle */
import debounce from 'lodash.debounce'

export function startTracking(router) {
  // console.log('start tracking')
  router.events.on('routeChangeComplete', (path, { shallow }) => {
    window._paq = window._paq !== null ? window._paq : []
    const [pathname] = path.split('?')
    setTimeout(() => {
      window._paq.push(['setCustomUrl', pathname])
      window._paq.push(['setDocumentTitle', document.title])
      window._paq.push(['deleteCustomVariables', 'page'])
      // exclude router changes because of changing search query, which are shallow
      if (!shallow) {
        window._paq.push(['trackPageView'])
        // console.log(`tracked pageview ${pathname}`)
      }
    }, 0)
  })
}

export function trackSearchQuery(query, category) {
  const throttleTrackSearch = debounce(() => {
    window._paq = window._paq !== null ? window._paq : []
    window._paq.push(['trackSiteSearch', query, category])
    // console.log(`tracked query ${query} with category ${category}`)
  }, 500)

  if (query !== '') {
    throttleTrackSearch()
  }

  return throttleTrackSearch
}

export function pushCustomEvent(args) {
  if (!window._paq) {
    window._paq = []
  }
  window._paq.push(args)
}

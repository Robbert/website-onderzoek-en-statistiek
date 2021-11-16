/* eslint-disable */
window.PiwikPROappID = window.location.hostname === 'onderzoek.amsterdam.nl' || window.location.hostname === 'statistiek.amsterdam.nl' ? 'a1383017-e0e9-4180-bc21-8cb1153868dd' : '10cba8fb-35ef-4691-b52e-3d927ad78eed';
(function (window, document, dataLayerName, id) {
  window[dataLayerName] = window[dataLayerName] || [], window[dataLayerName].push({ start: (new Date()).getTime(), event: 'stg.start' })
  const scripts = document.getElementsByTagName('script')[0]; const tags = document.createElement('script')
  function stgCreateCookie(a, b, c) { let d = ''; if (c) { const e = new Date(); e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), d = `; expires=${e.toUTCString()}` }document.cookie = `${a}=${b}${d}; path=/` }
  const isStgDebug = (window.location.href.match('stg_debug') || document.cookie.match('stg_debug')) && !window.location.href.match('stg_disable_debug')
  stgCreateCookie('stg_debug', isStgDebug ? 1 : '', isStgDebug ? 14 : -1)
  const qP = []; dataLayerName !== 'dataLayer' && qP.push(`data_layer_name=${dataLayerName}`), isStgDebug && qP.push('stg_debug')
  const qPString = qP.length > 0 ? (`?${qP.join('&')}`) : ''
  tags.async = !0, tags.src = `https://onderzoek-en-statistiek.containers.piwik.pro/${id}.js${qPString}`, scripts.parentNode.insertBefore(tags, scripts)
  !(function (a, n, i) {
    a[n] = a[n] || {}
    for (let c = 0; c < i.length; c++)!(function (i) { a[n][i] = a[n][i] || {}, a[n][i].api = a[n][i].api || function () { const a = [].slice.call(arguments, 0); typeof a[0] === 'string' && window[dataLayerName].push({ event: `${n}.${i}:${a[0]}`, parameters: [].slice.call(arguments, 1) }) } }(i[c]))
  }(window, 'ppms', ['tm', 'cm']))
}(window, document, 'dataLayer', window.PiwikPROappID))

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '@amsterdam/asc-ui'

import * as Styled from './IFrame.style'
import ALLOWED_DOMAINS from '~/constants/allowedDomains'

const IFrame = ({ src, title }) => {
  const [loading, setLoading] = useState(true)
  const [height, setHeight] = useState(0)
  const ref = useRef()

  const router = useRouter()

  function handlePostMessage({ action, payload }) {
    switch (action) {
      case 'updateHeight':
        setHeight(payload)
        break
      case 'updateRouter':
        router.push(
          {
            query: {
              slug: router.query.slug, // get slug from router
              ...Object.fromEntries(
                new URLSearchParams(window.location.search),
              ), // get current url params from window.location.search (necessary for back button stuff)
              ...payload, // overwrite whatever's there with query sent from iframe
            },
          },
          undefined,
          { shallow: true, scroll: false },
        )
        break
      default:
        throw new Error('undefined action')
    }
  }

  useEffect(() => {
    function onMessage({ origin, data }) {
      // don't do anything with the event if it's not whitelisted
      if (
        !(
          origin.startsWith('http://localhost') &&
          process.env.NODE_ENV === 'development'
        ) &&
        !ALLOWED_DOMAINS.find((domain) => origin.startsWith(domain))
      ) {
        return
      }

      /*
        Temporarily also allow a string starting with 'documentHeight',
        so we won't break older interactives that don't follow this reducer pattern.
        Update these older interactives so this can be removed.
      */

      let message = data

      const prefix = 'documentHeight:'

      if (typeof data === 'string' && data.includes(prefix)) {
        message = {
          action: 'updateHeight',
          payload: Number(data.split(prefix)[1]),
        }
      }

      handlePostMessage(message)
    }

    window.addEventListener('message', onMessage)

    return () => window.removeEventListener('message', onMessage)
  }, [])

  // post query string to iframe when router.query changes
  // posting the query object here causes a rerender loop in the iframe
  useEffect(() => {
    if (!loading) {
      ref.current.contentWindow.postMessage(
        {
          action: 'updateUrlQuery',
          payload: window.location.search,
        },
        '*',
      )
    }
  }, [router.query, loading])

  return (
    <Styled.IFrameContainer>
      {loading && <Spinner />}
      <iframe
        ref={ref}
        src={src}
        title={title}
        onLoad={() => setLoading(false)}
        width="100%"
        height={height}
        frameBorder="0"
        allow="clipboard-read; clipboard-write"
      />
    </Styled.IFrameContainer>
  )
}

export default IFrame

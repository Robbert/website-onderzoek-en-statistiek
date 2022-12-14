import { useState, useEffect } from 'react'
import { Icon } from '@amsterdam/asc-ui'
import {
  Facebook,
  Twitter,
  Linkedin,
  Email,
  Print,
} from '@amsterdam/asc-assets'

import { pushCustomEvent } from '../../lib/analyticsUtils'
import * as Styled from './ShareButtons.style'

const ShareButtons = () => {
  const [shareLinkObject, setShareLinkObject] = useState()

  useEffect(() => {
    setShareLinkObject({
      href: window.location.href,
      title: window.document.title,
    })
  }, [])

  return (
    <Styled.List>
      <li>
        <Styled.Button
          type="button"
          variant="blank"
          title="Deel op Facebook"
          aria-label="Deel op Facebook"
          onClick={() => {
            pushCustomEvent(
              'Share',
              'Facebook',
              shareLinkObject.href.split('/').pop(),
            )
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${shareLinkObject.href}`,
              '_blank',
            )
          }}
        >
          <Icon size={20}>
            <Facebook />
          </Icon>
        </Styled.Button>
      </li>
      <li>
        <Styled.Button
          type="button"
          variant="blank"
          title="Deel op Twitter"
          aria-label="Deel op Twitter"
          onClick={() => {
            pushCustomEvent(
              'Share',
              'Twitter',
              shareLinkObject.href.split('/').pop(),
            )
            window.open(
              `https://twitter.com/intent/tweet?url=${shareLinkObject.href}`,
              '_blank',
            )
          }}
        >
          <Icon size={20}>
            <Twitter />
          </Icon>
        </Styled.Button>
      </li>
      <li>
        <Styled.Button
          type="button"
          variant="blank"
          title="Deel op LinkedIn"
          aria-label="Deel op LinkedIn"
          onClick={() => {
            pushCustomEvent(
              'Share',
              'LinkedIn',
              shareLinkObject.href.split('/').pop(),
            )
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${shareLinkObject.href}`,
              '_blank',
            )
          }}
        >
          <Icon size={20}>
            <Linkedin />
          </Icon>
        </Styled.Button>
      </li>
      <li>
        <Styled.Button
          type="button"
          variant="blank"
          title="Deel via mail"
          aria-label="Deel deel via mail"
          onClick={() => {
            pushCustomEvent(
              'Share',
              'Mail',
              shareLinkObject.href.split('/').pop(),
            )
            window.open(
              `mailto:?subject=${shareLinkObject.title}&body=Zie: ${escape(
                shareLinkObject.href,
              )}`,
              '_self',
            )
          }}
        >
          <Icon size={20}>
            <Email />
          </Icon>
        </Styled.Button>
      </li>
      <li>
        <Styled.Button
          type="button"
          variant="blank"
          title="Print deze pagina"
          aria-label="Print deze pagina"
          onClick={() => {
            pushCustomEvent(
              'Share',
              'Print',
              shareLinkObject.href.split('/').pop(),
            )
            window.print()
          }}
        >
          <Icon size={20}>
            <Print />
          </Icon>
        </Styled.Button>
      </li>
    </Styled.List>
  )
}

export default ShareButtons

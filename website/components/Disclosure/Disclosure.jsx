import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from '@amsterdam/asc-assets'

import Button from '../Button/Button'
import { pushCustomEvent } from '../../lib/analyticsUtils'
import * as Styled from './Disclosure.style'

const Disclosure = ({
  id,
  children,
  url,
  buttonVariant,
  buttonStyle,
  buttonSmall,
}) => {
  const ref = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      ref.current.focus()
    }
  }, [isOpen])

  return (
    <>
      <Styled.Container id={id} isOpen={isOpen} ref={ref} tabIndex="-1">
        {children}
      </Styled.Container>
      <Button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen)
          pushCustomEvent('Interaction', 'Show more/less', url)
        }}
        aria-expanded={isOpen}
        aria-controls={id}
        style={buttonStyle}
        variant={buttonVariant}
        small={buttonSmall}
      >
        <Styled.Icon isOpen={isOpen}>
          <ChevronDown />
        </Styled.Icon>
        {isOpen ? 'Toon minder' : 'Toon meer'}
      </Button>
    </>
  )
}

export default Disclosure

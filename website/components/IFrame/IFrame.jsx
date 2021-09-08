import { useEffect, useState } from 'react'
import { Spinner } from '@amsterdam/asc-ui'

import * as Styled from './IFrame.style'

const IFrame = ({ src, title }) => {
  const [loading, setLoading] = useState(true)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    function onMessage({ data }) {
      const prefix = 'documentHeight:'

      if (typeof data !== 'string' || !data.includes(prefix)) {
        return
      }

      setHeight(Number(data.split(prefix)[1]))
    }

    window.addEventListener('message', onMessage)

    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <Styled.IFrameContainer>
      {loading && <Spinner />}
      <iframe
        src={src}
        title={title}
        onLoad={() => setLoading(false)}
        width="100%"
        height={height}
        frameBorder="0"
      />
    </Styled.IFrameContainer>
  )
}

export default IFrame

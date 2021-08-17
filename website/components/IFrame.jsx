import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Spinner } from '@amsterdam/asc-ui'

const IFrameContainer = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  & iframe {
    min-height: 100vh;
  }
`

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
    <IFrameContainer>
      {loading && <Spinner />}
      <iframe
        src={src}
        title={title}
        onLoad={() => setLoading(false)}
        width="100%"
        height={height}
        frameBorder="0"
      />
    </IFrameContainer>
  )
}

export default IFrame

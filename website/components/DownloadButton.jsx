import {
  Button,
  Spinner,
} from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'
import styled from 'styled-components'

import {
  getStrapiMedia,
  formatBytes,
} from '../lib/utils'
import useDownload from '../lib/useDownload'

const StyledButton = styled(Button)`
  width: 100%;
  justify-content: center;
  align-items: end;
  margin-bottom: 36px;
`

const DownloadButton = ({ file }) => {
  const [, downloadLoading, downloadFile] = useDownload()

  return (
    <StyledButton
      variant="primary"
      iconSize={20}
      iconLeft={downloadLoading ? <Spinner /> : <Download />}
      onClick={() => { downloadFile(getStrapiMedia(file)) }}
    >
      {`Download pdf (${formatBytes(file.size * 1000)})`}
    </StyledButton>
  )
}

export default DownloadButton

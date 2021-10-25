import { Spinner } from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'

import { getStrapiMedia, formatBytes } from '../../lib/utils'
import useDownload from '../../lib/useDownload'
import * as Styled from './DownloadButton.style'

const DownloadButton = ({ file }) => {
  const [, downloadLoading, downloadFile] = useDownload()

  return (
    <Styled.Button
      variant="primary"
      iconSize={20}
      iconLeft={downloadLoading ? <Spinner /> : <Download />}
      onClick={() => { downloadFile(getStrapiMedia(file)) }}
    >
      {`Download pdf (${formatBytes(file.size * 1000)})`}
    </Styled.Button>
  )
}

export default DownloadButton

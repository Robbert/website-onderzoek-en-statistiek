import { Spinner } from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'

import Button from '../Button/Button'
import useDownload from '../../lib/useDownload'
import * as Styled from './DownloadButton.style'

const DownloadButton = ({
  url, children, ...otherProps
}) => {
  const [, downloadLoading, downloadFile] = useDownload()

  return (
    <Button
      onClick={() => { downloadFile(url) }}
      {...otherProps}
    >
      <Styled.Icon size={20}>
        {downloadLoading ? <Spinner /> : <Download />}
      </Styled.Icon>
      {children}
    </Button>
  )
}

export default DownloadButton

import { Spinner } from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'

import Button from '../Button/Button'
import useDownload from '../../lib/useDownload'
import { pushCustomEvent } from '../../lib/analyticsUtils'
import * as Styled from './DownloadButton.style'

const DownloadButton = ({
  url,
  type = 'publication',
  iconSize = 20,
  children,
  ...otherProps
}) => {
  const [, downloadLoading, downloadFile] = useDownload()

  return (
    <Button
      type="button"
      onClick={() => {
        pushCustomEvent('Download', type, url.split('/').pop())
        downloadFile(url)
      }}
      {...otherProps}
    >
      <Styled.Icon size={iconSize}>
        {downloadLoading ? <Spinner /> : <Download />}
      </Styled.Icon>
      {children}
    </Button>
  )
}

export default DownloadButton

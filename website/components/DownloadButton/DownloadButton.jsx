import { Spinner } from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'

// import Button from '../Button/Button'
import { Button as CommunityButton } from '@utrecht/component-library-react'

import useDownload from '../../lib/useDownload'
import { pushCustomEvent } from '../../lib/analyticsUtils'
import * as Styled from './DownloadButton.style'

const DownloadButton = ({
  url,
  fileName,
  type = 'publication',
  iconSize = 20,
  variant,
  children,
  ...otherProps
}) => {
  const [, downloadLoading, downloadFile] = useDownload()

  return (
    <CommunityButton
      appearance={
        variant === 'textButton' ? 'subtle-button' : 'primary-action-button'
      }
      busy={downloadLoading}
      type="button"
      onClick={() => {
        pushCustomEvent(
          'Download',
          type,
          type === 'csv' ? fileName : url.split('/').pop(),
        )
        downloadFile(url, {}, fileName || url.split('/').pop())
      }}
      {...otherProps}
    >
      <Styled.Icon size={iconSize}>
        {downloadLoading ? <Spinner /> : <Download />}
      </Styled.Icon>
      {children}
    </CommunityButton>
  )
}

export default DownloadButton

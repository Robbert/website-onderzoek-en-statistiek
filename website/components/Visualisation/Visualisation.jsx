import { useState, useEffect, useRef } from 'react'
import NextImage from 'next/image'
import slugify from 'slugify'
import { Download } from '@amsterdam/asc-assets'
import { LinkButton as CommunityLinkButton } from '@utrecht/component-library-react'

import { GridItem } from '~/components/Grid/Grid.style'
import VegaVisualisation from '../VegaVisualisation/VegaVisualisation'
import {
  getStrapiMedia,
  PLACEHOLDER_IMAGE,
  translateColor,
  handleDownloadImage,
} from '~/lib/utils'
import { pushCustomEvent } from '~/lib/analyticsUtils'
import * as Styled from './Visualisation.style'

const Visualisation = ({
  title,
  text,
  source,
  image,
  variant,
  color,
  altText,
  specification,
  selectorLabel,
  panel: panels,
}) => {
  const [downloadDataUrl, setDownloadDataUrl] = useState()
  const [selectedPanelID, setSelectedPanelID] = useState(
    panels && panels[0]?.id,
  )

  const visRef = useRef()
  const filename = title
    ? slugify(title, { lower: true, strict: true })
    : 'visualisatie'

  const selectedPanel = panels
    ? panels.find(({ id }) => id === selectedPanelID)
    : {
        text,
        source,
        image,
        altText,
        specification,
      }

  useEffect(() => {
    if (!selectedPanel?.specification?.data) {
      setDownloadDataUrl(null)
      return
    }

    const { values, url } = selectedPanel.specification.data

    if (values) {
      const keys = Object.keys(values[0])
      const commaSeparatedString = [
        keys.join(','),
        values.map((row) => keys.map((key) => row[key]).join(',')).join('\n'),
      ].join('\n')
      setDownloadDataUrl(URL.createObjectURL(new Blob([commaSeparatedString])))
    }
    if (typeof url === 'string' && url.includes('format=json')) {
      setDownloadDataUrl(url.replace('format=json', 'format=csv'))
    }
  }, [selectedPanelID])

  return (
    // TODO: add layout for variants with text left or right from image

    <Styled.Grid
      verticalPadding={0}
      horizontalPadding={0}
      variant={variant}
      ref={visRef}
    >
      <GridItem
        colStart={{ small: 1, large: 3 }}
        colRange={{ small: 4, large: 8 }}
        rowStart={1}
      >
        {title && (
          <Styled.Heading forwardedAs="h2" styleAs="h5" gutterBottom={40}>
            {title}
          </Styled.Heading>
        )}
      </GridItem>

      {variant === 'kleurenbalk' && (
        <Styled.ColorBar
          colStart={{ small: 1, large: 1 }}
          colRange={{ small: 4, large: 12 }}
          rowStart={3}
          backgroundColor={translateColor(color || 'lichtblauw')}
          data-html2canvas-ignore
        />
      )}

      <GridItem
        colStart={
          variant === 'kleurenbalk'
            ? { small: 1, large: 2 }
            : { small: 1, large: 3 }
        }
        colRange={
          variant === 'kleurenbalk'
            ? { small: 4, large: 10 }
            : { small: 4, large: 8 }
        }
        rowStart={2}
      >
        {selectedPanel && selectedPanel.image && (
          <NextImage
            src={getStrapiMedia(selectedPanel.image)}
            alt={selectedPanel.altText}
            width={selectedPanel.image.width}
            height={selectedPanel.image.height}
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE}
            priority
            sizes="(max-width: 840px) 840px, 920px"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        )}
        {selectedPanel?.specification && (
          <VegaVisualisation specification={selectedPanel.specification} />
        )}
        {panels?.length > 1 && (
          <Styled.Label>
            <Styled.LabelText>{selectorLabel}</Styled.LabelText>
            <Styled.Select
              value={selectedPanelID}
              onChange={(e) => setSelectedPanelID(+e.target.value)}
            >
              {panels.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </Styled.Select>
          </Styled.Label>
        )}
        <Styled.VisualisationFooter>
          {selectedPanel?.source && (
            <Styled.Source
              small
              variant={variant}
              backgroundColor={variant === 'kleurenbalk' && color}
            >
              {`Bron: ${selectedPanel.source}`}
            </Styled.Source>
          )}
          <CommunityLinkButton
            type="button"
            onClick={() => {
              pushCustomEvent('Download', 'visualisation', filename)
              handleDownloadImage(visRef, filename)
            }}
            variant="textButton"
            backgroundColor={variant === 'kleurenbalk' && color}
            small
            data-html2canvas-ignore
          >
            <Styled.Icon size={24}>
              <Download />
            </Styled.Icon>
            Download afbeelding
          </CommunityLinkButton>
          {downloadDataUrl && (
            <Styled.DownloadButton
              fileName={`${filename}.csv`}
              url={downloadDataUrl}
              type="csv"
              variant="textButton"
              iconSize={24}
              backgroundColor={variant === 'kleurenbalk' && color}
              small
              data-html2canvas-ignore
            >
              Download data
            </Styled.DownloadButton>
          )}
        </Styled.VisualisationFooter>
      </GridItem>

      <GridItem
        colStart={{ small: 1, large: 3 }}
        colRange={{ small: 4, large: 8 }}
        rowStart={3}
      >
        {selectedPanel?.text && (
          <Styled.Text
            variant={variant}
            backgroundColor={variant === 'kleurenbalk' && color}
            data-html2canvas-ignore
          >
            {selectedPanel.text}
          </Styled.Text>
        )}
      </GridItem>
    </Styled.Grid>
  )
}

export default Visualisation

import { useState, useEffect, useRef } from 'react'
import NextImage from 'next/image'
import { VegaLite } from 'react-vega'
import { Download } from '@amsterdam/asc-assets'

import { GridItem } from '../Grid/Grid.style'
import Heading from '../Heading/Heading'
import DownloadButton from '../DownloadButton/DownloadButton'
import Button from '../Button/Button'
import {
  getStrapiMedia,
  PLACEHOLDER_IMAGE,
  translateColor,
} from '../../lib/utils'
import { pushCustomEvent } from '../../lib/analyticsUtils'
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
}) => {
  const [downloadDataUrl, setDownloadDataUrl] = useState()
  const visRef = useRef()
  const filename = title.split(' ').join('-').toLowerCase()

  const handleDownloadImage = async () => {
    const imageExporter = (await import('react-component-export-image'))
      .exportComponentAsPNG
    const options = {
      fileName: `${filename}.png`,
      html2CanvasOptions: {
        ignoreElements: (e) => e.classList.contains('download-buttons'),
      },
    }
    imageExporter(visRef, options)
  }

  useEffect(() => {
    const { values, url } = specification.data
    if (values) {
      const keys = Object.keys(values[0])
      const commaSeparatedString = [
        keys.join(','),
        values.map((row) => keys.map((key) => row[key]).join(',')).join('\n'),
      ].join('\n')
      setDownloadDataUrl(URL.createObjectURL(new Blob([commaSeparatedString])))
    }
    if (url && url.includes('format=json')) {
      setDownloadDataUrl(url.replace('format=json', 'format=csv'))
      pushCustomEvent('Download', 'visualisation', url.split('/').pop())
    }
  }, [specification])

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
          <Heading as="h2" styleAs="h5" gutterBottom={40}>
            {title}
          </Heading>
        )}
      </GridItem>

      {variant === 'kleurenbalk' && (
        <Styled.ColorBar
          colStart={{ small: 1, large: 1 }}
          colRange={{ small: 4, large: 12 }}
          rowStart={3}
          backgroundColor={translateColor(color || 'lichtblauw')}
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
        {image && (
          <NextImage
            src={getStrapiMedia(image)}
            alt={altText}
            width={image.width}
            height={image.height}
            layout="responsive"
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE}
            priority
          />
        )}
        {specification && (
          <Styled.InteractiveVis>
            <VegaLite
              className="chart"
              spec={specification}
              renderer="svg"
              actions={false}
            />
            <Styled.DownloadButtons>
              <Button
                type="button"
                onClick={handleDownloadImage}
                variant="textButton"
                small
                data-html2canvas-ignore
              >
                <Styled.Icon size={24}>
                  <Download />
                </Styled.Icon>
                download png
              </Button>
              {downloadDataUrl && (
                <DownloadButton
                  fileName={`${filename}.csv`}
                  url={downloadDataUrl}
                  type="csv"
                  variant="textButton"
                  iconSize={24}
                  small
                  data-html2canvas-ignore
                >
                  Download data
                </DownloadButton>
              )}
            </Styled.DownloadButtons>
          </Styled.InteractiveVis>
        )}
        {source && (
          <Styled.Source
            small
            variant={variant}
            backgroundColor={color}
          >{`Bron: ${source}`}</Styled.Source>
        )}
      </GridItem>

      <GridItem
        colStart={{ small: 1, large: 3 }}
        colRange={{ small: 4, large: 8 }}
        rowStart={3}
      >
        {text && (
          <Styled.Text variant={variant} backgroundColor={color}>
            {text}
          </Styled.Text>
        )}
      </GridItem>
    </Styled.Grid>
  )
}

export default Visualisation

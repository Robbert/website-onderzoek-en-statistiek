import { useState, useEffect, useRef } from 'react'
import NextImage from 'next/image'
import slugify from 'slugify'
import { Download } from '@amsterdam/asc-assets'

import { GridItem } from '~/components/Grid/Grid.style'
import { getStrapiMedia, PLACEHOLDER_IMAGE, translateColor } from '~/lib/utils'
import { pushCustomEvent } from '~/lib/analyticsUtils'
import {
  VISUALISATION_CONFIG,
  VISUALISATION_LOCALE,
} from '~/constants/visualisationConfig'
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
  const filename = title
    ? slugify(title, { lower: true, strict: true })
    : 'visualisatie'

  const handleDownloadImage = async () => {
    const imageExporter = (await import('./image-exporter'))
      .exportComponentAsPNG
    imageExporter(visRef, {
      fileName: `${filename}.png`,
      html2CanvasOptions: {
        onclone: (document) => {
          // eslint-disable-next-line no-param-reassign
          document.querySelector('.source').style.color = 'black'
        },
      },
    })
  }

  useEffect(() => {
    if (!specification || !specification.data) return
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
          <Styled.Heading as="h2" styleAs="h5" gutterBottom={40}>
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
          <Styled.VegaVisualisation
            spec={
              specification.config
                ? specification
                : {
                    config: VISUALISATION_CONFIG,
                    ...specification,
                  }
            }
            renderer="svg"
            actions={false}
            formatLocale={VISUALISATION_LOCALE}
          />
        )}
        <Styled.VisualisationFooter>
          {source && (
            <Styled.Source
              className="source"
              small
              variant={variant}
              backgroundColor={variant === 'kleurenbalk' && color}
            >
              {`Bron: ${source}`}
            </Styled.Source>
          )}
          <Styled.Button
            type="button"
            onClick={handleDownloadImage}
            variant="textButton"
            backgroundColor={variant === 'kleurenbalk' && color}
            small
            data-html2canvas-ignore
          >
            <Styled.Icon size={24}>
              <Download />
            </Styled.Icon>
            Download afbeelding
          </Styled.Button>
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
        {text && (
          <Styled.Text
            variant={variant}
            backgroundColor={variant === 'kleurenbalk' && color}
            data-html2canvas-ignore
          >
            {text}
          </Styled.Text>
        )}
      </GridItem>
    </Styled.Grid>
  )
}

export default Visualisation

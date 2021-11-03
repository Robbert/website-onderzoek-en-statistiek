import NextImage from 'next/image'

import { GridItem } from '../Grid/Grid.style'
import Heading from '../Heading/Heading'
import { getStrapiMedia, PLACEHOLDER_IMAGE, translateColor } from '../../lib/utils'
import * as Styled from './Visualisation.style'

const Visualisation = ({
  title, text, source, image, variant, color,
}) => (

  // TODO: add layout for variants with text left or right from image

  <Styled.Grid verticalPadding={0} horizontalPadding={0} variant={variant}>

    <GridItem
      colStart={{ small: 1, large: 3 }}
      colRange={{ small: 4, large: 8 }}
      rowStart={1}
    >
      {title && (
        <Heading
          as="h2"
          styleAs="h5"
          gutterBottom={40}
        >
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
      colStart={variant === 'kleurenbalk' ? { small: 1, large: 2 } : { small: 1, large: 3 }}
      colRange={variant === 'kleurenbalk' ? { small: 4, large: 10 } : { small: 4, large: 8 }}
      rowStart={2}
    >
      <NextImage
        src={getStrapiMedia(image)}
        alt={image.alternativeText}
        width={image.width}
        height={image.height}
        layout="responsive"
        placeholder="blur"
        blurDataURL={PLACEHOLDER_IMAGE}
        priority
      />
      {source && <Styled.Source small variant={variant} backgroundColor={color}>{`Bron: ${source}`}</Styled.Source> }
    </GridItem>

    <GridItem
      colStart={{ small: 1, large: 3 }}
      colRange={{ small: 4, large: 8 }}
      rowStart={3}
    >
      {text && <Styled.Text variant={variant} backgroundColor={color}>{text}</Styled.Text> }
    </GridItem>
  </Styled.Grid>
)

export default Visualisation

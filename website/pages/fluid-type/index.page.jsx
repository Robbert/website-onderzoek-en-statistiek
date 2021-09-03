import { Heading, Paragraph } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../../components/ContentContainer'

/**
 * -  Sizes need to be set in units relative to the browsers base font size,
 *    so a user can change base font size
 * -  The fluid size should be added to the base font size (ie 1rem + 3vw) in order to prevent a common zooming issue (https://www.w3.org/WAI/WCAG21/Techniques/failures/F94.html)
 * -  The max width should be set in a relative unit
 *    (ie ch, which is the size of a 0 in the current font and font-size)
 */

const fluidFormula = (minFontSize, maxFontSize, minScreenWidth, maxScreenWidth) => (
  `clamp(
    ${minFontSize}rem,
    ${minFontSize}rem + ${maxFontSize - minFontSize} * (100vw - ${minScreenWidth}rem) / ${maxScreenWidth - minScreenWidth},
    ${maxFontSize}rem
  )`
)

const H1 = styled(Heading)`
  font-size: ${fluidFormula(2, 5, 20, 50)};
  line-height: ${fluidFormula(2.5, 5.5, 20, 50)};
  max-width: 22ch;

  @media screen and (min-width: 50rem) {
    font-size: ${fluidFormula(5, 6.75, 50, 120)};
    line-height: ${fluidFormula(5.5, 7.3125, 50, 120)};
  }
`

const H2 = styled(Heading)`
  font-size: ${fluidFormula(1.75, 3.55, 20, 50)};
  line-height: ${fluidFormula(2, 4, 20, 50)};
  max-width: 28ch;

  @media screen and (min-width: 50rem) {
    font-size: ${fluidFormula(3.5, 4.75, 50, 120)};
    line-height: ${fluidFormula(4, 5.3125, 50, 120)};
  }
`

const H3 = styled(Heading)`
  font-size: ${fluidFormula(1.5, 2.5, 20, 50)};
  line-height: ${fluidFormula(2, 3, 20, 50)};
  max-width: 28ch;

  @media screen and (min-width: 50rem) {
    font-size: ${fluidFormula(2.5, 3.375, 50, 120)};
    line-height: ${fluidFormula(3, 3.75, 50, 120)};
  }
`

const H4 = styled(Heading)`
  font-size: ${fluidFormula(1.375, 2, 20, 50)};
  line-height: ${fluidFormula(2, 2.5, 20, 50)};
  max-width: 28ch;

  @media screen and (min-width: 50rem) {
    font-size: ${fluidFormula(2, 2.6875, 50, 120)};
    line-height: ${fluidFormula(2.5, 3.3125, 50, 120)};
  }
`

const H5 = styled(Heading)`
  font-size: ${fluidFormula(1.125, 1.5, 20, 50)};
  line-height: ${fluidFormula(1.5, 2, 20, 50)};
  max-width: 28ch;

  @media screen and (min-width: 50rem) {
    font-size: ${fluidFormula(1.5, 2, 50, 120)};
    line-height: ${fluidFormula(2, 2.625, 50, 120)};
  }
`

const H6 = styled(Heading)`
  font-size: ${fluidFormula(1, 1.25, 20, 50)};
  line-height: ${fluidFormula(1.25, 1.5, 20, 50)};
  max-width: 28ch;

  @media screen and (min-width: 50rem) {
    font-size: ${fluidFormula(1.25, 1.5, 50, 120)};
    line-height: ${fluidFormula(1.125, 1.375, 50, 120)};
  }
`

const Par = styled(Paragraph)`
  font-size: ${fluidFormula(1.125, 1.5, 20, 50)};
  line-height: ${fluidFormula(1.75, 2.5, 20, 50)};
  max-width: 55ch;

  @media screen and (min-width: 50rem) {
    font-size: ${fluidFormula(1.5, 2, 50, 120)};
    line-height: ${fluidFormula(2.5, 3.375, 50, 120)};
  }
`

const Articles = () => (
  <ContentContainer>
    <H1>Ruim een derde van de Amsterdamse leerlingen heeft een potentiële onderwijsachterstand</H1>
    <H2 as="h2">Ruim een derde van de Amsterdamse leerlingen heeft een potentiële onderwijsachterstand</H2>
    <H3 as="h3">Ruim een derde van de Amsterdamse leerlingen heeft een potentiële onderwijsachterstand</H3>
    <H4 as="h4">Ruim een derde van de Amsterdamse leerlingen heeft een potentiële onderwijsachterstand</H4>
    <H5 as="h5">Ruim een derde van de Amsterdamse leerlingen heeft een potentiële onderwijsachterstand</H5>
    <H6 as="h6">Ruim een derde van de Amsterdamse leerlingen heeft een potentiële onderwijsachterstand</H6>
    <Par>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam,
      elit viverra rhoncus bibendum, felis dolor scelerisque ante,
      at porttitor diam dui sit amet risus.
      Cras feugiat egestas efficitur. Aliquam at gravida felis, vitae ultricies purus.
      Mauris eget porta neque. Nunc laoreet semper massa eu euismod.
      Curabitur quis purus sit amet enim faucibus laoreet. Donec et semper ipsum.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      Vestibulum accumsan velit metus, sit amet consectetur erat sodales a.
      Curabitur pretium magna a est mollis laoreet sit amet vitae enim.
      Quisque porta posuere nibh, quis ullamcorper quam sollicitudin elementum.
      Nulla sed neque ac nulla gravida dapibus quis id odio.
      Aenean mollis risus facilisis consequat tristique.
      Vivamus tincidunt quam ac turpis laoreet dictum.
      Vivamus lacinia felis et libero finibus, eget malesuada magna malesuada.
      Nulla id dolor rutrum, tristique tortor non, venenatis neque.
    </Par>
  </ContentContainer>
)

export default Articles

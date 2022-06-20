/* eslint-disable no-underscore-dangle */
import * as Styled from './VegaVisualisation.style'
import {
  VISUALISATION_CONFIG,
  VISUALISATION_LOCALE,
} from '~/constants/visualisationConfig'

const VegaVisualisation = ({ specification }) => (
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
    onNewView={(view) => {
      view._el.firstChild.removeAttribute('width')
      view._el.firstChild.removeAttribute('height')
    }}
  />
)

export default VegaVisualisation

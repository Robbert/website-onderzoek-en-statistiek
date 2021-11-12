import * as Styled from './Fieldset.style'

const Fieldset = ({ children, legend, ...otherProps }) => (
  <Styled.Fieldset {...otherProps}>
    <legend>{legend}</legend>
    {children}
  </Styled.Fieldset>
)

export default Fieldset

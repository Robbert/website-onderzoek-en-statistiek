import * as Styled from './Fieldset.style'

const Fieldset = ({ children, legend }) => (
  <Styled.Fieldset>
    <legend>{legend}</legend>
    {children}
  </Styled.Fieldset>
)

export default Fieldset

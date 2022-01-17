import * as Styled from './Radio.style'

const Radio = ({ children, id, name, onChange, checked, ...otherProps }) => (
  <>
    <Styled.Radio
      id={id}
      type="radio"
      name={name}
      onChange={onChange}
      checked={checked}
    />
    <Styled.Label htmlFor={id} checked={checked} {...otherProps}>
      <Styled.RadioSymbolContainer>
        <Styled.RadioSymbol />
      </Styled.RadioSymbolContainer>
      <span>{children}</span>
    </Styled.Label>
  </>
)

export default Radio

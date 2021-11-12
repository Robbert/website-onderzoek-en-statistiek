import * as Styled from './Checkbox.style'

const Checkbox = ({
  children,
  id,
  onChange,
  checked,
  ...otherProps
}) => (
  <>
    <Styled.Checkbox
      id={id}
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
    <Styled.Label
      htmlFor={id}
      checked={checked}
      {...otherProps}
    >
      <Styled.CheckmarkContainer>
        <Styled.Checkmark />
      </Styled.CheckmarkContainer>
      <span>{children}</span>
    </Styled.Label>
  </>
)

export default Checkbox

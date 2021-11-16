import * as Styled from './Backdrop.style'

const Backdrop = ({
  isOpen,
  onClick,
  zIndex = 500,
  ...otherProps
}) => {
  const handleOnClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Styled.Backdrop
      isOpen={isOpen}
      onClick={handleOnClick}
      zIndex={zIndex}
      {...otherProps}
    />
  )
}

export default Backdrop

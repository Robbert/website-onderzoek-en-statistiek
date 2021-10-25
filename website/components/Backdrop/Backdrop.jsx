import * as Styled from './Backdrop.style'

const Backdrop = ({
  isOpen,
  onClick,
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
    />
  )
}

export default Backdrop

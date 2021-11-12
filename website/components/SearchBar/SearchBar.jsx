import { useRef } from 'react'
import { Icon } from '@amsterdam/asc-ui'
import { Search, Close } from '@amsterdam/asc-assets'

import Button from '../Button/Button'
import * as Styled from './SearchBar.style'

const SearchBar = ({
  onChange, value, id, ...otherProps
}) => {
  const searchInput = useRef(null)
  const handleOnChange = (e) => {
    if (onChange) {
      onChange(e.target ? e.target.value : e)
    }
  }
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && value && searchInput) {
      searchInput?.current.blur()
      searchInput?.current.focus()
    }
  }

  const handleOnClear = () => {
    handleOnChange('')
    if (searchInput && searchInput.current) {
      searchInput.current.focus()
    }
  }

  return (
    <Styled.Wrapper {...otherProps}>
      <Styled.SearchBar
        id={id}
        type="text"
        value={value}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        aria-label="Zoeken"
        ref={searchInput}
      />
      <Styled.IconWrapper>
        {value
          ? (
            <Button onClick={handleOnClear} aria-label="Wis zoekterm" variant="blank">
              <Styled.IconContainer>
                <Close />
              </Styled.IconContainer>
            </Button>
          )
          : (
            <Icon size={56} padding={12}>
              <Search />
            </Icon>
          )}
      </Styled.IconWrapper>
    </Styled.Wrapper>
  )
}

export default SearchBar

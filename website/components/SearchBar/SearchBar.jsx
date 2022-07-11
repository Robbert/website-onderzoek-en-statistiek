import { useRef } from 'react'
import { Icon } from '@amsterdam/asc-ui'
import { Search, Close } from '@amsterdam/asc-assets'

import Button from '../Button/Button'
import * as Styled from './SearchBar.style'

const SearchBar = ({ onChange, value, id, autoFocus, ...otherProps }) => {
  const searchInput = useRef(null)

  const handleOnClear = () => {
    onChange('')
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
        onChange={(e) => onChange(e.target.value)}
        aria-label="Zoeken"
        ref={searchInput}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      <Styled.IconWrapper>
        {value ? (
          <Button
            onClick={handleOnClear}
            aria-label="Wis zoekterm"
            variant="blank"
          >
            <Styled.IconContainer>
              <Close />
            </Styled.IconContainer>
          </Button>
        ) : (
          <Icon size={48} padding={8}>
            <Search />
          </Icon>
        )}
      </Styled.IconWrapper>
    </Styled.Wrapper>
  )
}

export default SearchBar

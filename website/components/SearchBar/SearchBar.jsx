import { useRef, useState, useEffect } from 'react'
import { Icon } from '@amsterdam/asc-ui'
import { Search, Close } from '@amsterdam/asc-assets'

import Button from '../Button/Button'
import * as Styled from './SearchBar.style'

const SearchBar = ({ onChange, value, id, ...otherProps }) => {
  const searchInput = useRef(null)

  // when setting the SearchBar input value from url params,
  // cursor position is not automatically stored.
  // This state is used to store it. See also:
  // https://stackoverflow.com/questions/46000544/react-controlled-input-cursor-jumps
  const [cursor, setCursor] = useState(null)

  useEffect(() => {
    searchInput.current?.setSelectionRange(cursor, cursor)
  }, [searchInput, cursor, value])

  const handleOnChange = (e) => {
    setCursor(e.target?.selectionStart)
    if (onChange) {
      onChange(e.target ? e.target.value : e)
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
        aria-label="Zoeken"
        ref={searchInput}
        autoFocus
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
          <Icon size={56} padding={12}>
            <Search />
          </Icon>
        )}
      </Styled.IconWrapper>
    </Styled.Wrapper>
  )
}

export default SearchBar

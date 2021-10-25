import { useRef } from 'react'
import { Icon } from '@amsterdam/asc-ui'
import { Search, Close } from '@amsterdam/asc-assets'

import * as Styled from './SearchBar.style'

const SearchBar = ({ onChange, value, id }) => {
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
    <Styled.Wrapper>
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
        { value
          ? (

            <Styled.Button onClick={handleOnClear} aria-label="Wis zoekterm">
              <Icon size={32}>
                <Close />
              </Icon>
            </Styled.Button>
          )
          : (
            <Icon size={32}>
              <Search />
            </Icon>
          )}
      </Styled.IconWrapper>
    </Styled.Wrapper>
  )
}

export default SearchBar

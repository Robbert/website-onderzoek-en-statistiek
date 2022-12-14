import { useState, useEffect, useRef } from 'react'
import { Icon, useMatchMedia, useTrappedFocus } from '@amsterdam/asc-ui'
import { Close } from '@amsterdam/asc-assets'

import Heading from '../Heading/Heading'
import Radio from '../Radio/Radio'
import Checkbox from '../Checkbox/Checkbox'
import SliderWithInputs from '../SliderWithInputs/SliderWithInputs'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'
import { calculateFacetsTotals, formatFacetNumber } from '~/lib/searchUtils'
import CONTENT_TYPES from '~/constants/contentTypes'
import * as Styled from './SearchFilterSection.style'

const SearchFilterSection = ({
  results,
  themes,
  themeFilter,
  handleThemeChange,
  category,
  setCategory,
  setPage,
  period,
  setPeriod,
  periodRange,
}) => {
  const [facetCount, setfacetCount] = useState(null)
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false)

  const mobilePanelRef = useRef(null)
  const { keyDown } = useTrappedFocus(mobilePanelRef)
  const isMobile = useMatchMedia({ maxBreakpoint: 'laptop' })

  useEffect(() => {
    if (results) {
      setfacetCount(calculateFacetsTotals(themes, CONTENT_TYPES, results))
    }
  }, [results, themes])

  useEffect(() => {
    if (mobilePanelOpen) {
      // block background scroll when mobile panel is open
      document.body.style.overflow = 'hidden'
      // scroll to top when mobile panel opens
      mobilePanelRef.current.scrollTop = 0
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobilePanelOpen])

  useEffect(() => {
    if (!isMobile[0]) {
      // close mobile panel on resize, if bigger than breakpoint
      setMobilePanelOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!mobilePanelOpen || !mobilePanelRef.current) {
      return
    }

    const firstFocusableEl = mobilePanelRef.current.querySelector('button')

    if (firstFocusableEl instanceof HTMLElement) {
      // focus on first button in mobile panel
      firstFocusableEl.focus()
    }
  }, [mobilePanelOpen])

  return (
    <>
      <Styled.FilterPanel
        colRange={4}
        rowStart={{ small: 3, large: 2 }}
        isOpen={mobilePanelOpen}
        ref={mobilePanelRef}
        onKeyDown={keyDown}
      >
        <Styled.MobilePanelHeader>
          <Heading as="h2" styleAs="h3">
            Filters
          </Heading>
          <Button
            type="button"
            variant="blank"
            aria-label="Sluit filtersectie"
            onClick={() => setMobilePanelOpen(false)}
          >
            <Icon size={24}>
              <Close />
            </Icon>
          </Button>
        </Styled.MobilePanelHeader>
        <Styled.Fieldset
          legend={
            <Heading as="h2" styleAs="h5" gutterBottom={24}>
              Thema???s
            </Heading>
          }
        >
          {themes
            .slice() // strict mode freezes arrays, so we need to make a copy to be able to sort
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(({ title, slug }) => (
              <Checkbox
                key={slug}
                id={slug}
                onChange={() => handleThemeChange(slug)}
                checked={themeFilter.includes(slug)}
              >
                {`${title} ${
                  facetCount ? formatFacetNumber(facetCount[slug]) : ''
                }`}
              </Checkbox>
            ))}
        </Styled.Fieldset>
        <Styled.Fieldset
          legend={
            <Heading as="h2" styleAs="h5" gutterBottom={24}>
              Periode
            </Heading>
          }
        >
          {periodRange[0] && periodRange[1] ? (
            <SliderWithInputs
              selectedRange={period}
              totalRange={periodRange}
              onChange={(values) => {
                setPeriod(values)
                setPage(1)
              }}
            />
          ) : (
            <Styled.Loading />
          )}
        </Styled.Fieldset>
        <Styled.Fieldset
          legend={
            <Heading as="h2" styleAs="h5" gutterBottom={24}>
              Categorie??n
            </Heading>
          }
        >
          <Radio
            name="categories"
            id="alles"
            onChange={() => {
              setCategory('')
              setPage(1)
            }}
            checked={category === ''}
          >
            Alle categorie??n
          </Radio>
          {Object.values(CONTENT_TYPES)
            .filter((cat) => cat.type !== 'theme')
            .map(({ type, plural }) => (
              <Radio
                key={type}
                name="categories"
                id={type}
                onChange={() => {
                  setCategory(type)
                  setPage(1)
                }}
                checked={category === type}
              >
                {`${plural} ${
                  facetCount ? formatFacetNumber(facetCount[type]) : ''
                }`}
              </Radio>
            ))}
        </Styled.Fieldset>
        <Styled.MobilePanelButtonContainer>
          <Styled.MobilePanelButton
            type="button"
            onClick={() => setMobilePanelOpen(false)}
          >
            {`Toon ${results.length} ${
              results.length === 1 ? 'resultaat' : 'resultaten'
            }`}
          </Styled.MobilePanelButton>
        </Styled.MobilePanelButtonContainer>
      </Styled.FilterPanel>
      <Styled.MobilePanelToggle
        type="button"
        onClick={() => {
          window.scrollTo(0, 0)
          return setMobilePanelOpen(true)
        }}
      >
        Filter
      </Styled.MobilePanelToggle>
      <Backdrop
        isOpen={mobilePanelOpen}
        zIndex={501}
        onClick={() => setMobilePanelOpen(false)}
      />
    </>
  )
}

export default SearchFilterSection

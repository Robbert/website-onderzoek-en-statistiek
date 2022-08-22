import debounce from 'lodash.debounce'
import { useState, useEffect } from 'react'

import * as Styled from './SliderWithInputs.style'
import { isInRange } from '~/lib/searchUtils'

const SliderWithInputs = ({ selectedRange, totalRange, onChange }) => {
  const [minValueSlider, setMinValueSlider] = useState(
    selectedRange[0] || totalRange[0],
  )
  const [maxValueSlider, setMaxValueSlider] = useState(
    selectedRange[1] || totalRange[1],
  )
  const [minValueNumBox, setMinValueNumBox] = useState(
    selectedRange[0] || totalRange[0],
  )
  const [maxValueNumBox, setMaxValueNumBox] = useState(
    selectedRange[1] || totalRange[1],
  )

  // this effect is needed for forward and back button behaviour
  useEffect(() => {
    if (selectedRange[0] && selectedRange[1]) {
      setMinValueSlider(selectedRange[0])
      setMinValueNumBox(selectedRange[0])
      setMaxValueSlider(selectedRange[1])
      setMaxValueNumBox(selectedRange[1])
    } else {
      setMinValueSlider(totalRange[0])
      setMinValueNumBox(totalRange[0])
      setMaxValueSlider(totalRange[1])
      setMaxValueNumBox(totalRange[1])
    }
  }, [selectedRange[0], selectedRange[1]])

  useEffect(() => {
    if (minValueSlider > maxValueSlider) {
      setMaxValueSlider(minValueSlider)
      setMaxValueNumBox(minValueSlider)
    }
  }, [minValueSlider])

  useEffect(() => {
    if (maxValueSlider < minValueSlider) {
      setMinValueSlider(maxValueSlider)
      setMinValueNumBox(maxValueSlider)
    }
  }, [maxValueSlider])

  // updating selected range is throttled, setting it directly from the
  // sliders causes too many rerenders
  useEffect(() => {
    const throttledUpdate = debounce(() => {
      onChange([minValueSlider, maxValueSlider])
    }, 300)
    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [minValueSlider, maxValueSlider])

  useEffect(() => {
    if (minValueNumBox && isInRange(minValueNumBox, totalRange)) {
      setMinValueSlider(minValueNumBox)
    }
    if (maxValueNumBox && isInRange(maxValueNumBox, totalRange)) {
      setMaxValueSlider(maxValueNumBox)
    }
  }, [minValueNumBox, maxValueNumBox])

  const handleNumBoxChange = (value, defaultValue, setState) => {
    if (value.length === 4) {
      if (isInRange(value, totalRange)) {
        setState(value)
      } else {
        setState(defaultValue)
      }
    } else {
      setState(value.slice(0, 4))
    }
  }

  return (
    <Styled.Container>
      <Styled.SliderTrack
        min={totalRange[0]}
        max={totalRange[1]}
        minValue={minValueSlider}
        maxValue={maxValueSlider}
      />
      <Styled.Slider
        type="range"
        min={totalRange[0]}
        max={totalRange[1]}
        value={minValueSlider}
        onChange={(e) => {
          setMinValueSlider(e.target.value)
          setMinValueNumBox(e.target.value)
        }}
        aria-labelledby="minValueLabel"
      />
      <Styled.Slider
        type="range"
        min={totalRange[0]}
        max={totalRange[1]}
        value={maxValueSlider}
        onChange={(e) => {
          setMaxValueSlider(e.target.value)
          setMaxValueNumBox(e.target.value)
        }}
        aria-labelledby="maxValueLabel"
      />
      <Styled.NumberBoxContainer>
        <Styled.Label id="minValueLabel" htmlFor="minValue">
          Begin jaar
        </Styled.Label>
        <Styled.NumberBox
          id="minValue"
          type="number"
          min={totalRange[0]}
          max={totalRange[1]}
          value={minValueNumBox}
          onChange={(e) =>
            handleNumBoxChange(e.target.value, totalRange[0], setMinValueNumBox)
          }
        />
      </Styled.NumberBoxContainer>
      <Styled.NumberBoxContainer right>
        <Styled.Label id="maxValueLabel" htmlFor="maxValue">
          Eind jaar
        </Styled.Label>
        <Styled.NumberBox
          id="maxValue"
          type="number"
          min={totalRange[0]}
          max={totalRange[1]}
          value={maxValueNumBox}
          onChange={(e) =>
            handleNumBoxChange(e.target.value, totalRange[1], setMaxValueNumBox)
          }
        />
      </Styled.NumberBoxContainer>
    </Styled.Container>
  )
}

export default SliderWithInputs

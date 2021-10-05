# Grid components

The Grid components are used to define the layout of components on a page. It uses CSS grids.

It consists of three items.

## Grid

This component sets a 12 column grid on desktop and 4 columns on mobile. You can set the number of rows with the `numberOfRows` prop.
This component is an extension of the `Container` component, so you can use the same `horizontalPadding` and `verticalPadding` props.

## GridItem

This component allows you to define its placement, width and height on the grid.
With the `colStart` and `rowStart` props you define in which column and row the component is placed.
The following code would place the component on the second row and third column (of 12).

`<GridItem colStart={3} rowStart={2}>`

With the `colRange` and `rowRange` props you define how many columns and rows the component spans.
The following code would have the component span two rows and four columns.

`<GridItem colRange={4} rowRange={2}>`

You can set all four of these props with a number, which means it will be the same for all viewport widths, or with an object with `small` and `large` keys.
This will change the value when the viewport width is bigger or smaller than a certain amount of pixels.
The following code would have the component span three rows and four columns on desktop, and one row and two columns on mobile.

`<GridItem colRange={{ small: 2, large: 4 }} rowRange={{ small: 1, large: 3 }}>`

## gridItemStyle

The styling for `GridItem` is also exported seperately. This might be useful if you want to add the `GridItem` functionality to an already existing component.
There are three ways to do this:

- You can add these styles to a component you define yourself, like so:
```
const StyledList = styled.ul`
    /* styles... */
    
    ${gridItemStyle}
`

- You can add these styles to an existing styled component, like so:
  `<AmsterdamStyledComponent css={gridItemStyle} />`

- You can add these styles to a vanilla html element, like so:
  `<div css={gridItemStyle} />`

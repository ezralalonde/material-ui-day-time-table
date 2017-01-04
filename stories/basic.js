import React from 'react' // eslint-disable-line no-unused-vars
import { storiesOf } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import DayTimeTable from '../src/DayTimeTable'

import { basic } from './data'

var interval = 15
var min = 0
var max = 90

/**
 * Theme the child
 * @param {object} children The child to style
 * @returns {object} The child with style applied
 */
function themed(children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

/**
 * Return text to be printed in cell.
 * @param {object} xx The data element that is being printed
 * @returns {object} The text that will appear in the cell
 */
function displayCell(xx) {
  return xx.text
}

/**
 * Return object's height in rows.
 * @param {object} xx The data element for a cell
 * @returns {number} The height of the element
 */
function calcHeight(xx) {
  return (xx.end - xx.start) / interval
}

/**
 * Return text to be printed in row header.
 * @param {object} xx The data element for a list of cells
 * @returns {object} The text that will appear in the header.
 */
function displayHeader(xx) {
  return xx.name
}

/**
 * Determine whether a cell should be painted
 * @param {object} xx The data element for a cell
 * @param {number} step The index of the row being painted
 * @returns {bool} True if cell should be coloured
 */
function isActive(xx, step) {
  var current = min + (interval * step)

  return xx.start <= current && current < xx.end
}

/**
 * Return text to be printed in left-most column.
 * @param {number} step The index of the row being addressed
 * @returns {object} The text that will appear in the cell
 */
function showTime(step) {
  return `${min + (interval * step)} minutes`
}

/**
 * Return table-wide unique key for data cell element.
 * @param {object} xx The data element for a cell
 * @returns {object} The unique key of the cell
 */
function key(xx) {
  return xx.text
}

storiesOf('DayTimeTable', module)
  .add('Most Basic', () => themed(
    <DayTimeTable
      caption="This is the table caption"
      cellKey={key}
      calcCellHeight={calcHeight}
      showHeader={displayHeader}
      showCell={displayCell}
      showTime={showTime}
      isActive={isActive}
      toolTip="Table has tooltip"
      max={max}
      min={min}
      data={basic}
      rowNum={(max-min)/interval}
      valueKey="values"
    />
  ))

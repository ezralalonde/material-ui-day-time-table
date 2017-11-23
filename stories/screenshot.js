import React from 'react' // eslint-disable-line no-unused-vars
import { storiesOf } from '@storybook/react'

import moment from 'moment'
import DayTimeTable from '../src/DayTimeTable'

import { screenshot } from './data'

var intervalMinutes = 30
var interval = moment.duration(intervalMinutes, 'minutes')
var min = moment('15:30', 'HH:mm')
var max = moment('18:00', 'HH:mm')

/**
 * Determine whether a cell should be painted
 * @param {object} xx The data element being examined
 * @param {number} step The index of the row being painted
 * @returns {bool} True if cell should be coloured
 */
function isActive(xx, step) {
  var start = moment(xx.start, 'h:mma')
  var current = moment(min).add(step * interval)

  return start <= current &&
         current < moment(start).add(moment.duration(xx.len, 'hours'))
}

/**
 * Fill in the "times" cell for a row
 * @param {number} step The index of the row being painted
 * @returns {string} The text that will fill the cell
 */
function showTime(step) {
  return `${moment(min).add(interval * step)
                       .format('h:mma')}`
}

storiesOf('Screenshot', module)
  .add('Screenshot example', () =>
    <DayTimeTable
      caption="Table Caption"
      cellKey={(xx) => xx.content}
      calcCellHeight={(xx) => moment.duration(xx.len, 'hours') / interval}
      showHeader={(xx) => xx.header}
      showCell={(xx) => xx.content}
      showTime={showTime}
      isActive={isActive}
      max={max}
      min={min}
      data={screenshot}
      rowNum={(max - min) / interval}
      valueKey="data"
      timeText="Time Text"
    />
  )

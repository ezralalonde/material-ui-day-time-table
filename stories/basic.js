import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import DayTimeTable from '../src/DayTimeTable'

import { basic } from './data'

function themed(children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

var interval = 15
var min = 0
var max = 90

function displayCell(xx) {
  return xx.text
}

function calcHeight(xx) {
  return (xx.end - xx.start) / interval
}

function displayHeader(xx) {
  return xx.name
}

function isActive(xx, step) {
  var current = min + interval * step
  return xx.start <= current && current < xx.end
}

function showTime(step) {
  return `${min + interval * step} minutes`
}

function key(xx) {
  return xx.text
}

storiesOf('DayTimeTable', module)
  .add('Most Basic', () => themed(
    <DayTimeTable
      caption='This is the table caption'
      cellKey={key}
      calcCellHeight={calcHeight}
      showHeader={displayHeader}
      showCell={displayCell}
      showTime={showTime}
      isActive={isActive}
      toolTip='Table has tooltip'
      max={max}
      min={min}
      data={basic}
      rowNum={(max-min)/interval}
    />
  ))

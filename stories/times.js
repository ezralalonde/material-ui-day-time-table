import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import moment from 'moment'
import DayTimeTable from '../src/DayTimeTable'

import { times } from './data'

function themed(children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

var interval = moment.duration(15, 'minutes')
var min = moment('14:45', 'HH:mm')
var max = moment('19:00','HH:mm')

function displayCell(xx) {
  return xx.text
}

function calcHeight(xx) {
  return moment(xx.end,'h:mma').diff(moment(xx.start,'h:mma')) / interval
}

function displayHeader(xx) {
  return xx.name
}

function isActive(xx, step) {
  var current = moment(min).add(step * interval)
  return moment(xx.start, 'h:mma') <= current &&
         current < moment(xx.end, 'h:mma')
}

function showTime(step) {
  var start = moment(min).add(interval * step)
  var end = moment(start).add(interval)
  return `${start.format('h:mma')}–${end.format('h:mma')}`
}

function key(xx) {
  return xx.text
}

storiesOf('DayTimeTable', module)
  .add('Using Moment.js', () => themed(
    <DayTimeTable
      caption='My plan for the week'
      cellKey={key}
      calcCellHeight={calcHeight}
      showHeader={displayHeader}
      showCell={displayCell}
      showTime={showTime}
      isActive={isActive}
      max={max}
      min={min}
      data={times}
      rowNum = {(max - min) / interval}
    />
  ))
  .add('Moment.js, no header', () => themed(
    <DayTimeTable
      caption='My plan for the week'
      cellKey={key}
      calcCellHeight={calcHeight}
      showHeader={displayHeader}
      showCell={displayCell}
      showTime={showTime}
      isActive={isActive}
      max={max}
      min={min}
      data={times}
      hideHeaders
      rowNum = {(max - min) / interval}
    />
  ))
  .add('Moment.js; no header, no times', () => themed(
    <DayTimeTable
      caption='My plan for the week'
      cellKey={key}
      calcCellHeight={calcHeight}
      showHeader={displayHeader}
      showCell={displayCell}
      showTime={showTime}
      isActive={isActive}
      max={max}
      min={min}
      data={times}
      hideHeaders
      hideTimes
      rowNum = {(max - min) / interval}
    />
  ))

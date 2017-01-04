import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import moment from 'moment'
import DayTimeTable from '../src/DayTimeTable'

import { screenshot } from './data'

function themed(children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

var interval = moment.duration(30, 'minutes')
var min = moment('15:30', 'HH:mm')
var max = moment('18:00','HH:mm')

function isActive(xx, step) {
  var start = moment(xx.start, 'h:mma')
  var current = moment(min).add(step * interval)
  return start  <= current &&
         current < moment(start).add(moment.duration(xx.len, 'hours'))
}

function showTime(step) {
  return `${moment(min).add(interval * step).format('h:mma')}`
}

storiesOf('DayTimeTable', module)
  .add('Screenshot example', () => themed(
    <DayTimeTable
      caption='Table Caption'
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
      valueKey='data'
      timeText='Time Text'
    />
  ))

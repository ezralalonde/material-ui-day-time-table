import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import DayTimeTable from '../src/DayTimeTable'

function themed(children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

function displayCell(xx) {
  return xx.text
}

function getDuration(xx) {
  return xx.end - xx.start
}

function displayHeader(xx) {
  return xx.name
}

storiesOf('DayTimeTable', module)
  .add('Basic', () => themed(
    <DayTimeTable
      caption='This is the table caption'
      interval={15}
      calcDuration={getDuration}
      showHeader={displayHeader}
      showCell={displayCell}
      max={90}
      min={0}
      data={[
        {
          name: 'Sunday',
          info: [
            {
              start: 15,
              end: 30,
              blah: "ezra",
              text: 1,
              props: {
                style: {
                  backgroundColor: "red",
                  textAlign: "center"
                }
              }
            },
            {
              start: 45,
              end: 60,
              text: 2
            }
          ]
        },
        {
          name: 'Monday',
          info: [
            {
              start: 15,
              end: 30,
              text: 3
            }
          ]
        },
        {
          name: 'Tuesday',
          info: [
            {
              start: 30,
              end: 60,
              text: 4
            }
          ]
        },
        {
          name: 'Wednesday',
          info: [
            {
              start: 15,
              end: 75,
              text: 5
            }
          ]
        }
      ]}
    />
  ))

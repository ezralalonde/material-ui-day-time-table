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

storiesOf('DayTimeTable', module)
  .add('Basic', () => themed(
    <DayTimeTable
      header='This is the main header'
      xs={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']}
      fullWidth
    />
  ))

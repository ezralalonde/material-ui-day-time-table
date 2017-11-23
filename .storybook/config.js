import { configure, addDecorator } from "@storybook/react"
import React from "react" // eslint-disable-line no-unused-vars
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"

function loadStories() {
  require("../stories/basic")
  require("../stories/screenshot")
  require("../stories/times")
}

/**
 * Theme the child
 * @param {object} children The child to style
 * @returns {object} The child with style applied
 */
addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div>{story()}</div>
  </MuiThemeProvider>
))

configure(loadStories, module)

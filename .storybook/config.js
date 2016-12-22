import { configure } from '@kadira/storybook'

function loadStories() {
  require('../stories/basic')
  require('../stories/times')
}

configure(loadStories, module)

const injectTapEventPlugin = require("react-tap-event-plugin")
injectTapEventPlugin()

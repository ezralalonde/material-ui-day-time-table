import React, { Component, PropTypes } from 'react'

class DayTimeTable extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      ...other,
    } = this.props;


    return (
      <div
        className={ className }
      />
    )
  }
}

export default DayTimeTable

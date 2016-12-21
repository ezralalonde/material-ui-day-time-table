import React, { Component, PropTypes } from 'react'

import {Table} from 'material-ui/Table'
import {TableHeader} from 'material-ui/Table'
import {TableHeaderColumn} from 'material-ui/Table'
import {TableRow} from 'material-ui/Table'
import {TableRowColumn} from 'material-ui/Table'
import {TableBody} from 'material-ui/Table'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class DayTimeTable extends Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      caption,
      calcDuration,
      className,
      data,
      hideHeaders,
      interval,
      max,
      min,
      showHeader,
      showCell,
      timeText,
      ...other,
    } = this.props;

    var headers = data.map((day, ii) => {
      return <TableHeaderColumn>{showHeader(day)}</TableHeaderColumn>
    })

    var colNum = headers.length
    var rowNum = (max - min) / interval

    var grid = []
    for (let ii = 0; ii < rowNum; ii++) {
      grid[ii] = []
      for (let jj = 0; jj < colNum; jj++) {
        grid[ii][jj] = 0;
        var current = min + interval * ii
        data[jj].info.map((cell) => {
          if (cell.start <= current && current < cell.start + interval) {
            grid[ii][jj] = {
              height: calcDuration(cell) / interval,
              info: {...cell},
              first: true
            }
          }
          else if (cell.start <= current && current < cell.end) {
            grid[ii][jj] = {
              height: calcDuration(cell) / interval,
              info: {...cell},
              skip: true
            }
          }
        })
      }
      console.log(grid[ii])
    }

    return (
      <Table
        className={ className }
        muiTheme={this.context.muiTheme}
        selectable={false}
      >
        { !hideHeaders &&
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            { caption &&
              <TableRow>
                <TableHeaderColumn colSpan={colNum} tooltip="Table Caption" style={{textAlign: 'center'}}>
                  {caption}
                </TableHeaderColumn>
              </TableRow>
            }
            <TableRow>
              <TableHeaderColumn>{timeText}</TableHeaderColumn>
              { headers }
            </TableRow>
          </TableHeader>
        }
        <TableBody
          displayRowCheckbox={false}
        >
        {
          grid.map((row, ii) => {
            return (
              <TableRow>
                <TableRowColumn
                  style={{
                    "border-right": "1px solid rgb(224, 224, 224)"
                  }}
                >{interval * ii + min}</TableRowColumn>
                {
                  row.map((xx) => {
                    if (xx.first) {
                      return (
                        <TableRowColumn {...xx.info.props}
                          rowSpan={xx.height}
                          style={{
                            "border-left": "1px solid rgb(224, 224, 224)",
                          }}
                        >
                          {showCell(xx.info)}
                        </TableRowColumn>
                      )
                    }
                    else if (xx.skip) {
                      return
                    } else {
                      return <TableRowColumn
                        style={{
                          "border-left": "1px solid rgb(224, 224, 224)"
                        }}
                      />
                    }
                  })
                }
              </TableRow>
            )
          })
        }
        </TableBody>
      </Table>
    )
  }
}

DayTimeTable.propTypes = {
  caption: PropTypes.string,
  calcDuration: PropTypes.func,
  className: PropTypes.string,
  showCell: PropTypes.func,
  timeText: PropTypes.string,
  title: PropTypes.string
}

DayTimeTable.defaultProps = {
  timeText: "Times"
}

DayTimeTable.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default DayTimeTable

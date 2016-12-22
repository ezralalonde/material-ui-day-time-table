import React, { Component, PropTypes } from 'react'

import { Table } from 'material-ui/Table'
import { TableHeader } from 'material-ui/Table'
import { TableHeaderColumn } from 'material-ui/Table'
import { TableRow } from 'material-ui/Table'
import { TableRowColumn } from 'material-ui/Table'
import { TableBody } from 'material-ui/Table'

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
      calcCellHeight,
      className,
      data,
      hideHeaders,
      interval,
      isActive,
      cellKey,
      max,
      min,
      showHeader,
      showCell,
      showTime,
      toolTip,
      timeText,
      ...other,
    } = this.props;

    var headers = data.map((day, ii) => {
      return <TableHeaderColumn key={ii}>{showHeader(day)}</TableHeaderColumn>
    })

    var colNum = headers.length
    var rowNum = (max - min) / interval

    var grid = []
    var found = new Map()
    for (let ii = 0; ii < rowNum; ii++) {
      grid[ii] = []
      for (let jj = 0; jj < colNum; jj++) {
        grid[ii][jj] = 0;
        data[jj].info.map((cell) => {
          if (isActive(cell, ii)) {
            grid[ii][jj] = {
              height: calcCellHeight(cell),
              info: {...cell}
            }
            if (found.get(cellKey(cell))) {
              grid[ii][jj].skip = true
            } else {
              grid[ii][jj].first = true
              found.set(cellKey(cell), true)
            }
          }
        })
      }
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
                <TableHeaderColumn colSpan={colNum} tooltip={toolTip} style={{textAlign: 'center'}}>
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
                    "borderRight": "1px solid rgb(224, 224, 224)"
                  }}
                >{showTime(ii)}</TableRowColumn>
                {
                  row.map((xx) => {
                    if (xx.first) {
                      return (
                        <TableRowColumn
                          rowSpan={xx.height}
                          style={{
                            "borderLeft": "1px solid rgb(224, 224, 224)",
                          }}
                          {...xx.info.props}
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
                          "borderLeft": "1px solid rgb(224, 224, 224)"
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
  calcCellHeight: PropTypes.func,
  className: PropTypes.string,
  showCell: PropTypes.func,
  timeText: PropTypes.string,
  toolTip: PropTypes.string,
  title: PropTypes.string
}

DayTimeTable.defaultProps = {
  timeText: "Times",
  toolTip: null
}

DayTimeTable.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default DayTimeTable

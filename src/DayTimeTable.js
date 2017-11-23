import React from "react"
import { Component } from "react"
import PropTypes from "prop-types"

import { Table } from "material-ui/Table"
import { TableHeader } from "material-ui/Table"
import { TableHeaderColumn } from "material-ui/Table"
import { TableRow } from "material-ui/Table"
import { TableRowColumn } from "material-ui/Table"
import { TableBody } from "material-ui/Table"

import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme"
import getMuiTheme from "material-ui/styles/getMuiTheme"

class DayTimeTable extends Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      calcCellHeight,
      caption,
      cellKey,
      data,
      hideHeaders,
      hideTimes,
      isActive,
      rowNum,
      showCell,
      showHeader,
      showTime,
      tableProps,
      timeText,
      toolTip,
      valueKey
    } = this.props

    var headers = data.map((day, ii) => (
      <TableHeaderColumn key={ii}>{showHeader(day)}</TableHeaderColumn>
    ))
    var colNum = headers.length
    var grid = []
    var found = new Map()

    for (let ii = 0; ii < rowNum; ii++) {
      grid[ii] = []
      for (let jj = 0; jj < colNum; jj++) {
        grid[ii][jj] = 0
        data[jj][valueKey].map(cell => {
          if (isActive(cell, ii)) {
            grid[ii][jj] = {
              height: calcCellHeight(cell),
              info: { ...cell }
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
        muiTheme={this.context.muiTheme}
        selectable={false}
        {...tableProps}
      >
        {!hideHeaders && (
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            {!!caption && (
              <TableRow>
                <TableHeaderColumn
                  colSpan={colNum + !hideTimes}
                  tooltip={toolTip}
                  style={{ textAlign: "center" }}
                >
                  {caption}
                </TableHeaderColumn>
              </TableRow>
            )}
            <TableRow>
              {!hideTimes && <TableHeaderColumn>{timeText}</TableHeaderColumn>}
              {headers}
            </TableRow>
          </TableHeader>
        )}
        <TableBody displayRowCheckbox={false}>
          {grid.map((row, ii) => {
            var cellStyle = {
              borderRight: "1px solid rgb(224, 224, 224)",
              borderLeft: "1px solid rgb(224, 224, 224)"
            }

            return (
              <TableRow key={ii}>
                {!hideTimes && (
                  <TableRowColumn style={cellStyle}>
                    {showTime(ii)}
                  </TableRowColumn>
                )}
                {row.map((xx, jj) => {
                  if (!xx.info) {
                    return (
                      <TableRowColumn key={`${ii}-${jj}`} style={cellStyle} />
                    )
                  } else if (xx.first) {
                    if (!xx.info.props) {
                      xx.info.props = { style: "" }
                    }
                    return (
                      <TableRowColumn
                        key={cellKey(xx.info)}
                        rowSpan={xx.height}
                        {...xx.info.props}
                        style={Object.assign(xx.info.props.style, cellStyle)}
                      >
                        {showCell(xx.info)}
                      </TableRowColumn>
                    )
                  } else if (xx.skip) {
                    return
                  }
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

DayTimeTable.propTypes = {
  calcCellHeight: PropTypes.func.isRequired,
  caption: PropTypes.string,
  cellKey: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  hideHeaders: PropTypes.bool,
  hideTimes: PropTypes.bool,
  isActive: PropTypes.func.isRequired,
  rowNum: PropTypes.number.isRequired,
  showCell: PropTypes.func.isRequired,
  showHeader: PropTypes.func.isRequired,
  showTime: PropTypes.func.isRequired,
  tableProps: PropTypes.object,
  timeText: PropTypes.string,
  toolTip: PropTypes.string,
  valueKey: PropTypes.string.isRequired
}

DayTimeTable.defaultProps = {
  timeText: "Times",
  toolTip: ""
}

DayTimeTable.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default DayTimeTable

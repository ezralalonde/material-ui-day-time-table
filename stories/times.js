import React from "react" // eslint-disable-line no-unused-vars
import { storiesOf } from "@storybook/react"

import moment from "moment"
import DayTimeTable from "../src/DayTimeTable"

import { times } from "./data"

var intervalMinutes = 15
var interval = moment.duration(intervalMinutes, "minutes")
var min = moment("14:45", "HH:mm")
var max = moment("19:00", "HH:mm")

/**
 * Return text to be printed in cell.
 * @param {object} xx The data element that is being printed
 * @returns {object} The text that will appear in the cell
 */
function displayCell(xx) {
  return xx.text
}

/**
 * Return object's height in rows.
 * @param {object} xx The data element for a cell
 * @returns {number} The height of the element
 */
function calcHeight(xx) {
  return moment(xx.end, "h:mma").diff(moment(xx.start, "h:mma")) / interval
}

/**
 * Return text to be printed in row header.
 * @param {object} xx The data element for a list of cells
 * @returns {object} The text that will appear in the header.
 */
function displayHeader(xx) {
  return xx.name
}

/**
 * Determine whether a cell should be painted
 * @param {object} xx The data element being examined
 * @param {number} step The index of the row being painted
 * @returns {bool} True if cell should be coloured
 */
function isActive(xx, step) {
  var current = moment(min).add(step * interval)

  return (
    moment(xx.start, "h:mma") <= current && current < moment(xx.end, "h:mma")
  )
}

/**
 * Return text to be printed in left-most column.
 * @param {number} step The index of the row being addressed
 * @returns {object} The text that will appear in the cell
 */
function showTime(step) {
  var start = moment(min).add(interval * step)
  var end = moment(start).add(interval)

  return `${start.format("h:mma")}–${end.format("h:mma")}`
}

/**
 * Return table-wide unique key for data cell element.
 * @param {object} xx The data element for a cell
 * @returns {object} The unique key of the cell
 */
function key(xx) {
  return xx.text
}

storiesOf("Times", module)
  .add("Using Moment.js", () => (
    <DayTimeTable
      caption="My plan for the week"
      cellKey={key}
      calcCellHeight={calcHeight}
      showHeader={displayHeader}
      showCell={displayCell}
      showTime={showTime}
      isActive={isActive}
      max={max}
      min={min}
      data={times}
      rowNum={(max - min) / interval}
      valueKey="info"
    />
  ))
  .add("Moment.js, no header", () => (
    <DayTimeTable
      caption="My plan for the week"
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
      rowNum={(max - min) / interval}
      valueKey="info"
    />
  ))
  .add("Moment.js; no header, no times", () => (
    <DayTimeTable
      caption="My plan for the week"
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
      rowNum={(max - min) / interval}
      valueKey="info"
    />
  ))
  .add("Moment.js, no times", () => (
    <DayTimeTable
      caption="My plan for the week"
      cellKey={key}
      calcCellHeight={calcHeight}
      showHeader={displayHeader}
      showCell={displayCell}
      showTime={showTime}
      isActive={isActive}
      max={max}
      min={min}
      data={times}
      hideTimes
      rowNum={(max - min) / interval}
      valueKey="info"
    />
  ))

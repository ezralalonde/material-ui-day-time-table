import React from 'react'

var basic = [
{
  name: 'Sunday',
  values: [
    {
      start: 15,
      end: 30,
      blah: 'ezra',
      text: 1,
      props: {
        style: {
          backgroundColor: 'red',
          textAlign: 'center'
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
  values: [
    {
      start: 15,
      end: 30,
      text: 3
    }
  ]
},
{
  name: 'Tuesday',
  values: [
    {
      start: 30,
      end: 60,
      text: 4
    }
  ]
},
{
  name: 'Wednesday',
  values: [
    {
      start: 15,
      end: 75,
      text: 5
    }
  ]
}
]

var times = [
{
  name: 'Sunday',
  info: [
    {
      start: '4:00pm',
      end: '6:30pm',
      text: <div>
              <h3>Doctor Appointment</h3>
              <b>Dr. Nick</b><br />
              1-800-DOCTORB<br />
              The 'B' is for bargain!
            </div>,
      props: {
        style: {
          backgroundColor: 'red',
          textAlign: 'center'
        }
      }
    },
    {
      start: '3:00pm',
      end: '4:00pm',
      text: <h1>Hello, Ezra</h1>,
      props: {
        style: {
          backgroundColor: 'lightGreen',
          textAlign: 'center'
        }
      }
    }
  ]
},
{
  name: 'Monday',
  info: [
    {
      start: '5:00pm',
      end: '6:30pm',
      text: 'Meet with my lawyers.',
      props: {
        style: {
          backgroundColor: 'yellow',
          textAlign: 'center'
        }
      }
    }
  ]
},
{
  name: 'Tuesday',
  info: [
    {
      start: '4:30pm',
      end: '5:30pm',
      text: 'I am doing something from 4:30–5:30pm on this date.',
      props: {
        style: {
          backgroundColor: 'pink',
          textAlign: 'center',
          whiteSpace: 'normal',
          wordWrap: 'breakWord'
        }
      }
    },
    {
      start: '2:45pm',
      end: '4:30pm',
      text: 'Goodbye … I never thought it would come to this. But here we are.',
      props: {
        style: {
          backgroundColor: 'orange'
        }
      }
    }
  ]
},
{
  name: 'Wednesday',
  info: [
    {
      start: '3:00pm',
      end: '6:00pm',
      text: 'Another thing.',
      props: {
        style: {
          backgroundColor: 'lightBlue',
          textAlign: 'center'
        }
      }
    }
  ]
}
]

var screenshot = [
{
  header: 'Header One',
  data: [
    {
      start: '4:00pm',
      len: 1,
      content: 'Hello'
    }
  ]
},
{
  header: 'Title Two',
  data: [
    {
      start: '3:30pm',
      len: 0.5,
      content: 'World'
    },
    {
      start: '4:30pm',
      len: 1,
      content: 'Again'
    }
  ]
}
]

module.exports = { basic, times, screenshot }

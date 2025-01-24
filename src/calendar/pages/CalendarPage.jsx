import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { NavBar, CalendarEvent } from '../'  

import { localizer, getMessagesES } from '../../helpers'

const events = [{
  title: 'Subida a Tafí',
  notes: 'Some notes',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: '123',
    name: 'Emanuel'
  }
}]

export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {

  }
  return (
    <>
      <NavBar />
      
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
      }}
    />
    </>
  )
}

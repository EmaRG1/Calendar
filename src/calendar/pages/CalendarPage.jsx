import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { NavBar, CalendarEvent, CalendarModal } from '../'  

import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'

const events = [{
  title: 'Subida a Tafí',
  notes: 'Some notes',
  start: new Date(),
  end: addHours(new Date(), 1),
  user: {
    _id: '123',
    name: 'Emanuel'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

   const eventStyleGetter = (event, start, end, isSelected) => {

   }

  const onDoubleClick = (event) => {
    console.log( {doubleClick: event})
  }
  const onSelect = (event) => {
    console.log('select:',event)
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  }
  return (
    <>
      <NavBar />
      
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      
      <CalendarModal />
    </>
  )
}

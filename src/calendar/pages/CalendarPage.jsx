import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar, CalendarEvent, CalendarModal } from '../'  

import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import FabAddNew from '../components/FabAddNew'
import { addHours } from 'date-fns'
import FabDeleteItem from '../components/FabDeleteItem'

export const CalendarPage = () => {

  const { openModal, isDateModalOpen } = useUiStore();

  const { events, setActiveDateEvent, activeEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

   const eventStyleGetter = (event, start, end, isSelected) => {
     const style = {
       backgroundColor: '#347CF7',
       borderRadius: '0px',
       opacity: 0.8,
       color: 'white'
     }
     return {style}
   }

  const onOpenModal = () => {
    openModal();
  }
  const onOpenModalWithEmptyEvent = () => {
    openModal();
    setActiveDateEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        _id: '123',
        name: 'Emanuel'
      }
    });
  }
  const onSelect = (event) => {
    setActiveDateEvent(event);
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }
  return (
    <>
      <NavBar />
      
      <Calendar
        culture='es'
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
        onDoubleClickEvent={onOpenModal}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      
      <CalendarModal />
      <FabAddNew onOpenModalWithEmptyEvent={onOpenModalWithEmptyEvent} />
      <FabDeleteItem isModalOpen={isDateModalOpen} />
    </>
  )
}

import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onEditEvent, setActiveEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(state => state.calendar)

  const dispatch = useDispatch();

  const setActiveDateEvent = (calendarEvent) => {
    dispatch(setActiveEvent(calendarEvent));
  };

  const startSavingEvent = (calendarEvent) => {

    if (calendarEvent._id) {
      dispatch(onEditEvent({...calendarEvent}))
    } else {
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }

  }
  
  return {

    //Properties
    events,
    activeEvent,

    //Methods
    setActiveDateEvent,
    startSavingEvent
  }
}
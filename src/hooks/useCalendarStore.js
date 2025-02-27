import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onEditEvent, setActiveEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(state => state.calendar)

  const dispatch = useDispatch();

  const setActiveDateEvent = (calendarEvent) => {
    dispatch(setActiveEvent(calendarEvent));
  };

  const addNewEvent = (newEvent) => {
    dispatch(onAddNewEvent(newEvent))
  }

  const startEditingEvent = (eventToEdit) => {
    dispatch(onEditEvent(eventToEdit))
  }
  
  return {

    //Properties
    events,
    activeEvent,

    //Methods
    setActiveDateEvent,
    addNewEvent,
    startEditingEvent
  }
}
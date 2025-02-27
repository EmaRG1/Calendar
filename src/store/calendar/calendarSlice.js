import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvents = {
  _id: new Date().getTime(),
  title: 'Subida a Tafí',
  notes: 'Some notes',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: '123',
    name: 'Emanuel'
  }
}

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
     events: [
       tempEvents
     ],
     activeEvent: null
   },
   reducers: {
     setActiveEvent: (state, action) => {
      state.activeEvent = action.payload
     },
     onAddNewEvent: (state, {payload}) => {
       state.events.push(payload)
       state.activeEvent = null
     },
     onEditEvent: (state, { payload }) => {
       state.events = state.events.map(event => {
         if (event._id === payload._id) {
           return payload
         }
         return event
       })
       state.activeEvent = null
     }
   }
});


export const {
  setActiveEvent,
  onAddNewEvent,
  onEditEvent
} = calendarSlice.actions;
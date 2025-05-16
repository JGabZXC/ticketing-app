import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
  tickets: [],
  selectedTicketId: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload;
    },
    addTicket(state, action) {
      state.tickets.push(action.payload);
    },
    updateTicket(state, action) {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );
      if (index !== -1) {
        state.tickets[index] = {
          ...state.tickets[index],
          ...action.payload,
        };
      }
    },
    removeTicket(state, action) {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },
  },
});

export const fetchTickets = () => {
  return async (dispatch) => {
    const getTickets = async () => {
      const response = await fetch("http://localhost:3000/api/v1/tickets");
      if (!response.ok) {
        throw new Error("Could not fetch tickets!");
      }
      return await response.json();
    };

    try {
      const tickets = await getTickets();
      dispatch(ticketActions.setTickets(tickets.data.tickets));
    } catch (error) {
      dispatch(
        uiActions.setTicketError({
          title: "Error",
          status: 500,
          message: error.message,
        })
      );
    }
  };
};

export const ticketActions = ticketSlice.actions;
export default ticketSlice.reducer;

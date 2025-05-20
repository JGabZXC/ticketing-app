import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
  tickets: [],
  selectedTicketId: null,
  page: 1,
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
    setSelectedTicketId(state, action) {
      state.selectedTicketId = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload.data.tickets;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = false;
      state.tickets = [];
      state.totalPages = null;
      uiActions.setTicketError({
        title: "Error",
        status: "error",
        message: action.payload,
      });
    });
  },
});

export const fetchTickets = createAsyncThunk(
  "ticket/fetchTickets",
  async ({ orderBy, limit, priority, page }, { rejectWithValue }) => {
    try {
      let url = "";
      if (priority === "all") {
        url = `http://localhost:3000/api/v1/tickets?page=${page}&limit=${limit}&&sort=${orderBy}`;
      } else {
        url = `http://localhost:3000/api/v1/tickets/priority/${priority}?page=${page}&limit=${limit}&&sort=${orderBy}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch tickets");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed fetching tickets");
    }
  }
);

export const ticketActions = ticketSlice.actions;
export default ticketSlice.reducer;

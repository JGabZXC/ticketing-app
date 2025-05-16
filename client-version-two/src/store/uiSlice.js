import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authSuccess: null, // Objects
  authError: null, // Objects
  ticketError: null, // Objects
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAuthError(state, action) {
      state.authError = {
        title: action.payload.title,
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    setAuthSuccess(state, action) {
      state.authSuccess = {
        title: action.payload.title,
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    setTicketError(state, action) {
      state.ticketError = {
        title: action.payload.title,
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    clearAuthError(state) {
      state.authError = null;
    },
    clearAuthSuccess(state) {
      state.authSuccess = null;
    },
    clearTicketError(state) {
      state.ticketError = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

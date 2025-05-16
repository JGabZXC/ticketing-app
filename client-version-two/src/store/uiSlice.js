import { createSlice } from "@reduxjs/toolkit";

let notificationId = 0; // Initialize a counter for unique notification IDs

const initialState = {
  authSuccess: null, // Objects
  authError: null, // Objects
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAuthError(state, action) {
      state.authError = {
        id: notificationId++,
        title: action.payload.title,
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    setAuthSuccess(state, action) {
      state.authSuccess = {
        id: notificationId++,
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
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

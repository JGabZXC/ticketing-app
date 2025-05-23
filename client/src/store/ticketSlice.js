import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const ticketActions = ticketSlice.actions;
export default ticketSlice.reducer;

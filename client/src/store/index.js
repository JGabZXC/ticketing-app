import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import ticketSlice from "./ticketSlice";

const store = configureStore({
  reducer: { ui: uiSlice, auth: authSlice, tickets: ticketSlice },
});

export default store;

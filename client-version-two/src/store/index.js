import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: { ui: uiSlice, auth: authSlice },
});

export default store;

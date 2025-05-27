import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";
import { redirect } from "react-router-dom";
import { clearAuthStorage } from "../utils/auth";

const initialState = {
  user: localStorage.getItem("user") || null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      clearAuthStorage();
      redirect("/");
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearAuthState(state) {
      state.user = null;
      state.isAuthenticated = false;
      clearAuthStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reauthenticate.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(reauthenticate.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        // Dispatch a notification
        uiActions.setAuthError({
          title: "Session Expired",
          status: "error",
          message: "Please log in again.",
        });
      });
  },
});

// Thunk function to handle login
export const requestLogin = (username, password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://ticketing-app-j94u.onrender.com//api/v1/auth/login",
        {
          method: "POST",
          credentials: "include", // Send cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Something went wrong when logging in."
        );
      }
      return await response.json();
    };

    try {
      dispatch(authActions.setLoading(true));
      const data = await sendRequest();
      dispatch(authActions.login({ user: data.data.user }));
      dispatch(
        uiActions.setAuthSuccess({
          title: "Login Successful",
          status: "success",
          message: "You have logged in successfully.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setAuthError({
          title: "Login Failed",
          status: "error",
          message: error.message,
        })
      );
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const requestLogout = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://ticketing-app-j94u.onrender.com//api/v1/auth/logout",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Something went wrong when logging out."
        );
      }
      return await response.json();
    };

    try {
      await sendRequest();
      dispatch(authActions.logout());
      dispatch(
        uiActions.setAuthSuccess({
          title: "Logout Successful",
          status: "success",
          message: "You have logged out successfully.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setAuthError({
          title: "Logout Failed",
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const reauthenticate = createAsyncThunk(
  "auth/reauthenticate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://ticketing-app-j94u.onrender.com//api/v1/auth/me",
        {
          credentials: "include", // Send cookies
        }
      );

      if (!response.ok) {
        // Handle non-2xx responses
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to reauthenticate.");
      }

      const data = await response.json();
      return data.data.user; // Return the user data
    } catch (error) {
      // Return the error message to the rejected case
      return rejectWithValue(error.message || "Reauthentication failed.");
    }
  }
);

export const authActions = authSlice.actions;
export default authSlice.reducer;

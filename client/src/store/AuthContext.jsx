import { createContext, useReducer, useState, useEffect } from "react";
import { updateProfileAction, updatePasswordAction } from "../utils/actions";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  message: undefined,
  Login: () => {},
  Logout: () => {},
  Register: () => {},
  updateProfile: () => {},
  updatePassword: () => {},
});

function authReducer(state, action) {
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
      isAuthenticated: true,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
    };
  }

  return state;
}

export function AuthContextProvider({ children }) {
  const [userState, dispatchUserAction] = useReducer(authReducer, {
    user: null,
    isLoggedIn: false,
  });
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    async function checkAuthStatus() {
      const response = await fetch("http://localhost:3000/api/v1/auth/me", {
        credentials: "include", // Send cookie
      });

      if (!response.ok) return;

      const data = await response.json();
      dispatchUserAction({
        type: "LOGIN",
        payload: {
          user: data.data.user,
        },
      });
    }

    checkAuthStatus();
  }, []);

  async function Login(username, password) {
    try {
      setMessage(undefined);
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setMessage({
        authSuccess: "Login successful! You will be redirected to home.",
      });
      dispatchUserAction({
        type: "LOGIN",
        payload: {
          user: data.data.user,
        },
      });
    } catch (error) {
      setMessage({ authError: error.message });
    }
  }

  async function Register(data) {
    try {
      setMessage(undefined);
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await response.json();

      if (result.status === "success")
        setMessage({
          registerSuccess: "Registration successful! You can now login.",
        });
    } catch (error) {
      setMessage({ registerError: error.message });
    }
  }

  async function Logout() {
    try {
      setMessage(undefined);
      const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      dispatchUserAction({
        type: "LOGOUT",
      });
    } catch (error) {
      setMessage({ authError: error.message });
      dispatchUserAction({
        type: "LOGOUT",
      });
    }
  }

  async function updateProfile(formData) {
    const result = await updateProfileAction(formData);

    if (result.success) {
      setMessage({
        updateMessage: { success: result.success, message: result.message },
      });
      dispatchUserAction({
        type: "LOGIN",
        payload: {
          user: result.user,
        },
      });
    }

    setMessage({
      updateMessage: { success: result.success, message: result.message },
    });
  }

  async function updatePassword(formData) {
    const result = await updatePasswordAction(formData);

    if (result.success) {
      setMessage({
        updatePasswordMessage: {
          success: result.success,
          message: result.message,
        },
      });
      dispatchUserAction({
        type: "LOGIN",
        payload: {
          user: result.user,
        },
      });
    }

    setMessage({
      updatePasswordMessage: {
        success: result.success,
        message: result.message,
      },
    });
  }

  const contextValue = {
    user: userState.user,
    isAuthenticated: userState.isAuthenticated,
    message,
    setMessage,
    Login,
    Logout,
    Register,
    updateProfile,
    updatePassword,
  };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}

export default AuthContext;

import { createContext, useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  register: () => {},
  user: null,
});

const configLogin = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // Include cookies in the request
};

const configLogout = {
  method: "GET",
  credentials: "include",
};

const configRegister = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // Include cookies in the request
};

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    data: userData,
    error: userError,
    fetchData: sendLoginRequest,
  } = useHttp("http://localhost:3000/api/v1/auth/login", configLogin, null);

  const { error: logoutError, fetchData: sendLogoutRequest } = useHttp(
    "http://localhost:3000/api/v1/auth/logout",
    configLogout,
    user
  );

  const {
    error: registerError,
    loading: registerLoading,
    fetchData: sendRegisterRequest,
  } = useHttp(
    "http://localhost:3000/api/v1/auth/register",
    configRegister,
    null
  );

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/auth/me", {
          credentials: "include", // Send cookie
        });

        if (!response.ok) throw new Error("Not authenticated");
        const data = await response.json();
        setUser(data.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error checking auth status:", error.message);
        setIsLoggedIn(false);
        setUser(null);
      }
    }

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (userError) {
      setMessage({ userError });
      setIsLoggedIn(false);
    }

    if (userData) {
      setUser(userData.data.user);
      setMessage(null);
      setIsLoggedIn(true);
    }
  }, [userData, userError]);

  useEffect(() => {
    if (isLoggingOut) {
      if (logoutError) {
        setMessage({ logoutError });
        setIsLoggingOut(false);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoggingOut(false);
      }
    }
  }, [logoutError, isLoggedIn, isLoggingOut]);

  useEffect(() => {
    if (isRegistering) {
      if (registerError) {
        setMessage({ registerError });
        setIsRegistering(false);
      } else if (!registerError && !registerLoading) {
        setMessage({ success: "Registration successful! Please log in." });
        setIsRegistering(false);
      }
    }
  }, [registerError, isRegistering, registerLoading]);

  async function login(username, password) {
    setMessage(null);
    await sendLoginRequest({ username, password });
  }

  async function logout() {
    setMessage(null);
    setIsLoggingOut(true);
    await sendLogoutRequest();
  }

  async function register(
    username,
    email,
    firstName,
    lastName,
    password,
    confirmPassword
  ) {
    setIsRegistering(true);
    setMessage(null);
    sendRegisterRequest({
      username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    });
  }

  // async function register(
  //   username,
  //   email,
  //   firstName,
  //   lastName,
  //   password,
  //   confirmPassword
  // ) {
  //   setMessage(null);
  //   const response = await fetch("http://localhost:3000/api/v1/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include", // Include cookies in the request
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       firstName,
  //       lastName,
  //       password,
  //       confirmPassword,
  //     }),
  //   });

  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     throw new Error(errorData.message || "Registration failed");
  //   }

  //   setMessage({ success: "Registration successful! Please log in." });
  // }

  const contextValue = {
    isLoggedIn,
    login,
    logout,
    register,
    user,
    message,
  };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}

export default AuthContext;

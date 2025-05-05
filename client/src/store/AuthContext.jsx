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

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    data: userData,
    error: userError,
    fetchData: sendLoginRequest,
  } = useHttp("http://localhost:3000/api/v1/auth/login", configLogin, null);

  // const { error: logoutError, fetchData: sendLogoutRequest } = useHttp(
  //   "http://localhost:3000/api/v1/auth/logout",
  //   configLogout,
  //   user
  // );

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
      setMessage(userError);
      setIsLoggedIn(false);
    }

    if (userData) {
      setUser(userData.data.user);
      setIsLoggedIn(true);
    }
  }, [userData, userError]);

  // useEffect(() => {
  //   if (logoutError) {
  //     setMessage(logoutError);
  //   } else if (!logoutError) {
  //     setIsLoggedIn(false);
  //   }

  //   if (!isLoggedIn) {
  //     setUser(null);
  //   }
  // }, [logoutError, isLoggedIn]);

  async function login(username, password) {
    setMessage(null);
    await sendLoginRequest({ username, password });
  }

  async function logout() {
    setMessage(null);
    // Note: Cookies are domain-specific, meaning they are set for a specific domain or subdomain. In this case, even though localhost and 127.0.0.1 both refer to your local machine, they are technically treated as different domains by the browser.

    // Setting cookies for 127.0.0.1:3000 makes them only available for that domain, but when accessing the same app on localhost, the cookie won't be sent with your requests because it's not scoped to the localhost domain.
    const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    setIsLoggedIn(false);
    setUser(null);
  }

  async function register(
    username,
    email,
    firstName,
    lastName,
    password,
    confirmPassword
  ) {
    setMessage(null);
    const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify({
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    setMessage("Registration successful! Please log in.");
  }

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

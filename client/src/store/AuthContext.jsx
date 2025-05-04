import { createContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
});

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  async function login(username, password) {
    console.log("You are here");
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setIsLoggedIn(true);
      setUser(data.data.user);
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }

  async function logout() {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/auth/logout", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  }

  const contextValue = {
    isLoggedIn,
    login,
    logout,
    user,
  };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}

export default AuthContext;

import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
});

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
        setIsLoggedIn(false);
        setUser(null);
        throw new Error(error.message);
      }
    }

    checkAuthStatus();
  }, []);

  async function login(username, password) {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
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
      // Note: Cookies are domain-specific, meaning the are set for a specific domain or subdomain. In this case, even though localhost and 127.0.0.1 both refer to your local machine, they are technically treated as different domains by the browser.

      // Setting cooking 127.0.0.1:300 it is only availabe for that domain, but when accessing the same app on localhost, the cookie won't be sent with your requests because it's not scoped to the localhost domain.
      const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || "Logout failed");
      }

      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  const contextValue = {
    isLoggedIn,
    login,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;

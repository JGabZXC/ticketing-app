import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  register: () => {},
  user: null,
});

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

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
        console.error("Error fetching cookies: ", error.message);
        setIsLoggedIn(false);
        setUser(null);
      }
    }

    checkAuthStatus();
  }, []);

  async function login(username, password) {
    setMessage(null);
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
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    setIsLoggedIn(true);
    setUser(data.data.user);
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

import { createContext, useContext, useState } from "react";
import { apiUrl } from "../config/api";

const AuthContext = createContext(null);

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const token = window.localStorage.getItem("shopez-token");
    const stored = window.localStorage.getItem("shopez-user");
    if (!token || !stored) {
      return null;
    }

    return { ...JSON.parse(stored), token };
  } catch {
    return null;
  }
}

async function parseAuthResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { message: (await response.text()) || "Auth service is unavailable." };

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed");
  }

  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const persistAuth = (data) => {
    const nextUser = { name: data.name, role: data.role, token: data.token };
    window.localStorage.setItem("shopez-token", data.token);
    window.localStorage.setItem("shopez-user", JSON.stringify({ name: data.name, role: data.role }));
    setUser(nextUser);
    return nextUser;
  };

  const login = async ({ email, password }) => {
    const response = await fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseAuthResponse(response);
    return persistAuth(data);
  };

  const signup = async ({ name, email, password }) => {
    const response = await fetch(apiUrl("/api/auth/signup"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await parseAuthResponse(response);
    return persistAuth(data);
  };

  const logout = () => {
    window.localStorage.removeItem("shopez-token");
    window.localStorage.removeItem("shopez-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user?.token),
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

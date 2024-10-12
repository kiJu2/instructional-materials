import React, { createContext, useEffect, useState } from "react";

type User = {
  accessToken: string;
};

export const AuthContext = createContext<{
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
}>({
  user: null,
  login: (accessToken: string) => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (accessToken: string) => {
    localStorage.setItem("accessToken", "123456");
    document.cookie = `accessToken=${localStorage.getItem("accessToken")}`;
    setUser({ accessToken });
  };
  const logout = () => setUser(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser({ accessToken });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);

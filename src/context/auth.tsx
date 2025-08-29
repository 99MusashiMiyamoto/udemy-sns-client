import apiClient from "@/lib/apiClients";
import React, { useContext, ReactNode, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthChecked: boolean; // 新しいプロパティ
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthChecked: false, // 初期値
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // 新しい状態

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      apiClient
        .get("/users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("auth_token");
          setUser(null);
        })
        .finally(() => {
          setIsAuthChecked(true); // 認証チェック完了
        });
    } else {
      setUser(null);
      setIsAuthChecked(true); // 認証チェック完了
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await apiClient.get("/users/find");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthChecked, // コンテキストに含める
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

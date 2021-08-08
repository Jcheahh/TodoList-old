import { AxiosError } from "axios";
import React, { useContext, createContext, useState } from "react";
import http from "../http";

interface Auth {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
  signout: () => Promise<void>;
  validateToken: () => Promise<boolean>;
}

export const authContext = createContext<Auth | null>(null);

export function useAuth(): Auth | null {
  return useContext(authContext);
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export function useProvideAuth(): Auth {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): Promise<void> =>
    http
      .post("/api/users/sign_in", {
        user: {
          email,
          password,
        },
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      })
      .catch((error: AxiosError) => {
        throw error.response;
      });
  const signup = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<void> =>
    http
      .post("/api/users", {
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation,
        },
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      })
      .catch((error: AxiosError) => {
        throw error.response;
      });

  const signout = (): Promise<void> =>
    new Promise((resolve, _reject) => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      resolve();
    });

  const validateToken = (): Promise<boolean> =>
    http
      .get("/api/validate_token")
      .then((response) => {
        setUser(response.data);
        return true;
      })
      .catch((_e) => {
        return false;
      });

  return {
    token,
    user,
    login,
    signup,
    signout,
    validateToken,
  };
}

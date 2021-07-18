import { AxiosError } from "axios";
import { useContext, createContext, useState } from "react";
import http from "../http";

interface Auth {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
  signout: () => Promise<void>;
}

export const authContext = createContext<Auth | null>(null);

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(localStorage.getItem("token"));

  const login = (email: string, password: string): Promise<void> =>
    http
      .post("/api/users/sign_in", {
        user: {
          email,
          password,
        },
      })
      .then((response) => {
        setUser(response.data.token);
        localStorage.setItem("token", response.data.token);
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
        setUser(response.data.token);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error: AxiosError) => {
        throw error.response;
      });

  const signout = (): Promise<void> =>
    new Promise((resolve, _reject) => {
      setUser(null);
      localStorage.removeItem("token");
      resolve();
    });

  return {
    user,
    login,
    signup,
    signout,
  };
}

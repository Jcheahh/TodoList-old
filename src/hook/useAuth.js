import { useContext, createContext, useState } from "react";
import http from "../http";

export const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(localStorage.getItem("token"));

    const login = (email, password, cb, errorCb) => {
        http.post("/api/users/sign_in", {
            user: {
                email,
                password,
            },
        }).then((response) => {
            setUser(response.data.token);
            localStorage.setItem("token", response.data.token);
            cb();
        }).catch((error) => {
            errorCb(error.response);
        });
    };
    const signup = (firstName, lastName, email, password, password_confirmation, cb, errorCb) => {
        http.post("/api/users", {
            user: {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirmation,
            },

        }).then((response) => {
            setUser(response.data.token);
            localStorage.setItem("token", response.data.token);
            cb();
        }).catch((error) => {
            errorCb(error.response);
        });
    };

    const signout = (cb) => {
        setUser(null);
        localStorage.removeItem("token");
        cb();
    };

    return {
        user,
        login,
        signup,
        signout,
    };
}

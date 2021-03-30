import React from "react";
import {
    Link,
    useHistory,
    useLocation
} from "react-router-dom";
import { useAuth } from "../App";

export default function Login() {
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        auth.login(() => {
            history.replace(from);
        });
    };
    return (
        <>
            <h1>Log in</h1>
            <p>Email</p>
            <input /><br />
            <p>Password</p>
            <input type="password" /><br />
            <p>Don't have an account? Sign up <Link to="/sign-up">here</Link></p>
            <button onClick={login}>Log in</button>
        </>
    );
}



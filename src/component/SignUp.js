import React from "react";
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import { useAuth } from "../App";

export default function SignUp() {
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
            <h1>Sign Up</h1>
            <p>First Name</p>
            <input />
            <p>Last Name</p>
            <input /><br />
            <p>Email</p>
            <input required/><br />
            <p>Password</p>
            <input type="password" required/><br />
            <p>Already have an account? Log in <Link to="/login">here</Link></p>
            <button onClick={login}>Sign Up</button>
        </> 
  );
}

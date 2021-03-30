import React from "react";
import {
  Link
} from "react-router-dom";

export default function LandingPage() {
  return (
        <>
            <h1>Welcome</h1>
            <Link to="/login">Log In</Link>
            <Link to="/sign-up">Sign Up</Link>
        </> 
  );
}

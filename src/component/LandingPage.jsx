import React from "react";
import {
    Link,
} from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="App shadow font-sans px-9 py-16 flex justify-start flex-col w-4/6 max-w-screen-sm bg-white mx-auto my-28 rounded-2xl">
            <h1 className="font-bold text-7xl text-gray-800 text-center mt-24">Welcome</h1>
            <div className="text-center flex space-x-4 mt-16">
                <Link to="/login" className="flex-1 text-2xl bg-purple-100 focus:outline-none text-sm py-2.5 px-8 rounded-2xl font-bold hover:bg-purple-600 hover:text-purple-100 text-purple-700 transform self-center">
                    Log In
                </Link>
                <Link to="/sign-up" className="flex-1 text-2xl bg-purple-100 focus:outline-none text-sm py-2.5 px-8 rounded-2xl font-bold hover:bg-purple-600 hover:text-purple-100 text-purple-700 transform self-center">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

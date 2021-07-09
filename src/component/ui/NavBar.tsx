/* eslint-disable react/require-default-props */
import React from "react";
import { Link } from "react-router-dom";
import { toText, gray2 } from "./color";

function NavBar({ children, className = [] }: {
    children?: JSX.Element[],
    className?: string[],
}): JSX.Element {
    return (
        <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-3 px-6 bg-white sm:items-baseline w-full container">
            <div className="mb-2 sm:mb-0">
                <Link to="/" className="text-xl font-bold">Todo List</Link>
                {" "}

            </div>
            <p className={[toText(gray2), ...className].join(" ")}>{children}</p>

        </nav>
    );
}

export default NavBar;

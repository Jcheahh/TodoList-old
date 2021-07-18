/* eslint-disable react/require-default-props */
import React from "react";
import { Link as RLink } from "react-router-dom";
import {
    red1, red2, toText,
} from "./color";

const baseClasses = [
    "leading-normal",
    toText(red1),
    `hover:text-${red2}`,
];

export function Link({
    to, children, className = [], ...props
}: {
    to: string,
    children: string,
    className?: string[],
}): JSX.Element {
    return (
        <RLink to={to} className={[...baseClasses, ...className].join(" ")} {...props}>{children}</RLink>
    );
}

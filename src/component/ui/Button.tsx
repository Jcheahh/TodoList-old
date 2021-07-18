/* eslint-disable react/require-default-props */
import React from "react";
import {
    toText, toBg, toHover, gray1, gray3, gray4, gray5,
} from "./color";
import "./Button.css";

function toLarge(classes: string[]) {
    return [...classes, "py-4", "px-10", "text-xl"];
}

function toSmall(classes: string[]) {
    return [...classes, "py-1.5", "px-4"];
}

const buttonBaseClasses = [
    "ui-button", // For own custom css
    "rounded-xl",
    "tracking-wide",
    "font-semibold",
    "font-display",
    "focus:outline-none",
    "focus:shadow-outline",
    "disabled:opacity-50",
    "transform",
    "hover:shadow",
];

const buttonClasses = [...buttonBaseClasses, toText(gray5)];

type ButtonProps = Omit<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
    "className"
> & {
    children: string;
    type: "button" | "submit" | "reset";
    className?: string[];
    isLarge?: boolean;
};
// & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function Button({
    children,
    type,
    className = [],
    isLarge = false,
    ...props
}: ButtonProps): JSX.Element {
    return (
        <button
            className={[
                "ui-main-button",
                ...(isLarge ? toLarge(buttonClasses) : toSmall(buttonClasses)),
                ...className,
            ].join(" ")}
            /* eslint-disable-next-line react/button-has-type */
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

// const defaultButtonClasses = [
//     ...buttonBaseClasses,
//     toText(gray1),
//     toBg(gray4),
//     toHover(toBg(gray3)),

// ];

// Button.Default = function ({
//     children, className, type, isLarge, ...props
// }) {
//     return (
//         <button
//             className={[...((isLarge ?
// toLarge(defaultButtonClasses) : toSmall(defaultButtonClasses))), ...className].join(" ")}
//             /* eslint-disable-next-line react/button-has-type */
//             type={type}
//             {...props}
//         >
//             {children}
//         </button>
//     );
// };

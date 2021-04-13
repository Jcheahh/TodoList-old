import React from "react";
import PropTypes from "prop-types";
import {
    toText, toBg, toHover, gray1, gray3, gray4, gray5, main1,
} from "./color";
import "./Button.css";

const buttonBaseClasses = [
    "p-4",
    "w-full",
    "rounded-xl",
    "text-lg",
    "tracking-wide",
    "font-semibold",
    "font-display",
    "focus:outline-none",
    "focus:shadow-outline",
    // "hover:bg-indigo-600",
    // "shadow-lg",
    "mt-4",
    "disabled:opacity-50",
    // "disabled:hover:bg-indigo-500",
];

const buttonClasses = [
    ...buttonBaseClasses,
    toText(gray5),

];

export function Button({
    children, type, className, ...props
}) {
    return (
        <button
            className={[...buttonClasses, ...className, "ui-button"].join(" ")}
            /* eslint-disable-next-line react/button-has-type */
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

const defaultButtonClasses = [
    ...buttonBaseClasses,
    toText(gray1),
    toBg(gray4),
    toHover(toBg(gray3)),

];

Button.Default = function ({
    children, className, type, ...props
}) {
    return (
        <button
            className={[...defaultButtonClasses, ...className].join(" ")}
            /* eslint-disable-next-line react/button-has-type */
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

const buttonPropTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.arrayOf(PropTypes.string),
    /* eslint-disable-next-line react/forbid-prop-types */
    style: PropTypes.object,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
};

const buttonDefaultProps = {
    className: [],
    style: {},
    type: "button",
};

Button.propTypes = buttonPropTypes;
Button.defaultProps = buttonDefaultProps;
Button.Default.propTypes = buttonPropTypes;
Button.Default.defaultProps = buttonDefaultProps;

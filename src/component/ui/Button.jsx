import React from "react";
import PropTypes from "prop-types";
import {
    toText, toBg, toHover, gray1, gray3, gray4, gray5, main1,
} from "./color";
import "./Button.css";

function toLarge(classes) {
    return [
        ...classes,
        "py-4",
        "px-10",
        "text-xl",
    ];
}

function toSmall(classes) {
    return [
        ...classes,
        "py-1.5",
        "px-4",
    ];
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

const buttonClasses = [
    ...buttonBaseClasses,
    toText(gray5),
];

export function Button({
    children, type, className, isLarge, ...props
}) {
    return (
        <button
            className={["ui-main-button", ...(isLarge ? toLarge(buttonClasses) : toSmall(buttonClasses)), ...className].join(" ")}
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
    children, className, type, isLarge, ...props
}) {
    return (
        <button
            className={[...((isLarge ? toLarge(defaultButtonClasses) : toSmall(defaultButtonClasses))), ...className].join(" ")}
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
    isLarge: PropTypes.bool,
};

const buttonDefaultProps = {
    className: [],
    style: {},
    type: "button",
    isLarge: false,
};

Button.propTypes = buttonPropTypes;
Button.defaultProps = buttonDefaultProps;
Button.Default.propTypes = buttonPropTypes;
Button.Default.defaultProps = buttonDefaultProps;

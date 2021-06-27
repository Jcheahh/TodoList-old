import React from "react";
import PropTypes from "prop-types";
import { Link as RLink } from "react-router-dom";
import {
    gray2, red1, red2, toText,
} from "./color";

const baseClasses = [
    "leading-normal",
];

export function Link({ children, className, ...props }) {
    return (
        <RLink className={[toText(gray2), ...className].join(" ")} {...props}>{children}</RLink>
    );
}

const linkRegularClassess = [
    ...baseClasses,
    toText(red1),
    `hover:text-${red2}`,
];

Link.Regular = function ({ children, className, ...props }) {
    return (
        <Link className={[...linkRegularClassess, ...className]} {...props}>{children}</Link>
    );
};

const linkPropTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.arrayOf(PropTypes.string),
};

const linkDefaultProps = {
    className: [],
};

Link.propTypes = linkPropTypes;
Link.defaultProps = linkDefaultProps;
Link.Regular.propTypes = linkPropTypes;
Link.Regular.defaultProps = linkDefaultProps;

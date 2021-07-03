import React from "react";
import PropTypes from "prop-types";

import {
    gray1, gray2, gray3, toText,
} from "./color";

const baseClasses = [
    "leading-normal",
];

export function Text({ children, className }) {
    return (
        <p className={[toText(gray2), ...className].join(" ")}>{children}</p>
    );
}

// H tags

const hBaseClasses = [
    ...baseClasses,
    toText(gray1),
    "font-medium",
    "title-font",
];

const h1Classes = [
    ...hBaseClasses,
    "text-7xl",
];

Text.H1 = function ({ children, className }) {
    return (
        <h1 className={[...h1Classes, ...className].join(" ")}>{children}</h1>
    );
};

const h2Classes = [
    ...hBaseClasses,
    "text-5xl",
];

Text.H2 = function ({ children, className }) {
    return (
        <h2 className={[...h2Classes, ...className].join(" ")}>{children}</h2>
    );
};

const h3Classes = [
    ...hBaseClasses,
    "text-4xl",
];

Text.H3 = function ({ children, className }) {
    return (
        <h3 className={[...h3Classes, ...className].join(" ")}>{children}</h3>
    );
};

const h4Classes = [
    ...hBaseClasses,
    "text-3xl",
];

Text.H4 = function ({ children, className }) {
    return (
        <h4 className={[...h4Classes, ...className].join(" ")}>{children}</h4>
    );
};

const h5Classes = [
    ...hBaseClasses,
    "text-2xl",
];

Text.H5 = function ({ children, className }) {
    return (
        <h5 className={[...h5Classes, ...className].join(" ")}>{children}</h5>
    );
};

// Small

const translucentClasses = [
    ...baseClasses,
    "text-sm",
    toText(gray3),
];

Text.Translucent = function ({ children, className }) {
    return (
        <p className={[...translucentClasses, ...className].join(" ")}>{children}</p>
    );
};

const smallClasses = [
    ...baseClasses,
    "text-sm",
];

Text.Small = function ({ children, className }) {
    return (
        <p className={[...smallClasses, ...className].join(" ")}>{children}</p>
    );
};

const textPropTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.arrayOf(PropTypes.string),
};

const textDefaultProps = {
    className: [],
};

Text.propTypes = textPropTypes;
Text.defaultProps = textDefaultProps;
Text.H1.propTypes = textPropTypes;
Text.H1.defaultProps = textDefaultProps;
Text.H2.propTypes = textPropTypes;
Text.H2.defaultProps = textDefaultProps;
Text.H3.propTypes = textPropTypes;
Text.H3.defaultProps = textDefaultProps;
Text.H4.propTypes = textPropTypes;
Text.H4.defaultProps = textDefaultProps;
Text.H5.propTypes = textPropTypes;
Text.H5.defaultProps = textDefaultProps;
Text.Small.propTypes = textPropTypes;
Text.Small.defaultProps = textDefaultProps;
Text.Translucent.propTypes = textPropTypes;
Text.Translucent.defaultProps = textDefaultProps;

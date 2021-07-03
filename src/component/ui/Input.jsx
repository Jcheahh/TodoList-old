import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#fd571b",
        },
    },
});

function Input({ className, variant, ...props }) {
    return (
        <TextField label="Standard" className={[...className].join(" ")} variant={variant} {...props} color={theme} />
    );
}

const inputPropTypes = {
    className: PropTypes.arrayOf(PropTypes.string),
    variant: PropTypes.oneOf(["filled", "outlined", "standard"]).isRequired,
};

const inputDefaultProps = {
    className: [],
};

Input.propTypes = inputPropTypes;
Input.defaultProps = inputDefaultProps;

export default Input;

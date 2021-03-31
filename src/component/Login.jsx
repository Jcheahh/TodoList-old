import React from "react";
import {
    Link,
    useHistory,
    useLocation,
} from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useAuth } from "./useAuth";

export default function Login() {
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        auth.login(() => {
            history.replace(from);
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // console.log("hellllllo");
    };

    const validate = (values) => {
        const error = {};
        if (!values.email) {
            error.email = "Fill in your email";
        } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)) {
            // Check email
            error.email = "Please enter a vaild email address";
        }

        if (!values.password) {
            error.password = "Please enter your password";
        }
        return error;
    };
    return (
        <>
            <Link to="/">Home</Link>
            <h1>Log in</h1>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <p>Email Address</p>
                        <Field
                            name="email"
                            render={({ input, meta }) => (
                                <input
                                    required
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    error={!!meta.error && meta.touched}
                                    helperText={meta.touched ? meta.error : undefined}
                                    {...input}
                                />
                            )}
                        />
                        <p>Password</p>
                        <input type="password" required />
                        <br />
                        <p>
                            Don&apos;t have an account? Sign up
                            {" "}
                            <Link to="/sign-up">here</Link>
                        </p>
                        <button type="button" onClick={login}>Log in</button>
                    </form>
                )}
            />

        </>
    );
}

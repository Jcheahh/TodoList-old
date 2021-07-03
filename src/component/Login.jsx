import React, { useState } from "react";
import {
    useHistory,
    useLocation,
} from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useAuth } from "../hook/useAuth";
import NavBar from "./ui/NavBar";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import Input from "./ui/Input";

export default function Login() {
    const [user, setUser] = useState();
    const [errMessage, setErrMessage] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();

    const { from } = location.state || { from: { pathname: "/" } };

    const validate = (values) => {
        const error = {};
        if (!values.email) {
            error.email = "Fill in your email";
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
            // Check email
            error.email = "Please enter a vaild email address";
        }

        if (!values.password) {
            error.password = "Please enter your password";
        }
        return error;
    };

    const handleChange = (e) => {
        setUser(e.target.values);
    };

    const handleSubmit = (values, _, callback) => {
        auth.login(values.email, values.password, () => {
            history.replace(from);
            callback();
        }, (error) => {
            callback(error || {});
            if (error === undefined) {
                setErrMessage("Something went wrong");
            } else if (error.status === 422) {
                setErrMessage("Invalid email address or password");
            } else {
                setErrMessage(error.data.message);
            }
        });
    };
    return (
        <>
            <NavBar />
            <div className="mx-auto mt-36 lg:w-1/2 xl:max-w-screen-sm">
                <div className="mt-10 px-16 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                    <Text.H3>
                        Log In
                    </Text.H3>

                    <Form
                        onSubmit={handleSubmit}
                        validate={validate}
                        render={({ handleSubmit, submitting }) => (
                            <div className="mt-12">
                                <form onSubmit={handleSubmit} noValidate>
                                    <Text className={["text-red-500 text-center mb-4 font-bold"]}>
                                        {errMessage}
                                    </Text>
                                    <Text.Small className={["font-bold text-gray-700 tracking-wide"]}>
                                        Email
                                    </Text.Small>
                                    <Field
                                        name="email"
                                        render={({ input, meta }) => (
                                            <>
                                                <Input
                                                    label="Email"
                                                    className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${meta.touched && !!meta.error ? "border-red-500" : ""}`}
                                                    placeholder="example@gmail.com"
                                                    id="email"
                                                    name="email"
                                                    autoComplete="email"
                                                    onChange={handleChange}
                                                    {...input}
                                                />
                                                {meta.touched && !!meta.error && <p className="text-red-500 text-xs italic text-sm">{meta.error}</p>}
                                            </>
                                        )}
                                    />
                                    <div className="mt-8">
                                        <Text.Small className={["font-bold text-gray-700 tracking-wide"]}>
                                            Password
                                        </Text.Small>
                                        <Field
                                            name="password"
                                            render={({ input, meta }) => (
                                                <>
                                                    <input
                                                        className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${meta.touched && !!meta.error ? "border-red-500" : ""}`}
                                                        placeholder="Enter your password"
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="password"
                                                        onChange={handleChange}
                                                        {...input}
                                                    />
                                                    {meta.touched && !!meta.error && <p className="text-red-500 text-xs italic text-sm">{meta.error}</p>}
                                                </>
                                            )}
                                        />
                                    </div>

                                    <Text.Small className={["flex my-3.5 font-display font-semibold"]}>
                                        Don&apos;t have an account?&nbsp;
                                        {" "}
                                        <Link.Regular to="/sign-up">Sign up</Link.Regular>
                                    </Text.Small>
                                    <Button type="submit" disabled={submitting}>{submitting ? "Loading..." : "Log In"}</Button>
                                </form>
                            </div>
                        )}
                    />
                </div>

            </div>
        </>
    );
}

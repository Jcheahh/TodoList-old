import React, { useState } from "react";
import {
    Link,
    useHistory,
    useLocation,
} from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useAuth } from "./useAuth";

export default function SignUp() {
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();
    const [user, setUser] = useState();
    const [errMessage, setErrMessage] = useState();

    const { from } = location.state || { from: { pathname: "/" } };

    const validate = (values) => {
        const error = {};
        if (!values.firstName) {
            error.firstName = "Please enter your First Name";
        } else if (values.firstName.length < 2) {
            error.firstName = "Your First Name is too short";
        }

        if (!values.lastName) {
            error.lastName = "Please enter your Last Name";
        } else if (values.lastName.length < 2) {
            error.lastName = "Your Last Name is too short";
        }

        if (!values.email) {
            error.email = "Fill in your email";
        } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)) {
            // Check email
            error.email = "Please enter a vaild email address";
        }

        if (!values.password) {
            error.password = "Please enter your password";
        } else if (values.password.length < 8) {
            error.password = "Your password too short";
        }

        if (values.comfirmPassword !== values.password) {
            error.comfirmPassword = "Password and Confirm password should match!";
        }
        return error;
    };

    const handleChange = (e) => {
        setUser(e.target.values);
    };

    const handleSubmit = (values) => {
        // values.preventDefault();

        auth.signup(values.firstName,
            values.lastName,
            values.email,
            values.password,
            values.comfirmPassword,
            () => {
                history.replace(from);
            }, (error) => {
                if (error.status === 422) {
                    setErrMessage("Invalid email address or password");
                } else {
                    setErrMessage(error.message);
                }
            });
    };

    return (
        <div className="mx-auto mt-24 lg:w-1/2 xl:max-w-screen-sm">
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
                <Link to="/">Home</Link>
            </div>
            <div className="mt-10 px-16 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h1 className="mt-24 text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
                >
                    Sign Up

                </h1>
                <Form
                    onSubmit={handleSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting }) => (
                        <div className="mt-12">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="text-red-500 text-center mb-4 font-bold">{errMessage}</div>
                                <div className="-mx-3 md:flex mb-6">
                                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">First Name</div>
                                        <Field
                                            name="firstName"
                                            render={({ input, meta }) => (
                                                <>
                                                    <input
                                                        className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${meta.touched && !!meta.error ? "border-red-500" : ""}`}
                                                        placeholder="Jane"
                                                        id="firstName"
                                                        name="firstName"
                                                        autoComplete="firstName"
                                                        onChange={handleChange}
                                                        {...input}
                                                    />
                                                    {meta.touched && !!meta.error && <p className="text-red-500 text-xs italic text-sm">{meta.error}</p>}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className="md:w-1/2 px-3">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">Last Name</div>
                                        <Field
                                            name="lastName"
                                            render={({ input, meta }) => (
                                                <>
                                                    <input
                                                        className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${meta.touched && !!meta.error ? "border-red-500" : ""}`}
                                                        placeholder="Doe"
                                                        id="lastName"
                                                        name="lastName"
                                                        autoComplete="lastName"
                                                        onChange={handleChange}
                                                        {...input}
                                                    />
                                                    {meta.touched && !!meta.error && <p className="text-red-500 text-xs italic text-sm">{meta.error}</p>}
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                                    <Field
                                        name="email"
                                        render={({ input, meta }) => (
                                            <>
                                                <input
                                                    className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${meta.touched && !!meta.error ? "border-red-500" : ""}`}
                                                    placeholder="jack@gmail.com"
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
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
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
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Comfirm Password</div>
                                    <Field
                                        name="comfirmPassword"
                                        render={({ input, meta }) => (
                                            <>
                                                <input
                                                    className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${meta.touched && !!meta.error ? "border-red-500" : ""}`}
                                                    placeholder="Re-enter your password"
                                                    id="comfirmPassword"
                                                    name="comfirmPassword"
                                                    type="password"
                                                    autoComplete="comfirmPassword"
                                                    onChange={handleChange}
                                                    {...input}
                                                />
                                                {meta.touched && !!meta.error && <p className="text-red-500 text-xs italic text-sm">{meta.error}</p>}
                                            </>
                                        )}
                                    />
                                </div>
                                <br />
                                <div className="flex mt-0.5 text-sm font-display font-semibold text-gray-700">
                                    Already have an account?&nbsp;
                                    {" "}
                                    <p className="flex-initial cursor-pointer text-indigo-600 hover:text-indigo-800">
                                        <Link to="/login">Log In</Link>
                                    </p>
                                </div>
                                <button
                                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg mt-4"
                                    type="submit"
                                    disabled={submitting}
                                >
                                    Sign Up

                                </button>
                            </form>
                        </div>
                    )}
                />
            </div>

        </div>

    );
}

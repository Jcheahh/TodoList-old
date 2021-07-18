import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FormApi, SubmissionErrors } from "final-form";
import { useAuth } from "../hook/useAuth";
import NavBar from "./ui/NavBar";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import Input from "./ui/Input";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login(): JSX.Element {
  const [errMessage, setErrMessage] = useState<string>();
  const history = useHistory<Element>();
  const auth = useAuth()!;

  const { from } = { from: { pathname: "/" } };
  // TODO:
  // const { from }: { from: string } = location.state || { from: { pathname: "/" } };

  const validate = (values: FormValues): FormErrors => {
    const error: FormErrors = {};
    if (!values.email) {
      error.email = "Fill in your email";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email,
      )
    ) {
      // Check email
      error.email = "Please enter a vaild email address";
    }

    if (!values.password) {
      error.password = "Please enter your password";
    }
    return error;
  };

  const handleSubmit = (
    values: FormValues,
    _: FormApi<FormValues, Partial<FormValues>>,
    callback?: (errors?: SubmissionErrors) => void,
  ): void => {
    auth
      .login(values.email, values.password)
      .then(() => {
        history.replace(from);
        callback!();
      })
      .catch((error) => {
        callback!(error || {});
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
          <Text.H3>Log In</Text.H3>

          <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
              <div className="mt-12">
                <form onSubmit={handleSubmit} noValidate>
                  <Text className={["text-red-500 text-center mb-4 font-bold"]}>
                    {errMessage}
                  </Text>
                  <Text.Small
                    className={["font-bold text-gray-700 tracking-wide"]}
                  >
                    Email
                  </Text.Small>
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <>
                        <Input
                          {...input}
                          className={[
                            `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                              meta.touched && !!meta.error
                                ? "border-red-500"
                                : ""
                            }`,
                          ]}
                          placeholder="example@gmail.com"
                          id="email"
                          name="email"
                          autoComplete="email"
                        />
                        {meta.touched && !!meta.error && (
                          <p className="text-red-500 text-xs italic text-sm">
                            {meta.error}
                          </p>
                        )}
                      </>
                    )}
                  />
                  <div className="mt-8">
                    <Text.Small
                      className={["font-bold text-gray-700 tracking-wide"]}
                    >
                      Password
                    </Text.Small>
                    <Field
                      name="password"
                      render={({ input, meta }) => (
                        <>
                          <Input
                            {...input}
                            className={[
                              `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                                meta.touched && !!meta.error
                                  ? "border-red-500"
                                  : ""
                              }`,
                            ]}
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                          />
                          {meta.touched && !!meta.error && (
                            <p className="text-red-500 text-xs italic text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <Text.Small
                    className={["flex my-3.5 font-display font-semibold"]}
                  >
                    Don&apos;t have an account?&nbsp;{" "}
                    <Link to="/sign-up">Sign up</Link>
                  </Text.Small>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Loading..." : "Log In"}
                  </Button>
                </form>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}

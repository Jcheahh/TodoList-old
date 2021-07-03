import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import TodoList from "./component/TodoList";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import LandingPage from "./component/LandingPage";
import { authContext, useAuth, useProvideAuth } from "./hook/useAuth";
import { Text } from "./component/ui/Text";
import { Button } from "./component/ui/Button";
import { Link } from "./component/ui/Link";
import NavBar from "./component/ui/NavBar";
import Input from "./component/ui/Input";

function App() {
    return (
        <>
            <ProvideAuth>
                <Router>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                        <HomeRoute exact path="/">
                            <TodoList />
                        </HomeRoute>
                        <Route path="/design">
                            <div className="py-20 px-16">
                                <Text.H1>Hello world</Text.H1>
                                <Text.H2>Hello world</Text.H2>
                                <Text.H3>Hello world</Text.H3>
                                <Text.H4>Hello world</Text.H4>
                                <Text.H5>Hello world</Text.H5>
                                <Text>Hello world</Text>
                                <Text.Small>Hello world</Text.Small>
                                <Text.Translucent>Hello world</Text.Translucent>
                                <Link.Regular>Hello world</Link.Regular>
                                <div className="my-2">
                                    <Input variant="standard" />
                                </div>
                                <div className="my-2">
                                    <Input variant="filled" label="Hello" />
                                </div>
                                <div className="my-2">
                                    <Input variant="outlined" />
                                </div>
                                <div className="my-2">
                                    <Button>Click here</Button>
                                    <Button.Default>Click here</Button.Default>
                                </div>
                                <div className="my-2">
                                    <Button isLarge>Click here</Button>
                                    <Button.Default isLarge>
                                        Click here
                                    </Button.Default>
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </ProvideAuth>
        </>
    );
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function CheckLoggedIn(renderComponent) {
    return function Component({ children, ...rest }) {
        Component.propTypes = { children: PropTypes.element.isRequired };
        const auth = useAuth();

        return (
            <Route
                {...rest}
                render={(routerProps) => (auth.user ? (
                    <>
                        <NavBar>
                            <Link.Regular
                                className={[
                                    "absolute right-20 top-10 font-bold text-gray-700 hover:text-black",
                                ]}
                                onClick={() => auth.signout(() => {
                                    routerProps.history.replace(
                                        "/login",
                                    );
                                })}
                            >
                                Logout
                            </Link.Regular>
                        </NavBar>
                        {children}
                    </>
                ) : (
                    renderComponent(routerProps)
                ))}
            />
        );
    };
}

// const PrivateRoute = CheckLoggedIn(({ location }) => (
//     <Redirect
//         to={{
//             pathname: "/login",
//             state: { from: location },
//         }}
//     />
// ));

const HomeRoute = CheckLoggedIn(() => <LandingPage />);

ProvideAuth.propTypes = {
    children: PropTypes.element.isRequired,
};

export default App;

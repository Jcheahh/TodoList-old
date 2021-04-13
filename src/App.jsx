import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PropTypes from "prop-types";
import TodoList from "./component/TodoList";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import LandingPage from "./component/LandingPage";
import { authContext, useAuth, useProvideAuth } from "./hook/useAuth";

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
                        <HomeRoute path="/">
                            <TodoList />
                        </HomeRoute>
                    </Switch>
                </Router>
            </ProvideAuth>

        </>
    );
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
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
                        <button
                            type="button"
                            className="absolute right-20 top-10 font-bold text-gray-700 hover:text-black"
                            onClick={() => auth.signout(() => {
                                routerProps.history.replace("/login");
                            })}
                        >
                            Logout
                        </button>
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

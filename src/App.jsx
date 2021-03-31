import React, { useState } from "react";
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
import { authContext, useAuth } from "./component/useAuth";

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

const fakeAuth = {
    isAuthenticated: false,
    login(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signup(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const login = (cb) => fakeAuth.login(() => {
        setUser("user");
        cb();
    });
    const signup = (cb) => fakeAuth.signup(() => {
        setUser("user");
        cb();
    });

    const signout = (cb) => fakeAuth.signout(() => {
        setUser(null);
        cb();
    });

    return {
        user,
        login,
        signup,
        signout,
    };
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={({ location, history }) =>
//         auth.user ? (
//           <>
//             <button onClick={() => auth.signout(() => {
//               history.replace("/login");
//             })}>Logout</button>
//             {children}
//           </>
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// function HomeRoute({ children, ...rest }) {
//   const auth = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={({ location, history }) =>
//         auth.user ? (
//           <>
//             <button onClick={() => auth.signout(() => {
//               history.replace("/login");
//             })}>Logout</button>
//             {children}
//           </>
//         ) : (
//           <LandingPage />
//         )
//       }
//     />
//   );
// }

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

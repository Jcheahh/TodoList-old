import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import TodoList from "./component/TodoList";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import LandingPage from "./component/LandingPage";
import { authContext, useAuth, useProvideAuth } from "./hook/useAuth";
import NavBar from "./component/ui/NavBar";
import TodoGroup from "./component/TodoGroup";
import Dropdown from "./component/ui/Dropdown";

function App(): JSX.Element {
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
            <ProtectedRoute path="/todo_group/:todo_group_id">
              <TodoList />
            </ProtectedRoute>
            <ProtectedRoute path="/todo_group">
              <TodoGroup />
            </ProtectedRoute>
            <HomeRoute exact path="/">
              <TodoGroup />
            </HomeRoute>
          </Switch>
        </Router>
      </ProvideAuth>
    </>
  );
}

function ProvideAuth({ children }: { children: JSX.Element }): JSX.Element {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function CheckLoggedIn(
  renderComponent: (props: RouteComponentProps) => JSX.Element,
) {
  return function Component({ children, ...rest }: RouteProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const auth = useAuth()!;
    useEffect(() => {
      const validateToken = async () => {
        const b = await auth.validateToken();
        setIsLoggedIn(b);
      };
      validateToken();
    }, []);
    return (
      <Route
        {...rest}
        render={(routerProps) =>
          isLoggedIn ? (
            <>
              <NavBar>
                <Dropdown>
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-sm bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {auth.user ? (
                      <div className="py-1" role="none">
                        <p className="text-gray-700 block px-4 py-2 text-sm">
                          Hi, {auth.user.first_name}!
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 block px-4 py-2 text-sm">
                          Hi!
                        </p>
                      </div>
                    )}

                    <div className="py-1" role="none">
                      <button
                        type="button"
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                        onClick={() =>
                          auth.signout().then(() => {
                            routerProps.history.replace("/login");
                          })
                        }
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </Dropdown>
              </NavBar>
              {children}
            </>
          ) : (
            renderComponent(routerProps)
          )
        }
      />
    );
  };
}

const HomeRoute = CheckLoggedIn(() => <LandingPage />);
const ProtectedRoute = CheckLoggedIn(() => <Redirect to="/login" />);

export default App;

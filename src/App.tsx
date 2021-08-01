import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  RouteComponentProps,
  Link as RLink,
} from "react-router-dom";
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
            <HomeRoute path="/todo_group/:todo_group_id">
              <TodoList />
            </HomeRoute>
            <HomeRoute path="/todo_group">
              <TodoGroup />
            </HomeRoute>
            <HomeRoute exact path="/">
              <TodoGroup />
            </HomeRoute>
            <Route path="/design">
              <NavBar>
                <Dropdown>
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <p
                        className="text-gray-700 block px-4 py-2 text-sm"
                        id="menu-item-0"
                      >
                        Edit
                      </p>
                      <p
                        className="text-gray-700 block px-4 py-2 text-sm"
                        id="menu-item-1"
                      >
                        Duplicate
                      </p>
                    </div>
                    <div className="py-1" role="none">
                      <p
                        className="text-gray-700 block px-4 py-2 text-sm"
                        id="menu-item-2"
                      >
                        Archive
                      </p>
                      <p
                        className="text-gray-700 block px-4 py-2 text-sm"
                        id="menu-item-3"
                      >
                        Move
                      </p>
                    </div>
                    <div className="py-1" role="none">
                      <p
                        className="text-gray-700 block px-4 py-2 text-sm"
                        id="menu-item-4"
                      >
                        Share
                      </p>
                      <p
                        className="text-gray-700 block px-4 py-2 text-sm"
                        id="menu-item-5"
                      >
                        Add to favorites
                      </p>
                    </div>
                    <div className="py-1" role="none">
                      <p
                        className="text-gray-700 block px-4 py-2 text-sm"
                        id="menu-item-6"
                      >
                        Delete
                      </p>
                      <button
                        type="button"
                        className="text-gray-700 block px-4 py-2 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>

                  {/* <ul>Hi</ul>
                  <ul>Bye</ul>
                  <ul>Logout</ul> */}
                </Dropdown>
              </NavBar>
              <div className="py-20 px-16">
                <Text.H1>Hello world</Text.H1>
                <Text.H2>Hello world</Text.H2>
                <Text.H3>Hello world</Text.H3>
                <Text.H4>Hello world</Text.H4>
                <Text.H5>Hello world</Text.H5>
                <Text>Hello world</Text>
                <Text.Small>Hello world</Text.Small>
                <Text.Translucent>Hello world</Text.Translucent>
                <Link to="/design">Hello world</Link>
                <RLink to="/design">Hello world</RLink>
                <div className="my-2">
                  <Input />
                </div>
                <div className="my-2">
                  <Button>Click here</Button>
                </div>
                <div className="my-2">
                  <Button isLarge>Click here</Button>
                </div>
              </div>
            </Route>
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
    const auth = useAuth()!;

    return (
      <Route
        {...rest}
        render={(routerProps) =>
          auth.user ? (
            <>
              <NavBar>
                <Dropdown>
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-sm bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                  >
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

export default App;

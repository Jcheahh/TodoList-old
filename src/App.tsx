import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  RouteComponentProps,
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
                <Button
                  className={[
                    "absolute right-20 top-10 font-bold text-gray-700 hover:text-black",
                  ]}
                  onClick={() =>
                    auth.signout().then(() => {
                      routerProps.history.replace("/login");
                    })
                  }
                >
                  Logout
                </Button>
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

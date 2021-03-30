import React, { useContext, createContext, useState } from "react";
import './App.css';
import TodoList from './component/TodoList';
import Login from './component/Login'
import SignUp from './component/SignUp' 
import LandingPage from './component/LandingPage' 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

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
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = cb => {
    return fakeAuth.login(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    login,
    signout
  };
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
    const auth = useAuth();

    return (
      <Route
        {...rest}
        render={(routerProps) =>
          auth.user ? (
            <>
              <button onClick={() => auth.signout(() => {
                routerProps.history.replace("/login");
              })}>Logout</button>
              {children}
            </>
          ) : (
            renderComponent(routerProps)
          )
        }
      />
    );
  }
}

const PrivateRoute = CheckLoggedIn(({ location }) =>
  <Redirect
    to={{
      pathname: "/login",
      state: { from: location }
    }}
  />)

const HomeRoute = CheckLoggedIn(() => <LandingPage />)

export default App;

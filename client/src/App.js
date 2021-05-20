import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from "react-cookie";

// import bootstrap components
import { Container } from "react-bootstrap";
// import components
import NavBar from "./Components/Navbar/NavigationBar";
// import pages
import Login from "./Pages/Login";
import AudioEdit from "./Pages/AudioEdit";
import Signup from "./Pages/Signup";
import ChangePw from "./Pages/ChangePw";

const App = () => {
  const [cookies, removeCookie] = useCookies(["user"]);
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    if (cookies.user && cookies.user !== "undefined") {
      setHasCookie(true);
    }
  }, [cookies]);

  return (
    <div className="App">
      <NavBar
        hasCookie={hasCookie}
        setHasCookie={setHasCookie}
        removeCookie={() => {
          removeCookie("user");
          setHasCookie(false);
          localStorage.removeItem("userId");
        }}
      />
      <Container>
        {!hasCookie ? <Redirect to="/login" /> : <Redirect to="/audioEdit" />}

        <Switch>
          <Route
            exact
            path="/login"
            render={(routerProps) => {
              return <Login {...routerProps} setHasCookie={setHasCookie} />;
            }}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/changePw" component={ChangePw} />
          <Route
            exact
            path="/audioEdit"
            render={(routerProps) => {
              return (
                <AudioEdit
                  {...routerProps}
                  setHasCookie={setHasCookie}
                  removeCookie={() => {
                    removeCookie("user");
                    setHasCookie(false);
                    localStorage.removeItem("userId");
                  }}
                />
              );
            }}
          />
        </Switch>
      </Container>
    </div>
  );
};

export default withCookies(App);

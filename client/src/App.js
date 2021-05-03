import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Login from './Components/Login';
import AudioEdit from './Components/AudioEdit';
import Signup from './Components/Signup';
import './App.css';
import ChangePw from './Components/ChangePw';

const App = () => {
    const [cookies, removeCookie] = useCookies(['user']);
    const [hasCookie, setHasCookie] = useState(false);

    useEffect(() => {
        if (cookies.user && cookies.user !== 'undefined') {
            setHasCookie(true);
        }
    }, [cookies]);

    return (
        <div className="App">
            <h1>Audio Edit App</h1>

            {!hasCookie ? <Redirect to="/login" /> : <Redirect to="/audioEdit" />}

            <Switch>
                <Route
                    exact path="/login"
                    render={routerProps => {
                        return (
                            <Login
                                {...routerProps}
                                setHasCookie={setHasCookie}
                            />
                        );
                    }}
                />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/changePw" component={ChangePw} />
                <Route exact path="/audioEdit" render={
                    routerProps => {
                        return (
                            <AudioEdit
                                {...routerProps}
                                setHasCookie={setHasCookie}
                                removeCookie={() => {
                                    removeCookie('user');
                                    setHasCookie(false);
                                    localStorage.removeItem('userId');
                                }}
                            />
                        );
                    }}
                />
            </Switch>
        </div>
    );
};

export default withCookies(App);

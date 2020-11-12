import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import Appointments from './components/Appointments';
import Appointment from './components/Appointment';
import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

import history from './helpers/history';

const App = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/doctors" className="nav-link">
                  Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/appointments" className="nav-link">
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {currentUser.user.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/home']} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/doctors" component={Doctors} />
            <Route exact path="/doctors/:id" component={Doctor} />
            <Route exact path="/appointments" component={Appointments} />
            <Route exact path="/appointments/:id" component={Appointment} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

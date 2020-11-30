import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBarr from './components/Navbarr';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import Appointments from './components/Appointments';
import Appointment from './components/Appointment';
import NewAppointment from './components/NewAppointment';
import { clearMessage } from './actions/message';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(clearMessage()); // clear message when changing location
  }, [dispatch, location]);

  return (
    <div>
      <NavBarr />
      <main>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/doctors" component={Doctors} />
          <Route exact path="/doctors/:id" component={Doctor} />
          <Route exact path="/appointments" component={Appointments} />
          <Route exact path="/appointments/new" component={NewAppointment} />
          <Route exact path="/appointments/:id" component={Appointment} />
        </Switch>
      </main>
    </div>
  );
};

export default App;

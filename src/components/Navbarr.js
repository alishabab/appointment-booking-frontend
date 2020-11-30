import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import classes from '../styles/Navbar.module.css';

const NavBarr = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <nav className={classes.sidenav}>
      <Link to="/">
        Home
      </Link>
      {currentUser
            && (
              <Link to="/profile">
                {currentUser.user.name}
              </Link>
            )}
      {currentUser ? (
        <ul>
          <li>
            <Link to="/doctors">
              Doctors
            </Link>
          </li>
          <li>
            <Link to="/appointments">
              Appointments
            </Link>
          </li>
          <li>
            <Link to="/appointments/new">
              Add Appointment
            </Link>
          </li>
          <li>
            <a href="/login" onClick={logOut}>
              LogOut
            </a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBarr;

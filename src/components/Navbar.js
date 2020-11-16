import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar, Nav,
}
  from 'react-bootstrap';
import { logout } from '../actions/auth';

const NavBar = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        {currentUser
              && (
              <Nav>
                <Link to="/profile" className="nav-link">
                  {currentUser.user.name}
                </Link>
              </Nav>
              )}
        {currentUser ? (
          <ul className="navbar-nav ml-auto">
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
              <Link to="/appointments/new" className="nav-link">
                Add Appointment
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
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
          </ul>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/Home.module.css';

const Home = () => (
  <div className={classes.Home}>
    <div className={classes.Overlay}>
      <div className="d-flex justify-content-center flex-column align-items-center h-75">
        <h2> BOOK AN APPOINTMENT NOW ! </h2>
        <p>Hi</p>
        <div className="d-flex">
          <select className={`${classes.Select} ${classes.Button} mr-4`}>
            <option> New Delhi</option>
            <option> Hyderabad</option>
          </select>
          <Link to="/appointments/new" className={classes.Button}>
            Add Appointment
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Home;

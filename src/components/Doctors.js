/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Doctors = () => {
  const [content, setContent] = useState('');
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  useEffect(() => {
    UserService.getDoctors().then(
      response => {
        setContent(response.data);
      },
      error => {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(message);
      },
    );
  }, []);
  console.log(content);
  const doctors = content && content.map(doctor => (
    <Link to={`/doctors/${doctor.id}`} key={doctor.id}>
      <p>{doctor.name}</p>
    </Link>
  ));
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Doctors</h3>
        {doctors}
      </header>
    </div>
  );
};

export default Doctors;

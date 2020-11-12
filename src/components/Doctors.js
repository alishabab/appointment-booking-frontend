/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Doctors = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  useEffect(() => {
    UserService.getDoctors().then(
      response => {
        setLoading(false);
        setContent(response.data);
      },
      error => {
        setLoading(false);
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
      <img src={doctor.image} alt={doctor.name} className="img-thumbnail" style={{ width: '300px' }} />
      <p>{doctor.name}</p>
    </Link>
  ));
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Doctors</h3>
        {loading && <span className="spinner-border spinner-border-lg" />}
        <div className="d-flex flex-wrap justify-content-between">
          {doctors}
        </div>
      </header>
    </div>
  );
};

export default Doctors;

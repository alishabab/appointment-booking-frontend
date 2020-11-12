/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getDoctors from '../actions/user';

const Doctors = props => {
  const { user: currentUser } = useSelector(state => state.auth);
  const { doctors } = useSelector(state => state.user);
  const { message } = useSelector(state => state.message);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctors.length === 0 && currentUser) {
      setLoading(true);
      dispatch(getDoctors())
        .then(() => {
          props.history.push('/doctors');
          setSuccessful(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [doctors, dispatch]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const doctorsList = doctors.map(doctor => (
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
          {doctorsList}
        </div>
      </header>
      {message && (
        <div className="form-group">
          <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;

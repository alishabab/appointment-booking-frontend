import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Appointments = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);

  useEffect(() => {
    if (currentUser) {
      UserService.getAppointments(currentUser.user.id).then(
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
    }
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const appointments = content && content.map(appointment => (
    <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
      <p>{appointment.appointment_date}</p>
      <p>{content.doctor_id}</p>
    </Link>
  ));

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Appointments</h3>
        {loading && <span className="spinner-border spinner-border-lg" />}
        <div>
          {appointments}
        </div>
      </header>
    </div>
  );
};

export default Appointments;

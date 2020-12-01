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

  const appointments = content && content.map(appointment => {
    const d = new Date(appointment.appointment_date);
    const date = d.toDateString();
    const time = d.toLocaleTimeString();
    return (
      <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
        <div className="card m-4">
          <div className="card-body">
            <p>
              On &nbsp;
              {date}
            </p>
            <p>
              at &nbsp;
              {time}
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="container text-center">
      <h3>Appointments</h3>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div className="d-flex flex-wrap">
        {appointments}
      </div>
    </div>
  );
};

export default Appointments;

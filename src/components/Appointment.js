import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Appointment = () => {
  const [content, setContent] = useState('');
  const [doctor, setDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const { id } = useParams();
  useEffect(() => {
    UserService.getAppointment(currentUser.user.id, id).then(
      response => {
        setContent(response.data);
        return response.data.doctor_id;
      },
      error => {
        setLoading(false);
        setError(true);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(message);
      },
    ).then(doctorId => UserService.getDoctor(doctorId))
      .then(response => {
        setLoading(false);
        setDoctor(response.data);
      });
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        {loading && <span className="spinner-border spinner-border-lg" />}
        {
          doctor && (
          <div>
            <p>
              With &nbsp;
              <Link to={`/doctors/${doctor.id}`}>
                {doctor.name}
              </Link>
            </p>
            <p>
              On &nbsp;
              {new Date(content.appointment_date).toLocaleString()}
            </p>
          </div>
          )
        }
        {
          error && <p>{content}</p>
        }
      </header>
    </div>
  );
};

export default Appointment;

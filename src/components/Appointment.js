import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import UserService from '../services/user.service';

const Appointment = () => {
  const [content, setContent] = useState('');
  const [doctor, setDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);
  const { user: currentUser } = useSelector(state => state.auth);
  const alert = useAlert();
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

  const handleClick = () => {
    setLoading(true);
    UserService.deleteAppointment(currentUser.user.id, id).then(() => {
      alert.show('Appointment Deleted', {
        type: 'success',
        timeout: 5000,
      });
      setLoading(false);
      setSuccessful(true);
    });
  };

  if (successful) {
    return <Redirect to="/appointments" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        {loading && <span className="spinner-border spinner-border-lg" />}
        {
          doctor && (
          <div>
            <p>
              Appointment Id: &nbsp;
              {content.id}
            </p>
            <p>
              With &nbsp;
              <Link to={`/doctors/${doctor.id}`}>
                {doctor.name}
              </Link>
            </p>
            <p>
              On &nbsp;
              {new Date(content.appointment_date).toUTCString()}
            </p>
            <button className="btn btn-primary btn-block" type="button" onClick={handleClick} disabled={loading}>
              Delete
            </button>
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

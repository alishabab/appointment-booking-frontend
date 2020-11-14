import React, { useState, useEffect } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Doctor = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const { id } = useParams();
  useEffect(() => {
    UserService.getDoctor(id).then(
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
  return (
    <div className="container">
      {loading && <span className="spinner-border spinner-border-lg" />}
      <img src={content.image} alt={content.name} style={{ width: '200px' }} />
      <p>
        Name:
        {content.name}
      </p>
      <p>
        Qualification:
        {content.qualification}
      </p>
      <p>
        Experience:
        {content.experience}
      </p>
      <li className="nav-item">
        <Link
          to={{
            pathname: '/appointments/new',
            doctorId: content.id,
          }}
          className="nav-link"
        >
          Add Appointment
        </Link>
      </li>
    </div>
  );
};

export default Doctor;

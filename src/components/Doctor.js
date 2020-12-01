import React, { useState, useEffect } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';
import classes from '../styles/Doctor.module.css';

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
      <div className={classes.Doctor}>
        <img src={content.image} alt={content.name} className={classes.doctorImg} />
        <div>
          <h2>
            {content.name}
          </h2>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Appointment Fee &nbsp;&nbsp;&nbsp;&nbsp; Rs. 300
          </p>
          <p className={classes.badge}>
            Qualification: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {content.qualification}
          </p>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Experience: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {content.experience}
          </p>
          <p className={classes.badge}>
            Department: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Medicine
          </p>
          <li>
            <Link
              to={{
                pathname: '/appointments/new',
                doctorId: content.id,
              }}
              className={classes.btn}
            >
              Add Appointment
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Doctor;

import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Doctor = () => {
  const [content, setContent] = useState('');
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const { id } = useParams();
  useEffect(() => {
    UserService.getDoctor(id).then(
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
  return (
    <div className="container">
      <header className="jumbotron">
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
      </header>
    </div>
  );
};

export default Doctor;

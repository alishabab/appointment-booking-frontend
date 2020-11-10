import axios from 'axios';

const API_URL = 'https://frozen-river-95471.herokuapp.com/';

const register = (name, email, password) => axios.post(`${API_URL}api/v1/users`, {
  name,
  email,
  password,
});

const login = (email, password) => axios
  .post(`${API_URL}login`, {
    email,
    password,
  })
  .then(response => {
    if (response.data.jwt) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};

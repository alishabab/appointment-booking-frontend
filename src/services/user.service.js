import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://frozen-river-95471.herokuapp.com/';

const getDoctors = () => axios.get(`${API_URL}api/v1/doctors`, { headers: authHeader() });
const getDoctor = id => axios.get(`${API_URL}api/v1/doctors/${id}`, { headers: authHeader() });
export default {
  getDoctors,
  getDoctor,
};

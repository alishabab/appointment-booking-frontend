import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://frozen-river-95471.herokuapp.com/';

const getDoctors = () => axios.get(`${API_URL}api/v1/doctors`, { headers: authHeader() });
const getDoctor = id => axios.get(`${API_URL}api/v1/doctors/${id}`, { headers: authHeader() });
const getAppointments = id => axios.get(`${API_URL}api/v1/users/${id}/appointments`, { headers: authHeader() });
const getAppointment = (userId, appointmentId) => axios.get(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });
const postAppointment = (userId, doctorId, appointmentDate) => axios.post(`${API_URL}api/v1/users/${userId}/appointments`, { doctor_id: doctorId, appointment_date: appointmentDate }, { headers: authHeader() });
const deleteAppointment = (userId, appointmentId) => axios.delete(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });
export default {
  getDoctors,
  getDoctor,
  getAppointments,
  getAppointment,
  postAppointment,
  deleteAppointment,
};

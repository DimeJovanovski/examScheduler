import axios from 'axios';

// Fetch room names from the backend API
export const fetchRoomNames = () => {
  return axios.get('http://localhost:9091/api/rooms/names');
};

// Fetch exam data from the backend API
export const fetchExams = () => {
  return axios.get('http://localhost:9091/api/exams');
};

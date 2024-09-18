import axios from 'axios';

const apiUri = "http://localhost:9091/api";

// Fetch room names from the backend API
export const fetchRoomNames = () => {
  return axios.get('http://localhost:9091/api/rooms/names');
};

// Fetch exam data from the backend API
export const fetchExams = () => {
  return axios.get('http://localhost:9091/api/exams');
};

// Delete an exam from the backend API using the exam ID
export const deleteExam = (id) => {
  // Make the DELETE request, with the id as part of the URL
  return axios.delete(`http://localhost:9091/api/exams/delete/${id}`)
    .then(response => {
      console.log(`Exam with ID ${id} deleted successfully`);
      return response.data;  // Return the response data (optional)
    })
    .catch(error => {
      console.error(`Failed to delete exam with ID ${id}: `, error);
      throw error;  // Rethrow the error so it can be handled by the caller
    });
};

// Edit an exam in the backend API using the exam ID and the updated data
export const editExam = (id, updatedData) => {
  return axios.put(`http://localhost:9091/api/exams/edit/${id}`, updatedData, {
    headers: {
      'Content-Type': 'application/json'  // Ensure that the data is sent as JSON
    }
  })
    .then(response => {
      console.log(`Exam with ID ${id} updated successfully`);
      return response.data;
    })
    .catch(error => {
      console.error(`Failed to update exam with ID ${id}: `, error);
      throw error;
    });
};


import axios from 'axios';

const apiUri = "http://localhost:9091/api";

// Fetch room names
export const fetchRoomNames = () => {
  return axios.get(`${apiUri}/rooms/names`);
};

// Fetch exam data
export const fetchExams = () => {
  return axios.get(`${apiUri}/exams`);
};

// Fetch data for add exam dialog
export const fetchDataForExamDialog = () => {
  return axios.get(`${apiUri}/exams/addExamDialogData`);
};

// Add a new exam to the database
export const addExam = (examData) => {
  return axios.post(`${apiUri}/exams/add`, examData, {
    headers: {
      'Content-Type': 'application/json'  // Ensure that the data is sent as JSON
    }
  })
    .then(response => {
      console.log("Exam added successfully:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Failed to add exam:", error);
      throw error;  // Rethrow the error so it can be handled by the caller
    });
};

// Delete an exam from the backend API using the exam ID
export const deleteExam = (id) => {
  // Make the DELETE request, with the id as part of the URL
  return axios.delete(`${apiUri}/exams/delete/${id}`)
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
  return axios.put(`${apiUri}/exams/edit/${id}`, updatedData, {
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


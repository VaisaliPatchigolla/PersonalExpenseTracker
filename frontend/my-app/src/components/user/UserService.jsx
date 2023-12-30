// UserService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/users';

const UserService = {
  getUserById: async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  },

  updateUser: async (userId, updatedUser) => {
    const response = await axios.put(`${API_URL}/update/${userId}`, updatedUser);
    return response.data;
  },

  deleteUser: async (userId) => {
    await axios.delete(`${API_URL}/delete/${userId}`);
  }
};

export default UserService;

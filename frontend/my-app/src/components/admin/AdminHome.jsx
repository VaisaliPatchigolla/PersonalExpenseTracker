// AdminHome.js
import React, { useState, useEffect } from 'react';
import UserService from '../user/UserService';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const allUsers = await UserService.getAllUsers();
    setUsers(allUsers);
  };

  const handleUpdateUser = async () => {
    if (selectedUserId && updatedUsername && updatedPassword) {
      const updatedUser = {
        username: updatedUsername,
        password: updatedPassword
        // Include other fields as needed
      };

      await UserService.updateUser(selectedUserId, updatedUser);
      loadUsers(); // Refresh the user list after update
    }
  };

  const handleDeleteUser = async (userId) => {
    await UserService.deleteUser(userId);
    loadUsers(); // Refresh the user list after delete
  };

  return (
    <div>
      <h2>Admin Home</h2>

      <h3>Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} -{' '}
            <button onClick={() => setSelectedUserId(user.id)}>Edit</button>{' '}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <div>
          <h3>Edit User:</h3>
          <label>
            Updated Username:
            <input
              type="text"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Updated Password:
            <input
              type="password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleUpdateUser}>Update User</button>
        </div>
      )}
    </div>
  );
};

export default AdminHome;

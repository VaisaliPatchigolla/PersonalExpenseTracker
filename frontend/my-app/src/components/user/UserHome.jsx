import React, { useState, useEffect } from 'react';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: 0, date: '' });
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [addSuccess, setAddSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    // Fetch expenses when the component mounts
    fetchExpenses();
  }, [addSuccess, updateSuccess, deleteSuccess]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/expenses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        const addedExpense = await response.json();
        setExpenses((prevExpenses) => [...prevExpenses, addedExpense]);
        setNewExpense({ description: '', amount: 0, date: '' }); // Reset the form
        setAddSuccess(true);
      } else {
        console.error('Failed to add expense:', response.statusText);
        setAddSuccess(false);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      setAddSuccess(false);
    }
  };

  const handleUpdateExpense = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/expenses/update/${selectedExpenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        const updatedExpense = await response.json();
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
        );
        setSelectedExpenseId(null); // Reset selected expense after update
        setUpdateSuccess(true);
      } else {
        console.error('Failed to update expense:', response.statusText);
        setUpdateSuccess(false);
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      setUpdateSuccess(false);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/expenses/${expenseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted expense from the state
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
        setDeleteSuccess(true);
        return true; // Indicate successful deletion
      } else {
        console.error('Failed to delete expense:', response.statusText);
        setDeleteSuccess(false);
        return false; // Indicate deletion failure
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      setDeleteSuccess(false);
      return false; // Indicate deletion failure due to an error
    }
  };

  return (
    <div>
      <h2>Expense List</h2>

      <div>
        <h3>Add Expense:</h3>
        <label>
          Description:
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleAddExpense}>Add Expense</button>
        {addSuccess && <p style={{ color: 'green' }}>Expense added successfully!</p>}
      </div>

      <h3>Expenses:</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - {expense.amount} - {expense.date}{' '}
            <button onClick={() => setSelectedExpenseId(expense.id)}>Edit</button>{' '}
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedExpenseId && (
        <div>
          <h3>Edit Expense:</h3>
          <label>
            Description:
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
          </label>
          <br />
          <label>
            Amount:
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
          </label>
          <br />
          <button onClick={handleUpdateExpense}>Update Expense</button>
          {updateSuccess && <p style={{ color: 'green' }}>Expense updated successfully!</p>}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

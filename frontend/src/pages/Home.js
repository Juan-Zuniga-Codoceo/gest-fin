import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', type: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token'); // Asegúrate de que el token JWT esté almacenado en el localStorage

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/finances', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const calculateTotal = (expenses) => {
    const totalAmount = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    setTotal(totalAmount);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = async () => {
    try {
      const response = await axios.post('/api/finances', newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses([...expenses, response.data]);
      calculateTotal([...expenses, response.data]);
      setNewExpense({ description: '', amount: '', type: '' });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditMode(true);
    setEditId(expense.id);
    setNewExpense({ description: expense.description, amount: expense.amount, type: expense.type });
  };

  const handleUpdateExpense = async () => {
    try {
      const response = await axios.put(`/api/finances/${editId}`, newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editId ? response.data : expense
      );
      setExpenses(updatedExpenses);
      calculateTotal(updatedExpenses);
      setNewExpense({ description: '', amount: '', type: '' });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`/api/finances/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      calculateTotal(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5">Gastos</Typography>
          <TextField
            name="description"
            label="Descripción"
            value={newExpense.description}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <TextField
            name="amount"
            label="Monto"
            value={newExpense.amount}
            onChange={handleChange}
            type="number"
            style={{ marginRight: '10px' }}
          />
          <TextField
            name="type"
            label="Tipo"
            value={newExpense.type}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          {editMode ? (
            <Button variant="contained" color="primary" onClick={handleUpdateExpense}>
              Actualizar
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAddExpense}>
              Agregar
            </Button>
          )}
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Total: ${total.toFixed(2)}
          </Typography>
          {expenses.map((expense) => (
            <div key={expense.id} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Typography variant="body1" style={{ flexGrow: 1 }}>
                {expense.description} - ${expense.amount} - {expense.type}
              </Typography>
              <IconButton onClick={() => handleEditExpense(expense)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteExpense(expense.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </CardContent>
      </Card>
      {/* Aquí puedes agregar las otras dos cards para Presupuesto y Gastos Clasificados */}
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [finances, setFinances] = useState([]);

  useEffect(() => {
    const fetchFinances = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/finances', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFinances(response.data);
      } catch (error) {
        console.error('Error fetching finances:', error);
      }
    };
    fetchFinances();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {finances.map((finance) => (
          <li key={finance.id}>
            {finance.description} - ${finance.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

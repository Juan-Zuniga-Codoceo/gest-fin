import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/reminders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReminders(response.data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };
    fetchReminders();
  }, []);

  return (
    <div>
      <h1>Reminder Page</h1>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {reminder.title} - {new Date(reminder.remindAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;

import React from 'react';

const Reminder = ({ reminders }) => {
  if (!reminders.length) return <div>Cargando recordatorios...</div>;

  return (
    <div>
      <h2>Recordatorios</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {reminder.title}: {new Date(reminder.remind_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;

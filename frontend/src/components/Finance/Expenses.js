import React from 'react';

const Expenses = ({ expenses }) => {
  if (!expenses.length) return <div>Cargando gastos...</div>;

  return (
    <div>
      <h2>Gastos</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: {expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;

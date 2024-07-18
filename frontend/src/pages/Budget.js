import React from 'react';

const Budget = ({ budget }) => {
  if (!budget) return <div>Cargando presupuesto...</div>;

  return (
    <div>
      <h2>Presupuesto</h2>
      <p>Total: {budget.total}</p>
      <p>Gastado: {budget.spent}</p>
      <p>Disponible: {budget.available}</p>
    </div>
  );
};

export default Budget;

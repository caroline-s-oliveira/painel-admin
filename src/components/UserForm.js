import React, { useState, useEffect } from 'react';

const UserForm = ({ onSave, editingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h3>{editingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default UserForm;

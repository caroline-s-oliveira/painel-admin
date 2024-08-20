import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Função para carregar os usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://seu-endpoint-api.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Adicionar ou Editar Usuário
  const handleSaveUser = async (user) => {
    if (editingUser) {
      // Atualizar Usuário
      await axios.put(`http://seu-endpoint-api.com/users/${editingUser.id}`, user);
    } else {
      // Criar Novo Usuário
      await axios.post('http://seu-endpoint-api.com/users', user);
    }
    fetchUsers();
    setEditingUser(null);
  };

  // Deletar Usuário
  const handleDeleteUser = async (id) => {
    await axios.delete(`http://seu-endpoint-api.com/users/${id}`);
    fetchUsers();
  };

  // Editar Usuário
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  return (
    <div>
      <h2>Painel de Administração</h2>
      <UserForm onSave={handleSaveUser} editingUser={editingUser} />
      <UserList users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
    </div>
  );
};

export default AdminPanel;

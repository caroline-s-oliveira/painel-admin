import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
      setFirstName(response.data.data.first_name);
      setLastName(response.data.data.last_name);
      setEmail(response.data.data.email);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      navigate('/users');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      navigate('/users');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
     <div className='container-edit center'>
      <h2 className='editar'>Editar Usuário</h2>
      {user && (
        <>
          <input className='input-group-text mt-5'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input className='input-group-text mt-2'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input className='input-group-text mt-2 mb-3'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button class="btn btn-outline-secondary m-2" onClick={handleSave}>Salvar</button>
          <button class="btn btn-outline-secondary" onClick={handleDelete}>Excluir</button>
        </>
      )}
    </div>
  );
};

export default UserEdit;


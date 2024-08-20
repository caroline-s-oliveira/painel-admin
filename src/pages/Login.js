import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import hmzLogo from '../img/HMZ.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      if (response.status === 200 && response.data.token) {
        navigate('/users');
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo de 2xx
        setError(`Erro: ${error.response.data.error || 'Erro ao autenticar.'}`);
      }
    };
  }

  return (
    <div>
      <div class="container">
      <div class="row ">
        <div class="col-sm">
          <h1 class="block-titulo">Simplificando juntos</h1>
        </div>
        <div class="col-sm block-right"> 
          <div class="bg-light block-right-div">
          <div class="container-fluid">
          <img className='w-50' src={hmzLogo}>
            </img>
          </div>
          <div class="container mt-5">
            <div class="container-fluid mt-5">
              <input class='w-100 input-group-text'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div class="container-fluid mt-3 b">
              <input class='w-100 input-group-text'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="container-fluid mt-3">
              <button class="btn btn-outline-secondary" onClick={handleLogin}>Login</button>
              {error && <p>{error}</p>}
            </div>
          </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;

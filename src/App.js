import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; 
import UserList from './pages/UserList'; 
import UserEdit from './pages/UserEdit'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
      </Routes>
    </Router>
  );
}

export default App;

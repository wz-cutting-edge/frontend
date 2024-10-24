import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../services/api';

const formStyles = {
  maxWidth: '448px',
  margin: '40px auto',
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const inputStyles = {
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  border: '1px solid #D1D5DB',
  borderRadius: '4px',
};

const buttonStyles = {
  width: '100%',
  backgroundColor: '#10B981',
  color: 'white',
  padding: '8px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = await login(username, password);
      authLogin(data);
      navigate(data.user.acc_type === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={formStyles}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Log in</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyles}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyles}
        />
        <button type="submit" style={buttonStyles}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;

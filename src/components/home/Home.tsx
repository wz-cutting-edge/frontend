import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const headerStyles = {
  position: 'sticky' as const,
  top: 0,
  backgroundColor: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  padding: '16px',
  zIndex: 10,
};

const navStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1152px',
  margin: '0 auto',
};

const logoStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const buttonStyles = {
  backgroundColor: '#10B981',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      if (user.acc_type === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to the Django React Website</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={() => navigate('/login')} style={buttonStyles}>Login</button>
        <button onClick={() => navigate('/register')} style={buttonStyles}>Register</button>
      </div>
    </div>
  );
};

export default Home;

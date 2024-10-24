import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const buttonStyles = {
  backgroundColor: '#EF4444',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

const cardStyles = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const UserHome: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <header style={headerStyles}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Welcome, {user?.username}!</h1>
          <p style={{ margin: '5px 0 0', color: '#6B7280' }}>{user?.email}</p>
        </div>
        <button onClick={handleLogout} style={buttonStyles}>
          Logout
        </button>
      </header>

      <main style={{ padding: '0 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={cardStyles}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>Your Profile</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <strong>Username:</strong> {user?.username}
              </div>
              <div>
                <strong>Email:</strong> {user?.email}
              </div>
              <div>
                <strong>Account Type:</strong> {user?.acc_type}
              </div>
            </div>
          </div>

          <div style={cardStyles}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>Recent Activity</h2>
            <p style={{ color: '#6B7280' }}>No recent activity to display.</p>
          </div>

          <div style={cardStyles}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>Quick Actions</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px' 
            }}>
              <button style={{
                padding: '12px',
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
                Edit Profile
              </button>
              <button style={{
                padding: '12px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
                View Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;


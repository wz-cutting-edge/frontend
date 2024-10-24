import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUsers, updateUser } from '../../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  acc_type: 'basic' | 'admin';
}

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const cardStyles = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const cellStyles = {
  padding: '12px',
  borderBottom: '1px solid #E5E7EB',
  textAlign: 'left' as const,
};

const buttonStyles = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId: number, newAccType: 'basic' | 'admin') => {
    try {
      await updateUser(userId, { acc_type: newAccType });
      fetchUsers();
    } catch (err) {
      setError('Failed to update user');
    }
  };

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
          <h1 style={{ margin: 0, fontSize: '24px' }}>Admin Dashboard</h1>
          <p style={{ margin: '5px 0 0', color: '#6B7280' }}>Welcome, {user?.username}</p>
        </div>
        <button 
          onClick={handleLogout} 
          style={{ ...buttonStyles, backgroundColor: '#EF4444', color: 'white' }}
        >
          Logout
        </button>
      </header>

      <main style={{ padding: '0 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {error && (
            <div style={{ 
              backgroundColor: '#FEE2E2', 
              color: '#DC2626', 
              padding: '12px', 
              borderRadius: '4px', 
              marginBottom: '20px' 
            }}>
              {error}
            </div>
          )}

          <div style={cardStyles}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>User Management</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyles}>
                <thead>
                  <tr>
                    <th style={cellStyles}>ID</th>
                    <th style={cellStyles}>Username</th>
                    <th style={cellStyles}>Email</th>
                    <th style={cellStyles}>Type</th>
                    <th style={cellStyles}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td style={cellStyles}>{u.id}</td>
                      <td style={cellStyles}>{u.username}</td>
                      <td style={cellStyles}>{u.email}</td>
                      <td style={cellStyles}>{u.acc_type}</td>
                      <td style={cellStyles}>
                        <button
                          onClick={() => handleUpdateUser(u.id, u.acc_type === 'admin' ? 'basic' : 'admin')}
                          style={{
                            ...buttonStyles,
                            backgroundColor: u.acc_type === 'admin' ? '#EF4444' : '#10B981',
                            color: 'white',
                          }}
                        >
                          {u.acc_type === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={cardStyles}>
              <h3 style={{ margin: '0 0 12px' }}>System Stats</h3>
              <p>Total Users: {users.length}</p>
              <p>Admin Users: {users.filter(u => u.acc_type === 'admin').length}</p>
            </div>
            <div style={cardStyles}>
              <h3 style={{ margin: '0 0 12px' }}>Quick Actions</h3>
              <button style={{
                ...buttonStyles,
                backgroundColor: '#3B82F6',
                color: 'white',
                width: '100%',
                marginBottom: '8px',
              }}>
                Export User Data
              </button>
              <button style={{
                ...buttonStyles,
                backgroundColor: '#10B981',
                color: 'white',
                width: '100%',
              }}>
                System Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

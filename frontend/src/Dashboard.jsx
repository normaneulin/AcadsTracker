// frontend/src/Dashboard.jsx
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getSession();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    window.location.reload(); // Simple reload to reset state
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>AcadsTracker Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '8px 15px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <p>Welcome, {user.email}!</p>
      <p>This is where your courses and tasks will be displayed.</p>

      {/* Placeholder for Course and Task Management */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h2>Your Courses</h2>
        {/* You'll add course listing, adding, and filtering here */}
        <p>List of courses will go here.</p>

        <h2>Your Tasks</h2>
        {/* You'll add task listing, adding, and sorting here */}
        <p>List of tasks will go here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
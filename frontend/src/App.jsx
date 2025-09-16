// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Dashboard from './Dashboard';
import LoadingSpinner from './LoadingSpinner';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to get and set the session
    const getSession = async () => {
      setLoading(true);
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        setSession(null);
      } else {
        setSession(currentSession);
      }
      setLoading(false);
    };

    // Fetch initial session
    getSession();

    // Listen for auth state changes
    // Destructure `data` to get `subscription` directly
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setLoading(false); // Ensure loading is false after any auth state change

        // Redirect logic based on session
        if (newSession && _event === 'SIGNED_IN') {
          navigate('/dashboard'); // Go to dashboard on successful sign-in
        } else if (!newSession && _event === 'SIGNED_OUT') {
          navigate('/'); // Go to login on sign-out
        }
      }
    );

    // Cleanup the listener on component unmount
    return () => {
      // CORRECTED: Call unsubscribe on the subscription object
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={!session ? <Auth /> : <Dashboard />} />
      <Route path="/dashboard" element={session ? <Dashboard /> : <Auth />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
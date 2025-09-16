// frontend/src/Auth.jsx
import { supabase } from './supabaseClient';

const Auth = () => {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin, // Redirects back to your app after login
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
    }}>
      <h1>AcadsTracker</h1>
      <p>Please sign in to continue</p>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Simple Google icon placeholder */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
          alt="Google logo"
          style={{ width: '20px', height: '20px' }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
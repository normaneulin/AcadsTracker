// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env
const supabase = require('./config/supabaseClient'); // Import Supabase client

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

// Basic route to test server
app.get('/', (req, res) => {
  res.send('AcadsTracker Backend API is running!');
});

// Example Supabase test route (you'll replace this with actual routes later)
app.get('/test-supabase', async (req, res) => {
  try {
    // Example: Try to fetch some data from a non-existent table to confirm connection
    // In a real app, you'd fetch from your 'courses' or 'tasks' table
    const { data, error } = await supabase
      .from('non_existent_table_for_test') // Use a table you expect to exist later
      .select('*');

    if (error && error.code !== '42P01') { // 42P01 is "undefined_table" - expected if table doesn't exist
        console.error('Supabase query error:', error);
        return res.status(500).json({ message: 'Supabase error during test', error: error.message });
    }
    if (error && error.code === '42P01') {
        return res.status(200).json({ message: 'Supabase connected, but table not found (as expected for test)', data: null });
    }
    res.status(200).json({ message: 'Supabase connected and data fetched (if table exists)', data });

  } catch (e) {
    console.error('Unexpected error during Supabase test:', e);
    res.status(500).json({ message: 'Internal server error during Supabase test', error: e.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_URL ? 'Loaded' : 'NOT LOADED'}`);
});
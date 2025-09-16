// backend/config/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing in .env");
    process.exit(1); // Exit if essential environment variables are missing
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
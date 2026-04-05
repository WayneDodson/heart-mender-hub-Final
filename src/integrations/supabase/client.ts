import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wlegnzmdfpczdddzejrg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZWduem1kZnBjemRkZHplanJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzg1NjYsImV4cCI6MjA5MDk1NDU2Nn0.yZduN7dIpROFgKIC_wP8zgZcEAdm5sYkbFrMA6PpNvQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

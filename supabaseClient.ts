import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables');
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Diagnostic Check
if (supabase) {
    supabase.from('projects').select('count', { count: 'exact', head: true })
        .then(({ error }) => {
            if (error) {
                console.error('Supabase Connection Error:', error.message);
                if (error.message.includes('fetch')) {
                    console.warn('Network error: Check your internet connection or if the Supabase project is paused.');
                }
            } else {
                console.log('Supabase Connection: OK');
            }
        });
}

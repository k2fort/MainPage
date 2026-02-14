-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Remove existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow Public Access" ON public.projects;

-- Create a policy that allows ALL operations (Select, Insert, Update, Delete) for everyone (Anon & Authenticated)
CREATE POLICY "Allow Public Access"
ON public.projects
FOR ALL
USING (true)
WITH CHECK (true);

-- Create Analytics Table
CREATE TABLE IF NOT EXISTS public.analytics (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id text NOT NULL,
    page_path text NOT NULL,
    event_type text DEFAULT 'view',
    created_at timestamptz DEFAULT now(),
    metadata jsonb
);

-- Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Allow public insert (log views)
CREATE POLICY "Allow Public Log"
ON public.analytics
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public read (for dashboard)
-- In a real app, you might restrict this to admins, but for now we want the dashboard to show it.
CREATE POLICY "Allow Dashboard Read"
ON public.analytics
FOR SELECT
TO public
USING (true);

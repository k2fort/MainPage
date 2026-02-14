-- Drop the legacy check constraint on the 'category' column
-- This allows you to save projects with the new 'LIVE' and 'TEMPLATE' categories
ALTER TABLE public.projects
DROP CONSTRAINT IF EXISTS projects_category_check;

-- Optional: Add a new constraint if you want to strictly enforce only these two
-- ALTER TABLE public.projects
-- ADD CONSTRAINT projects_category_check CHECK (category IN ('LIVE', 'TEMPLATE'));

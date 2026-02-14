-- Run this in your Supabase SQL Editor to initialize the 'order' column
-- This ensures every project has a unique, sequential order value

WITH ordered_projects AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY timestamp DESC) - 1 as new_order
  FROM public.projects
)
UPDATE public.projects
SET "order" = ordered_projects.new_order
FROM ordered_projects
WHERE public.projects.id = ordered_projects.id;

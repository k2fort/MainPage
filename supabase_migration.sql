-- Run this in your Supabase SQL Editor to add the 'order' column
ALTER TABLE public.projects 
ADD COLUMN "order" integer DEFAULT 0;

-- Optional: Reset order based on creation time initially
-- UPDATE public.projects SET "order" = 0;

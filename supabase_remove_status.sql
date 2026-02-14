-- Drop the obsolete 'status' column which is causing the Not-Null constraint error
ALTER TABLE public.projects
DROP COLUMN IF EXISTS status;

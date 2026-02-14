-- Enable UUID extension if we want to use auto-generated UUIDs for new rows
create extension if not exists "uuid-ossp";

-- Create projects table (if not exists)
create table if not exists public.projects (
  id text primary key default uuid_generate_v4()::text,
  title text not null,
  category text not null check (category in ('WEB', 'AI', '3D_ART', 'SYSTEM')),
  status text not null check (status in ('LIVE', 'OFFLINE', 'ARCHIVED', 'ERROR', 'DRAFT')),
  description text not null,
  tech_stack text[] not null,
  image_url text not null,
  client_id text default 'AUTO_GEN',
  role text default 'DEV',
  timestamp timestamptz default now()
);

-- Safely add columns if they don't exist (migrations)
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'client_id') then
        alter table public.projects add column client_id text default 'AUTO_GEN';
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'role') then
        alter table public.projects add column role text default 'DEV';
    end if;
end $$;


-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Policies --
-- Drop existing policies first to ensure we can recreate them without error
drop policy if exists "Allow public read access" on public.projects;
drop policy if exists "Allow public insert access" on public.projects;
drop policy if exists "Allow public update access" on public.projects;
drop policy if exists "Allow public delete access" on public.projects;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.projects
  for select
  to public
  using (true);

-- Create policy to allow public insert (for demonstration/dashboard use)
create policy "Allow public insert access"
  on public.projects
  for insert
  to public
  with check (true);

-- Create policy to allow public update (for demonstration/dashboard use)
create policy "Allow public update access"
  on public.projects
  for update
  to public
  using (true);

-- Create policy to allow public delete (for demonstration/dashboard use)
create policy "Allow public delete access"
  on public.projects
  for delete
  to public
  using (true);  

-- Insert seed data (safely)
insert into public.projects (id, title, category, status, description, tech_stack, image_url, timestamp) values 
('042', 'NEURAL_NET_VIZ', 'AI', 'LIVE', 'Real-time data visualization dashboard for tracking ML model training. Utilizes WebGL for rendering large datasets.', ARRAY['D3.js', 'WebGL', 'React'], 'https://picsum.photos/800/450?grayscale', now()),
('041', 'CYBER_COMMERCE', 'WEB', 'OFFLINE', 'A stripped-back e-commerce experience for a luxury streetwear brand. Focus on typography and negative space.', ARRAY['Shopify', 'Liquid', 'GSAP'], 'https://picsum.photos/800/451?grayscale', now()),
('040', 'VECTOR_FIELD_09', '3D_ART', 'LIVE', 'Generative art piece exploring vector fields and flow algorithms.', ARRAY['Canvas API', 'TypeScript'], 'https://picsum.photos/800/452?grayscale', now()),
('039', 'FRAGMENT_ENGINE', 'SYSTEM', 'ARCHIVED', 'Custom game engine prototype built for performance testing.', ARRAY['C++', 'OpenGL', 'WASM'], 'https://picsum.photos/800/453?grayscale', now())
on conflict (id) do nothing; -- Prevents error if rows already exist

-- Storage Setup --
-- 1. Create the bucket (if not exists)
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- 2. Set up RLS policies for storage.objects
-- RLS is already enabled on storage.objects by default, no need to alter table.


-- Drop existing storage policies to avoid conflicts
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Upload" on storage.objects;
drop policy if exists "Public Update" on storage.objects;

-- Allow public read access to project-images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'project-images' );

-- Allow public upload access (for demo purposes)
create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'project-images' );

-- Allow public update access
create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'project-images' );

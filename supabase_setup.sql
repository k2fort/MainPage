-- Enable UUID extension if we want to use auto-generated UUIDs for new rows
create extension if not exists "uuid-ossp";

-- Create projects table
create table public.projects (
  id text primary key default uuid_generate_v4()::text,
  title text not null,
  category text not null check (category in ('WEB', 'AI', '3D_ART', 'SYSTEM')),
  status text not null check (status in ('LIVE', 'OFFLINE', 'ARCHIVED', 'ERROR', 'DRAFT')),
  description text not null,
  tech_stack text[] not null,
  image_url text not null,
  timestamp timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.projects
  for select
  to public
  using (true);

-- Create policy to allow public insert (for demonstration/dashboard use)
-- IMPORTANT: secure this in production with authenticated roles
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

-- Insert seed data
insert into public.projects (id, title, category, status, description, tech_stack, image_url, timestamp) values 
('042', 'NEURAL_NET_VIZ', 'AI', 'LIVE', 'Real-time data visualization dashboard for tracking ML model training. Utilizes WebGL for rendering large datasets.', ARRAY['D3.js', 'WebGL', 'React'], 'https://picsum.photos/800/450?grayscale', now()),
('041', 'CYBER_COMMERCE', 'WEB', 'OFFLINE', 'A stripped-back e-commerce experience for a luxury streetwear brand. Focus on typography and negative space.', ARRAY['Shopify', 'Liquid', 'GSAP'], 'https://picsum.photos/800/451?grayscale', now()),
('040', 'VECTOR_FIELD_09', '3D_ART', 'LIVE', 'Generative art piece exploring vector fields and flow algorithms.', ARRAY['Canvas API', 'TypeScript'], 'https://picsum.photos/800/452?grayscale', now()),
('039', 'FRAGMENT_ENGINE', 'SYSTEM', 'ARCHIVED', 'Custom game engine prototype built for performance testing.', ARRAY['C++', 'OpenGL', 'WASM'], 'https://picsum.photos/800/453?grayscale', now());

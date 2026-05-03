-- Roles enum + table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create policy "Admins read roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Leads table
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  email text not null,
  phone text,
  volume text,
  message text,
  consent boolean not null default false,
  source text default 'site',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Anyone can submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (consent = true);

create policy "Admins read leads"
  on public.leads for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete leads"
  on public.leads for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

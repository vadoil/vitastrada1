CREATE TABLE public.journal_media (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Из цеха',
  chapter text,
  duration text,
  video_url text,
  cover_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
GRANT SELECT ON public.journal_media TO anon, authenticated;
GRANT ALL ON public.journal_media TO service_role;
ALTER TABLE public.journal_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published journal media" ON public.journal_media FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins manage journal media" ON public.journal_media FOR ALL TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
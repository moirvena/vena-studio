-- Run this once in Supabase SQL Editor.
-- Create the admin user first in Authentication > Users with this email.

create policy "Admin can view all inquiries"
on public.inquiries
for select
to authenticated
using ((auth.jwt() ->> 'email') = 'venastudio@naver.com');

create policy "Admin can update inquiry status"
on public.inquiries
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'venastudio@naver.com')
with check ((auth.jwt() ->> 'email') = 'venastudio@naver.com');

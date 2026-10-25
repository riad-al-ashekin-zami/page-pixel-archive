-- Leads are written/read exclusively by server-side service-role code.
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;

REVOKE ALL ON public.leads FROM anon, authenticated;
GRANT ALL ON public.leads TO service_role;

-- Chat tables are also service-role only; make the deny-all posture explicit.
REVOKE ALL ON public.chat_sessions FROM anon, authenticated;
REVOKE ALL ON public.chat_messages FROM anon, authenticated;
GRANT ALL ON public.chat_sessions TO service_role;
GRANT ALL ON public.chat_messages TO service_role;
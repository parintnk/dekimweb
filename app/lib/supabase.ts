import { createClient } from "@supabase/supabase-js";

// ponytail: one module-level client. On the server it only ever does anon reads; in the
// browser the same instance carries the admin auth session. RLS is the real gatekeeper.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

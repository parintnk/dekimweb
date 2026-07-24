import { supabase } from "./supabase";

export type EventType = "pageview" | "line_click" | "phone_click";

// ponytail: fire-and-forget insert into the events table. Any failure is swallowed —
// analytics must never break the page. RLS allows anon insert, read is admin-only.
export function track(type: EventType, path = "") {
  supabase
    .from("events")
    .insert({ type, path })
    .then(
      () => {},
      () => {},
    );
}

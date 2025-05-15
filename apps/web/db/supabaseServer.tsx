import { createClient } from "@supabase/supabase-js";
export const supabaseServer = createClient(
  "https://lorioanjlqcungjqjqqa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvcmlvYW5qbHFjdW5nanFqcXFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTUxODQ3MywiZXhwIjoyMDYxMDk0NDczfQ.1TlLUlgkYl8h7MajkIW2NlxAD1IdCIkFc3JewMxVYMY"
);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://yrnuesivfyohrptocmzt.supabase.co";

const supabaseAnonKey =
  "sb_publishable_xH9racA2SUhGtFkPsu5eRQ_gToWZnYp";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://luvahtmosxtrlchbycqd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1dmFodG1vc3h0cmxjaGJ5Y3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMDA5MzgsImV4cCI6MjA0OTY3NjkzOH0.v66KcoCcETRstFOq-AC1W0ZxazQWpuVZNCV4TyQOD50";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
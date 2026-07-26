import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
});

const maybeSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const maybeSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const supabaseUrl =
  process.env.NODE_ENV === "development" && maybeSupabaseUrl?.startsWith("YOUR_")
    ? undefined
    : maybeSupabaseUrl;
const supabaseKey =
  process.env.NODE_ENV === "development" && maybeSupabaseKey?.startsWith("YOUR_")
    ? undefined
    : maybeSupabaseKey;

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseKey,
});
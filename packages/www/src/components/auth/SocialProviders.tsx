import { SupabaseClient } from "@supabase/supabase-js";

export async function signInWithGoogle(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  if (error){

  }
}

export async function signInWithGithub(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}
import { SupabaseClient } from "@supabase/supabase-js";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export async function signInWithGoogle(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  if (error){

  }
}

export async function signInWithGithub(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
}


export function GoogleButton({supabase}: {supabase: SupabaseClient}){
  return (
    <button onClick={() => signInWithGoogle(supabase)}  className="-space-y-px rounded-md shadow-sm bg-white">
      <div className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <FcGoogle size={20} />
      </div>
    </button>
  )
}

export function GitHubButton({supabase}: {supabase: SupabaseClient}){
  return (
    <button onClick={() => signInWithGithub(supabase)} className="-space-y-px rounded-md shadow-sm bg-white">
      <div className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <BsGithub size={20} />
      </div>
    </button>
  )
}
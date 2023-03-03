import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function SignIn(){
  const supabase = useSupabaseClient()

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: '',
      password: ''
    })

    if (error){
      // display error
    }
  }
  return (
    <div>
      <button onClick={signInWithEmail}>
        Sign In
      </button>
    </div>
  )
}
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function SignUp(){
  const supabase = useSupabaseClient()
  const signUpWithEmail = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: '',
      password: ''
    })

    if (error){
      // display error
    }
  }
  return (
    <div>
      <button onClick={signUpWithEmail}>
        Sign Up
      </button>
    </div>
  )
}
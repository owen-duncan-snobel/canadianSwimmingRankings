import Auth from "@/components/auth";
import { useAuth } from "@/components/AuthProvider";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUp(){
  const user = useUser()
  const router = useRouter()
  const { initial, view, setView } = useAuth()

  useEffect(() => {
    setView('sign_up')
  }, [])

  if (initial){
    return <div></div>
  }

  if (user){
    router.push('/')
    return
  }
  
  return (
    <div>
      <Auth view={view}  />
    </div>
  )
}
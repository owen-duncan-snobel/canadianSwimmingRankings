import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { z } from "zod"


const EmailData = z.object({
  email: z.string().email(),
  verifyEmail: z.string().email()
})

export default function ResetPassword(){
  const supabase = useSupabaseClient()
  const [emailData, setEmailDate] = useState<z.infer<typeof EmailData>>({
    email: '',
    verifyEmail: ''
  })
  const [errorMessage, setErrorMessage] = useState<string>('')

  const sendPasswordResetEmail = async () => {
    const validateEmail = EmailData.safeParse(emailData)
    if (!validateEmail.success){
      setErrorMessage(validateEmail.error.message)
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(emailData.email)
  }

  return (
    <div>
      Send Password Reset
      
    </div>
  )
}
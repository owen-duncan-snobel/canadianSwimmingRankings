import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { BsGithub } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import { z } from "zod"
import { useAuth } from "../AuthProvider"
import { GitHubButton, GoogleButton } from "./SocialProviders"

const SignUpData = z.object({
  email: z.string().email(),
  password: z.string()
})

export default function SignUp(){
  const supabase = useSupabaseClient()
  const { setView } = useAuth()
  const [signUpData, setSignUpData] = useState<z.infer<typeof SignUpData>>({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState<string>('')

  const signUpWithEmail = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const isValidSignInData = SignUpData.safeParse(signUpData)

    if (!isValidSignInData.success){
      setErrorMessage(isValidSignInData.error.message)
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password
    })

    if (error){
      // display error
    }

    // display message to confirm email verification to then sign in
  }

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="favicon.ico"
              alt="Canadian Swimming Rankings"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a onClick={() => setView('sign_in')} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                press here to sign in
              </a>
            </p>
          </div>

          <div className="flex justify-center space-x-5">
            <GoogleButton supabase={supabase} />
            <GitHubButton supabase={supabase} />
          </div>
          
          <form className="mt-4 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(event) => setSignUpData((data) => ({
                    ...data,
                    email: event.target.value
                  }))}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(event) => setSignUpData((data) => ({
                    ...data,
                    password: event.target.value
                  }))}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                onClick={signUpWithEmail}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
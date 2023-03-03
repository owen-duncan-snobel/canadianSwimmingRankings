import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { useRouter } from "next/router"
import { useState } from "react"
import { z } from "zod"
import { useAuth } from "../AuthProvider"

const SignInData = z.object({
  email: z.string().email(),
  password: z.string()
})

export default function SignIn(){
  const { setView } = useAuth()
  const supabase = useSupabaseClient()

  const [signInData, setSignInData] = useState<z.infer<typeof SignInData>>({
    email: '',
    password: ''
  })

  const [errorMessage, setErrorMessage] = useState<string>('')

  const signInWithEmail = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const isValidSignInData = SignInData.safeParse(signInData)

    if (!isValidSignInData.success){
      setErrorMessage(isValidSignInData.error.message)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInData.email,
      password: signInData.password
    })

    if (error){
      // TODO use sentry here
      console.log(error)
      const errorMessage = error.message
      setErrorMessage(errorMessage)
    }
  }

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a onClick={() => setView('sign_up')} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                press here to sign up
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6">
            
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
                  onChange={(event) => setSignInData((data) => ({
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
                  onChange={(event) => setSignInData((data) => ({
                    ...data,
                    password: event.target.value
                  }))}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                onClick={signInWithEmail}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span> */}
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
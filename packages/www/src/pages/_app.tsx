import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { AuthProvider } from '@/components/AuthProvider'

export const supabase = createBrowserSupabaseClient()

export default function App({ Component, pageProps }: AppProps) {
  
  const [supabaseClient] = useState(() => supabase)

  return (
    <SessionContextProvider 
      supabaseClient={supabaseClient} 
      initialSession={pageProps}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionContextProvider>
  )
}

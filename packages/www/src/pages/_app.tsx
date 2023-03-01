import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider 
      supabaseClient={supabase} 
      initialSession={pageProps}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

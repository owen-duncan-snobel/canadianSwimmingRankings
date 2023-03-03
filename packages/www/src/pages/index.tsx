import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useUser, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Auth from '@/components/auth/'
import SignIn from '@/components/auth/SignIn'
import { useAuth } from '@/components/AuthProvider'

const NAV_ROUTES = [
  {
    'path': '/',
    'displayName': 'Home'
  },
  {
    'path': '/swimmers',
    'displayName': 'Swimmers'
  },
  {
    'path': '/clubs',
    'displayName': 'Clubs'
  },
  {
    'path': '/profile',
    'displayName': 'Profile'
  }
]

export function Navbar(){
  return (
    <div>
      <div className='flex gap-x-5'>
        {
          NAV_ROUTES.map(route => <a key={route.path} href={route.path}>{route.displayName}</a>)
        }
      </div>
    </div>
  )
}

export default function Home() {
  const { initial, user } = useAuth() 
  const { view } = useAuth()

  if (initial){
    return (
      <div>
        {/** TODO Skeleton component goes here */}
      </div>
    )
  }
  if (!user){
    return (
      <div className='flex justify-center'>
        <div className='w-1/2'>
          <Auth view={view} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Canadian Swimming Rankings</title>
        <meta name="description" content="Canadian Swimming Rankings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className='mt-20'>
          <h1 className='flex justify-center text-4xl font-medium'>
            Canadian Swimming Rankings
          </h1>
        </div>
      </main>
    </>
  )
}

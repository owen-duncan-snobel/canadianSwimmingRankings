import Head from 'next/head'
import { Fragment } from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Auth from '@/components/auth/'
import { useAuth } from '@/components/AuthProvider'
import { Menu } from '@headlessui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useRouter } from 'next/router'

// probably can move these to a json
const ROUTES = [
  {
    'path': '/',
    'label': 'Home'
  },
  {
    'path': '/swimmers',
    'label': 'Swimmers'
  },
  {
    'path': '/clubs',
    'label': 'Clubs'
  },
  {
    'path': '/profile',
    'label': 'Profile'
  }
]

export function MobileNavbar(){
  return (
    <Menu as="div" className={"md:hidden"}>
      <Menu.Button className={"px-5"}>
        <RxHamburgerMenu size={30} />
      </Menu.Button>
      <Menu.Items className={"flex flex-col bg-white w-full"}>
        {ROUTES.map((route) => (
          /* Use the `active` state to conditionally style the active item. */
          <Menu.Item key={route.path} as={Fragment}>
            {({ active }) => (
              <a
                href={route.path}
                className={"border-b py-2 px-5"}
              >
                {route.label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

export function Navbar(){
  const { signOut } = useAuth()
  const router = useRouter()
  return (
    <div className='fixed top-5 w-full'>  
        
      <MobileNavbar />

      <div className='hidden md:flex justify-between px-5'>
        <div className='flex gap-x-5'>
          {
            ROUTES.map(route => 
            <a 
              key={route.path} 
              href={route.path} 
              className={router.asPath === route.path ? 'font-semibold' : ''}
            >
              {route.label}
              </a>
            )
          }
        </div>
        <div>
          <button onClick={signOut}>
            Sign out
          </button>
        </div>
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
        <div className='w-full sm:w-1/2'>
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

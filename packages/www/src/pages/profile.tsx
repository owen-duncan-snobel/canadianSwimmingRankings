import Head from "next/head"
import Auth from "@/components/auth"
import { useAuth } from "@/components/AuthProvider"
import { Navbar } from "."

export default function Profile(){
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
          <h1 className='flex justify-center text-4xl font-medium'>Profile</h1>
        </div>
      </main>
    </>
  )
}
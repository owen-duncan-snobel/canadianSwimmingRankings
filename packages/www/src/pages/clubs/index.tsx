import Head from "next/head";
import { Navbar } from "..";

export default function Clubs() {
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
          <h1 className='flex justify-center text-4xl font-medium'>Clubs</h1>
        </div>
      </main>
    </>
  )
}
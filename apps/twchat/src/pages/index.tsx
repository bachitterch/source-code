import { signIn, signOut, useSession } from 'next-auth/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  const { data: session } = useSession()

  const imagesrc = session?.user?.image || ''
  const username = session?.user?.name
  const email = session?.user?.email

  return (
    <div>
      <h1>Hello Next.js</h1>
      {session ? (
        <button onClick={() => signOut()}>Signout</button>
      ) : (
        <button onClick={() => signIn()}>SignIn</button>
      )}
      {session && (
        <div>
          <div>
            <small>Signed in as</small>
            <br />
            <p>{username}</p>
            <p>{email}</p>

            <Image src={imagesrc} width={100} height={100} alt='twitch' />
          </div>
          <div>
            <Link href='/streams'>
              <a>Streams</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

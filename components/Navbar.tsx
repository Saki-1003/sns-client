import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/auth'


const Navbar = () => {
  const {user, logout} = useAuth()

  return (
    <header className="bg-gray-700 p-4 text-white">
  <div className="container mx-auto flex justify-between items-center">
    <h1 className="font-semibold text-xl">
      <Link href="/" className="text-3xl font-medium">SNS Clone</Link>
    </h1>
    <nav>
      <ul className="flex space-x-4">
        {user ? (
          <>
            <Link
              href={`/profile/${user.id}`}
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
            >
              Profile
            </Link>
            <button onClick={logout} className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium">
              Log Out
            </button>
          </>
        ) : (       
          <>
            <Link
              href="/login"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
            >
              Sign Up
            </Link>
           </>
          )}
 
      </ul>
    </nav>
  </div>
</header>
  )
}

export default Navbar
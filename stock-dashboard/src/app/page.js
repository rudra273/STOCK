import Link from 'next/link'
import NavBar from '../components/NavBar'; 

export default function Home() {
  return (
    <div>
      <NavBar />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the Stock Dashboard
        </h1>
        <Link href="/dashboard" className="mt-6 text-blue-600 hover:text-blue-800">
          Go to Dashboard
        </Link>
      </main>
    </div>
    </div>
  )
}



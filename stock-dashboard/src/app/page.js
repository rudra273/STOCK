import Link from 'next/link'
import NavBar from '../components/NavBar'; 

export default function Home() {
  
  return (
    <div className="bg-[#EEEEEE] dark:bg-[#222831] min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold text-[#393E46] dark:text-[#00ADB5] mb-6">
            Welcome to the Stock Dashboard
          </h1>
          <Link href="/dashboard">
            <span className="bg-[#00ADB5] dark:bg-[#00ADB5] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#007A7E] dark:hover:bg-[#007A7E] transition duration-200 cursor-pointer">
              Go to Dashboard
            </span>
          </Link>
        </main>
      </div>
    </div>
  );
  

}



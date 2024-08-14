import Link from 'next/link'
import NavBar from '../components/NavBar'; 
import Footer from '../components/Footer';

export default function Home() {

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#222831] min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold text-[#393E46] dark:text-[#00ADB5] mb-6">
            Welcome to the Stock Dashboard
          </h1>
          <Link href="/dashboard">
            <span className="bg-[#E1F4F3] dark:bg-[#E1F4F3] text-[#393E46] py-2 px-4 rounded-md shadow-md hover:bg-[#B3E3E1] dark:hover:bg-[#B3E3E1] transition duration-200 cursor-pointer">
              Go to Dashboard
            </span>
          </Link>
        </main>
      </div>
      <Footer />
    </div>
  );
  

}



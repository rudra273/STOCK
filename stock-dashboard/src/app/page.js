import Link from 'next/link'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-[#F5F8FA] dark:bg-[#111827] min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 md:px-20 text-center">
          <h1 className="text-6xl font-bold text-[#111827] dark:text-[#38BDF8] mb-6">
            Welcome to the Stock Dashboard
          </h1>
          <Link href="/dashboard">
            <span className="bg-[#FFFFFF] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB] py-2 px-4 rounded-md shadow-md hover:bg-[#FBBF24] dark:hover:bg-[#FBBF24] transition duration-200 cursor-pointer">
              Go to Dashboard
            </span>
          </Link>
        </main>
      </div>
      <Footer />
    </div>
  );
}
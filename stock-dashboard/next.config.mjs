// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
  };
  
  console.log('Config NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  
export default nextConfig;
  
  
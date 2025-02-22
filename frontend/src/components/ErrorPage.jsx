import { useUserStore } from '@/store/useUserStore';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

const ErrorPage = () => {
    const user=useUserStore((state)=>state.user)
    // if(!user){
    //   toast.error('please login first',{id:'login'})
    // }
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-green-50 text-center">
      {/* Error Icon or Image (Optional) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-green-500 mb-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      <h1 className="text-4xl font-extrabold text-red-400 mb-2">Oops! Page Not Found</h1>
      <p className="text-green-600 text-lg mb-4">
        We're sorry, but the page you requested could not be found.  It may have been moved, deleted, or the URL may be incorrect.
      </p>

      <div >
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go Back Home
        </Link>
        {/* Optional: Contact Us Link */}
    
      </div>
    </div>
  );
};

export default ErrorPage;
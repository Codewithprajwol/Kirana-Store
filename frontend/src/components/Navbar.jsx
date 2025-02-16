import React, { useState } from 'react';
import { Search, ShoppingCart, Phone, LayoutDashboard, CircleUserRound, LogOut, LogInIcon} from 'lucide-react';
import SideBar from './SideBar';
import Auth from './Auth';
import { ModeToggle } from './ModeToggle';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';


const Navbar = ({user}) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const logout=useUserStore((state)=>state.logout)
    const cart=useCartStore((state)=>state.cart)
    const navigate=useNavigate()
 
  return (
    <>
    <div className=" bg-baseColor font-grocery text-white py-3 px-3 sm:px-6 lg:px-8 flex items-center justify-between shadow-lg sticky top-0 z-10  gap-3">
        <div className='sm:hidden'>
					<SideBar/>
				</div>
      {/* Logo */}
      <a href="/" className="text-xl sm:text-2xl font-semibold tracking-tight hover:text-green-200 transition-colors duration-200">
        Kirana
      </a>

      {/* Search Bar */}
      <div className=" hidden items-center bg-white rounded-full px-2 sm:px-3 sm:flex flex-grow max-w-full sm:max-w-md lg:max-w-2xl focus-within:ring-2 focus-within:ring-green-300 transition-shadow duration-200">
        <Search className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
        <input
          type="text"
          placeholder="Search products & categories"
          className=" placeholder:text-sm border-none outline-none p-1.5 sm:p-2 text-gray-700 w-full rounded-full placeholder-gray-500 text-sm sm:text-base"
        />
      </div>
      
      

{user?.role==='customer' && <div className=' flex items-center justify-center gap-5 sm:gap-7 flex-shrink-0'>
      {/* Order Information (Hidden on Small Screens) */}
      <div className="hidden sm:flex items-center ml-4 lg:ml-6 text-sm">
        <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1"/>
        <div>
          <div className="font-medium">Order Now</div>
          <div className="text-gray-200">01-451100</div>
        </div>
      </div>

      {/* Cart */}
      <div onClick={()=>{navigate('/cart')}} className="relative cursor-pointer hover:text-green-200 transition-colors duration-200 ">
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
        {cart.length>0 && (<span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white text-[8px] sm:text-[10px] font-medium rounded-full px-1.5 sm:px-2 py-0.5">
          {cart.length}
        </span>)}
      </div>

      <button  className=" cursor-pointer bg-transparent border flex items-center border-white justify-center gap-1  text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-full hover:bg-green-700 hover:border-green-700 transition-colors duration-200">
        <CircleUserRound size={20}/>
        <span className='hidden sm:block'> Account</span>
      </button>

      {/* Login Button */}
      <button onClick={()=>{setIsLoginOpen(false)
        logout()
      }} className=" cursor-pointer bg-transparent border border-white  flex items-center justify-center gap-1  text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-full hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors duration-200">
        <LogOut size={20}/>
       <span className='hidden sm:block'>LogOut</span>
      </button>

      <ModeToggle />
    </div>}

{user===null && <div className=' flex items-center justify-center gap-10 flex-shrink-0'>
      {/* Order Information (Hidden on Small Screens) */}
      <div className="hidden sm:flex items-center ml-4 lg:ml-6 text-sm">
        <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1"/>
        <div>
          <div className="font-medium">Order Now</div>
          <div className="text-gray-200">01-451100</div>
        </div>
      </div>

      {/* Cart */}
      <div onClick={()=>{navigate('/cart')}} className="relative cursor-pointer hover:text-green-200 transition-colors duration-200 ">
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white text-[8px] sm:text-[10px] font-medium rounded-full px-1.5 sm:px-2 py-0.5">
        0
        </span>
      </div>

      {/* Login Button */}
     

      <button onClick={()=>setIsLoginOpen(true)} className=" cursor-pointer bg-transparent border border-white flex items-center justify-center gap-1 text-white text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-full hover:bg-green-700 hover:border-green-700 transition-colors duration-200">
        <LogInIcon size={20}/>
        Log In
      </button>
    
      
        <Auth setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen}/>
        <ModeToggle />
    </div>}

{user?.role==='admin' && <div className='flex items-center justify-center gap-2 sm:gap-7 flex-shrink-0'>
      
      <button onClick={()=>{navigate('/admin')}}  className=" cursor-pointer bg-transparent border border-white flex items-center justify-center gap-1 text-white text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-full hover:bg-green-700 hover:border-green-700 transition-colors duration-200">
        <LayoutDashboard size={20}/>
        <span className='hidden sm:block'>Dashboard</span>
      </button>
        <Auth setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen}/>
      {/* Login Button */}
      <button onClick={()=>{setIsLoginOpen(false);logout();navigate('/')}} className=" cursor-pointer bg-transparent border border-white flex items-center justify-center gap-1 text-white text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-full hover:bg-green-700 hover:border-green-700 transition-colors duration-200">
        <LogOut size={20}/>
        <span className='hidden sm:block'>Log Out</span>
      </button>
      <ModeToggle />
    
    </div> 
}

    
    </div>
    <div className="mt-1 items-center bg-white  px-2 sm:px-3 sm:hidden flex flex-grow max-w-full shadow-lg">
        <Search className="text-gray-500 size-6" />
        <input
          type="text"
          placeholder="Search products & categories"
          className="border-none outline-none p-1.5 text-gray-700 w-full  placeholder-gray-500 text-md"
        />
    </div>

    </>
  );
};

export default Navbar;
import React from 'react'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './store/useUserStore'

const App = () => {
 const user=useUserStore((state)=>state.user)
 console.log(user)
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      <Navbar user={user}/>
      <Toaster/>
    </div>
  )
}

export default App
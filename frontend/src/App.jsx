import React from 'react'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './store/useUserStore'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import CartItem from './Pages/CartItem'
import Footer from './components/Footer'


const App = () => {
 const user=useUserStore((state)=>state.user)
  return (
    <div className='min-h-screen text-white relative  '>
      <Navbar user={user}/>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/cart/:id' element={<CartItem />} />
      </Routes>
      <Toaster/>
      <Footer/>
    </div>
  )
}

export default App
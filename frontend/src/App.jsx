import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './store/useUserStore'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import CartItem from './Pages/CartItem'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'


const App = () => {
 const {user,authCheck,isAuthChecking}=useUserStore()

 useEffect(()=>{
  authCheck()
 },[authCheck])

 if(isAuthChecking) return <LoadingSpinner/>

  return (
    <div className='min-h-screen bg-baseBackground  relative  '>
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
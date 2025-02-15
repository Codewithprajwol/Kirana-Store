import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './store/useUserStore'
import {  Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Adminpage from './Pages/Adminpage'
import ErrorPage from './components/ErrorPage'
import CategoryPage from './Pages/CategoryPage'
import CartPage from './Pages/CartPage'
import { useCartStore } from './store/useCartStore'


const App = () => {
 const {user,authCheck,isAuthChecking}=useUserStore()
 const {getCartItems}=useCartStore()
 useEffect(()=>{
  authCheck()
 },[authCheck])

 useEffect(()=>{
   if(!user) return ;
  getCartItems()},[getCartItems,user])

 if(isAuthChecking) return <LoadingSpinner/>

  return (
    <div className='min-h-screen bg-baseBackground  relative  '>
      <Navbar user={user}/>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/admin' element={user?.role==='admin'?<Adminpage/>:<ErrorPage/> }/>
        <Route path='/category/:category' element={<CategoryPage/> }/>
        <Route path='/cart' element={user?<CartPage/>:<ErrorPage/>} />
      </Routes>
      <Toaster/>
      <Footer/>
    </div>
  )
}

export default App
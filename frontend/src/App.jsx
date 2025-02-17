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
import PurchaseSuccessPage from './Pages/PurchaseSuccessPage'
import PurchaseCancelPage from './Pages/PurchaseCancelPage'
import UserProfile from './components/UserProfile'


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
        <Route path='/purchase-success' element={user?<PurchaseSuccessPage/>:<ErrorPage/>} />
        <Route path='/purchase-cancel' element={user?<PurchaseCancelPage/>:<ErrorPage/>} />
        <Route path='/user' element={user?<UserProfile user={user}/>:<ErrorPage/>} />
      </Routes>
      <Toaster/>
      <Footer/>
    </div>
  )
}

export default App
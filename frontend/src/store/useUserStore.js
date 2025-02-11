import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useUserStore=create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,
    signup:async({fullName:username,email,password,confirmPassword})=>{
        set({loading:true});

        if(password !== confirmPassword){
            set({loading:false})
            return toast.error('passwords do not match');
        }
        try {
            const response=await axios.post("/auth/signup",{username,email,password})
            set({user:response.data.user,loading:false})
            console.log(response)
            toast.success('account created successfully')
        } catch (error) {
            console.log(error)
            set({loading:false})
            toast.error(error.response.data.error||error.response.data.message || "An error occured");
        }
    },
    login:async({email,password})=>{
        set({loading:true})
        try {
            const response=await axios.post('/auth/login',{email,password})
            if(response.status=200){
                set({user:response.data.user,loading:false})
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error)
            set({loading:false})
            toast.error(error.response.data.error || error.response.data.message || "Login Failed")
        }
    }
}))
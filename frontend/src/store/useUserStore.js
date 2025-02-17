import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useUserStore=create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,
    isModalOpen:true,
    isAuthChecking:true,
    signup:async({fullName:username,email,password,confirmPassword})=>{
        set({loading:true});

        if(password !== confirmPassword){
            set({loading:false})
            return toast.error('passwords do not match');
        }
        try {
            const response=await axios.post("/auth/signup",{username,email,password})
            set({user:response.data.user,loading:false})
            if(response.status=200){
            toast.success('account created successfully')
            set({isModalOpen:false})
            }
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
                set({isModalOpen:false})
            }
        } catch (error) {
            console.log(error)
            set({loading:false})
            toast.error(error.response.data.error || error.response.data.message || "Login Failed")
        }
    },
    authCheck:async()=>{
        set({isAuthChecking:true})
        try {
            const response=await axios.get('/auth/profile')
            set({isAuthChecking:false,user:response.data})
        } catch (error) {
            set({isAuthChecking:false,user:null})
        }
    },
    logout:async()=>{
        try{
            const response=await axios.post('/auth/logout')
            set({user:null,isModalOpen:true})
            toast.success('Logout successfully')

        }catch(err){
            toast.err('Logout Error')
        }
    },
    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
            console.log(refreshToken)
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}))

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
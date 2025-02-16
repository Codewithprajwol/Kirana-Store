import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useCartStore=create((set,get)=>({
    cart:[],
    coupon:null,
    total:0,
    subtotal:0,

    getCartItems:async()=>{
        try{
            const res=await axios.get('/carts');
            set({cart:res.data.item}) 
            get().calculateTotals()
        }catch(error){
            set({cart:[]})
        }
    },
    addToCart: async(product)=>{
        try{
            await axios.post('/carts',{productId:product._id});
            toast.success('Product added to cart')
            set((state)=>{
                const existingItem=state.cart.find((item)=>item._id===product._id);
                const newCart=existingItem ? state.cart.map((item)=>(item._id=== product._id?{...item,quantity:item.quantity+1}:item)):[...state.cart,{...product,quantity:1}]
                return {cart:newCart};
            })
            get().calculateTotals();
        }catch(error){
            console.log(error)
            toast.error('An error occured')
        }
    },
    removeFromCart: async (productId) => {
        console.log(productId)
		await axios.delete(`/carts/${productId}` );
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},
    calculateTotals:()=>{
        const {cart,coupon}=get();
        const subtotal=cart.reduce((sum,item)=>sum+item.price * item.quantity,0);
        let total=subtotal;
        if(coupon){
            const discount=subtotal +(coupon.discountPercentage/100);
            total=subtotal-discount;
        }
        set({subtotal,total});
    }
}))
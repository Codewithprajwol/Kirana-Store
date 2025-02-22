import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useCartStore=create((set,get)=>({
    cart:[],
    coupon:null,
    total:0,
    subtotal:0,
    isCouponApplied:false,
    couponAvailable:true,
    getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			set({ coupon: response.data.coupon, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},

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
    updateQuantity:async(productId,quantity)=>{
            if(quantity===0){
                get().removeFromCart(productId);
                return; 
            }
            await axios.put(`/carts/${productId}`,{quantity})
            set((prevState)=>({
                cart:prevState.cart.map((item)=>item._id==productId?{...item,quantity:quantity}:item)
            }))
            get().calculateTotals()
    },
    removeFromCart: async (productId) => {
		await axios.delete(`/carts/${productId}` );
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},
    clearCart: async () => {
        try{
            await axios.get('/carts/deletecart')
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
        }catch(error){
            console.log(error)
        }
	},
    calculateTotals:()=>{
        const {cart,coupon}=get();
        const subtotal=cart.reduce((sum,item)=>sum+item.price * item.quantity,0);
        let total=subtotal;
        if(coupon && total>=200){
            const discount=subtotal *(coupon.discountPercentage/100);
            total=subtotal-discount;
        }
        set({subtotal,total});
    },
    checkAmountforCouponGeneration:async(products)=>{
        set({couponAvailable:true})
        try{
            const response=await axios.post('/payments/checkAmount',{products});
            if(response.data.totalAmount<200){
                set({couponAvailable:false,isCouponApplied:false,coupon:null})
            }

        }catch(err){
            console.log(err)
        }
    }
}))
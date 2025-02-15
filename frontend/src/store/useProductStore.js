import toast from 'react-hot-toast'
import axios from '../lib/axios'
import {create} from 'zustand'

export const useProductStore=create((set)=>({
    products:[],
    loading:false,
    setProducts:(products)=>set({products}),

    createProduct:async(productData)=>{
     set({loading:true})
     try{
        const response=await axios.post('/products',productData);
        set((state)=>({
            products:[...state.products,response.data.product],
            loading:false,
         }))
     }catch(error){
        toast.error(error.reponse.data.error)
        set({loading:false});
     }
    },
    fetchAllProducts:async()=>{
        set({loading:true});
        try{
            const response=await axios.get('/products');
            set({products:response.data.allProducts,loading:false})
        }catch(error){
            set({loading:false})
            toast.error(error.response.data.error || "failed to fetch products")
        }
    },
    deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
            toast.success('Product Deleted')
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
    toggleFeaturedProduct: async (productId) => {
        console.log(productId)
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},
    getProductsByCategory:async(category)=>{
        set({loading:true})
        try{
            const response=await axios.get(`/products/category/${category}`)
            console.log(response)
            set({products:response.data.products,loading:false})
        }catch(error){
            console.log(error)
            toast.error('error in fetching category products')
            set({loading:false})
        }
    }
}))




// if(isAuthenticating){
//     return (
//       <div className="h-screen w-full home-bg">
//         <div className="flex justify-center items-center w-full h-full">
//           <Loader className='animate-spin text-red-600 size-10' />
//         </div>
//       </div>
//     )
//     }
import toast from 'react-hot-toast'
import axios from '../lib/axios'
import {create} from 'zustand'

export const useProductStore=create((set)=>({
    products:[],
    loading:false,
    setProducts:(products)=>set({products}),
    isEditing:false,
    getUpdateProduct:{},

    setUpdateProduct:(product)=>{set({getUpdateProduct:product,isEditing:true})},

    updateProduct:async(newData,productId)=>{
        console.log(newData,productId)
        try{
            const response=await axios.patch(`/products/update/${productId}`,newData)
            set((state)=>({
                products:state.products.map((product)=>product._id===productId?response.data:product),
                isEditing:false
            }))
            toast.success('Product updated successfully')

        }catch(error){
            console.log(error);
        }
    }
    ,

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
            set({products:response.data.products,loading:false})
            return response.data.products;
        }catch(error){
            console.log(error)
            toast.error('error in fetching category products')
            set({loading:false})
        }
    },
    fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
    fetchSearchProducts:async(query)=>{
        set({loading:true})
        try{
            const response=await axios.get(`/products/search?search=${query}`);
            set({loading:false})
            console.log(response.data)
            return response.data;

        }catch(err){
            set({loading:false})
            console.log('Error in fetchSearchProducts',err.message)
        }
    },
    fetchProductDetails:async(productId)=>{
        try{
            const response=await axios.get(`/products/${productId}`);
            console.log(response.data)
            return response.data;
        }catch(error){
            console.log('Error in fetchProductDetails',error.message)
        }
    },
}))




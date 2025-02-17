import axios from '@/lib/axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertTriangle } from 'lucide-react'; // Icons
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import toast from 'react-hot-toast';

const ProductDetail = () => {

  const addToCart=useCartStore((state)=>state.addToCart)
  const user=useUserStore((state)=>state.user)
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const [error, setError] = useState(null);

      useEffect(() => {
        window.scrollTo(0, 0);
        }, []);
      
        const handleAddtoCart=()=>{
          if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
          } 
          else if(user.role==="admin"){
              toast.error("You are admin of this Ecommerce store", { id: "login" });
              return
          }
          else {
            addToCart(product);
          }
        }

    useEffect(() => {
        const fetchProductDetails = async (productId) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error in fetchProductDetails', error);
                setError('Failed to load product details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails(productId);
    }, [productId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-800 transition-opacity duration-300">
                <Loader2 className="animate-spin text-teal-500 w-12 h-12" />
                <span className="ml-2 text-gray-300 text-lg">Loading product...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-800 transition-opacity duration-300">
                <AlertTriangle className="text-red-500 w-12 h-12" />
                <span className="ml-2 text-red-500 text-lg">Error: {error}</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-800 transition-opacity duration-300 text-lg text-gray-300">
                Product not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-baseBackground py-7">
            <div className="max-w-5xl mx-auto bg-baseProductCardbg shadow-xl rounded-2xl overflow-hidden">
                {/* Image Section */}
                <div className="md:flex">
                  <div className="md:w-1/2 flex justify-center  overflow-hidden items-center p-4">
                  <div className='w-3/4 h-62 overflow-hidden  rounded-lg'>
                    <img
                      className="w-full h-full object-cover" // Centered, reduced height, and rounded corners
                      src={product.image}
                      alt={product.name}
                    />
                    </div>
                  </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 p-8 ">
                        <h2 className="text-3xl font-semibold  mb-4">{product.name}</h2>

                        <div className="flex items-center mb-4">
                            <span className=" font-bold text-lg">Price:</span>
                            <span className=" font-bold text-2xl ml-2">NRS. {product.price}</span>
                        </div>

                        <div className="flex items-center mb-4">
                            <span className=" font-bold text-lg">Category:</span>
                            <span className="ml-2  text-lg">{product.category}</span>
                        </div>

                        {/* Add to Cart Button */}
                        <button onClick={handleAddtoCart} className="bg-baseSecondaryColor text-white hover:bg-baseColor  font-bold py-3 px-6 rounded-xl transition duration-300 text-lg">
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="p-8 border-t bg-baseBackground">
                    <h3 className="text-xl font-semibold  mb-4">Additional Information</h3>
                    <p className=" text-lg">
                        {product.description || "No additional information available."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
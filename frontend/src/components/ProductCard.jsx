import React from 'react';
import { ShoppingCart } from "lucide-react";
import { useUserStore } from '@/store/useUserStore';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const {image,name,price}=product 
    const user=useUserStore((state)=>state.user);
    const {addToCart}=useCartStore()

    
    const handleAddToCart=()=>{
      if (!user) {
        toast.error("Please login to add products to cart", { id: "login" });
        return;
      } else {
        addToCart(product);
      }

    }
    
  return (
    <Link to={`/product/${product._id}`} className="bg-baseProductCardbg rounded shadow-xl overflow-hidden flex flex-col justify-between">
      <img className="w-full h-48 object-contain" src={image} alt={name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p >NRs.{price}</p>
      </div>
      <div className=" mt-auto">
        <button onClick={handleAddToCart} className=" flex items-center justify-center gap-3 bg-baseSecondaryColor hover:bg-baseColor text-white rounded font-bold py-2 w-full transition duration-200">
          <ShoppingCart/>Add to cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
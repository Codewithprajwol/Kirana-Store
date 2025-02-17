import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const FeaturedProducts = ({featuredProducts}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();
    const user=useUserStore((state)=>state.user);
    const handleAddToCart=(product,e)=>{
		e.preventDefault();
		e.stopPropagation(); 
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
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-left text-3xl sm:text-4xl font-bold  mb-4 font-pacifico'>Featured Products</h2>
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-700 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{featuredProducts?.map((product) => (
								<Link to={`/product/${product._id}`}   key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 flex-shrink-0  px-2'>
									<div className='bg-baseProductCardbg  rounded-lg shadow-sm overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30'>
										<div className='overflow-hidden'>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
											/>
										</div>
										<div className='p-4'>
											<h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
											<p className=' font-medium mb-4'>
												${product.price.toFixed(2)}
											</p>
											<button
												onClick={(e)=>{handleAddToCart(product,e)}}
												className='w-full bg-baseSecondaryColor hover:bg-baseColor font-semibold py-2 px-4 rounded transition-colors duration-300 
												flex items-center justify-center'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600/60 hover:bg-emerald-500/60"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600/60 hover:bg-emerald-500/60"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};
export default FeaturedProducts;
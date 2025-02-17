import { useProductStore } from '@/store/useProductStore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/skeleton/ProductSkeleton';

const CategoryPage = () => {
    const {category}=useParams()
	const [isLoading,setIsLoading]=useState(false)

	useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
	
 const {getProductsByCategory,products}= useProductStore();
   
    useEffect(()=>{
	   setIsLoading(true)
        getProductsByCategory(category).then((result)=>{
			setIsLoading(false)
		}).catch((error)=>{
			console.error('Error in fetchProductDetails', error);
			setIsLoading(false)
		})
	
    },[category])

	if(isLoading) return <ProductSkeleton/>

  return (
    <div className='min-h-screen '>
			<div className='relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-baseSecondaryColor mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<motion.div
					className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							No products found
						</h2>
					)}

					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
  )
}

export default CategoryPage
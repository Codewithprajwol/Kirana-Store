import BannerSlider from '@/components/homepageComponents/BannerSlider'
import CategoryItem from '@/components/homepageComponents/CategoryItem'
import FeaturedProducts from '@/components/homepageComponents/FeaturedProducts'
import { useProductStore } from '@/store/useProductStore'
import React, { useEffect } from 'react'

const categories=[
  {href:'/category/grocery',name:'Grocery',imageUrl:'/categories/grocery.png',color:'#E9D985'},
  {href:'/category/bakery',name:'Bakery',imageUrl:'/categories/bakery.png',color:'#D1B490'},
  {href:'/category/household',name:'HouseHold',imageUrl:'/categories/household.png',color:'#FFD4CA'},
  {href:'/category/kitchen',name:'Kitchen',imageUrl:'/categories/kitchen.png',color:'#40798C'},
  {href:'/category/package',name:'Packaged',imageUrl:'/categories/packaged.png',color:'#AAC0AF'},
  {href:'/category/vegetable',name:'Vegetables',imageUrl:'/categories/vegetables.png',color:'#E2E8DD'},
]

const Homepage = () => {
  const {fetchFeaturedProducts,products} = useProductStore()

  useEffect(()=>{
    fetchFeaturedProducts()
  },[fetchFeaturedProducts])
  return (
    <div className='max-w-7xl py-5 px-3 md:px-3 lg:px-0  mx-auto min-h-screen space-y-4'>
      <BannerSlider/>
      <div className='bg-baseSecondaryColor max-w-7xl mx-auto sm:px-3 lg:px-6 rounded-lg p-2 '>
        <h1 className='text-xs sm:text-2xl font-bold text-white mb-2'>Categories</h1>
      <div className='w-full p-2 grid grid-cols-3 sm:grid-cols-6 gap-4 '>
        {categories.map((category)=><CategoryItem  category={category} key={category.name} />)}
      </div>
      </div>
      {products?.length > 0 && <FeaturedProducts featuredProducts={products}/> }
    </div>
  )
}

export default Homepage
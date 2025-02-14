import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({category}) => {
    console.log(category.href)
  return (
    <div className="flex items-center justify-center flex-col gap-1 ">
    <Link to={category.href}
     style={{ backgroundColor: category.color }} 
     className={` md:h-[100px] overflow-hidden md:w-[100px] h-[50px] w-[50px] flex items-center justify-center border rounded-lg border-white`}>
      <img src={category.imageUrl} alt={category.name} className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] object-cover md:hover:w-[196px] md:hover:h-[196px] transition-all duration-300 " />
    </Link>
    <h2 className="text-center text-sm sm:text-xs mt-2 md:text-[1.1rem]">{category.name}</h2>
  </div>
  
  )
}

export default CategoryItem
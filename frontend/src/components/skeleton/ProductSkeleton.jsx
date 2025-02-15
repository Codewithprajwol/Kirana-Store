import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const ProductSkeleton = () => {
  return (
    <div className='min-h-screen'>
    <div className='relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
               <div className='w-full flex items-center justify-center'>
                <Skeleton className="h-8 w-[250px] text-center mb-8" />
                </div>
        
    <div className='grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 justify-items-center '>
     {Array.from({ length: 10 }).map((_, index) => (
  <div key={index} className="flex flex-col space-y-3">
    <Skeleton className="h-[200px] w-[200px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-5 w-[180px]" />
      <Skeleton className="h-5 w-[150px]" />
      <Skeleton className="w-[200px] h-8" />
    </div>
  </div>

))}
        
    </div>
    </div>
    </div>
  )
}

export default ProductSkeleton
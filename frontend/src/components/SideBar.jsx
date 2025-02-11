import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ChevronDown, Menu } from 'lucide-react'
import { Separator } from "@/components/ui/separator"



const SideBar = () => {
  return (
    <Sheet className="relative overflow-hidden">
    <SheetTrigger asChild>
      <Button variant="blue" size="icon">
      <SheetTitle><Menu className="size-6 cursor-pointer text-white" /></SheetTitle> 
      </Button>
    </SheetTrigger>
    
    <SheetContent side="left" className="w-64 p-4"> {/* Sidebar Width: 64 */}
      <SheetTitle className="text-xl font-bold mb-4 text-[#31B65D]">Kirana Store</SheetTitle>
      <Separator/>
        
        <div className='pt-2 space-y-2'>
        <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="text-left flex items-center w-full hover:text-[#31B65D]">
                Grocery
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[16rem] p-4 bg-white shadow-md rounded-md">  
              {/* w-[16rem] matches w-64 of sidebar */}
              <ul>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Rice & Rice Products</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Atta, Flour & Suji</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Cooking Oils & Ghee</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Dals & Pulses</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Dry Fruits</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">salt & Sugar</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Spices & Masala</a></li>
              </ul>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="text-left flex items-center w-full hover:text-[#31B65D]">
                Bakery
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[16rem] p-4 bg-white shadow-md rounded-md">  
              {/* w-[16rem] matches w-64 of sidebar */}
              <ul>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Breads</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Muffins & cookies</a></li>
              </ul>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="text-left flex items-center w-full hover:text-[#31B65D]">
                HouseHold Items
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[16rem] p-4 bg-white shadow-md rounded-md">  
              {/* w-[16rem] matches w-64 of sidebar */}
              <ul>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Detergents</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Pooja Needs</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Insect & Mosquite Repelients</a></li>
              </ul>
            </PopoverContent>
          </Popover>
       
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="text-left flex items-center w-full hover:text-[#31B65D]">
                Kitchen
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[16rem] p-4 bg-white shadow-md rounded-md">  
              {/* w-[16rem] matches w-64 of sidebar */}
              <ul>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Kitchen Appliances</a></li>
              </ul>
            </PopoverContent>
          </Popover>
        
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="text-left flex items-center w-full hover:text-[#31B65D]">
                Packaged Food
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[16rem] p-4 bg-white shadow-md rounded-md">  
              {/* w-[16rem] matches w-64 of sidebar */}
              <ul>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Biscuits & cookies</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Chocolates & Candles</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Noodles & Pasta</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Pickles & chutney</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Energy Bars</a></li>

              </ul>
            </PopoverContent>
          </Popover>
      
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="text-left flex items-center w-full hover:text-[#31B65D]">
                veg & fruits
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[16rem] p-4 bg-white shadow-md rounded-md">  
              {/* w-[16rem] matches w-64 of sidebar */}
              <ul>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">Fruits</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-gray-100">vegetables</a></li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
    
      <SheetDescription asChild>
  <div className='absolute bottom-0 left-2 w-60 mx-auto flex flex-col gap-2 items-center justify-center'>
    <Separator />
    <p className='font-bold text-[1.2rem] text-black'>Call To Order</p>
    <p className='mb-2'><strong className='text-green-500'>9841437541</strong></p>
  </div>
</SheetDescription>
    </SheetContent>
    
  </Sheet>

   
  )

}

export default SideBar
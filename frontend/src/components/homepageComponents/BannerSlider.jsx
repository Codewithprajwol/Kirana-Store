import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  const images=[
    'bannerSlider/slideBanner1.jpg',
    'bannerSlider/slideBanner2.jpg'
  ]

  const BannerSlider=()=>{
    return (
        <div className="relative">
        <Carousel >
  <CarouselContent>
    {images.map((image,index)=>{
        return <CarouselItem key={image+index}><img className="rounded-lg" src={image} alt={image+index} /></CarouselItem>
    })}
      </CarouselContent>
  <CarouselPrevious className="absolute left-2 bg-black/50 size-10 cursor-pointer border-none" />
  <CarouselNext className="absolute right-2 bg-black/50 size-10 cursor-pointer border-none" />
</Carousel>
</div>
    )
  }

  export default BannerSlider
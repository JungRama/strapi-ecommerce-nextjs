import LayoutMain from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, Star } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import ImageListProduct from "@/components/product-detail/image-list";


export default function ProductDetail() {

  return (
    <LayoutMain>
      <div className="container mx-auto my-20">
        <div className="grid grid-cols-12 md:gap-[15px] lg:gap-[30px]">
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <ImageListProduct></ImageListProduct>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-2xl font-bold">New Balance 990 White</h2>
              <p className="text-slate-500">Men</p>
            </div>

            <div className="flex items-center my-2">
              <p className="text-sm">4.1</p>
              <Star className="h-3 text-yellow-600"></Star>
              <p className="text-sm">| 26 Reviews</p>
            </div>

            <hr className="opacity-50"/>

            <div className="mt-3">
              <p>
                Introducing the iconic New Balance 990 White—a harmonious blend of timeless design, unparalleled craftsmanship, and cutting-edge technology. With its pristine white hue, this sneaker captures a classic and versatile aesthetic that seamlessly transitions from the streets to various occasions, making it a staple in both sneaker enthusiasts and fashion connoisseurs collections.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-[5px] my-4">
              <div className="col-span-6 md:col-span-4 lg:col-span-4">
                <Button size={"lg"} variant={'outline'} className="w-full">Size: 43/Black</Button>
              </div>
              
              <div className="col-span-6 md:col-span-4 lg:col-span-4">
                <Button size={"lg"} variant={'outline'} className="w-full">Size: 42/Black</Button>
              </div>
              
              <div className="col-span-6 md:col-span-4 lg:col-span-4">
                <Button size={"lg"} variant={'outline'} className="w-full">Size: 41/Black</Button>
              </div>
              
              <div className="col-span-6 md:col-span-4 lg:col-span-4">
                <Button size={"lg"} variant={'outline'} className="w-full">Size: 40/Black</Button>
              </div>
            </div>

            <Button size={"lg"} className="w-full">
              <div className="flex w-full justify-between items-center">
                <span className="font-bold uppercase flex items-center gap-3">
                  <ShoppingBasket></ShoppingBasket>  
                  Add to Cart
                </span> 
                <span className="font-bold">$40</span> 
              </div>
            </Button>

            <Accordion type="multiple" className="mt-8" defaultValue={['delivery','reviews']}>
              <AccordionItem value="delivery" data-state='open'>
                <AccordionTrigger>Delivery and Returns</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Standard delivery 6–12 Working Days <br />
                    Express delivery 3–10 Working Days <br /> <br />

                    During checkout, we will provide you with the estimated delivery date based on your order delivery address. Orders are processed and delivered Monday - Friday (excluding public holidays). <br /> <br />

                    Enjoy free returns. Exclusions Apply.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reviews">
                <AccordionTrigger>Customer Reviews</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <p className="font-bold mb-1 w-full flex items-center">
                          Animasa <Star className="h-3 text-yellow-600"></Star> 3
                        </p>
                        <p>What a good quality of shoes. very recommended to buy it here</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <p className="font-bold mb-1 w-full flex items-center">
                          Animasa <Star className="h-3 text-yellow-600"></Star> 3
                        </p>
                        <p>What a good quality of shoes. very recommended to buy it here</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </LayoutMain>
  )
}
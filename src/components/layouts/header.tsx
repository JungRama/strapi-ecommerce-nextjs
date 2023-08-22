import HeaderTopPromo from '@/components/layouts/header-top-promo'
import Link from "next/link"
import Image from 'next/image'

import { ChevronRight, Menu, ShoppingBasket, User2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import NextImage from '@/components/next-image'
import Cart from '@/components/cart'
import SearchInput from '../search'
import MenuSideBarMobile from './menu-sidebar-mobile'

export default function Header() {
  return (
    <>
      <HeaderTopPromo></HeaderTopPromo>
      <div className='border-b border-[#DEDEDE]'>
        <div className='container-fluid py-6'>
          <div className="flex justify-between">

            <div className="flex items-center">
              <Link href={'/'}>
                <p className='text-2xl font-bold mr-10'>SNEAKPEAKS</p>
              </Link>

              <div className='flex items-center hidden md:block'>
                <SearchInput></SearchInput>
              </div>
            </div>

            <div className="flex items-center">
              <NavigationMenu className='mr-4 hidden md:block'>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore Sneakers</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px]">
                        <li>
                          <Link className='p-4 flex items-center justify-between hover:bg-slate-100' href={'/'}>
                            <div>
                              <p className='font-bold'>Men</p>
                              <p className='text-sm'>Explore men shoes collections</p>
                            </div>
                            <div>
                            <ChevronRight />
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link className='p-4 flex items-center justify-between hover:bg-slate-100' href={'/'}>
                            <div>
                              <p className='font-bold'>Female</p>
                              <p className='text-sm'>Explore female shoes collections</p>
                            </div>
                            <div>
                            <ChevronRight />
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link className='p-4 flex items-center justify-between hover:bg-slate-100' href={'/'}>
                            <div>
                              <p className='font-bold'>Kids</p>
                              <p className='text-sm'>Explore kids shoes collections</p>
                            </div>
                            <div>
                            <ChevronRight />
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore Brands</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px]">
                        <li>
                          <Link className='px-4 py-2 flex items-center hover:bg-slate-100' href={'/'}>
                            <NextImage src={'/images/nike.png'} width={30} height={30} useSkeleton alt='nike'></NextImage>
                            <p className='ml-3'>Nike</p>
                          </Link>
                        </li>
                        <li>
                          <Link className='px-4 py-2 flex items-center hover:bg-slate-100' href={'/'}>
                            <NextImage src={'/images/new-balance.png'} width={30} height={30} useSkeleton alt='new-balance'></NextImage>
                            <p className='ml-3'>New Balance</p>
                          </Link>
                        </li>
                        <li>
                          <Link className='px-4 py-2 flex items-center hover:bg-slate-100' href={'/'}>
                            <NextImage src={'/images/adidas.png'} width={30} height={30} useSkeleton alt='adidas'></NextImage>
                            <p className='ml-3'>Adidas</p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>

                <NavigationMenuViewport className='right-0'></NavigationMenuViewport>
              </NavigationMenu>

              <div className='cursor-pointer mr-4'>
                <Cart trigger={
                  <Button variant="outline" size="icon" className='relative'>
                    <ShoppingBasket />
                    <div className='absolute -right-2 -top-2 text-xs bg-black h-5 w-5 flex items-center justify-center rounded-full text-white'>
                      9
                    </div>
                  </Button>
                }></Cart>
              </div>

              <div className='block md:hidden relative'>
                <MenuSideBarMobile trigger={
                  <Button variant={'ghost'}>
                    <Menu></Menu>
                  </Button>
                }></MenuSideBarMobile>
              </div>


              <Button size={'sm'} asChild className='hidden md:flex'>
                <Link href="/login">
                  <span className='md:visible lg:hidden'>
                    <User2></User2>
                  </span>
                  <span className='hidden lg:block'>Login or Register</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
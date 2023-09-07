import HeaderTopPromo from "@/components/layouts/header-top-promo";
import Link from "next/link";

import { ChevronRight, Menu, ShoppingBasket, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NextImage from "@/components/next-image";
import Cart from "@/components/cart";
import SearchInput from "../search";
import MenuSideBarMobile from "./menu-sidebar-mobile";

import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/services/brands";
import { SkeletonBrand, SkeletonCategory } from "../skeleton";
import { ErrorCard } from "../errors/error-card";
import { IMAGE_URL } from "@/static/const";
import { getCategories } from "@/services/categories";
import { useStoreCart } from "@/store/store-cart";

function BrandHeader() {
  const {
    data: brands,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brand-list"],
    queryFn: async () => {
      return await getBrands();
    },
    // The staleTime option allows you to specify the duration
    // in milliseconds that the cached data is considered fresh
    // and can be used without refetching.
    staleTime: Infinity,
  });

  if (isLoading) {
    return <SkeletonBrand></SkeletonBrand>;
  } else if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <ul className="grid w-[200px]">
      {brands?.map((item) => (
        <li key={"brand-list-header" + item.id}>
          <Link
            className="px-4 py-2 flex items-center hover:bg-slate-100"
            href={`/product?brand=${item.slug}`}
          >
            <NextImage
              src={IMAGE_URL + (item.logo?.url ?? "")}
              width={30}
              height={30}
              useSkeleton
              alt="nike"
            ></NextImage>
            <p className="ml-3">{item.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CategoryHeader() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cateogry-list"],
    queryFn: async () => {
      return await getCategories();
    },
    // The staleTime option allows you to specify the duration
    // in milliseconds that the cached data is considered fresh
    // and can be used without refetching.
    staleTime: Infinity,
  });

  if (isLoading) {
    return <SkeletonCategory></SkeletonCategory>;
  } else if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <ul className="grid w-[400px]">
      {categories?.map((item) => (
        <li key={"category-list-header-" + item.id}>
          <Link
            className="p-4 flex items-center justify-between hover:bg-slate-100"
            href={`/product?category=${item.slug}`}
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm">{item.short_description}</p>
            </div>
            <div>
              <ChevronRight />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const { cartItem } = useStoreCart();

  return (
    <>
      <HeaderTopPromo></HeaderTopPromo>
      <div className="border-b border-[#DEDEDE]">
        <div className="container-fluid py-6">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Link href={"/"}>
                <p className="text-2xl font-bold mr-10">SNEAKPEAKS</p>
              </Link>

              <div className="flex items-center hidden md:block">
                <SearchInput></SearchInput>
              </div>
            </div>

            <div className="flex items-center">
              <NavigationMenu className="mr-4 hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Explore Sneakers
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <CategoryHeader></CategoryHeader>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Explore Brands
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <BrandHeader></BrandHeader>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>

                <NavigationMenuViewport className="right-0"></NavigationMenuViewport>
              </NavigationMenu>

              <div className="cursor-pointer mr-4">
                <Cart
                  trigger={
                    <Button variant="outline" size="icon" className="relative">
                      <ShoppingBasket />
                      <div className="absolute -right-2 -top-2 text-xs bg-black h-5 w-5 flex items-center justify-center rounded-full text-white">
                        {cartItem.length}
                      </div>
                    </Button>
                  }
                ></Cart>
              </div>

              <div className="block md:hidden relative">
                <MenuSideBarMobile
                  trigger={
                    <Button variant={"ghost"}>
                      <Menu></Menu>
                    </Button>
                  }
                ></MenuSideBarMobile>
              </div>

              <Button size={"sm"} asChild className="hidden md:flex">
                <Link href="/login">
                  <span className="md:visible lg:hidden">
                    <User2></User2>
                  </span>
                  <span className="hidden lg:block">Login or Register</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

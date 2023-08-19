import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import NextImage from "../next-image"
import { Separator } from "@radix-ui/react-separator"

export interface propsInterface {
  trigger: JSX.Element
}

export default function SearchModal(props: propsInterface) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="px-5 py-5">
          <DialogTitle>
            <input type="text" placeholder="Type to start searching product" className="w-full font-normal focus:outline-none" />
          </DialogTitle>
        </DialogHeader>

        <div>
          <hr/>
          <div className="px-3 py-3">
            <p className="px-2 mb-2">Result - 5 items</p>
            <ul>
              <li>
                <Link href={'/'} className="flex items-center hover:bg-slate-100 rounded-md overflow-hidden px-2 py-2">
                  <NextImage src={'/images/product.png'} alt="product" width={60} height={60} className="object-cover object-center aspect-square"></NextImage>
                  <div className="ml-3">
                    <p className="font-bold">New Balance 550 Men Sneakers</p>
                    <p className="text-sm">$400</p>
                  </div>
                </Link>
              </li>
              
              <li>
                <Link href={'/'} className="flex items-center hover:bg-slate-100 rounded-md overflow-hidden px-2 py-2">
                  <NextImage src={'/images/product.png'} alt="product" width={60} height={60} className="object-cover object-center aspect-square"></NextImage>
                  <div className="ml-3">
                    <p className="font-bold">New Balance 550 Men Sneakers</p>
                    <p className="text-sm">$400</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
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
import { useQuery } from "@tanstack/react-query"
import { SearchProduct } from "@/features/products"
import { useEffect, useState } from "react"
import useDebounce from "@/lib/use-debounce"
import { IMAGE_URL } from "@/features/const"
import { SearchIcon } from "lucide-react"
import Highlighter from "react-highlight-words";

export interface propsInterface {
  trigger: JSX.Element
}

export default function SearchModal(props: propsInterface) {

  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const debounceSearch = useDebounce(search, 1500)

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['search', debounceSearch],
    queryFn: async () => {
      if(search) {
        return await SearchProduct(search)
      }else {
        return []
      }
    },
  })

  useEffect(() => {
    setIsTyping(true)

    const timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [search])

  useEffect(() => {
    setSearch('')
  }, [openModal])

  const searchResult = () => {
    if((isLoading || isTyping) && search.length > 0) {
      return (
        <div className="px-3 py-3 space-y-3 flex flex-col justify-center items-center">
          <SearchIcon></SearchIcon>
          <p>Searching the products ...</p>
        </div>
      )
    }
    if(!isLoading && search.length > 0){
      return (
        <div className="px-3 py-3">
          <p className="px-2 mb-2">Result - {products?.length} items</p>
          <ul>
            {products?.map(item => {
              return (
                <li key={'product-search-'+item.id}>
                  <Link onClick={() => setOpenModal(false)} href={'/product/'+item.slug} className="flex items-center hover:bg-slate-100 rounded-md overflow-hidden px-2 py-2">
                    <NextImage src={IMAGE_URL+item.thumbnail?.url} alt="product" width={60} height={60} className="object-cover object-center aspect-square"></NextImage>
                    <div className="ml-3">
                      <Highlighter
                          highlightClassName="YourHighlightClass"
                          searchWords={[debounceSearch]}
                          autoEscape={true}
                          textToHighlight={item.name}
                        />
                      <p className="text-sm">$400</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }

  return (
    <Dialog onOpenChange={(val) => setOpenModal(val)} open={openModal}>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="px-5 py-5">
          <DialogTitle>
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Type to start searching product" className="w-full font-normal focus:outline-none" />
          </DialogTitle>
        </DialogHeader>

        <div>
          <hr/>
          {searchResult()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
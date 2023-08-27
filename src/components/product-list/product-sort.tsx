import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/router"

export default function ProductSort() {
  const router = useRouter()
  const { query } = router

  const [sort, setSort] = useState<string>('latest')

  // when query changes set state sort
  useEffect(() => {
    if(query.sort) {
      setSort(query.sort as string)
    }else {
      setSort('latest')
    }
  }, [query])

  // When sort change. redirect to product with new sort query
  const selectSort = (value: string) => {
    query.sort = value

    router.push({
      pathname: '/product',
      query: query
    })
  }

  return (
    <div className="flex items-center w-full md:w-auto">
      <Label htmlFor="sorting" className="mr-2 text-gray-500 hidden md:block">Sorting</Label>
      <Select onValueChange={value => selectSort(value)} 
        defaultValue={sort}>
        <SelectTrigger className="w-full md:w-[200px]" >
          <SelectValue placeholder="Select Sorting" />
        </SelectTrigger>
        <SelectContent id="sorting">
          <SelectItem value="latest">Latest Product</SelectItem>
          <SelectItem value={'price-low-high'}>Price: Low - High</SelectItem>
          <SelectItem value={'price-high-low'}>Price: High - Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
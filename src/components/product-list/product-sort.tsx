import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Label } from "@/components/ui/label"

export default function ProductSort() {
  const [sort, setSort] = useState<string>('latest')

  return (
    <div className="flex items-center w-full md:w-auto">
      <Label htmlFor="sorting" className="mr-2 text-gray-500 hidden md:block">Sorting</Label>
      <Select onValueChange={value => setSort(value)} defaultValue={sort}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Select Sorting" />
        </SelectTrigger>
        <SelectContent id="sorting">
          <SelectItem value="latest">Latest Product</SelectItem>
          <SelectItem value="price-low-high">Price: Low - High</SelectItem>
          <SelectItem value="price-high-low">Price: High - Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
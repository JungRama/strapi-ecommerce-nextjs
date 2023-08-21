import { Button } from "@/components/ui/button"

import { SlidersHorizontal } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

import { useState } from "react"

export interface Filter {
  shoes_for: string | null,
  min_price: number,
  max_price: number,
}

export default function ProductFilter() {
  const [filterForm, setFilterForm] = useState({
    shoes_for: 'all',
    min_price: 0,
    max_price: 100,
  })

  const handleFormInput = <T extends keyof Filter>(field: T, value: Filter[T]) => {
    setFilterForm(prevState => ({
      ...prevState,
      [field]: value
    }))
    
    if(field === 'max_price' && filterForm.min_price > filterForm.max_price) {
      setFilterForm(prevState => ({
        ...prevState,
        min_price: value as number
      }))
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <SlidersHorizontal className="h-3" />
            Filter Product
            {filterForm.shoes_for && <Badge variant={"secondary"} className="ml-1">Shoes For: <span className="capitalize"> {filterForm.shoes_for}</span></Badge>}
            <Badge variant={"secondary"} className="ml-1">Min - Max Price: ${filterForm.min_price} - ${filterForm.max_price}</Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div>
            <Label htmlFor="shoes_for">Shoes For</Label>
            <Select onValueChange={value => handleFormInput('shoes_for', value)} defaultValue={filterForm.shoes_for}>
              <SelectTrigger id="shoes_for" className="w-full">
                <SelectValue placeholder="Select One. Men, Woman, or Kids" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="woman">Woman</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <Label className="block">Min Price</Label>
              <p className="text-sm">${filterForm.min_price}</p>
            </div>
            <Slider onValueChange={value => handleFormInput('min_price', value[0])} defaultValue={[filterForm.max_price > filterForm.max_price ? filterForm.max_price : filterForm.min_price]} max={filterForm.max_price} step={1} />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="block">Max Price</Label>
              <p className="text-sm">${filterForm.max_price}</p>
            </div>
            <Slider onValueChange={value => handleFormInput('max_price', value[0])} defaultValue={[filterForm.max_price]} max={100} step={1} />
          </div>

          <DialogFooter>
            <Button>
              Filter Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
import { Button } from "@/components/ui/button";

import { SlidersHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface Filter {
  category: string | null;
  minPrice: number;
  maxPrice: number;
}

export default function ProductFilter({
  highestPrice,
}: {
  highestPrice: number;
}) {
  const router = useRouter();
  const { query } = router;

  const [isModalOpen, setModalOpen] = useState(false);

  const [filterForm, setFilterForm] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: highestPrice,
  });

  const handleFormInput = <T extends keyof Filter>(
    field: T,
    value: Filter[T]
  ) => {
    setFilterForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (field === "maxPrice" && filterForm.minPrice > filterForm.maxPrice) {
      setFilterForm((prevState) => ({
        ...prevState,
        minPrice: value as number,
      }));
    }
  };

  const submitFilter = () => {
    query.category = filterForm.category;
    query.minPrice = filterForm.minPrice.toString();
    query.maxPrice = filterForm.maxPrice.toString();

    if (filterForm.category === "all") {
      delete query.category;
    }

    router.push({
      pathname: "/product",
      query: query,
    });

    setModalOpen(false);
  };

  useEffect(() => {
    if (query.minPrice) {
      setFilterForm((prevState) => ({
        ...prevState,
        minPrice: parseInt(query.minPrice as string),
      }));
    }

    if (query.maxPrice) {
      setFilterForm((prevState) => ({
        ...prevState,
        maxPrice: parseInt(query.maxPrice as string),
      }));
    }

    if (query.category) {
      setFilterForm((prevState) => ({
        ...prevState,
        category: query.category as string,
      }));
    }
  }, [query]);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <SlidersHorizontal className="h-3" />
            Filter Product
            <div className="hidden xl:flex">
              {filterForm.category && (
                <Badge variant={"secondary"} className="ml-1">
                  Shoes For:{" "}
                  <span className="capitalize"> {filterForm.category}</span>
                </Badge>
              )}
              <Badge variant={"secondary"} className="ml-1">
                Min - Max Price: ${filterForm.minPrice} - ${filterForm.maxPrice}
              </Badge>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div>
            <Label htmlFor="category">Shoes For</Label>
            <Select
              onValueChange={(value) => handleFormInput("category", value)}
              defaultValue={filterForm.category}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select One. Men, Woman, or Kids" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"}>All</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="woman">Woman</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <Label className="block">Min Price</Label>
              <p className="text-sm">${filterForm.minPrice}</p>
            </div>
            <Slider
              onValueChange={(value) => handleFormInput("minPrice", value[0])}
              defaultValue={[
                filterForm.maxPrice > filterForm.maxPrice
                  ? filterForm.maxPrice
                  : filterForm.minPrice,
              ]}
              max={filterForm.maxPrice}
              step={1}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="block">Max Price</Label>
              <p className="text-sm">${filterForm.maxPrice}</p>
            </div>
            <Slider
              onValueChange={(value) => handleFormInput("maxPrice", value[0])}
              defaultValue={[filterForm.maxPrice]}
              max={highestPrice}
              step={1}
            />
          </div>

          <DialogFooter>
            <Button onClick={() => submitFilter()}>Filter Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

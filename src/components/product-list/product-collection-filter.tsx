import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { getCollections } from "@/services/products";
import { useQuery } from "@tanstack/react-query";

import { ChevronsUpDown, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

export default function ProductCollectionFilter() {
  const router = useRouter();
  const { query } = router;

  const [collectionSelect, setCollectionSelect] = useState<string | null>(null);

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collection-list"],
    queryFn: async () => {
      return await getCollections();
    },
    staleTime: Infinity,
  });

  // when query changes set state collection
  useEffect(() => {
    if (query.collection) {
      setCollectionSelect(query.collection as string);
    } else {
      setCollectionSelect(null);
    }
  }, [query]);

  // show name of collection
  const selectedValue = useMemo(() => {
    const selected = collections?.find(
      (item) => item.slug === collectionSelect
    );

    if (selected) {
      return selected.name;
    } else {
      return null;
    }
  }, [isLoading, collectionSelect]);

  // Go to collection path
  const goToCollection = (slug?: string) => {
    if (slug) {
      router.push("/product?collection=" + slug);
    } else {
      delete query.collection;

      router.push({
        pathname: "/product",
        query: query,
      });
    }
  };

  if (isLoading) {
    return "Loading Collection ...";
  }

  return (
    <>
      <div className="flex items-center w-full md:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              {selectedValue ? selectedValue : "Select Collection"}
              <ChevronsUpDown className="h-3 ml-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <Command>
              <CommandInput placeholder="Type to search collections ..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {collections?.map((item) => {
                    return (
                      <CommandItem
                        key={"collection-filter-" + item.id}
                        className="cursor-pointer"
                        onSelect={() => goToCollection(item.slug)}
                      >
                        <span>{item.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {collectionSelect && (
          <X
            className="h-3 ml-2 cursor-pointer"
            onClick={() => goToCollection()}
          ></X>
        )}
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { ChevronsUpDown, X } from "lucide-react"
import { useState } from "react"

export default function ProductCollectionFilter() {
  const [collectionSelect, setCollectionSelect] = useState<string | null>(null)

  return (
    <>
      <div className="flex items-center w-full md:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              {collectionSelect ? collectionSelect : 'Select Collection'}
              <ChevronsUpDown className="h-3 ml-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <Command>
              <CommandInput placeholder="Type to search collections ..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem className="cursor-pointer" onSelect={() => setCollectionSelect('air-force-one')}>
                    <span>Air Force One</span>
                  </CommandItem>
                  <CommandItem className="cursor-pointer" onSelect={() => setCollectionSelect('new-balance-990')}>
                    <span>New Balance 990</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {collectionSelect && 
        <X className="h-3 ml-2 cursor-pointer" onClick={() => setCollectionSelect(null)}></X>}
      </div>
    </>
  )
}
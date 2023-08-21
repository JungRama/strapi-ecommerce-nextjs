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

export interface propsInterface {
  showClear?: boolean,
  label: string,
  items: [
    {
      value: string | number | null,
      name: string | number | null
    }
  ]
}

export default function SelectSearch({showClear = false, label, items}: propsInterface) {
  const [select, setSelect] = useState<string | number | null>(null)

  return (
    <>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {select ? select : label}
              <ChevronsUpDown className="h-3 ml-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <Command>
              <CommandInput placeholder="Type to search collections ..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {items.map(item => {
                    return (
                      <CommandItem key={item.value} className="cursor-pointer" onSelect={() => setSelect(item.value)}>
                        <span>{item.name}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {(select && showClear) && 
        <X className="h-3 ml-2 cursor-pointer" onClick={() => setSelect(null)}></X>}
      </div>
    </>
  )
}
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
import { useEffect, useState } from "react"

export interface propsInterface {
  showClear?: boolean,
  label: string,
  items: {
    value: string | number | null,
    name: string | number | null
  }[],
  defaultValue?: string | number | null,
  onDataChange?: (value: string | number | null) => void
}

export default function SelectSearch({showClear = false, label, items, onDataChange, defaultValue}: propsInterface) {
  const [select, setSelect] = useState<string | number | null>(null)
  const [isOpen, setOpen] = useState<boolean>(false)

  const dataChange = (selected: string | number | null) => {
    setSelect(selected)
    if(onDataChange) {
      onDataChange(selected)
    }
  }

  const findSelectedName = () => {
    if(select) {
      return items.find(item => item.value === select)?.name
    }else {
      return null
    }
  }

  useEffect(() => {
    defaultValue && setSelect(defaultValue)
  }, [])

  return (
    <>
      <div className="flex items-center">
        <Popover open={isOpen} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {select ? findSelectedName() : label}
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
                      <CommandItem key={item.value} className="cursor-pointer" onSelect={() => {
                        setOpen(false)
                        dataChange(item.value)
                      }}>
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
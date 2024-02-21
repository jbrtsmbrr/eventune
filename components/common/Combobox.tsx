"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ICombobox {
  options?: any[],
  placeholder?: string,
  value: string | number | null | undefined,
  onChange: (value: ICombobox["value"]) => void
}

const Combobox = ({ options = [], placeholder = "", onChange, value }: ICombobox) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // role="multiple"
          aria-expanded={open}
          className="min-w-full justify-between rounded-none bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-950 hover:text-gray-200"
        >
          {value
            ? options.find((option) => option.value?.toString() === value?.toString())?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={`cmi-${option.value}`}
                value={option.value}
                onSelect={(nextValue) => {
                  const newValue = nextValue === value?.toString() ? "" : nextValue
                  onChange(newValue)
                  setOpen(false)
                }}
              >
                <Check
                  size={12}
                  style={{
                    opacity: option.value.toString() === value ? 100 : 0
                  }}
                  className="mr-2 h-4 w-4"
                // className={cn(
                //   "mr-2 h-4 w-4",
                //   value === framework.value ? "opacity-100" : "opacity-0"
                // )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox;

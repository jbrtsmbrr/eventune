"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment"
import Combobox from "@/components/common/Combobox";
import { redirect } from "next/navigation"

const limitOptions = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
]

const FormSchema = z.object({
  limit: z.any(),
  date_range: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional()
})

const FilterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      limit: ""
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data)
    window.location.href = `/events?limit=${data.limit}`
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-4 gap-4 my-8">
        <FormField
          control={form.control}
          name="date_range"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-white">Date from</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      // className={cn(
                      //   "w-[240px] pl-3 text-left font-normal",
                      //   !field.value && "text-muted-foreground"
                      // )}
                      className="min-w-[250px] rounded-none"
                    >
                      {field.value ? (
                        `${moment(field.value.from).format("YYYY-MM-DD")} - ${moment(field.value.to).format("YYYY-MM-DD")}`
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    // fromDate={field.value?.from}
                    // toDate={field.value?.to}
                    selected={field.value}
                    onSelect={(value) => {
                      if ((value?.from) != null) {
                        field.onChange({ from: value?.from, to: value?.to })
                      }
                    }}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date("1900-01-01")
                  // }
                  // initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-white">Limit</FormLabel>
              <Combobox options={limitOptions} placeholder="Select Limit" value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-semibold text-xs tracking-wider uppercase bg-white bg-opacity-100 border-2 border-white rounded-none text-black hover:text-white hover:bg-opacity-50 self-end w-fit">Filter</Button>
      </form>
    </Form>
  )
}

export default FilterForm;

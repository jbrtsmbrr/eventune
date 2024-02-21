"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, X } from "lucide-react"
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
import { ReadonlyURLSearchParams, redirect, useParams, useSearchParams } from "next/navigation"

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
  limit: z.string().optional().nullable(),
  date_range: z.object({
    from: z.date(),
    to: z.date(),
  }).optional().nullable()
})

const generateDefaultValues = (params: ReadonlyURLSearchParams): z.infer<typeof FormSchema> => {
  let dateRange;

  if (params.get("from") && params.get("to")) {
    dateRange = {
      from: new Date(params.get("from") as string),
      to: new Date(params.get("to") as string)
    }
  }

  return {
    limit: (isNaN(Number(params.get("limit"))) ? "10" : params.get("limit")) as string,
    date_range: dateRange
  }
}

const FilterForm = () => {
  const params = useSearchParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: generateDefaultValues(params)
  })

  console.log(form.getValues())

  function onSubmit(data: z.infer<typeof FormSchema>) {

    const queryParams = [];

    if (data.limit) {
      queryParams.push(`limit=${data.limit}`);
    }

    if (data.date_range) {
      const date = {
        from: moment(data.date_range.from).format("YYYY-MM-DD"),
        to: moment(data.date_range.to).format("YYYY-MM-DD")
      }
      queryParams.push(`from=${date.from}`)
      queryParams.push(`to=${date.to}`)
    }

    window.location.href = `/events?${queryParams.join("&")}`
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
      <div className="w-full flex justify-end">
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 md:flex-row flex-col w-full flex gap-4 my-8 justify-end">
          <FormField
            control={form.control}
            name="date_range"
            render={({ field }) => (
              <FormItem className="flex flex-col min-w-[200px]">
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
                        className="min-w-full rounded-none"
                      >
                        {field.value?.from && field.value?.to ? (
                          `${moment(field.value.from).format("YYYY-MM-DD")} - ${moment(field.value.to).format("YYYY-MM-DD")}`
                        ) : (
                          <span>Pick a date range</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        <X className="ml-2 h-4 w-4 opacity-50 hover:opacity-100 hover:text-red-500 z-50" onClick={() => {
                          console.log("clear")
                          field.onChange(null)
                        }} />
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
                        console.log("trig")
                        console.log(value)
                        if ((value?.from) !== null) {
                          field.onChange({ from: value?.from, to: value?.to ?? value?.from })
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
              <FormItem className="flex flex-col min-w-[200px]">
                <FormLabel className="text-white">Limit</FormLabel>
                <Combobox options={limitOptions} placeholder="Select Limit" value={field.value} onChange={field.onChange} />
              </FormItem>
            )}
          />
          <Button type="submit" className="font-semibold text-xs tracking-wider uppercase bg-white bg-opacity-100 border-2 border-white rounded-none text-black hover:text-white hover:bg-opacity-50 self-end w-fit">Filter</Button>
        </form>
      </div>
    </Form>
  )
}

export default FilterForm;

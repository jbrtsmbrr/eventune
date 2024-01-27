"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EventSchemaValidator } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { createEvent } from '@/lib/database/actions/event.action'
import { Checkbox } from '@/components/ui/checkbox'
import ImageUploader from './ImageUploader'
import { useUploadThing } from '@/utils/uploadthing'
import { useSession, useUser } from '@clerk/nextjs'
import { IEvent } from '@/lib/types/event'
import SpotifyArtistSelect from './SpotifySelect'

const initialValues = {
  name: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  imageUrl: "",
  location: "",
  price: 0,
  isFree: false,
  artists: [],
}

const EventForm = ({ event }: { event?: IEvent }) => {
  const { isLoaded, session } = useSession();
  // const { isLoaded, user } = useUser();
  const [files, setFiles] = useState<File[]>([]);
  const eventForm = useForm<z.infer<typeof EventSchemaValidator>>({
    resolver: zodResolver(EventSchemaValidator),
    defaultValues: {
      ...initialValues,
      organizer: session?.user?.publicMetadata?.userId as string
    },
  })

  useEffect(() => {
    if (isLoaded) {
      eventForm.setValue("organizer", session?.user?.publicMetadata?.userId as string)
    }
  }, [isLoaded])

  const { startUpload } = useUploadThing("eventImageUploaderEndpoint");

  async function onSubmit(values: z.infer<typeof EventSchemaValidator>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // return console.log(values)
    let newImageUrl = values.imageUrl;
    if (files.length > 0) {
      const readyFiles = await startUpload(files);

      if (!readyFiles) {
        eventForm.setError("imageUrl", { message: "Something went while uploading the image." })
        return;
      }

      newImageUrl = readyFiles[0].url;
    }

    await createEvent({ ...values, imageUrl: newImageUrl });
    eventForm.reset({ ...initialValues, organizer: session?.user?.publicMetadata?.userId as string });
  }
  return (
    <Form {...eventForm}>
      <form onSubmit={eventForm.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={eventForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Event Name" {...field} autoComplete='off'
                  autoFocus
                  className='text-2xl bg-transparent text-gray-300 font-bold tracking-wide border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 placeholder:text-opacity-50'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-3 md:flex-row'>
          <FormField
            control={eventForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className='flex-1 relative h-full w-full'>
                <FormControl>
                  <Textarea value={field.value} placeholder='Event Description' autoComplete='off'
                    className='text-sm bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-gray-300 outline-0 p-4 input-event-bg rounded-sm input-event-shadow'
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={eventForm.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className='relative flex-1'>
                <FormControl>
                  <ImageUploader imageUrl={field.value} onChange={field.onChange} setFiles={setFiles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={eventForm.control}
          name="artists"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SpotifyArtistSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3 md:flex-row">
          <FormField
            control={eventForm.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <div className='flex items-center gap-2 input-event-bg p-2 px-4 rounded-sm input-event-shadow'>
                    <Image src="/assets/icons/icons8-calendar-50.png" alt="ticket" width={14} height={14} />
                    <p className="text-sm text-gray-300">Start:</p>
                    <DatePicker
                      name="startDate"
                      className='text-sm bg-transparent text-gray-300 outline-0'
                      selected={field.value} onChange={field.onChange}
                      showTimeSelect
                      dateFormat="dd MMMM yyyy h:mm aa"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={eventForm.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className='flex items-center gap-2 input-event-bg p-2 px-4 rounded-sm input-event-shadow'>
                    <Image src="/assets/icons/icons8-calendar-50.png" alt="ticket" width={14} height={14} />
                    <p className="text-sm text-gray-300">End:</p>
                    <DatePicker
                      name="endDate"
                      className='text-sm bg-transparent text-gray-300 outline-0'
                      selected={field.value} onChange={field.onChange}
                      showTimeSelect
                      dateFormat="dd MMMM yyyy h:mm aa" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={eventForm.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center gap-2 input-event-bg p-2 px-4 rounded-sm input-event-shadow'>
                  <Image src="/assets/icons/icons8-location-50.png" alt="location" width={16} height={16} />
                  <Input value={field.value} placeholder='Online / Event Location' autoComplete='off'
                    className='text-sm bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-gray-300 outline-0 p-0 h-[3ch]'
                    onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={eventForm.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center gap-2 input-event-bg p-2 px-4 rounded-sm input-event-shadow'>
                  <Image src="/assets/icons/icons8-ticket-50.png" alt="location" width={16} height={16} />
                  <Input type="number" value={field.value} placeholder='Ticket Price' autoComplete='off'
                    className='text-sm bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-gray-300 outline-0 p-0 h-[3ch]'
                    onChange={e => field.onChange(+e.target.value)} />
                  <FormField name="isFree" control={eventForm.control} render={({ field: isFreeField }) => (<FormItem>
                    <FormControl>
                      <div className='flex items-center gap-3'>

                        <label className='whitespace-nowrap cursor-pointer text-sm text-gray-300' htmlFor='is-free-chb'>Free Ticket?</label>
                        <Checkbox className='w-5 h-5 border-2 border-purple-500' name="isFree" id="is-free-chb" checked={isFreeField.value} onCheckedChange={isFreeField.onChange} />
                      </div>
                    </FormControl>
                  </FormItem>)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={eventForm.formState.isSubmitting} className='z-50 w-full text-sm bg-purple-900 hover:bg-purple-800'>{eventForm.formState.isSubmitting ? "Submitting..." : "Create Event"}</Button>
      </form>
    </Form>
  )
}

export default EventForm
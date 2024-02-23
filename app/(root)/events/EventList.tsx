import React from 'react'
import EventCard from '@/components/common/EventCard'
import moment from 'moment'
import { getAllEvents } from '@/lib/database/actions/event.action'
import { IEvent } from '@/lib/types/event'
import { IEventProps } from './page'

const validateDate = (from: string, to: string) => {
  if (!from || !to) return null;

  if (!moment(from, ["YYYY-MM-DD"]).isValid() && !moment(to, ["YYYY-MM-DD"]).isValid()) return null;

  return {
    from,
    to
  }
}


const EventList = async ({ searchParams }: IEventProps) => {
  const filters = {
    limit: searchParams.limit ?? 0,
    dateRange: validateDate(searchParams.from, searchParams.to)
  }
  const events: IEvent[] | null = await getAllEvents(filters);

  return events
    ? <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4">
      {events?.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
    : <div className='text-center p-4 text-gray-300 relative w-full uppercase italic tracking-wide'>
      No result was found.
    </div>
}

export default EventList
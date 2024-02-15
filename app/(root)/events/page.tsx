import EventCard from '@/components/common/EventCard'
import { getAllEvents } from '@/lib/database/actions/event.action';
import { IEvent } from '@/lib/types/event';
import React from 'react'
import FilterForm from './FilterForm';
import moment from 'moment';

export interface IEventProps {
  searchParams: {
    limit: number,
    from: string,
    to: string
  }
};

const validateDate = (from: string, to: string) => {
  if (!from || !to) return null;

  if (!moment(from, ["YYYY-MM-DD"]).isValid() && !moment(to, ["YYYY-MM-DD"]).isValid()) return null;

  return {
    from,
    to
  }
}

const Events = async ({ searchParams }: IEventProps) => {
  const filters = {
    limit: searchParams.limit ?? 0,
    dateRange: validateDate(searchParams.from, searchParams.to) 
  }
  const events: IEvent[] | null = await getAllEvents(filters);

  return (
    <div className="relative top-[61px] left-1/2 -translate-x-1/2 md:p-8 p-14 flex flex-col items-center justify-center bg-[#121212] mb-[61px]">
      <FilterForm />
      {events
        ?
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4">
          {events?.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        : <div className='text-center p-4 text-gray-300 relative w-full uppercase italic tracking-wide'>
          No result was found.
        </div>}

    </div>
  )
}

export default Events
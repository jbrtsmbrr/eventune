import React, { Suspense } from 'react'
import FilterForm from './FilterForm';
import EventList from './EventList';
import EventListLoading from './EventListLoading';

export interface IEventProps {
  searchParams: {
    limit: number,
    from: string,
    to: string
  }
};

const Events = async ({ searchParams }: IEventProps) => {

  return <div className="relative top-[61px] left-1/2 -translate-x-1/2 md:p-8 p-14 flex flex-col items-center justify-center bg-[#121212] mb-[61px]">
    <FilterForm />
    <Suspense fallback={<EventListLoading />}>
      <EventList searchParams={searchParams} />
    </Suspense>
  </div>
}

export default Events
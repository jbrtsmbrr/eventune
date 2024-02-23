import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const EventListLoading = () => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4">
      {Array.from(Array(10).keys()).map((item) => (
        <div key={`loading-${item}`} className='group p-3 min-h-[380px] shadow-lg space-y-5 flex flex-col'>
          <div className='relative overflow-hidden shadow-2xl flex-1 max-h-[200px]'>
            <Skeleton className='h-full w-full bg-gray-600/50' />
          </div>
          <div>
            <Skeleton className='min-h-[24px] max-w-[250px] bg-gray-600/50' />
          </div>
          <div className='space-y-3 text-gray-300'>
            <Skeleton className='min-h-[8px] max-w-[200px] bg-gray-600/50' />
            <Skeleton className='min-h-[8px] max-w-[150px] bg-gray-600/50' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventListLoading
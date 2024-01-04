import { connect } from '@/lib/database'
import Image from 'next/image'
import React from 'react'

type Author = {
  name: string
  imageUrl: string
}

type CardProps = { type?: string, headline: string, imageUrl: string, author: Author }

const NewsCard = async ({ type = "blog", headline, imageUrl, author }: CardProps) => {
  await connect()
  return (
    <div className='group relative flex flex-col aspect-video rounded-sm shadow-lg h-full w-full'>
      <div className='relative overflow-hidden min-h-[200px] h-1/2'>
        <div className='absolute h-full w-full bg-purple-200 bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-500 ease-in-out z-10' />
        <Image alt="glena-news" src={imageUrl} height={500} width={500} className='group-hover:scale-110  transition-all duration-500 ease-in-out h-full object-cover' />
      </div>
      <div className='p-4 flex-1'>
        <p className='text-sm text-gray-400 opacity-70 font-semibold uppercase mb-2'>{type}</p>
        <p className='text-gray-600 text-md cursor-pointer uppercase font-bold hover:underline underline-offset-4 hover:text-purple-700'>{headline}</p>
      </div>
      <div className='p-4 flex gap-4 items-center'>
        <Image className='rounded-full' alt={`author-${author.name}`} src={author.imageUrl} height={40} width={40} />
        <p>{author.name}</p>
      </div>
    </div>
  )
}

export default NewsCard
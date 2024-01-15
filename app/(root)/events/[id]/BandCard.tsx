import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IBandCardProps {
  bandName: string
  imageUrl: string
  trendingNumber?: number,
  artistUrl?: string,
  followers?: number
}


const BandCard = ({ bandName, imageUrl, trendingNumber = 0, artistUrl = "", followers = 0 }: IBandCardProps) => {
  return (
    <div className='relative h-full group overflow-hidden min-h-[400px] rounded-sm'>
      <Image src={imageUrl} alt={`bandname-${bandName}`} fill objectFit='cover' />
      <div className='transition-all duration-500 ease-in-out absolute top-0 w-full h-full bg-gradient-to-t from-purple-950 z-10 translate-y-[20%] group-hover:translate-y-0'></div>
      <div className='absolute bottom-0 h-fit w-full flex flex-col justify-center items-center text-center gap-2 z-10 translate-y-14 group-hover:-translate-y-14 transition-transform duration-500 ease-in-out'>
        {/* {!!trendingNumber && <><p className='text-sm font-semibold text-purple-200 drop-shadow-xl'>#{trendingNumber} Trending Artist</p>
          <span className='h-[3px] w-[80px] bg-white'></span></>} */}
        <p className='text-sm font-semibold text-purple-200 drop-shadow-xl'>{Intl.NumberFormat("ph-PH", { notation: "compact" }).format(followers)} followers</p>
        <span className='h-[1px] w-[30px] bg-purple-400'></span>
        <p className='text-3xl font-extrabold text-purple-100 mt-2 uppercase tracking-tight'>{bandName}</p>
        <Link href={artistUrl} target='_blank'>
          <button className='mt-8 text-xs border-purple-300 border py-2 px-4 text-purple-100 hover:bg-purple-400 hover:bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-200 uppercase tracking-wide'>
            Visit Artist
          </button>
        </Link>

      </div>
    </div>
  )
}

export default BandCard
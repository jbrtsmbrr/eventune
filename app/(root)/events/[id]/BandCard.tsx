import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IBandCardProps {
  bandName: string
  images: [{ url: string }]
  trendingNumber?: number,
  artistUrl?: string,
  followers?: number
}


const BandCard = ({ bandName, images, trendingNumber = 0, artistUrl = "", followers = 0 }: IBandCardProps) => {
  return (
    <div className='relative h-full group overflow-hidden 2xl:min-h-[370px] 2xl:max-h-[370px] xl:min-h-[365px] xl:max-h-[365px] md:min-h-[360px]  min-h-[300px]'>
      {images?.length > 0 ? <Image src={images[0].url} alt={`bandname-${bandName}`} fill objectFit='cover' /> : <div>???</div>}
      <div className='transition-all duration-500 ease-in-out absolute top-0 w-full h-full bg-gradient-to-t from-black z-10 md:translate-y-[20%] group-hover:translate-y-0'></div>
      <div className='absolute bottom-0 h-fit w-full flex flex-col justify-center items-center text-center gap-2 z-10 -translate-y-14 md:translate-y-14 md:group-hover:-translate-y-14 transition-transform duration-500 ease-in-out'>
        {/* {!!trendingNumber && <><p className='text-sm font-semibold text-purple-200 drop-shadow-xl'>#{trendingNumber} Trending Artist</p>
          <span className='h-[3px] w-[80px] bg-white'></span></>} */}
        <p className='text-sm font-semibold text-gray-200 drop-shadow-xl'>{Intl.NumberFormat("ph-PH", { notation: "compact" }).format(followers)} followers</p>
        <span className='h-[1px] w-[30px] bg-gray-200'></span>
        <p className='text-3xl font-bold text-gray-200 mt-2 uppercase tracking-wide'>{bandName}</p>
        <Link href={artistUrl} target='_blank'>
          <button className='mt-8 text-xs border-2 border-gray-500 py-2 px-4 text-gray-50 hover:bg-black opacity-1 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ease-in-out delay-200 uppercase tracking-wide'>
            Visit Artist
          </button>
        </Link>

      </div>
    </div>
  )
}

export default BandCard
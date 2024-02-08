import Image from 'next/image'
import React from 'react'

type TrendingCardProps = {
  name: string
  imageUrl: string
}

const checkText = (word: string) => {
  const words = word.split(" ");

  for (let w of words) {
    if (w.length >= 8) return true
  }

  return false;
}

const TrendingCard = ({ name, imageUrl }: TrendingCardProps) => {
  const textSize = checkText(name) ? 'text-7xl' : 'text-8xl';
  const textScaleSize = checkText(name) ? 'group-hover:text-5xl' : 'group-hover:text-7xl';
  return (
    // @ts-ignore
    <div className={`group relative cursor-pointer overflow-hidden  aspect-square h-full w-full`}>
      <Image alt={`trending-${name}`} src={imageUrl} fill objectFit='cover' className='group-hover:scale-125  transition-all duration-500 ease-in-out' />
      <div className='absolute bg-opacity-10 bg-black group-hover:bg-opacity-5 h-full w-full transition-all duration-500 ease-in-out' />
      <p className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${textSize} ${textScaleSize} transition-all ease-in-out duration-500 font-extrabold uppercase tracking-wider text-[rgba(255,255,255,0.8)] opacity-50 group-hover:opacity-100 text-center break-keep`}>{name}</p>
    </div>
  )
}

export default TrendingCard
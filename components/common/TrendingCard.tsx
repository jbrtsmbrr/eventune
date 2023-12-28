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
    <div style={{ '--image-url': `url(${imageUrl})` }} className={`group relative cursor-pointer overflow-hidden bg-[image:var(--image-url)] aspect-square h-full w-full bg-[length:100%_100%] hover:bg-[length:120%_120%] transition-all duration-500 ease-in-out bg-center bg-no-repeat`}>
    <div className='bg-opacity-15 bg-purple-300 group-hover:bg-purple-700 group-hover:bg-opacity-20 h-full w-full transition-all duration-500 ease-in-out' />
      {/* <Image alt={`trending-${name}`} src={imageUrl} height={500} width={500} className='group-hover:scale-150  transition-all duration-500 ease-in-out' /> */}
      <p className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${textSize} ${textScaleSize} transition-all ease-in-out duration-500 font-extrabold uppercase tracking-wider text-[rgba(255,255,255,0.8)] opacity-50 group-hover:opacity-100 text-center break-keep`}>{name}</p>
    </div>
  )
}

export default TrendingCard
import React from 'react'
import { IOption } from '.';
import { OptionProps } from 'react-select';
import Image from 'next/image';

const SpotifyOption = ({ data, innerProps }: OptionProps<IOption>) => {
  const { images } = data;
  const imageUrl = images?.length > 0 ? images[0].url : "/assets/icons/icons8-image-100.png"
  return <div {...innerProps} className='flex items-center gap-2 p-2 hover:bg-purple-100'>
    <Image alt={`option--${data.name}`} src={imageUrl} height={40} width={40} className='max-h-[35px] max-w-[35px]' />
    <div>
      <p className='font-semibold'>{data.name}</p>
      <p className='text-sm text-gray-700'>{Intl.NumberFormat("ph", { notation: 'compact' }).format(data.followers.total)} followers</p>
    </div>
  </div>
}

export default SpotifyOption
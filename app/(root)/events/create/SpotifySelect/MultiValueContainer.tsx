import Image from 'next/image';
import React from 'react'
import { MultiValueGenericProps, MultiValueProps } from 'react-select';
import { IOption } from '.';

const SpotifyMultiValueContainer = ({ multiValueState, onDelete }: { multiValueState: MultiValueGenericProps<IOption>, onDelete: () => void }) => {
  const { innerProps, data } = multiValueState;
  const imageUrl = data?.images?.length > 0 ? data.images[0].url : "/assets/icons/icons8-image-100.png"
  return <div {...innerProps} className="m-1 flex items-center justify-center gap-2 bg-purple-200 py-1 px-1 pr-2  rounded-sm shadow-2xl">
    <Image alt={`ms-value-${data.name}`} src={imageUrl} width={24} height={24} className="max-h-[24px] max-w-[24px] rounded-sm" />
    <p className="text-purple-900 text-sm">{data.name}</p>
    <span onClick={onDelete} role="button" className="text-sm hover:bg-purple-300 rounded-full box-border h-4 w-4 flex items-center justify-center">x</span>
  </div>
}

export default SpotifyMultiValueContainer
"use client";

import React, { useCallback } from 'react';
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from 'uploadthing/client';
import Image from 'next/image';

interface IUploaderProps {
  imageUrl: string;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  onChange: (...event: any[]) => void
}

const ImageUploader = ({ imageUrl, setFiles, onChange }: IUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onChange(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"])
  })

  return (
    <div {...getRootProps()} className='form-event-bg form-event-shadow bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50 justify-center text-center items-center'>
      <input {...getInputProps()} />
      {imageUrl
        ? <Image alt="temp-image-upload" src={imageUrl} height={1200} width={1200} className='w-full h-full object-cover' />
        : <div className='flex flex-col items-center justify-center h-full'>
          <Image alt='upload-icon' src="/assets/icons/icons8-upload-to-cloud-100.png" className='opacity-40' height={72} width={72}/>
          <p className='text-gray-300 text-sm'>Choose file or Drag & Drop</p>
        </div>}
    </div>
  )
}

export default ImageUploader
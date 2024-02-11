import React from 'react'
import { Button } from '../ui/button'

const BaseButton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Button className="uppercase font-serif px-4 py-2 shadow-lg bg-white border-2 border-white hover:bg-opacity-25 rounded-none text-black hover:text-white transition-all duration-500">{children}</Button>
  )
}

export default BaseButton
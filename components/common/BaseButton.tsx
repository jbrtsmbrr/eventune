import React from 'react'
import { Button } from '../ui/button'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
  children?: React.ReactNode 
}

const BaseButton = ({ children, className, ...buttonProps }: ButtonProps) => {
  return (
    <Button className={`uppercase px-4 py-2 shadow-lg bg-white border-2 border-white hover:bg-black hover:bg-opacity-25 rounded-none text-black hover:text-gray-200 transition-all duration-500 font-bold tracking-wider ${className}`} {...buttonProps}>{children}</Button>
  )
}

export default BaseButton
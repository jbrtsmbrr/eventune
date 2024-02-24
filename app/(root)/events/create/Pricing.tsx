"use client"

import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Price } from '@/lib/types/event';
import { Minus } from 'lucide-react';
import React from 'react'
import { FieldError } from 'react-hook-form';

interface IPricingProps {
  value: Price[];
  onChange: (prices: Price[]) => void;
  errors: FieldError | undefined;
}

const Pricing = ({ value, onChange, errors }: IPricingProps) => {

  const addPricing = () => {
    onChange([
      ...value,
      { label: "", amount: 0 }
    ]);
  }

  const deletePricing = (item: Price) => {
    if (value.length === 1) return;
    const pricesCopy = [...value]
    const priceIndex = pricesCopy.findIndex((value) => item === value)
    pricesCopy.splice(priceIndex, 1);

    onChange(pricesCopy)
  }

  const handlePricingChange = ({ label, amount, index }: { label: string, amount: number, index: number }) => {
    const pricesCopy = [...value];
    pricesCopy[index].amount = amount;
    pricesCopy[index].label = label;
    onChange(pricesCopy)
  }

  return (
    <div className='space-y-4'>
      <FormItem>
        {value.map((price, index) => (
          <div
            key={`pricing---${index}`}
            className='flex items-center justify-center gap-2'
          >
            <FormControl className="flex-1">
              <div>
                <div className='flex items-center gap-2 input-event-bg p-2 px-4 rounded-sm input-event-shadow'>
                  <Input
                    type='text'
                    placeholder={`Enter Pricing ${index + 1}`}
                    value={price.label}
                    onChange={(e) => {
                      handlePricingChange({
                        amount: price.amount,
                        label: e.target.value,
                        index
                      })
                    }}
                    className='text-sm bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-gray-300 outline-0 p-0 h-[3ch]'
                  />
                </div>
                <p className='text-sm text-red-600 my-2 h-[0.875rem]'>
                  {errors && errors[index]?.label && `Please enter a valid label.`}</p>
              </div>
            </FormControl>
            <FormControl className="flex-1">
              <div>
                <div className='flex items-center gap-2 input-event-bg p-2 px-4 rounded-sm input-event-shadow'>
                  <Input
                    placeholder='Enter Amount'
                    value={price.amount}
                    onChange={(e) => handlePricingChange({
                      amount: +e.target.value,
                      label: price.label,
                      index
                    })}
                    onKeyDown={e => {
                      if (/[^\d]/.test(e.key) && e.key !== "Backspace") {
                        e.preventDefault();
                      }
                    }}
                    className='text-sm bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-gray-300 outline-0 p-0 h-[3ch]' />
                </div>
                <p className='text-sm text-red-600 my-2 h-[0.875rem]'>
                  {errors && errors[index]?.amount && `Please enter a valid amount.`}
                </p>
              </div>
            </FormControl>
            <Minus
              color='red'
              cursor='pointer'
              size="28px"
              onClick={() => deletePricing(price)}
              className='hover:bg-red-100/25 rounded-full p-1 transition duration-200 ease-in-out'
            />
          </div>
        ))}
        {/* <FormMessage /> */}
      </FormItem>
      <Button
        type='button'
        onClick={() => addPricing()}
        className='text-gray-300 w-full border border-dashed border-gray-500 uppercase text-xs tracking-widest bg-gray-950/30 hover:bg-gray-950/50 transition-all duration-200 ease-in-out'>
        add pricing
      </Button>
    </div>
  )
}

export default Pricing
'use client'

import React, { useState } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { ClientImage } from './client-image'
import randomSVG from '../../../public/dice-random.svg'
import { ButtonToolTip } from './tooltips'
import EXAMPLES from './examples/examples'

interface TextAreaProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export function TextArea({ register, setValue }: TextAreaProps) {
  const [exampleIndex, setExampleIndex] = useState<number>(EXAMPLES.length + 1)

  const setRandomValue = async () => {
    const nExamples = EXAMPLES.length
    var index = exampleIndex

    while (index === exampleIndex) {
      index = Math.floor(Math.random() * nExamples)
    }
    setExampleIndex(index)
    setValue('cipherText', EXAMPLES[exampleIndex])
  }

  const clearTextArea = async () => {
    setValue('cipherText', '')
  }

  return (
    <>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <textarea
            id="cipherText"
            {...register('cipherText', {
              required: true
            })}
            rows={6}
            className="w-full px-0 text-[15px] text-[#434d61] bg-white border-0 focus:outline-none"
            placeholder="Write a cryptogram..."
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="space-x-1">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#041f3c] hover:bg-[#021121] rounded-lg focus:ring-2 focus:ring-[#041f3c62]"
            >
              Decipher
            </button>
            <button
              onClick={clearTextArea}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#041f3c] hover:bg-[#021121] rounded-lg focus:ring-2 focus:ring-[#041f3c62]"
            >
              Clear
            </button>
          </div>
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <ButtonToolTip text={'random example'}>
              <button
                onClick={setRandomValue}
                type="button"
                className="flex justify-center items-center"
              >
                <span className="h-7 w-7">
                  <ClientImage imageComponent={randomSVG} description={'random button'}/>
                </span>
              </button> 
            </ButtonToolTip>   
          </div>  
        </div>
      </div>
    </>
  )
}
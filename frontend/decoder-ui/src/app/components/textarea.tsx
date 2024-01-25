'use client'

import React, { useState } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormReset } from 'react-hook-form'

import { ClientImage } from './client-image'
import randomSVG from '../../../public/dice-random.svg'
import { ButtonToolTip } from './tooltips'
import EXAMPLES from './examples/examples'

interface TextAreaProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  showResult: boolean
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>
  cipherKey: string
  setCipherKey: React.Dispatch<React.SetStateAction<string>>
  fitness: number
  reset: UseFormReset<FieldValues>
  inputDevRef: React.RefObject<HTMLDivElement>
}

export function TextArea(data: TextAreaProps) {
  const nExamples = EXAMPLES.length
  const [exampleIndex, setExampleIndex] = useState<number>(Math.floor(Math.random() * nExamples))

  const setRandomValue = async () => {
    var index = exampleIndex
    while (index === exampleIndex) {
      index = Math.floor(Math.random() * nExamples)
    }
    setExampleIndex(index)
    data.setValue('cipherText', EXAMPLES[exampleIndex])
  }

  const clearTextArea = async () => {
    data.reset()
    data.setCipherKey('')
    data.setShowResult(false)
  }

  return (
    <>
      <div className="w-full mb-10 border border-gray-200 rounded-lg bg-gray-50">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <textarea
            id="cipherText"
            {...data.register('cipherText')}
            rows={6}
            className="w-full px-0 text-[15px] text-[#434d61] bg-white border-0 focus:outline-none"
            placeholder="Write a cryptogram..."
            required
            minLength={4}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="space-x-1">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#041f3c] hover:bg-[#0e3a69] rounded-lg focus:ring-2 focus:ring-[#041f3c62]"
            >
              Decipher
            </button>
            <button
              onClick={clearTextArea}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#041f3c] hover:bg-[#0e3a69] rounded-lg focus:ring-2 focus:ring-[#041f3c62]"
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
        {data.showResult && 
          <div className="flex flex-col px-4 py-2 border-t">
            <h2 className="text-[#261c28] text-[22px] font-semibold justify-between items-center tracking-wide my-2">
            Result
            </h2>
            <div className="px-4 py-2 bg-white rounded-lg mb-4">
            <textarea
            id="result"
            {...data.register('result')}
            rows={6}
            className="w-full px-0 text-[15px] text-[#434d61] bg-white border-0 focus:outline-none cursor-text"
            disabled
            />
            </div>
            <div ref={data.inputDevRef} className="flex items-center justify-between mb-2">
              <div className="flex flex-row">
                <span className="block text-sm font-bold text-[#3b4455] tracking-wide justify-between">
                  Decipher Key:
                </span>
                <span className="block text-sm font-normal text-[#3b4455] tracking-wide ml-2 justify-between">
                  {data.cipherKey}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-36 bg-[#e48d8d] rounded-full h-2.5 relative">
                  <span className="absolute border-l-[14px] border-[#8ee083] h-full left-[75%]"/>
                  <span
                  className="absolute border-l-[7px] border-[#727272f3] h-full"
                  style={{
                    left: '40%'
                  }}/>
                  {/* <div
                  className="bg-[#777777c7] h-2.5 rounded-full absolute"
                  style={{
                    width: '78%'
                  }}/>                 */}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
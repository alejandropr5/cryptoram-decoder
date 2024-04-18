'use client'

import React, { useState } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormReset } from 'react-hook-form'

import { ClientImage } from '@/components/client-image'
import randomSVG from '@public/dice-random.svg'
import { ButtonToolTip, ScoreToolTip } from '@/components/tooltips'
import EXAMPLES from '@/components/examples/examples'

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
  ctrl:  React.MutableRefObject<AbortController | undefined>
  showProgress: boolean
}

export function TextArea(data: TextAreaProps) {
  const nExamples = EXAMPLES.length
  const [exampleIndex, setExampleIndex] = useState<number>(Math.floor(Math.random() * nExamples))

  const setColor = (score: number) => {
    const scoreColors = ['#f24b4c', '#ffb412', '#56cf85']

    if (score < 0.7) {
      return scoreColors[0]
    }
    else if (score > 0.95 && score < 1.05) {
      return scoreColors[2]
    }
    else {
      return scoreColors[1]
    }
  }

  const setText = (score: number) => {
    const scoreText = 'Score ' + Math.round(score*100) + ': '
    const text = [
      'Random set of characters, the result is far away from being readable',
      'Very unlikely to be a readable result',
      'The correct solution may have been found, or at least the result comes close to english',
      'Probably not readable, the provided cipher text might be too short'
    ]

    if (score < 0.7) {
      return scoreText + text[0]
    }
    else if (score < 0.95) {
      return scoreText + text[1]
    }
    else if (score < 1.05) {
      return scoreText + text[2]
    }
    else {
      return scoreText + text[3]
    }
  }

  const setRandomValue = async () => {
    var index = exampleIndex
    while (index === exampleIndex) {
      index = Math.floor(Math.random() * nExamples)
    }
    setExampleIndex(index)
    data.setValue('cipherText', EXAMPLES[exampleIndex])
  }

  const clearTextArea = async () => {
    data.ctrl.current?.abort()
    data.setValue('cipherText', '')
    data.setValue('result', '')
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
            className="w-full px-0 text-[15px] text-[#434d61] bg-white border-0 focus:outline-none font-mono"
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
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-[#261c28] text-[22px] font-semibold justify-between items-center my-2">
                Result
              </h2>
              {!data.ctrl.current?.signal.aborted && data.showProgress &&
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#041f3c] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                />
              }           
            </div>
            <div className="px-4 py-2 bg-white rounded-lg mb-4">
            <textarea
            id="result"
            {...data.register('result')}
            rows={6}
            className="w-full px-0 text-[16px] text-[#434d61] bg-white border-0 focus:outline-none cursor-text font-ubuntu"
            disabled
            />
            </div>
            <div ref={data.inputDevRef} className="flex sm:items-center sm:justify-between mb-2 flex-col sm:flex-row space-y-2">
              <div className="flex flex-col sm:flex-row">
                <span className="block text-sm font-bold text-[#3b4455] tracking-wide justify-between ">
                  Cipher Key:
                </span>
                <span className="block text-sm font-normal text-[#3b4455] tracking-wide sm:ml-2 justify-between">
                  {data.cipherKey.toLowerCase()}
                </span>
              </div>
              <div className="flex items-center justify-between w-fit">
                <ScoreToolTip text={setText(data.fitness)}>
                  <div className="w-36 bg-gray-200 rounded-full h-2.5">
                    <span className="absolute border-l-[12px] border-gray-300 h-full left-[78%]"/>
                    <span
                    className="absolute left-0 h-full rounded-full"
                    style={{
                      width: ((data.fitness * 83) + '%'),
                      backgroundColor: setColor(data.fitness)
                    }}/>                  
                  </div>
                </ScoreToolTip>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
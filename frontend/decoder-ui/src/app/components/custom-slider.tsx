'use client'

import React, { useState, useEffect } from 'react'
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import { LabelToolTip } from './tooltips'
import { ClientImage } from './client-image'
import infoSVG from '../../../public/info-svgrepo-com.svg'

interface Props {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  infoText: string
  sliderLabel: string
  sliderId: string
  defaultVal: number
  minVal: number
  maxVal: number
}

export function SliderValueDisplay ({ currentValue, maxVal }: { currentValue: number, maxVal: number }) {
  const initPos = Math.floor((currentValue/maxVal) * 351)
  const [currentPos, setCurrentPos] = useState<number>(initPos)

  useEffect(() => {
    setCurrentPos(initPos)
    console.log(initPos)
  }, [initPos])

  return (
    <div 
    className={"absolute w-5 h-5 rotate-45 bg-[#0075ff] mx-auto -top-[17px] rounded-s-[50%] rounded-tr-[50%] flex items-center justify-center left-[70px]"}
    // + "left-[" + (currentPos) + "px]"}
  >
    <div className="-rotate-45 text-white font-medium text-[8px] flex items-center justify-center">
      {currentValue}
    </div>
  </div> 
  )
}

export function CustomSlider(data: Props) {
  const currentValue: number = data.watch(data.sliderId) || data.defaultVal
  // const initPos = Math.floor((currentValue/data.maxVal) * 351)

  return (
    <div className="my-2">
      <LabelToolTip text={data.infoText}>
        <label htmlFor={data.sliderId} className="block mb-4 text-sm font-medium text-[#3b4455] tracking-wide cursor-pointer">
          {data.sliderLabel}
        </label>
        <div className="h-4 w-4 cursor-pointer">
          <ClientImage description='Info icon' imageComponent={infoSVG}/>
        </div> 
      </LabelToolTip>
      <div className="relative">
        <input
          {...data.register(data.sliderId, {
            required: true
          })}
          id={data.sliderId}
          type="range"
          defaultValue={data.defaultVal}
          max={data.maxVal}
          min={data.minVal}
          className="w-full h-1 mb-7 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm focus:outline-none"
        />
        <SliderValueDisplay currentValue={currentValue} maxVal={data.maxVal}/>
      </div>     
    </div>
  )
}
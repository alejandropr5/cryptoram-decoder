'use client'

import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import { LabelToolTip } from './tooltips'
import { ClientImage } from './client-image'
import infoSVG from '../../../public/info-svgrepo-com.svg'
import { stringify } from 'querystring'

interface Props {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  infoText: string
  sliderLabel: string
  sliderId: string
  defaultVal: number
  minVal: number
  maxVal: number
  decimal: boolean
}

interface sliderDisplayProps {
  currentValue: number
  maxVal: number
  decimal: boolean
}

export function SliderValueDisplay ({ currentValue, maxVal, decimal }: sliderDisplayProps) {
  return (
    <div
      className="absolute w-5 h-5 rotate-45 bg-[#041f3c] mx-auto -top-[17px] rounded-s-[50%] rounded-tr-[50%] flex items-center justify-center left-3"
      style={{
        // left: (Math.floor((currentValue/maxVal) * offset) - Math.floor((minVal/maxVal) * offset) - 1)
        left: ((currentValue / maxVal) * 95) + '%'
      }}>
      <div className="-rotate-45 text-white font-medium text-[8px] flex items-center justify-center">
        {decimal ? currentValue / 100 : currentValue}
      </div>
    </div> 
  )
}

export function CustomSlider(data: Props) {
  var currentValue: number = data.watch(data.sliderId) || data.defaultVal

  return (
    <div className="my-2 overflow-visible">
      <LabelToolTip text={data.infoText}>
        <div className="flex flex-row items-center mb-4 w-fit">
          <label htmlFor={data.sliderId} className="block text-sm font-medium text-[#3b4455] tracking-wide">
            {data.sliderLabel}
          </label>
          <div className="h-4 w-4 ml-[2px]">
            <ClientImage description='Info icon' imageComponent={infoSVG}/>
          </div> 
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
          className="w-full h-1 mb-7 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm focus:outline-none
          [&::-webkit-slider-thumb]:bg-[#041f3c]
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full"
        />
        <SliderValueDisplay
          currentValue={currentValue}
          maxVal={data.maxVal}
          decimal={data.decimal}
        />
      </div>     
    </div>
  )
}
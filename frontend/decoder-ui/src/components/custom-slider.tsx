'use client'

import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import { LabelToolTip } from '@/components/tooltips'
import { ClientImage } from '@/components/client-image'
import infoSVG from '@public/info-svgrepo-com.svg'
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
  minVal: number
  maxVal: number
  decimal: boolean
}

export function SliderValueDisplay ({ currentValue, minVal, maxVal, decimal }: sliderDisplayProps) {
  const setPercentage = (currentValue: number, minVal: number, maxVal: number, decimal: boolean) => {
    var percentage = (((currentValue - minVal + 0.1) / maxVal) * 100)
    if (percentage >= 50 && !decimal) {
      return Math.ceil(percentage)
    }
    else if (!decimal) {
      return Math.floor(percentage)
    }
    else {
      return percentage
    }
  }

  return (
    <div className="absolute -top-[17px] w-[21px] h-[21px]"
      style={{
        left: setPercentage(currentValue, minVal, maxVal, decimal) + '%'
      }}
    >
      <div
        className="absolute w-5 h-5 rotate-45 bg-[#041f3c] mx-auto  rounded-s-[50%] rounded-tr-[50%] flex items-center justify-center"
          style={{
            right: setPercentage(currentValue, minVal, maxVal, decimal) + '%'
          }}
        >
        <div className="-rotate-45 text-white font-medium text-[8px] flex items-center justify-center">
          {decimal ? currentValue / 100 : currentValue}
        </div>
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
      <div className="relative f-full">
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
          minVal={data.minVal}
          maxVal={data.maxVal}
          decimal={data.decimal}
        />
      </div>     
    </div>
  )
}
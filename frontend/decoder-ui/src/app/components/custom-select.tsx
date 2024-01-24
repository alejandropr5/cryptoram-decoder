'use client'

import React from 'react'
import { LabelToolTip } from './tooltips'
import { ClientImage } from './client-image'

import infoSVG from '../../../public/info-svgrepo-com.svg'

interface Props {
  infoText: string
  label: string
  id: string
  defaultVal: string
  options: Array<string>
}

function SelectOptions({ options }: { options: Array<string>}) {
  return (
    <>
      {options.map((op, key) =>{
        return (
          <option value={op} key={key}>{op}</option>
        )
      })}
    </>
  )
}

export function CustomSelect(data: Props) {
  return (
    <div className="my-2">
      <LabelToolTip text={data.infoText}>
        <label htmlFor={data.id} className="block mb-2 text-sm font-medium text-[#3b4455] tracking-wide cursor-pointer">
          {data.label}
        </label>
        <div className="h-4 w-4 cursor-pointer">
          <ClientImage description='Info icon' imageComponent={infoSVG}/>
        </div> 
      </LabelToolTip>    
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none mb-8"
        defaultValue={data.defaultVal}
      >
        <SelectOptions options={data.options}/>
      </select>
    </div>
  )
}
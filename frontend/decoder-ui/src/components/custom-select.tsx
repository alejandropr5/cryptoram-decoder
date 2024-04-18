'use client'

import React from 'react'
import { LabelToolTip } from '@/components/tooltips'
import { ClientImage } from '@/components/client-image'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import infoSVG from '@public/info-svgrepo-com.svg'

interface Props {
  register: UseFormRegister<FieldValues>
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
    <div className="my-2 overflow-visible">
      <LabelToolTip text={data.infoText}>
        <div className="flex flex-row items-center mb-4 w-fit">
          <label htmlFor={data.id} className="block text-sm font-medium text-[#3b4455] tracking-wide">
            {data.label}
          </label>
          <div className="h-4 w-4">
            <ClientImage description='Info icon' imageComponent={infoSVG}/>
          </div>
        </div>
      </LabelToolTip>    
      <select
        {...data.register(data.id, {
          required: true
        })}
        id={data.id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none mb-8"
        defaultValue={data.defaultVal}
      >
        <SelectOptions options={data.options}/>
      </select>
    </div>
  )
}
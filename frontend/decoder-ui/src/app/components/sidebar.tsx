'use client'

import React from 'react'
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import { CustomSlider } from './custom-slider'
import { CustomSelect } from './custom-select'

interface SideBarProps {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
}

export function SideBar({ register, watch }: SideBarProps) {
    return (
      <div className="sticky -order-1 top-[74px] flex flex-col min-w-[400px] max-h-lvh bg-white border-r-[1px] border-r-[#eaecf0] px-6 overflow-y-auto h-[calc(100vh-74px)]">
        <div>
          <h2 className="text-[#261c28] text-[22px] font-semibold justify-between items-center tracking-wide my-8">
            Options
          </h2>
          <CustomSlider
            register={register}
            watch={watch}
            infoText='holi'
            defaultVal={20}
            maxVal={100}
            minVal={1}
            sliderId='iterations'
            sliderLabel='Number of iterations'
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='holi'
            defaultVal={120}
            maxVal={200}
            minVal={1}
            sliderId='population'
            sliderLabel='Initial Population'
          />
        </div>
        <hr className="border-t border-[#d0d5dd] my-2"/>
        <div>
          <h2 className="text-[#261c28] text-[22px] font-semibold justify-between items-center tracking-wide my-8">
            Advanced Options
          </h2>
          <CustomSelect
            infoText='holi'
            defaultVal='scramble'
            id='mutation'
            label='Mutation Algorithm'
            options={['insert', 'swap', 'inversion', 'scramble']}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='holi'
            defaultVal={20}
            maxVal={100}
            minVal={1}
            sliderId='mutationRate'
            sliderLabel='Mutation Rate'
          />
          <hr className="border-t border-[#d0d5dd] mt-2 mb-6"/>
          <CustomSelect
            infoText='holi'
            defaultVal='full'
            id='crossover'
            label='Crossover Algorithm'
            options={['order-one', 'partially-mapped', 'cycle', 'full']}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='holi'
            defaultVal={120}
            maxVal={200}
            minVal={1}
            sliderId='crossoverRate'
            sliderLabel='Crossover Rate'
          />
        </div>
      </div>
    )
}


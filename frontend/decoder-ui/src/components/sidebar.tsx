'use client'

import React from 'react'
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import { CustomSlider } from '@/components/custom-slider'
import { CustomSelect } from '@/components/custom-select'

interface SideBarProps {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
}

export function SideBar({ register, watch }: SideBarProps) {
    return (
      <div className="lg:sticky -order-1 top-[74px] flex flex-col px-6 bg-white
        max-lg:border-t-[1px] max-lg:border-t-[#eaecf0]
        lg:min-w-[400px] lg:border-r-[1px] lg:border-r-[#eaecf0] lg:h-[calc(100vh-74px)] lg:overflow-y-auto">
        <div>
          <h2 className="text-[#261c28] text-[22px] font-semibold justify-between items-center tracking-wide my-8">
            Options
          </h2>
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Maximum number of iterations for the genetic algorithm'
            defaultVal={20}
            maxVal={100}
            minVal={1}
            sliderId='iterations'
            sliderLabel='Max iterations'
            decimal={false}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Size of candidate population for each iteration'
            defaultVal={120}
            maxVal={200}
            minVal={1}
            sliderId='population'
            decimal={false}
            sliderLabel='Population'
          />
        </div>
        <hr className="border-t border-[#d0d5dd] my-2"/>
        <div className="overflow-x-visible">
          <h2 className="text-[#261c28] text-[22px] font-semibold justify-between items-center tracking-wide my-8">
            Advanced Options
          </h2>
          <CustomSelect
            register={register}
            infoText=' Type of mutation applied during the genetic algorithm'
            defaultVal='scramble'
            id='mutation'
            label='Mutation Algorithm'
            options={['insert', 'swap', 'inversion', 'scramble']}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Probability of applying mutation to an individual in the population'
            defaultVal={5}
            maxVal={100}
            minVal={0}
            sliderId='mutationRate'
            sliderLabel='Mutation Rate'
            decimal={true}
          />
          <hr className="border-t border-[#d0d5dd] mt-2 mb-6"/>
          <CustomSelect
            register={register}
            infoText='Type of crossover operation applied during the genetic algorithm'
            defaultVal='full'
            id='crossover'
            label='Crossover Algorithm'
            options={['order-one', 'partially-mapped', 'cycle', 'full']}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Probability of applying crossover to individuals in the population'
            defaultVal={60}
            maxVal={100}
            minVal={0}
            sliderId='crossoverRate'
            sliderLabel='Crossover Rate'
            decimal={true}
          />
        </div>
      </div>
    )
}

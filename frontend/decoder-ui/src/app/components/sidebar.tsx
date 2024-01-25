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
      <div className="sticky -order-1 top-[74px] flex flex-col min-w-[400px] max-h-lvh bg-white border-r-[1px] border-r-[#eaecf0] px-6 overflow-y-auto h-[calc(100vh-74px)] overflow-x-visible">
        <div className="overflow-x-visible">
          <h2 className="text-[#261c28] text-[22px] font-semibold justify-between items-center tracking-wide my-8">
            Options
          </h2>
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Represents the maximum number of iterations the genetic algorithm will perform. Increasing this value may lead to more accurate results but may also increase computation time.'
            defaultVal={20}
            maxVal={100}
            minVal={0}
            sliderId='iterations'
            sliderLabel='Max iterations'
            decimal={false}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Defines the size of the candidate population for each iteration of the genetic algorithm. A larger population size may lead to better results but will also increase computational resources required.'
            defaultVal={120}
            maxVal={200}
            minVal={0}
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
            infoText='Determines the type of mutation to be applied during the genetic algorithm. Different mutation types may affect how the solution space is explored.'
            defaultVal='scramble'
            id='mutation'
            label='Mutation Algorithm'
            options={['insert', 'swap', 'inversion', 'scramble']}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Represents the probability of applying mutation to an individual in the population. A higher mutation rate may lead to more exploration of the solution space but may also disrupt good solutions.'
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
            infoText='Determines the type of mutation to be applied during the genetic algorithm. Different mutation types may affect how the solution space is explored.'
            defaultVal='full'
            id='crossover'
            label='Crossover Algorithm'
            options={['order-one', 'partially-mapped', 'cycle', 'full']}
          />
          <CustomSlider
            register={register}
            watch={watch}
            infoText='Determines the probability of applying crossover to individuals in the population. Crossover helps combine information from different candidate solutions. A higher crossover rate encourages more exploration of the solution space.'
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


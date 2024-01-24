'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { SideBar } from "./sidebar";
import { PageContent } from "./page-content";

export function CustomBody() {
  const { register, watch, handleSubmit, formState: { isValid, errors }, reset, setValue } = useForm({
    mode: 'all'
  })

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row max-h-screen w-full">
      <SideBar register={register} watch={watch}/>
      <PageContent register={register} setValue={setValue}/>
    </form>    
  )
}
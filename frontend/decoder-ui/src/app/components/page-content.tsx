'use client'

import React from 'react'
import { TextArea } from './textarea'
import { PageText } from './page-text'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface PageContentProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export function PageContent({ register, setValue }: PageContentProps) {
  return (
    <div className="flex h-full w-full justify-between px-4">
      <div className="flex flex-col w-auto mx-28 font-sans mt-5">
        <PageText/>
        <TextArea register={register} setValue={setValue}/>
      </div>
    </div>
  )
}
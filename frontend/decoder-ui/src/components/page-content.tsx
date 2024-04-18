'use client'

import React from 'react'
import { TextArea } from '@/components/textarea'
import { PageText } from '@/components/page-text'
import { FieldValues, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form'

interface PageContentProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  showResult: boolean
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>
  cipherKey: string
  setCipherKey: React.Dispatch<React.SetStateAction<string>>
  fitness: number
  reset: UseFormReset<FieldValues>
  inputDevRef: React.RefObject<HTMLDivElement>
  ctrl: React.MutableRefObject<AbortController | undefined>
  showProgress: boolean
}

export function PageContent(data: PageContentProps) {
  return (
    <div className="flex flex-col min-h-full h-fit w-full justify-between px-6 z-0 items-center">
      <div className="flex flex-col max-w-[1256px] font-sans mt-5">
        <PageText/>
        <TextArea
          register={data.register}
          setValue={data.setValue}
          showResult={data.showResult}
          setShowResult={data.setShowResult}
          cipherKey={data.cipherKey}
          fitness={data.fitness}
          reset={data.reset}
          setCipherKey={data.setCipherKey}
          inputDevRef={data.inputDevRef}
          ctrl={data.ctrl}
          showProgress={data.showProgress}
        />
      </div>
    </div>
  )
}
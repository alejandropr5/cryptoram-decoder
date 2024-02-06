'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { SideBar } from "./sidebar";
import { PageContent } from "./page-content"

interface CustomBodyProps {
  backendUrl: string | undefined
  apiStreamPath: string
}


export function CustomBody(bodyData: CustomBodyProps) {
  const { register, watch, handleSubmit, setValue, reset } = useForm({
    mode: 'all'
  })
  const [showResult, setShowResult] = useState<boolean>(false)
  const [key, setKey] = useState<string>('')
  const [fitness, setFitness] = useState<number>(0)
  const inputDevRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<AbortController>()

  const onSubmit = async (data: any) => {
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    setValue('result', data.cipherText)
    setFitness(0.3)
    setShowResult(true)
    
    const requestBody = JSON.stringify({
      "cipher_text": data.cipherText,
      "max_iter": data.iterations,
      "n_population": data.population,
      "tolerance": 0.01,
      "mutation_type": data.mutation,
      "crossover_type": data.crossover,
      "mutation_rate": data.mutationRate / 100,
      "crossover_rate": data.crossoverRate / 100
    })

    await fetchEventSource(bodyData.backendUrl + bodyData.apiStreamPath, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      signal: signal,
      openWhenHidden: true,
      body: requestBody,
      onmessage: async (ev) => {
        const data = ev.data
        if (!data) {
          return
        }

        try {
          const d = JSON.parse(data)
          setValue('result', d.plain_text)
          setKey(d.key)
          setFitness(d.fitness)
        } catch (e) {
          console.log('Fetch onmessage error', e)
        }
      },
      onclose: () => {
        controllerRef.current?.abort()
      }
    })
  }

  // useEffect (() => {
  //   inputDevRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [showResult])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col-reverse lg:flex-row h-fit w-full">
      <SideBar register={register} watch={watch}/>
      <PageContent
        register={register}
        setValue={setValue}
        showResult={showResult}
        setShowResult={setShowResult}
        cipherKey={key}
        setCipherKey={setKey}
        fitness={fitness}
        reset={reset}
        inputDevRef={inputDevRef}
        ctrl={controllerRef}
      />
    </form>    
  )
}

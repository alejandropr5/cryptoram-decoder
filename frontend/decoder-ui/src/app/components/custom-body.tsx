'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SideBar } from "./sidebar";
import { PageContent } from "./page-content"

const API_ENDPOINT = 'http://0.0.0.0:8000/decipher'

export function CustomBody() {
  const { register, watch, handleSubmit, setValue, reset } = useForm({
    mode: 'all'
  })
  const [showResult, setShowResult] = useState<boolean>(false)
  const [key, setKey] = useState<string>('')
  const [fitness, setFitness] = useState<number>(0)
  const inputDevRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (data: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
  
    setShowResult(true)
    
    var raw = JSON.stringify({
      "cipher_text": data.cipherText,
      "max_iter": data.iterations,
      "n_population": data.population,
      "tolerance": 0.01,
      "mutation_type": data.mutation,
      "crossover_type": data.crossover,
      "mutation_rate": data.mutationRate / 100,
      "crossover_rate": data.crossoverRate / 100
    })
    
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        setValue('result', result.plain_text)
        setKey(result.key)
        setFitness(result.fitness)
        console.log(result)
      })
      .catch(error => console.log('error', error))
  }

  useEffect (() => {
    inputDevRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [showResult])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row h-fit w-full">
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
      />
    </form>    
  )
}

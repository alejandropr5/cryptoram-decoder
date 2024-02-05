'use client'

import React from 'react'
import { StaticImageData } from 'next/image'
import { ClientImage } from './client-image'
import gencipher from '../../../public/gencipher.png'


interface LinkRefProps {
  linkText: String
  reference: string
  imageComponent: StaticImageData
  description: string
}

export function LinkRef({ linkText,  reference, imageComponent, description}: LinkRefProps) {
  return (
    <a 
      rel="noopener noreferrer nofollow external"
      target="_blank"
      href={reference}
      className="text-[#261c28] flex flex-row justify-between items-center text-base"
    >
      <span className="max-h-6 max-w-6 mr-1">
        <ClientImage imageComponent={imageComponent} description={description}/>
      </span>      
      <span className="sm:visible invisible absolute sm:relative">
        {linkText}
      </span>
    </a>
  )
}
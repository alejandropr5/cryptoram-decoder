'use client'

import React, { ReactNode } from 'react'

interface TextRefProps {
  children: ReactNode
  link: string
}

function TextRef ({ children, link }: TextRefProps) {
  return (
    <a 
      rel="noopener noreferrer nofollow external"
      target="_blank"
      href={link}
      className="no-underline hover:underline text-[#619ebc]"
    >
      {children}
    </a>
  )
}

export function PageText() {
  return (
    <>
      <h1 className="text-[30px] font-bold text-[#232833] mb-4 tracking-wide">
        Genetic Decipher
      </h1>
      <p className="text-[#3b4455] mb-10 text-[18px]">
        This tool uses a{' '}        
        <TextRef link="https://alejandropr5.github.io/portfolio/blog/solving-cryptograms-with-genetic-algorithms#genetic-algorithm">
          genetic algorithm
        </TextRef>
        {' '}to solve monoalphabetic substitution ciphers, also known as{' '}
        <TextRef link="https://alejandropr5.github.io/portfolio/blog/solving-cryptograms-with-genetic-algorithms#cryptogram">
          cryptograms
        </TextRef>
        . These are ciphers where each letter of the clear text is replaced by a corresponding
        letter of a{' '}
        <TextRef link="https://alejandropr5.github.io/portfolio/blog/solving-cryptograms-with-genetic-algorithms#cipher-key">
          cipher key
        </TextRef>
        .
      </p>
    </>
  )
}
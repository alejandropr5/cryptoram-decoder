'use client'

import React from 'react'

export function PageText() {
  return (
    <>
      <h1 className="text-[30px] font-bold text-[#232833] mb-4 tracking-wide">
        Genetic Decipher
      </h1>
      <p className="text-[#3b4455] mb-10 text-[18px]">
        This tool solves{' '}
        <a 
          rel="noopener noreferrer nofollow external"
          target="_blank"
          href="https://en.wikipedia.org/wiki/Substitution_cipher"
          className="no-underline hover:underline text-[#619ebc]"
        >
          monoalphabetic substitution ciphers
        </a>
        , also known as{' '}
        <a 
          rel="noopener noreferrer nofollow external"
          target="_blank"
          href="https://en.wikipedia.org/wiki/Cryptogram"
          className="no-underline hover:underline text-[#619ebc]"
        >
          cryptograms
        </a>
        . These are ciphers where each letter of the clear text is replaced by a corresponding
        letter of the cipher alphabet.
      </p>
    </>
  )
}
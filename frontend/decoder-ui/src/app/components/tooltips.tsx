'use client'

import React, { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  text: String
}

export function ButtonToolTip ({ children, text }: Props) {
  return (
    <div className="group relative">
      {children}
      <div className="invisible group-hover:visible absolute px-1 py-0.5 text-[8pt] text-white bg-[#666666] rounded-sm ml-[calc(-100%)] mt-[calc(5px)] whitespace-nowrap">
        {text}
      </div>
    </div>
  )
}

export function LabelToolTip ({ children, text }: Props) {
  return (
    <div className="group relative w-fit">
      {children}
      <div className="absolute left-[100%] top-0">
        <div
          className="invisible shadow-lg hidden bg-[#333] text-white font-semibold px-3 py-[6px] text-[13px] mx-auto w-max -top-3 rounded min-h-10 min-w-10
          group-hover:visible group-hover:block absolute left-4 whitespace-normal max-w-[250px] h-auto z-50
          before:w-4 before:h-4 before:rotate-45 before:bg-[#333] before:absolute before:top-3 before:-left-2 before:mx-auto"
        >
          {text}
        </div>
      </div>
    </div>
  )
}
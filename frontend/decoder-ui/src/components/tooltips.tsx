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
      <div className="invisible group-hover:visible absolute px-1 py-0.5 text-[8pt] text-white bg-[#666666] rounded-sm sm:left-[calc(-100%)] sm:whitespace-nowrap left-[calc(-50%)]">
        {text}
      </div>
    </div>
  )
}

export function LabelToolTip ({ children, text }: Props) {
  return (
    <div className="group relative w-fit">
      {children}
      <div className="absolute left-[100%] top-0 w-fit">
        <div
          className="invisible shadow-lg hidden bg-[#333] text-white font-light px-3 py-[6px] text-[13px] mx-auto -top-3 rounded min-w-10 text-wrap
          group-hover:visible group-hover:block absolute left-4 whitespace-normal h-auto z-50 min-[370px]:w-[170px] sm:w-[180px] w-[150px]
          before:w-4 before:h-4 before:rotate-45 before:bg-[#333] before:absolute before:top-3 before:-left-2 before:mx-auto"
        >
          {text}
        </div>
      </div>
    </div>
  )
}

export function ScoreToolTip ({ children, text }: Props) {
  return (
    <div className="group relative w-fit h-fit">
      {children}
      <div className="absolute -left-[28px] bottom-6">
        <div
          className="invisible shadow-lg hidden bg-[#333] text-white font-semibold px-3 py-[6px] text-[13px] mx-auto w-max rounded min-h-10 min-w-10 text-balance
          group-hover:visible group-hover:block absolute whitespace-normal max-w-[200px] h-auto z-50 bottom-0
          before:w-4 before:h-4 before:rotate-45 before:bg-[#333] before:absolute before:-bottom-2 before:left-[50%] before:mx-auto"
        >
          {text}
        </div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { ClientImage } from './client-image'
import { LinkRef } from './link-ref'
import gencipher from '../../../public/gencipher.png'
import githubSVG from '../../../public/github-svgrepo-com.svg'
import aboutSVG from '../../../public/web-svgrepo-com.svg'


export function CustomHeader() {
    return (
        <header className="mx-4 w-full h-fit bg-white border-b-[1px] border-b-[#eaecf0]">
          <div className="mx-4 p-4 flex items-center justify-between">
            <div className="flex flex-row justify-between items-center space-x-2">
              <div className="h-9 w-9">
                <ClientImage imageComponent={gencipher} description={'gencipher logo'}/>
              </div>
              <span className="font-custom text-[#261c28] text-[30px] font-bold justify-between items-center tracking-widest">
                Gencipher
              </span>
            </div>
            <nav className="font-semibold mx-3 text-[12pt] flex flex-row space-x-4">
              <LinkRef linkText="GitHub" reference="#" imageComponent={githubSVG} description='GitHub logo'/>
              <LinkRef linkText="About me" reference="#" imageComponent={aboutSVG} description='About logo'/>
            </nav>
          </div>
        </header>
    )
}


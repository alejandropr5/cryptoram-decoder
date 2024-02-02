'use client'

import React from 'react'
import { ClientImage } from './client-image'
import { LinkRef } from './link-ref'
import gencipher from '../../../public/gencipher.png'
import githubSVG from '../../../public/github-svgrepo-com.svg'
import aboutSVG from '../../../public/web-svgrepo-com.svg'

export function CustomHeader() {
    return (
        <header className="mx-4 w-full h-[74px] bg-white border-b-[1px] border-b-[#eaecf0] sticky top-0 z-50">
          <div className="mx-4 p-4 flex items-center justify-between">
            <div className="flex flex-row justify-between items-center space-x-2">
              <div className="h-9 w-9">
                <ClientImage imageComponent={gencipher} description={'gencipher logo'}/>
              </div>
              <span className="text-[#261c28] text-[28px] font-bold justify-between items-center tracking-widest">
                Gencipher
              </span>
            </div>
            <nav className="font-semibold mx-3 text-[12pt] flex flex-row space-x-4">
              <LinkRef linkText="GitHub" reference="https://github.com/alejandropr5/gencipher-page" imageComponent={githubSVG} description='GitHub logo'/>
              <LinkRef linkText="Author" reference="" imageComponent={aboutSVG} description='About logo'/>
            </nav>
          </div>
        </header>
    )
}


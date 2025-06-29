'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="container items-center justify-center text-white" data-theme="dark">
      <div className="mb-8 z-10 relative flex items-center justify-center rounded-xl overflow-hidden">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && (
            <RichText
              className="mb-6 absolute w-full mx-auto text-center"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="select-none">
          {media && typeof media === 'object' && <Media priority resource={media} />}
        </div>
      </div>
    </div>
  )
}

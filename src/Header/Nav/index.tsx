'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const container = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      gsap.fromTo(container.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 })
    },
    { scope: container },
  )

  return (
    <nav ref={container} className="flex flex-col gap-3 items-start my-16 max-w-[80%] m-auto">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="text-4xl md:text-8xl" />
      })}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}

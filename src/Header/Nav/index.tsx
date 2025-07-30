'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex flex-col gap-3 items-start my-16 max-w-[80%] m-auto">
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

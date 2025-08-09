import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import Logo from 'public/logo-white.svg'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border text-primary">
      <div className="container py-8 gap-8 flex flex-col items-center md:flex-row md:justify-between">
        <Link href="/">
          <Logo className="w-full max-w-52 h-auto" />
        </Link>
        <p>Website by Chris Farrelly</p>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          {/* <ThemeSelector /> */}
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white text-center md:text-left" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}

'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Logo from '@/../public/logo-white.svg'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // close menu on page load

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-8 flex justify-between">
          <Link href="/" className="mr-8">
            <Logo className="w-full max-w-52 h-auto" />
          </Link>
          <button onClick={toggleMenu}>
            <Menu size={32} />
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="absolute bg-background h-full w-full z-40">
          <button onClick={toggleMenu} className="absolute top-10 right-4">
            <X size={32} />
          </button>
          <HeaderNav data={data} />
        </div>
      )}
    </>
  )
}

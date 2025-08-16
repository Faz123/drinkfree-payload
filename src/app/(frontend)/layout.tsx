import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Questrial, Crimson_Pro } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'
import { TransitionProvider } from '@/components/TransitionProvider'
import GoogleAnalytics from '@/components/GoogleAnalytics'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import CookieBanner from '@/components/CookieBanner'

const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-questrial',
})

const crimson = Crimson_Pro({
  weight: ['200', '300', '400'],
  subsets: ['latin'],
  variable: '--font-crimson-pro',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(crimson.variable, questrial.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <GoogleAnalytics GA_MEASUREMENT_ID={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}` || ''} />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <NextTopLoader color="#fff" />
          <Header />
          <TransitionProvider>{children}</TransitionProvider>
          <CookieBanner />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

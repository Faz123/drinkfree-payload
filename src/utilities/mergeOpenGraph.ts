import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'A website about moving away from alcohol to a sober life',
  images: [
    {
      url: `${getServerSideURL()}/website-og.png`,
    },
  ],
  siteName: 'Drink Free',
  title: 'Drink Free - A Sober Life',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

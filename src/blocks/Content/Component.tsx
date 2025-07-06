import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  console.log(props)

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, isCard, cardImage } = col

            if (isCard)
              return (
                <div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
                  })}
                  key={index}
                >
                  {cardImage && typeof cardImage === 'object' ? (
                    <div className="h-48 lg:h-64 w-full overflow-hidden rounded-xl ">
                      <Media
                        resource={cardImage}
                        size="medium"
                        imgClassName="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={cn(`border border-solid border-red-600 rounded px-4`)}>
                      <p className="text-red-600">Add an image!!!</p>
                    </div>
                  )}
                  {/* Add the card content */}
                  <div className="cardContent">
                    <div className="py-4">
                      {richText && <RichText data={richText} enableGutter={false} />}
                    </div>

                    {enableLink && <CMSLink {...link} />}
                  </div>
                </div>
              )
            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}

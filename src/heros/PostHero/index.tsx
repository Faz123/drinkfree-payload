import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import SocialLinks from '@/components/SocialLinks'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, heroText } = post

  const AuthorData = populatedAuthors?.[0]
  // If MediaType is not defined, remove the type assertion
  const AuthorImage = AuthorData?.avatar as MediaType

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <>
      <div className="relative flex items-center j rounded-xl overflow-hidden">
        <div className="z-10 relative text-white p-9 max-w-5xl">
          <h1 className="mb-6 text-4xl lg:text-8xl">{title}</h1>
          {heroText && <p className="text-white text-lg lg:text-2xl">{heroText}</p>}
        </div>
        <div className="min-h-[344px] md:min-h-[544px] select-none">
          {heroImage && typeof heroImage !== 'string' && (
            <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
          )}
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full bg-black bg-opacity-25"></div>
        </div>
      </div>
      <header className="max-w-5xl pt-8 pb-8 flex">
        <div className="flex">
          {AuthorImage && (
            <Media
              resource={AuthorImage.sizes?.square as MediaType}
              imgClassName="max-w-[100px] md:max-w-[125px] rounded-full "
            />
          )}

          <div className="flex flex-col justify-start mx-4 ">
            {AuthorData?.name && (
              <p>
                Written By: <br />
                <span className="font-serif italic md:text-2xl">{AuthorData?.name}</span>
              </p>
            )}

            <p className="font-light text-sm mb-2">Sober Since Feb 2023</p>
            <div className="flex flex-row gap-2">
              <SocialLinks bluesky={AuthorData?.bluesky} instagram={AuthorData?.instagram} />
            </div>
          </div>
        </div>

        <div className="mx-4">
          <p>
            Published: <br />
            <span className="font-serif italic md:text-2xl">
              {publishedAt ? formatDateTime(publishedAt) : 'Unknown'}
            </span>
          </p>
        </div>
      </header>
    </>
  )
}

'use client'
import { useDocumentInfo } from '@payloadcms/ui'
import React from 'react'

const ViewButton: React.FC = () => {
  // if the collection has a frontend slug I'll map to it using the below piece of code
  const contentSlugMap = {
    posts: 'posts/',
    pages: null,
  }

  const { hasPublishedDoc, initialData, collectionSlug } = useDocumentInfo()
  const docSlug = initialData?.slug
  //   dealing with type safety
  const contentSlug =
    collectionSlug && contentSlugMap.hasOwnProperty(collectionSlug)
      ? contentSlugMap[collectionSlug as keyof typeof contentSlugMap]
      : null

  //   putting the pieces together
  const liveLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/${contentSlug}${docSlug}`

  // only return a view link in the editor if the doc is published
  return hasPublishedDoc ? (
    <a href={liveLink} target="_blank" className="btn inline-flex">
      View the post
    </a>
  ) : null
}

export default ViewButton

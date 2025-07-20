import Bluesky from '@/../public/icons/social/bluesky.svg'
import Instagram from '@/../public/icons/social/instagram.svg'
import React from 'react'

interface SocialLinkProps {
  bluesky?: string | null
  instagram?: string | null
}

const SocialLinks: React.FC<SocialLinkProps> = ({ bluesky, instagram }) => {
  return (
    <>
      {bluesky && (
        <a
          href={`https://bsky.app/profile/${bluesky}`}
          target="_blank"
          className="w-5"
          aria-label="Bluesky profile link"
        >
          <Bluesky className="w-full h-auto" />
        </a>
      )}

      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          className="w-5 h-auto"
          aria-label="Instagram link"
        >
          <Instagram />
        </a>
      )}
    </>
  )
}

export default SocialLinks

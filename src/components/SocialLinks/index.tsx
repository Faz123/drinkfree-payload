import Bluesky from '@/../public/icons/social/bluesky.svg'
import Instagram from '@/../public/icons/social/instagram.svg'
import Strava from '@/../public/icons/social/strava.svg'
import React from 'react'

interface SocialLinkProps {
  bluesky?: string | null
  instagram?: string | null
  strava?: string | null
}

const SocialLinks: React.FC<SocialLinkProps> = ({ bluesky, instagram, strava }) => {
  return (
    <>
      {bluesky && (
        <a
          href={`https://bsky.app/profile/${bluesky}`}
          target="_blank"
          className="w-5"
          aria-label="Bluesky profile link"
        >
          <Bluesky />
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
      {strava && (
        <a
          href={`https://www.strava.com/athletes/${strava}`}
          target="_blank"
          className="w-5 h-auto"
          aria-label="Strava link"
        >
          <Strava />
        </a>
      )}
    </>
  )
}

export default SocialLinks

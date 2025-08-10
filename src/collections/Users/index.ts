import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'bluesky',
      type: 'text',
      label: 'Bluesky',
      admin: {
        description: 'Your Bluesky handle, without the @ symbol',
      },
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram',
      admin: {
        description: 'Your Instagram handle, without the @ symbol',
      },
    },
    {
      name: 'strava',
      type: 'text',
      label: 'Strava',
      admin: {
        description: 'Your Strava athlete ID',
      },
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Author Image',
      admin: {
        description: 'Author image to be used in blog posts and other content',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

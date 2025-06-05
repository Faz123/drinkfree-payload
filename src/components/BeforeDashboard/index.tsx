import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'

import './index.scss'

export async function getUserData() {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })
  return user
}

const BeforeDashboard: React.FC = async () => {
  const user = await getUserData()
  const loggedInUsername = user?.name ?? user?.email ?? ''

  return (
    <div>
      <Banner type="success">
        <h4>Welcome to your dashboard {loggedInUsername}! </h4>
      </Banner>
    </div>
  )
}

export default BeforeDashboard

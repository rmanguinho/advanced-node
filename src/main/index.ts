import './config/module-alias'
import { env } from '@/main/config/env'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)

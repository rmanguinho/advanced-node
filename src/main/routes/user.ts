import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeDeletePictureController } from '@/main/factories/application/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(makeDeletePictureController()))
}

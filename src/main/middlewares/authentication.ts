import { adaptExpressMiddleware } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/application/middlewares'

export const auth = adaptExpressMiddleware(makeAuthenticationMiddleware())

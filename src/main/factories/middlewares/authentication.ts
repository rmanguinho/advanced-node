import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeJwtTokenHandler } from '@/main/factories/gateways'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtTokenHandler()
  return new AuthenticationMiddleware(jwt.validate.bind(jwt))
}

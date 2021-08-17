import { env } from '@/main/config/env'
import { JwtTokenHandler } from '@/infra/gateways'

export const makeJwtTokenHandler = (): JwtTokenHandler => {
  return new JwtTokenHandler(env.jwtSecret)
}

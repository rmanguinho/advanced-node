import { JwtTokenHandler } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeJwtTokenHandler = (): JwtTokenHandler => {
  return new JwtTokenHandler(env.jwtSecret)
}

import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'

import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  constructor (private readonly secret: string) {}

  async generateToken ({ expirationInMs, key }: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }

  async validateToken ({ token }: TokenValidator.Params): Promise<TokenValidator.Result> {
    const payload = verify(token, this.secret) as JwtPayload
    return payload.key
  }
}

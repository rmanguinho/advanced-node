import { mock, MockProxy } from 'jest-mock-extended'

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<TokenValidator.Result>
}

export namespace TokenValidator {
  export type Params = { token: string }
  export type Result = string
}

type Setup = (crypto: TokenValidator) => Authorize
type Input = { token: string }
type Output = string
type Authorize = (params: Input) => Promise<Output>

const setupAuthorize: Setup = crypto => async params => {
  return crypto.validateToken(params)
}

describe('Authorize', () => {
  let crypto: MockProxy<TokenValidator>
  let sut: Authorize
  let token: string

  beforeAll(() => {
    token = 'any_token'
    crypto = mock()
    crypto.validateToken.mockResolvedValue('any_value')
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('should call TokenValidator with correct params', async () => {
    await sut({ token })

    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })

  it('should return the correct accessToken', async () => {
    const userId = await sut({ token })

    expect(userId).toBe('any_value')
  })
})

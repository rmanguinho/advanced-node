import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAADn7ZCAAep0BAC1nu5NtvNtzEHt5lUbZC8RSpOjp1dmZArJdHWStRfIhGG5OTPXLz1dZCPs3lADAghqhrruZB2NVX2cXm1ZCNMDITH75F6HYdcmuzp84oWwo1O7ZC84AvBuHzEDxPivsc0fYWupGoyDwfCZAWPUd3MedFp4AADpQUUHQq4TTXVeK6pktPicTxhdi114NScAzwRN5vnrGqmK' })

    expect(fbUser).toEqual({
      facebookId: '728079287908964',
      email: 'mango_saczvlo_teste@tfbnw.net',
      name: 'Mango Teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})

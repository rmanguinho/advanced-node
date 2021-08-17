import { AxiosHttpClient } from '@/infra/gateways'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

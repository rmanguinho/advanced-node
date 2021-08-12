import { HttpGetClient } from '@/infra/gateways'

import axios from 'axios'

type Input = HttpGetClient.Input

export class AxiosHttpClient implements HttpGetClient {
  async get ({ url, params }: Input): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}

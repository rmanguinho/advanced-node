import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

type Params = HttpGetClient.Params

export class AxiosHttpClient implements HttpGetClient {
  async get ({ url, params }: Params): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}

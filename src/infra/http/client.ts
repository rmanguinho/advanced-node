export interface HttpGetClient {
  get: <T = any> (params: HttpGetClient.Params) => Promise<T>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}

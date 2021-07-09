export interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

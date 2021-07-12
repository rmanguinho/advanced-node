export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Params) => Promise<void>
}

export namespace TokenGenerator {
  export type Params = {
    key: string
  }
}

export interface LoadUserAccount {
  load: (input: LoadUserAccount.Input) => Promise<LoadUserAccount.Output>
}

export namespace LoadUserAccount {
  export type Input = { email: string }
  export type Output = undefined | {
    id: string
    name?: string
  }
}

export interface SaveFacebookAccount {
  saveWithFacebook: (input: SaveFacebookAccount.Input) => Promise<SaveFacebookAccount.Output>
}

export namespace SaveFacebookAccount {
  export type Input = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
  export type Output = { id: string }
}

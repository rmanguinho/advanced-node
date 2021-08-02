export interface LoadUserAccountRepository {
  load: (input: LoadUserAccountRepository.Input) => Promise<LoadUserAccountRepository.Output>
}

export namespace LoadUserAccountRepository {
  export type Input = { email: string }
  export type Output = undefined | {
    id: string
    name?: string
  }
}

export interface SaveFacebookAccountRepository {
  saveWithFacebook: (input: SaveFacebookAccountRepository.Input) => Promise<SaveFacebookAccountRepository.Output>
}

export namespace SaveFacebookAccountRepository {
  export type Input = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
  export type Output = { id: string }
}

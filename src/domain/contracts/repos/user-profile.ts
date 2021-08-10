export interface SaveUserPicture {
  savePicture: (input: SaveUserPicture.Input) => Promise<void>
}

export namespace SaveUserPicture {
  export type Input = { pictureUrl?: string }
}

export interface LoadUserProfile {
  load: (input: LoadUserProfile.Input) => Promise<void>
}

export namespace LoadUserProfile {
  export type Input = { id: string }
}

export interface SaveUserPicture {
  savePicture: (input: SaveUserPicture.Input) => Promise<void>
}

export namespace SaveUserPicture {
  export type Input = { pictureUrl?: string }
}

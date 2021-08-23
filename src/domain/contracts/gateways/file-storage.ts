export interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<UploadFile.Output>
}

export namespace UploadFile {
  export type Input = { file: Buffer, fileName: string }
  export type Output = string
}

export interface DeleteFile {
  delete: (input: DeleteFile.Input) => Promise<void>
}

export namespace DeleteFile {
  export type Input = { fileName: string }
}

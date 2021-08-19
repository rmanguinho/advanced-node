import { MaxFileSizeError } from '@/application/errors'

export class MaxFileSize {
  constructor (
    private readonly maxSizeInMb: number,
    private readonly value: Buffer
  ) {}

  validate (): Error | undefined {
    const maxFileSizeInBytes = 5 * 1024 * 1024
    if (this.value.length > maxFileSizeInBytes) return new MaxFileSizeError(this.maxSizeInMb)
  }
}

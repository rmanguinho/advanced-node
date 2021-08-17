import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse } from '@/application/helpers'

type HttpRequest = { file: { buffer: Buffer, mimeType: string } }
type Model = Error

class SavePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    if (file === undefined || file === null) return badRequest(new RequiredFieldError('file'))
    if (file.buffer.length === 0) return badRequest(new RequiredFieldError('file'))
    return badRequest(new InvalidMymeTypeError(['png', 'jpeg']))
  }
}

class InvalidMymeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported type. Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMymeTypeError'
  }
}

describe('SavePictureController', () => {
  let buffer: Buffer
  let mimeType: string
  let sut: SavePictureController

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
  })

  beforeEach(() => {
    sut = new SavePictureController()
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: null as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is empty', async () => {
    const httpResponse = await sut.handle({ file: { buffer: Buffer.from(''), mimeType } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file type is invalid', async () => {
    const httpResponse = await sut.handle({ file: { buffer, mimeType: 'invalid_type' } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new InvalidMymeTypeError(['png', 'jpeg'])
    })
  })
})

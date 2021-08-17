import { ChangeProfilePicture } from '@/domain/use-cases'

type HttpRequest = { userId: string }

class DeletePictureController {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ userId }: HttpRequest): Promise<void> {
    await this.changeProfilePicture({ id: userId })
  }
}

describe('DeletePictureController', () => {
  let changeProfilePicture: jest.Mock
  let sut: DeletePictureController

  beforeAll(() => {
    changeProfilePicture = jest.fn()
  })

  beforeEach(() => {
    sut = new DeletePictureController(changeProfilePicture)
  })

  it('should call ChangeProfilePicture with correct input', async () => {
    await sut.handle({ userId: 'any_user_id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: 'any_user_id' })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })
})

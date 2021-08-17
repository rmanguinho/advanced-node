import { ChangeProfilePicture } from '@/domain/use-cases'

type HttpRequest = { userId: string }

class DeletePictureController {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ userId }: HttpRequest): Promise<void> {
    await this.changeProfilePicture({ id: userId })
  }
}

describe('DeletePictureController', () => {
  it('should call ChangeProfilePicture with correct input', async () => {
    const changeProfilePicture = jest.fn()
    const sut = new DeletePictureController(changeProfilePicture)

    await sut.handle({ userId: 'any_user_id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: 'any_user_id' })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })
})

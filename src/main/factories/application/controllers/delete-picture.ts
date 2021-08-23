import { makeChangeProfilePicture } from '@/main/factories/domain/use-cases'
import { DeletePictureController } from '@/application/controllers'

export const makeDeletePictureController = (): DeletePictureController => {
  return new DeletePictureController(makeChangeProfilePicture())
}

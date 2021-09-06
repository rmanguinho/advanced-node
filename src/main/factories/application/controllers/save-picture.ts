import { makeChangeProfilePicture } from '@/main/factories/domain/use-cases'
import { SavePictureController, Controller } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/application/decorators'

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture())
  return makePgTransactionController(controller)
}

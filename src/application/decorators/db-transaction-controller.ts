import { DbTransaction } from '@/application/contracts'
import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

export class DbTransactionController extends Controller {
  constructor (
    private readonly decoratee: Controller,
    private readonly db: DbTransaction
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    await this.db.openTransaction()
    try {
      const httpResponse = await this.decoratee.handle(httpRequest)
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        await this.db.commit()
      } else {
        await this.db.rollback()
      }

      return httpResponse
    } catch (error) {
      await this.db.rollback()
      throw error
    } finally {
      await this.db.closeTransaction()
    }
  }
}

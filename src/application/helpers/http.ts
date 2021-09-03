import { ForbiddenError, ServerError, UnauthorizedError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const forbidden = (): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError()
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})

import { ServerError } from '@/application/errors'
import { adaptMulter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { mocked } from 'ts-jest/utils'
import multer from 'multer'

jest.mock('multer')

describe('MulterAdapter', () => {
  let uploadSpy: jest.Mock
  let singleSpy: jest.Mock
  let multerSpy: jest.Mock
  let fakeMulter: jest.Mocked<typeof multer>
  let req: Request
  let res: Response
  let next: NextFunction
  let sut: RequestHandler

  beforeAll(() => {
    uploadSpy = jest.fn().mockImplementation((req, res, next) => {
      req.file = { buffer: Buffer.from('any_buffer'), mimetype: 'any_type' }
      next()
    })
    singleSpy = jest.fn().mockImplementation(() => uploadSpy)
    multerSpy = jest.fn().mockImplementation(() => ({ single: singleSpy }))
    fakeMulter = multer as jest.Mocked<typeof multer>
    mocked(fakeMulter).mockImplementation(multerSpy)
    res = getMockRes().res
    next = getMockRes().next
  })

  beforeEach(() => {
    req = getMockReq({ locals: { anyLocals: 'any_locals' } })
    sut = adaptMulter
  })

  it('should call single upload with correct input', () => {
    sut(req, res, next)

    expect(multerSpy).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(singleSpy).toHaveBeenCalledWith('picture')
    expect(singleSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if upload fails', () => {
    const error = new Error('multer_error')
    uploadSpy.mockImplementationOnce((req, res, next) => {
      next(error)
    })

    sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: new ServerError(error).message })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should not add file to req.locals', () => {
    uploadSpy.mockImplementationOnce((req, res, next) => {
      next()
    })

    sut(req, res, next)

    expect(req.locals).toEqual({ anyLocals: 'any_locals' })
  })

  it('should add file to req.locals', () => {
    sut(req, res, next)

    expect(req.locals).toEqual({
      anyLocals: 'any_locals',
      file: {
        buffer: req.file?.buffer,
        mimeType: req.file?.mimetype
      }
    })
  })

  it('should call next on success', () => {
    sut(req, res, next)

    expect(next).toHaveBeenCalledWith()
    expect(next).toHaveBeenCalledTimes(1)
  })
})

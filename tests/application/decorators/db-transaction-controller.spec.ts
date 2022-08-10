import { DbTransaction } from '@/application/contracts'
import { Controller } from '@/application/controllers'
import { DbTransactionController } from '@/application/decorators'
import { RequiredString } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DbTransactionController', () => {
  let db: MockProxy<DbTransaction>
  let decoratee: MockProxy<Controller>
  let sut: DbTransactionController

  beforeAll(() => {
    db = mock()
    decoratee = mock()
    decoratee.perform.mockResolvedValue({ statusCode: 204, data: null })
    decoratee.buildValidators.mockReturnValue([new RequiredString('any_value')])
  })

  beforeEach(() => {
    sut = new DbTransactionController(decoratee, db)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should open transaction', async () => {
    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })

  it('should execute decoratee perform', async () => {
    await sut.perform({ any: 'any' })

    expect(decoratee.perform).toHaveBeenCalledWith({ any: 'any' })
    expect(decoratee.perform).toHaveBeenCalledTimes(1)
  })

  test('should execute decoratee validation', () => {
    const validators = sut.buildValidators({ any: 'any' })

    expect(decoratee.buildValidators).toHaveBeenCalledWith({ any: 'any' })
    expect(decoratee.buildValidators).toHaveBeenCalledTimes(1)
    expect(validators).toEqual([new RequiredString('any_value')])
  })

  it('should call commit and close transaction on success', async () => {
    await sut.perform({ any: 'any' })

    expect(db.commit).toHaveBeenCalledWith()
    expect(db.commit).toHaveBeenCalledTimes(1)
    expect(db.rollback).not.toHaveBeenCalled()
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('should call rollback and close transaction on failure', async () => {
    decoratee.perform.mockRejectedValueOnce(new Error('decoratee_error'))

    sut.perform({ any: 'any' }).catch(() => {
      expect(db.commit).not.toHaveBeenCalled()
      expect(db.rollback).toHaveBeenCalledWith()
      expect(db.rollback).toHaveBeenCalledTimes(1)
      expect(db.closeTransaction).toHaveBeenCalledWith()
      expect(db.closeTransaction).toHaveBeenCalledTimes(1)
    })
  })

  it('should return same result as decoratee on success', async () => {
    const httpResponse = await sut.perform({ any: 'any' })

    expect(httpResponse).toEqual({ statusCode: 204, data: null })
  })

  it('should rethrow if decoratee throws', async () => {
    const error = new Error('decoratee_error')
    decoratee.perform.mockRejectedValueOnce(error)

    const promise = sut.perform({ any: 'any' })

    await expect(promise).rejects.toThrow(error)
  })
})

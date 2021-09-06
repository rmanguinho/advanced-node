import { PgUser } from '@/infra/repos/postgres/entities'
import { PgConnection, ConnectionNotFoundError, TransactionNotFoundError } from '@/infra/repos/postgres/helpers'

import { mocked } from 'ts-jest/utils'
import { createConnection, getConnection, getConnectionManager, getRepository } from 'typeorm'

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionManager: jest.fn(),
  getRepository: jest.fn()
}))

describe('PgConnection', () => {
  let getConnectionManagerSpy: jest.Mock
  let createQueryRunnerSpy: jest.Mock
  let createConnectionSpy: jest.Mock
  let getConnectionSpy: jest.Mock
  let hasSpy: jest.Mock
  let closeSpy: jest.Mock
  let startTransactionSpy: jest.Mock
  let releaseSpy: jest.Mock
  let commitTransactionSpy: jest.Mock
  let rollbackTransactionSpy: jest.Mock
  let getRepositorySpy: jest.Mock
  let sut: PgConnection

  beforeAll(() => {
    hasSpy = jest.fn().mockReturnValue(true)
    getConnectionManagerSpy = jest.fn().mockReturnValue({
      has: hasSpy
    })
    startTransactionSpy = jest.fn()
    commitTransactionSpy = jest.fn()
    rollbackTransactionSpy = jest.fn()
    releaseSpy = jest.fn()
    getRepositorySpy = jest.fn().mockReturnValue('any_repo')
    createQueryRunnerSpy = jest.fn().mockReturnValue({
      startTransaction: startTransactionSpy,
      commitTransaction: commitTransactionSpy,
      rollbackTransaction: rollbackTransactionSpy,
      release: releaseSpy,
      manager: { getRepository: getRepositorySpy }
    })
    createConnectionSpy = jest.fn().mockResolvedValue({
      createQueryRunner: createQueryRunnerSpy
    })
    closeSpy = jest.fn()
    getConnectionSpy = jest.fn().mockReturnValue({
      createQueryRunner: createQueryRunnerSpy,
      close: closeSpy
    })
    mocked(createConnection).mockImplementation(createConnectionSpy)
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    mocked(getConnection).mockImplementation(getConnectionSpy)
    mocked(getRepository).mockImplementation(getRepositorySpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  it('should have only one instance', () => {
    const sut2 = PgConnection.getInstance()

    expect(sut).toBe(sut2)
  })

  it('should create a new connection', async () => {
    hasSpy.mockReturnValueOnce(false)

    await sut.connect()

    expect(createConnectionSpy).toHaveBeenCalledWith()
    expect(createConnectionSpy).toHaveBeenCalledTimes(1)
  })

  it('should use an existing connection', async () => {
    await sut.connect()

    expect(getConnectionSpy).toHaveBeenCalledWith()
    expect(getConnectionSpy).toHaveBeenCalledTimes(1)
  })

  it('should close connection', async () => {
    await sut.connect()
    await sut.disconnect()

    expect(closeSpy).toHaveBeenCalledWith()
    expect(closeSpy).toHaveBeenCalledTimes(1)
  })

  it('should return ConnectionNotFoundError on disconnect if connection is not found', async () => {
    const promise = sut.disconnect()

    expect(closeSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new ConnectionNotFoundError())
  })

  it('should open transaction', async () => {
    await sut.connect()
    await sut.openTransaction()

    expect(startTransactionSpy).toHaveBeenCalledWith()
    expect(startTransactionSpy).toHaveBeenCalledTimes(1)
    expect(createQueryRunnerSpy).toHaveBeenCalledWith()
    expect(createQueryRunnerSpy).toHaveBeenCalledTimes(1)

    await sut.disconnect()
  })

  it('should return ConnectionNotFoundError on openTransaction if connection is not found', async () => {
    const promise = sut.openTransaction()

    expect(startTransactionSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new ConnectionNotFoundError())
  })

  it('should close transaction', async () => {
    await sut.connect()
    await sut.openTransaction()
    await sut.closeTransaction()

    expect(releaseSpy).toHaveBeenCalledWith()
    expect(releaseSpy).toHaveBeenCalledTimes(1)

    await sut.disconnect()
  })

  it('should return TransactionNotFoundError on closeTransaction if queryRunner is not found', async () => {
    const promise = sut.closeTransaction()

    expect(releaseSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new TransactionNotFoundError())
  })

  it('should commit transaction', async () => {
    await sut.connect()
    await sut.openTransaction()
    await sut.commit()

    expect(commitTransactionSpy).toHaveBeenCalledWith()
    expect(commitTransactionSpy).toHaveBeenCalledTimes(1)

    await sut.disconnect()
  })

  it('should return TransactionNotFoundError on commit if queryRunner is not found', async () => {
    const promise = sut.commit()

    expect(commitTransactionSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new TransactionNotFoundError())
  })

  it('should rollback transaction', async () => {
    await sut.connect()
    await sut.openTransaction()
    await sut.rollback()

    expect(rollbackTransactionSpy).toHaveBeenCalledWith()
    expect(rollbackTransactionSpy).toHaveBeenCalledTimes(1)

    await sut.disconnect()
  })

  it('should return TransactionNotFoundError on rollback if queryRunner is not found', async () => {
    const promise = sut.rollback()

    expect(rollbackTransactionSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new TransactionNotFoundError())
  })

  it('should get repository from queryRunner', async () => {
    await sut.connect()
    await sut.openTransaction()
    const repository = sut.getRepository(PgUser)

    expect(getRepositorySpy).toHaveBeenCalledWith(PgUser)
    expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    expect(repository).toBe('any_repo')

    await sut.disconnect()
  })

  it('should get repository', async () => {
    await sut.connect()
    const repository = sut.getRepository(PgUser)

    expect(getRepositorySpy).toHaveBeenCalledWith(PgUser)
    expect(getRepositorySpy).toHaveBeenCalledTimes(1)
    expect(repository).toBe('any_repo')

    await sut.disconnect()
  })

  it('should return ConnectionNotFoundError on getRepository if connection is not found', async () => {
    expect(getRepositorySpy).not.toHaveBeenCalled()
    expect(() => sut.getRepository(PgUser)).toThrow(new ConnectionNotFoundError())
  })
})

export class ConnectionNotFoundError extends Error {
  constructor () {
    super('No connection was found')
    this.name = 'ConnectionNotFoundError'
  }
}

export class TransactionNotFoundError extends Error {
  constructor () {
    super('No transaction was found')
    this.name = 'TransactionNotFoundError'
  }
}

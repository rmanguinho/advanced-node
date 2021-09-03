export interface DbTransaction {
  openTransaction: () => Promise<void>
  closeTransaction: () => Promise<void>
  commit: () => Promise<void>
  rollback: () => Promise<void>
}

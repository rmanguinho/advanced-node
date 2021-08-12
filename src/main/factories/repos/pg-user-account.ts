import { PgUserAccountRepository } from '@/infra/repos/postgres'

export const makePgUserAccountRepo = (): PgUserAccountRepository => {
  return new PgUserAccountRepository()
}

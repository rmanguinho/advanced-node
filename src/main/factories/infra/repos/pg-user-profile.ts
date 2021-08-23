import { PgUserProfileRepository } from '@/infra/repos/postgres'

export const makePgUserProfileRepo = (): PgUserProfileRepository => {
  return new PgUserProfileRepository()
}

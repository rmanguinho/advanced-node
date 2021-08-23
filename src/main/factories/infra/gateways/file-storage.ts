import { env } from '@/main/config/env'
import { AwsS3FileStorage } from '@/infra/gateways'

export const makeAwsS3FileStorage = (): AwsS3FileStorage => {
  return new AwsS3FileStorage(
    env.s3.accessKey,
    env.s3.secret,
    env.s3.bucket
  )
}

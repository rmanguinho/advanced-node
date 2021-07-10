import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository,
    private readonly createFacebookAccountRepo: CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccountRepo.load({ email: fbData.email })
      await this.createFacebookAccountRepo.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}

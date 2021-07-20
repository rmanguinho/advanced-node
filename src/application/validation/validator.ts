export interface Validator {
  validate: () => Error | undefined
}

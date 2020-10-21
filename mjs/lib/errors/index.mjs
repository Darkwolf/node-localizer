import Error from './Error.mjs'
import LocaleNotFoundError from './LocaleNotFoundError.mjs'

export {
  Error,
  LocaleNotFoundError
}

export default class Errors {
  static Error = Error
  static LocaleNotFoundError = LocaleNotFoundError
}

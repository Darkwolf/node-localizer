import Error from './Error.mjs'

export default class LocaleNotFoundError extends Error {
  static name = 'LocaleNotFoundError'
  static code = 'locale-not-found'

  constructor(language, path) {
    super(`Locale for language '${language}' not found: '${path}'.`, LocaleNotFoundError.code)
    this.setName(LocaleNotFoundError.name)
  }
}

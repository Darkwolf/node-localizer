const Error = require('./Error')

class LocaleNotFoundError extends Error {
  constructor(language, path) {
    super(`Locale not found: '${language}.${path}'.`, LocaleNotFoundError.code)
    this.setName(LocaleNotFoundError.name)
  }
}
LocaleNotFoundError.name = 'LocaleNotFoundError'
LocaleNotFoundError.code = 'locale-not-found'

module.exports = LocaleNotFoundError

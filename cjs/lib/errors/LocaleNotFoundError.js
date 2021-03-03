const Error = require('./Error')

class LocaleNotFoundError extends Error {
  constructor(language, path) {
    super(`Locale for language '${language}' not found: '${path}'.`, LocaleNotFoundError.code)
    this.setName(LocaleNotFoundError.name)
  }
}
LocaleNotFoundError.name = 'LocaleNotFoundError'
LocaleNotFoundError.code = 'locale-not-found'

module.exports = LocaleNotFoundError

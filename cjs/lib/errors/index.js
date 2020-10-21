const Error = require('./Error')
const LocaleNotFoundError = require('./LocaleNotFoundError')

class Errors {}
Errors.Error = Error
Errors.LocaleNotFoundError = LocaleNotFoundError

module.exports = Errors

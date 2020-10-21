const CustomError = require('@darkwolf/custom-error.cjs')

class LocalizerError extends CustomError {
  constructor(message, code) {
    super(message, code)
    this.setName(LocalizerError.name)
  }
}
LocalizerError.name = 'LocalizerError'

module.exports = LocalizerError

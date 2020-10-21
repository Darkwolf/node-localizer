import CustomError from '@darkwolf/custom-error.mjs'

export default class LocalizerError extends CustomError {
  static name = 'LocalizerError'

  constructor(message, code) {
    super(message, code)
    this.setName(LocalizerError.name)
  }
}

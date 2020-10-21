const Helper = require('@darkwolf/helper.cjs')
const errors = require('./errors')
const constants = require('./constants')
const {
  Error,
  LocaleNotFoundError
} = errors
const {
  Language
} = constants

class Localizer {
  constructor(locales, options = {}) {
    this
      .setLocales(locales)
      .setLanguage(options.language)
      .setFallbacks(options.fallbacks)
  }

  setLocales(locales) {
    this.locales = locales || {}
    return this
  }

  setLanguage(language) {
    this.language = language || Localizer.language
    return this
  }

  setFallbacks(fallbacks) {
    this.fallbacks = fallbacks || Localizer.fallbacks
    return this
  }

  withLanguage(language) {
    return new Localizer(this.locales, {
      language,
      fallbacks: this.fallbacks
    })
  }

  setLocale(language, path, value) {
    Helper.set(this.locales, `${language}.${path}`, value)
    return this
  }

  locale(language, path) {
    return Helper.get(this.locales, `${language}.${path}`)
  }

  localize(path, options = {}) {
    const language = options.language || this.language
    try {
      const locale = this.locale(language, path)
      if (Helper.exists(locale)) {
        return Helper.isString(locale) ? Helper.template(locale, options.props || {}, {
          normalize: options.normalize
        }) : locale
      } else {
        throw new LocaleNotFoundError(language, path)
      }
    } catch (e) {
      if (e instanceof LocaleNotFoundError) {
        const fallback = this.fallbacks[language]
        if (fallback) {
          return this.localize(path, {
            ...options,
            language: fallback
          })
        }
      }
      throw e
    }
  }
}
Localizer.language = Language.EN
Localizer.fallbacks = {
  [Language.AR]: Language.EN,
  [Language.BE]: Language.RU,
  [Language.DE]: Language.EN,
  [Language.EN_GB]: Language.EN,
  [Language.EN_US]: Language.EN,
  [Language.ES]: Language.EN,
  [Language.ES_MX]: Language.ES,
  [Language.FI]: Language.EN,
  [Language.FR]: Language.EN,
  [Language.IT]: Language.EN,
  [Language.JA]: Language.EN,
  [Language.KK]: Language.RU,
  [Language.KO]: Language.EN,
  [Language.NL]: Language.EN,
  [Language.PL]: Language.EN,
  [Language.PT]: Language.EN,
  [Language.PT_BR]: Language.PT,
  [Language.RU]: Language.EN,
  [Language.SV]: Language.EN,
  [Language.UK]: Language.RU,
  [Language.ZH_CN]: Language.EN,
  [Language.ZH_TW]: Language.EN
}
Localizer.errors = errors
Localizer.Error = Error
Localizer.LocaleNotFoundError = LocaleNotFoundError
Localizer.constants = constants
Localizer.Language = Language

module.exports = Localizer

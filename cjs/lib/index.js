const Helper = require('@darkwolf/helper.cjs')
const errors = require('./errors')
const constants = require('./constants')
const {
  Error,
  LocaleNotFoundError
} = errors
const {
  Language,
  PluralType,
  PluralCategory
} = constants

class Localizer {
  constructor(locales, options = {}) {
    this
      .setLocales(locales)
      .setLanguage(options.language)
      .setUseFallbacks(options.useFallbacks)
      .setIgnoreErrors(options.ignoreErrors)
      .setIgnoreNotExistsProps(options.ignoreNotExistsProps)
      .setFallbacks(options.fallbacks)
  }

  setLocales(locales = {}) {
    this.locales = locales
    return this
  }

  setLanguage(language = Localizer.language) {
    this.language = language
    return this
  }

  setUseFallbacks(boolean) {
    this.useFallbacks = Helper.isBoolean(boolean) ? boolean : Localizer.useFallbacks
    return this
  }

  setIgnoreErrors(boolean) {
    this.ignoreErrors = Helper.isBoolean(boolean) ? boolean : Localizer.ignoreErrors
    return this
  }

  setIgnoreNotExistsProps(boolean) {
    this.ignoreNotExistsProps = Helper.isBoolean(boolean) ? boolean : Localizer.ignoreNotExistsProps
    return this
  }

  setFallbacks(fallbacks = Localizer.fallbacks) {
    this.fallbacks = fallbacks
    return this
  }

  getLocale(language, path, defaultValue) {
    return Helper.get(this.locales, [language, ...Helper.toPath(path)], defaultValue)
  }

  setLocale(language, path, value) {
    Helper.set(this.locales, [language, ...Helper.toPath(path)], value)
    return this
  }

  deleteLocale(language, path) {
    return Helper.delete(this.locales, [language, ...Helper.toPath(path)])
  }

  hasLocale(language, path) {
    return Helper.has(this.locales, [language, ...Helper.toPath(path)])
  }

  localize(path, options = {}) {
    const useFallbacks = Helper.isBoolean(options.useFallbacks) ? options.useFallbacks : this.useFallbacks
    const ignoreErrors = Helper.isBoolean(options.ignoreErrors) ? options.ignoreErrors : this.ignoreErrors
    const ignoreNotExistsProps = Helper.isBoolean(options.ignoreNotExistsProps) ? options.ignoreNotExistsProps : this.ignoreNotExistsProps
    let language = options.language || this.language
    let locale = this.getLocale(language, path)
    if (!Helper.exists(locale) && useFallbacks) {
      for (let i = 0; i < Object.keys(this.fallbacks).length; i++) {
        const fallback = this.fallbacks[language]
        if (fallback) {
          locale = this.getLocale(fallback, path)
          if (Helper.exists(locale)) {
            break
          } else {
            language = fallback
          }
        } else {
          break
        }
      }
    }
    if (Helper.exists(locale)) {
      return Helper.isString(locale) ? Helper.template(locale, options.props, {
        ignoreNotExists: ignoreNotExistsProps
      }) : locale
    } else if (ignoreErrors) {
      return options.defaultValue
    }
    throw new LocaleNotFoundError(language, path)
  }

  pluralRules(options = {}) {
    return Localizer.pluralRules({
      ...options,
      language: options.language || this.language
    })
  }

  pluralCategory(number, options) {
    return this.pluralRules(options).select(number)
  }

  withLanguage(language) {
    return this.clone().setLanguage(language)
  }

  clone() {
    return new Localizer(this.locales, this)
  }
}
Localizer.language = Language.EN
Localizer.useFallbacks = true
Localizer.ignoreErrors = false
Localizer.ignoreNotExistsProps = true
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
Localizer.PluralType = PluralType
Localizer.PluralCategory = PluralCategory
Localizer.pluralRules = (options = {}) => {
  if (!Localizer.pluralRules.cache) {
    Localizer.pluralRules.cache = {}
  }
  const language = options.language || Localizer.language
  const params = {}
  if (options.type) {
    params.type = options.type
  }
  if (Helper.exists(options.minIntegerDigits)) {
    params.minIntegerDigits = options.minIntegerDigits
  }
  if (Helper.exists(options.minFractionDigits)) {
    params.minFractionDigits = options.minFractionDigits
  }
  if (Helper.exists(options.maxFractionDigits)) {
    params.maxFractionDigits = options.maxFractionDigits
  }
  if (Helper.exists(options.minSignificantDigits)) {
    params.minSignificantDigits = options.minSignificantDigits
  }
  if (Helper.exists(options.maxSignificantDigits)) {
    params.maxSignificantDigits = options.maxSignificantDigits
  }
  const paramsString = Object.keys(params).sort().map(key => `${key}:${params[key]}`).join()
  const cacheKey = `${language}${paramsString ? `+${paramsString}` : ''}`
  if (!Localizer.pluralRules.cache[cacheKey]) {
    Localizer.pluralRules.cache[cacheKey] = new Intl.PluralRules(language, {
      type: params.type,
      minimumIntegerDigits: params.minIntegerDigits,
      minimumFractionDigits: params.minFractionDigits,
      maximumFractionDigits: params.maxFractionDigits,
      minimumSignificantDigits: params.minSignificantDigits,
      maximumSignificantDigits: params.maxSignificantDigits
    })
  }
  return Localizer.pluralRules.cache[cacheKey]
}
Localizer.pluralCategory = (number, options) => Localizer.pluralRules(options).select(number)

module.exports = Localizer

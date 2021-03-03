import Helper from '@darkwolf/helper.mjs'
import errors, {
  Error,
  LocaleNotFoundError
} from './errors/index.mjs'
import constants, {
  Language,
  PluralType,
  PluralCategory
} from './constants/index.mjs'

export {
  errors,
  Error,
  LocaleNotFoundError,
  constants,
  Language,
  PluralType,
  PluralCategory
}

export default class Localizer {
  static language = Language.EN
  static useFallbacks = true
  static ignoreErrors = false
  static ignoreNotExistsProps = true
  static fallbacks = {
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
  static errors = errors
  static Error = Error
  static LocaleNotFoundError = LocaleNotFoundError
  static constants = constants
  static Language = Language
  static PluralType = PluralType
  static PluralCategory = PluralCategory

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

  locale(language, path, defaultValue) {
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
    let locale = this.locale(language, path)
    if (!Helper.exists(locale) && useFallbacks) {
      for (let i = 0; i < Object.keys(this.fallbacks).length; i++) {
        const fallback = this.fallbacks[language]
        if (fallback) {
          locale = this.locale(fallback, path)
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

  plural(number, options = {}) {
    return new Intl.PluralRules(options.language || this.language, {
      minimumIntegerDigits: options.minIntegerDigits,
      minimumFractionDigits: options.minFractionDigits,
      maximumFractionDigits: options.maxFractionDigits,
      minimumSignificantDigits: options.minSignificantDigits,
      maximumSignificantDigits: options.maxSignificantDigits,
      ...options
    }).select(number)
  }

  withLanguage(language) {
    return this.clone().setLanguage(language)
  }

  clone() {
    return new Localizer(this.locales, this)
  }
}

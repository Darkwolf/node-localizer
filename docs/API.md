[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[CustomError]: https://github.com/Darkwolf/node-custom-error/blob/main/docs/API.md

# API
### class: Localizer
#### `static` Localizer.language
* returns: <[string][string]> Defaults to `'en'`.

#### `static` Localizer.fallbacks
* returns: <[Object][Object]>
  * `ar` <[string][string]> Defaults to `'en'`.
  * `be` <[string][string]> Defaults to `'ru'`.
  * `de` <[string][string]> Defaults to `'en'`.
  * `en-GB` <[string][string]> Defaults to `'en'`.
  * `en-US` <[string][string]> Defaults to `'en'`.
  * `es` <[string][string]> Defaults to `'en'`.
  * `es-MX` <[string][string]> Defaults to `'es'`.
  * `fi` <[string][string]> Defaults to `'en'`.
  * `fr` <[string][string]> Defaults to `'en'`.
  * `it` <[string][string]> Defaults to `'en'`.
  * `ja` <[string][string]> Defaults to `'en'`.
  * `kk` <[string][string]> Defaults to `'ru'`.
  * `ko` <[string][string]> Defaults to `'en'`.
  * `nl` <[string][string]> Defaults to `'en'`.
  * `pl` <[string][string]> Defaults to `'en'`.
  * `pt` <[string][string]> Defaults to `'en'`.
  * `pt-BR` <[string][string]> Defaults to `'pt'`.
  * `ru` <[string][string]> Defaults to `'en'`.
  * `sv` <[string][string]> Defaults to `'en'`.
  * `uk` <[string][string]> Defaults to `'ru'`.
  * `zh-CN` <[string][string]> Defaults to `'en'`.
  * `zh-TW` <[string][string]> Defaults to `'en'`.

#### `static` Localizer.errors
* returns: <[Errors](#class-errors)>

#### `static` Localizer.Error
* returns: <[LocalizerError](#class-localizererror)>

#### `static` Localizer.LocaleNotFoundError
* returns: <[LocaleNotFoundError](#class-localenotfounderror)>

#### `static` Localizer.constants
* returns: <[Constants](#class-constants)>

#### `static` Localizer.Language
* returns: <[Language](#class-language)>

#### `init` new Localizer([locales[, options]])
* `locales` <[Object][Object]>
* `options` <[Object][Object]>
  * `language` <[string][string]> Defaults to `'en'`.
  * `fallbacks` <[Object][Object]>
* returns: <[Localizer](#class-localizer)>

#### localizer.setLocales(locales)
* `locales` <[Object][Object]>
* returns: <[this](#class-localizer)>

#### localizer.setLanguage(language)
* `language` <[string][string]> Defaults to `'en'`.
* returns: <[this](#class-localizer)>

#### localizer.setFallbacks(fallbacks)
* `fallbacks` <[Object][Object]>
* returns: <[this](#class-localizer)>

#### localizer.withLanguage(language)
* `language` <[string][string]> Defaults to `'en'`.
* returns: <[Localizer](#class-localizer)>

#### localizer.setLocale(language, path, value)
* `language` <[string][string]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will set the last argument of the array, then `'[-2]'` will set the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be set.
* `value` <[any][Object]>
* returns: <[this](#class-localizer)>

#### localizer.locale(language, path)
* `language` <[string][string]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will return the last argument of the array, then `'[-2]'` will return the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be returned.
* returns: <[any][Object]>

#### localizer.localize(path[, options])
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will return the last argument of the array, then `'[-2]'` will return the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be returned.
* `options` <[Object][Object]>
  * `language` <?[string][string]>
  * `props` <?[Object][Object]<[any][Object]>>
  * `normalize` <?[boolean][boolean]> If `true`, then the property is `undefined` or `null` will be replaced with `''`. Defaults to `true`.
* returns: <[any][Object]>

### class: Errors
#### `static` Errors.Error
* returns: <[LocalizerError](#class-localizererror)>

#### `static` Errors.LocaleNotFoundError
* returns: <[LocaleNotFoundError](#class-localenotfounderror)>

### class: LocalizerError
* extends: <[CustomError][CustomError]>

#### `static` LocalizerError.name
* returns: <[string][string]> Defaults to `'LocalizerError'`.

### class: LocaleNotFoundError
* extends: <[LocalizerError](#class-localizererror)>

#### `static` LocaleNotFoundError.name
* returns: <[string][string]> Defaults to `'LocaleNotFoundError'`.

#### `static` LocaleNotFoundError.code
* returns: <[string][string]> Defaults to `'locale-not-found'`.

### class: Constants
#### `static` Constants.Language
* returns: <[Language](#class-language)>

### class: Language
#### `static` Language.AR
* returns: <[string][string]> Arabic language code. Defaults to `'ar'`.

#### `static` Language.BE
* returns: <[string][string]> Belarusian language code. Defaults to `'be'`.

#### `static` Language.DE
* returns: <[string][string]> German language code. Defaults to `'de'`.

#### `static` Language.EN
* returns: <[string][string]> English language code. Defaults to `'en'`.

#### `static` Language.EN_GB
* returns: <[string][string]> English (Great Britain) language code. Defaults to `'en-GB'`.

#### `static` Language.EN_US
* returns: <[string][string]> English (United States) language code. Defaults to `'en-US'`.

#### `static` Language.ES
* returns: <[string][string]> Spanish (Spain) language code. Defaults to `'es'`.

#### `static` Language.ES_MX
* returns: <[string][string]> Spanish (Mexico) language code. Defaults to `'es-MX'`.

#### `static` Language.FI
* returns: <[string][string]> Finnish language code. Defaults to `'fi'`.

#### `static` Language.FR
* returns: <[string][string]> French language code. Defaults to `'fr'`.

#### `static` Language.IT
* returns: <[string][string]> Italian language code. Defaults to `'it'`.

#### `static` Language.JA
* returns: <[string][string]> Japanese language code. Defaults to `'ja'`.

#### `static` Language.KK
* returns: <[string][string]> Kazakh language code. Defaults to `'kk'`.

#### `static` Language.KO
* returns: <[string][string]> Korean language code. Defaults to `'ko'`.

#### `static` Language.NL
* returns: <[string][string]> Dutch language code. Defaults to `'nl'`.

#### `static` Language.PL
* returns: <[string][string]> Polish language code. Defaults to `'pl'`.

#### `static` Language.PT
* returns: <[string][string]> Portuguese (Portugal) language code. Defaults to `'pt'`.

#### `static` Language.PT_BR
* returns: <[string][string]> Portuguese (Brazil) language code. Defaults to `'pt-BR'`.

#### `static` Language.RU
* returns: <[string][string]> Russian language code. Defaults to `'ru'`.

#### `static` Language.SV
* returns: <[string][string]> Swedish language code. Defaults to `'sv'`.

#### `static` Language.UK
* returns: <[string][string]> Ukrainian language code. Defaults to `'uk'`.

#### `static` Language.ZH_CN
* returns: <[string][string]> Chinese (China) language code. Defaults to `'zh-CH'`.

#### `static` Language.ZH_TW
* returns: <[string][string]> Chinese (Taiwan) language code. Defaults to `'zh-TW'`.

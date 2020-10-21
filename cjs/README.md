# Localizer
## Install
#### ECMAScript (Node.js v12.x LTS or higher)
`npm i --save @darkwolf/localizer.mjs`
#### CommonJS (Node.js v10.x LTS or higher)
`npm i --save @darkwolf/localizer.cjs`
## Using
```javascript
// ECMAScript
import Localizer, { Language } from '@darkwolf/localizer.mjs'

// CommonJS
const Localizer = require('@darkwolf/localizer.cjs')
const { Language } = Localizer

const localizer = new Localizer({
  [Language.EN]: {
    ave: {
      darkwolf: 'Ave, Darkwolf!',
      username: 'Ave, @{username}'
    },
    wfc: 'WFC: {wallet.balance}'
  },
  [Language.RU]: {
    ave: {
      darkwolf: 'Аве, Дарквольф!'
    }
  }
}, {language: Language.RU})
localizer.localize('ave.darkwolf') // => 'Аве, Дарквольф!'
localizer.localize('ave.username', {
  props: {
    username: 'PavelWolfDark'
  }
}) // => 'Ave, @PavelWolfDark!'
localizer.localize('wfc', {
  props: {
    wallet: {
      balance: '1.00000001'
    }
  }
}) // => 'WFC: 1.00000001'
```
## [API Documentation](https://github.com/Darkwolf/node-localizer/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)

# Tillhub JavaScript SDK [![CircleCI](https://circleci.com/gh/tillhub/tillhub-sdk-javascript/tree/master.svg?style=svg)](https://circleci.com/gh/tillhub/tillhub-sdk-javascript/tree/master) [![Greenkeeper badge](https://badges.greenkeeper.io/tillhub/tillhub-sdk-javascript.svg)](https://greenkeeper.io/)

## Usage

```bash
# Run npm install and write your library name when asked. That's all!
npm install @tillhub/javascript-sdk
```

## Features

## Importing library

You can import the generated bundle to use the whole library generated by this starter:

```javascript
import * as tillhub from '@tillhub/javascript-sdk'

// configure which API to use. E.g. you can also run staging and sandbox APIs
th.init({
  base: 'https://api.tillhub.com'
})

// use any authentication method that .auth provides
th.auth.loginUsername({ username: 'client_account@client.com', password: 'xxxxxxxxxxx' })

// or when already authenticated and rehydrating state you can immediately also hydrated an
// authenticated th client
th.init({
  base: 'https://api.tillhub.com',
  credentials: {
    token: window.localStorage.getItem('th-token')
  },
  user: window.localStorage.getItem('th-user-uuid')
})
```

Additionally, you can import the transpiled modules from `dist/lib` in case you have a modular library:

```javascript
import Auth from '@tillhub/javascript-sdk/dist/lib/Auth'
```


## Development

- `npm t`: Run test suite
- `npm start`: Run `npm run build` in watch mode
- `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `npm run test:prod`: Run linting and generate coverage
- `npm run build`: Generate bundles and typings, create docs
- `npm run lint`: Lints code
- `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

## Installation on mac

If you encounter an error installing the project on macOS, this section is for you.
Error: Cannot find module 'node-darwin-arm64/package.json'

Then nothing to worry, this happens when one try to install an x86_64 app on a arch64 system. There are a few solutions: 
* Duplicate your terminal app and force run it with rosetta (using get info button). And then you can run your x86_64 app.
* Also we can add an architecture to node, to add x86 use “arch -x86_64 [cmd]”. 
* Also note that node 16+ works natively on arm processor. 

Helpful links:  https://stackoverflow.com/a/67907214

### Utilities

**TODO:** The SDK will rely on inherited base handlers as utilities.

## LICENSE

Apache-2.0

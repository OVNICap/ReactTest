# ReactTest

This challenge is about making a basic user interface to present
asymmetric cryptography.

You will **only** edit the code in `src/app` directory and optionally
`package.json` if you want to install packages, but you should not
need it.

You can develop on your locale machine or right in GitPod:

https://gitpod.io/#https://github.com/OVNICap/ReactTest

The interface contains 4 `<textarea>` inputs:
- Pass phrase
- Message
- Encrypted message
- Decrypted message (read-only)

You are also provided 3 async functions that wrap `openpgp`
functions and avoid you to deal with cryptographic configuration,
ease testing and gives you handy shortcuts designed for this
test:

```ts
function generateKey(passPhrase: string): Promise<KeyPair>
function encrypt(message: string, publicKeyArmored: string): Promise<string>
function decrypt(encryptedMessage: string, privateArmoredKey: string, passPhrase?: string): Promise<string>
```

`KeyPair` contains the following:
```ts
privateKeyArmored: string;
publicKeyArmored: string;
```
Which gives the needed pair for
[asymmetric cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

You can find them in `src/lib` but you don't need to modify them.

## Your goal

Here are the expected behaviors for the interface we wish you to
develop:

- On `Pass phrase` value change, calls `await generateKey(passPhrase)`
  to generate a new key stored in the state of the `App` component.
- During the key generation (which is asynchronous), `Message` and
  `Encrypted message` inputs should be `disabled`.
- On `Message` value change, calls `await encrypt(message, publicKeyArmored)`
  to encrypt the message and dump the result into the next field (`Encrypted message`)
- On `Encrypted message` value change (rather it's a user input or indirect change
  due to `Message` value change), calls
  `await decrypt(encryptedMessage, privateArmoredKey, passPhrase)`
  - If decryption succeed, the result should be output in the next field
    (`Decrypted message`) and the `Decrypted message` field should also take
    the class `success` so it becomes green.
  - If decryption thrown an error, the `Decrypted message` field value should
    not change, but it should take the class `failure` so it becomes red.
  - During the decryption which is asynchronous the `Decrypted message` field
    should have no classes (neither `success` nor `failure`).

## Available Scripts

In the project directory, you can run:

### `yarn install` (or `npm install`)

First you'll need to install the project dependencies using yarn or
npm. (It will be ran automatically if using GitPod.)

### `yarn start` (or `npm run start`)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` (or `npm run test`)

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

If all the tests are passing, it means your interface meets the expectations.

## Submit your solution

When you're satisfied by your solution, zip the `src/app` folder
(with other files you modified if you did) and send it back to us
by e-mail.

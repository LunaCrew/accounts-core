import crypto from 'crypto'
import fs from 'fs'

export default class KeyPair {
  static readonly genKeyPair = () => {
    const keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    })

    fs.writeFileSync(__dirname + '/keys/public.pem', keyPair.publicKey)
    fs.writeFileSync(__dirname + '/keys/private.pem', keyPair.privateKey)
  }

  static readonly getPublicKey = () => {
    return fs.readFileSync(__dirname + '/keys/public.pem', 'utf8')
  }

  static readonly getPrivateKey = () => {
    return fs.readFileSync(__dirname + '/keys/private.pem', 'utf8')
  }

  static readonly deleteKeys = () => {
    fs.unlinkSync(__dirname + '/keys/public.pem')
    fs.unlinkSync(__dirname + '/keys/private.pem')
  }

  static readonly exists = () => {
    return fs.existsSync(__dirname + '/keys/public.pem') && fs.existsSync(__dirname + '/keys/private.pem')
  }
}

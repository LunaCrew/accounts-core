import jsonwebtoken from 'jsonwebtoken'
import KeyPair from './KeyPair'

export default class JWT {
  static readonly issueJWT = (userId: string) => {
    if (!KeyPair.exists()) KeyPair.genKeyPair()

    const privateKey = KeyPair.getPrivateKey()
    const payload = { 
      sub: userId,
      iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' })

    return {
      token: 'Bearer ' + signedToken,
      expiresIn: '1h'
    }
  }
}

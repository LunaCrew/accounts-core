export type User = {
  _id: string
  email: string
  name: string
  password: string
  createdAt: string
  updatedAt: string | null
  disabledAt: string | null
  isDisabled: boolean
  emailVerification: {
    verified: boolean
    token: string
    tokenExpiration: string
  }
  settings: {
    theme: string
    animations: boolean
    notificationType: string
    speechType: string
    mfa: boolean
    language: string
  }
}

export type UserParams = {
  id: string
  email: string
  forced: boolean
}

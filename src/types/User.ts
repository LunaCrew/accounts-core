export type User = {
  _id: string
  email: string
  name: string
  password: string
  createdAt: string
  updatedAt: string | null
  disabledAt: string | null
  isDisabled: boolean
  emailStatus: {
    validated: boolean
    validatedAt?: string
    token: string
    tokenExpiration: string
  }
  verificationData: {
    token: string,
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
  forced?: boolean
  isEmailValidation?: boolean
}

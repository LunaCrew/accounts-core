export type Validation = {
  updatedAt: string
  emailStatus?: {
    validated: boolean
    token: string
    tokenExpiration: string
  }
  verificationData?: {
    token: string
    tokenExpiration: string
  }
}

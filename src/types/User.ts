export type User = {
  _id: string
  email: string
  name: string
  password: string
  createdAt: string
  deletedAt: string | null
  settings: {
    theme: string
    animations: boolean
    notificationType: string
    speechType: string
    mfa: boolean
  }
}

export type UserParams = {
  id: string
  email: string
}

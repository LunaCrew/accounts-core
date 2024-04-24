export type User = {
  _id: string
  email: string
  username: string
  displayName: string
  password: string
  publicKey: string | null
  syncDeviceSettings: boolean
  createdAt: string
  deletedAt: string | null
  settings: {
    theme: string
    animations: boolean
    notificationType: string
    speechType: string
  }
  energy: {
    total: number | null
    dailyRecovery: number | null
  }
}

export type UserParams = {
  id: string
  email: string
  username: string
}

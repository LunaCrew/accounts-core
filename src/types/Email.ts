export type EmailInfo = {
  receiversEmail: string
  language: string
  receiverName?: string
  token?: string
}

export type EmailSituation = {
  accepted: number
  rejected: number
}

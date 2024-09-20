export type AccountsToDelete = [{
  _id: string
  email: string
  settings: {
    language: string
  }
}]

export type DeletedStatus = {
  deleted: number,
  emails: {
    sent: number,
    accepted: number,
    rejected: number
  }
}

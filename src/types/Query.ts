export type GeneralUserQuery = object | null | undefined

export type UpdateUserQuery = {
  filter: GeneralUserQuery,
  data: { $set: object }
} | undefined | null

export type SendEmailQuery = {
  filter: GeneralUserQuery,
  data: { $set: object },
  token: string
} | undefined | null

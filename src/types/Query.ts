export type GeneralUserQuery = object | null | undefined

export type UpdateUserQuery = { filter: GeneralUserQuery, data: { $set: object } | null } | undefined | null

export type VerifyEmailQuery = { filter: GeneralUserQuery, data: { set: { $set: object }, token: string} | null | undefined } | undefined | null

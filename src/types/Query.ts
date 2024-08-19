export type GeneralUserQuery = object | null | undefined

export type UpdateUserQuery = { filter: GeneralUserQuery, data: { $set: object } | null } | undefined | null

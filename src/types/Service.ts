export type UserService = object | null | undefined

export type UpdateUser = { filter: UserService, data: { $set: object } | null } | undefined | null

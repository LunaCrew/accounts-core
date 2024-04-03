// import { Request, Response } from 'express'
// import UserController from 'src/controller/UserController'

describe.skip(':: Controller :: UserController ::', () => {
  // const next = jest.fn()

  describe(':: CreateUser ::', () => {
    // const mockedUser = {
    //   id: '4768b952-3904-427c-a855-ebd729b81c85',
    //   displayName: 'Jane Doe',
    //   username: 'jane',
    //   email: 'jane@doe.com',
    //   password: 'Abcd123/*',
    //   settings: {
    //     theme: 'dark',
    //     animations: true,
    //     notificationType: 'silent',
    //     speechType: 'neutral'
    //   }
    // }

    beforeAll(() => {
      // jest.spyOn(UserController, 'createUser').mockResolvedValue(mockedUser as never)
    })

    afterAll(() => {
      jest.clearAllMocks()
    })

    it('should create a new user', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { body: mockedUser } as Request

      // UserController.createUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(201)
      // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      //   'acknowledged': true,
      //   'insertedId': '4768b952-3904-427c-a855-ebd729b81c85'
      // }))
    })

    it('should return an error when the user is invalid', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { body: { ...mockedUser, email: 'invalid' } } as Request

      // UserController.createUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(400)
      // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      //   error: expect.arrayContaining([
      //     expect.objectContaining({
      //       message: '"email" must be a valid email'
      //     })
      //   ])
      // }))
    })
  })

  describe(':: GetUser ::', () => {
    // const mockedUser = {
    //   id: '4768b952-3904-427c-a855-ebd729b81c85',
    //   displayName: 'Jane Doe',
    //   username: 'jane',
    //   email: 'jane@doe.com',
    //   password: 'Abcd123/*',
    //   settings: {
    //     theme: 'dark',
    //     animations: true,
    //     notificationType: 'silent',
    //     speechType: 'neutral'
    //   }
    // }

    beforeAll(() => {
      // jest.spyOn(UserController, 'getUser').mockResolvedValue(mockedUser as never)
    })

    afterAll(() => {
      jest.clearAllMocks()
    })

    it('should get a user by id', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { query: { id: mockedUser.id } } as unknown as Request

      // UserController.getUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(200)
      // expect(res.json).toHaveBeenCalledWith(mockedUser)
    })

    it('should get a user by email', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { query: { email: mockedUser.email } } as unknown as Request

      // UserController.getUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(200)
      // expect(res.json).toHaveBeenCalledWith(mockedUser)
    })

    it('should get a user by username', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { query: { username: mockedUser.username } } as unknown as Request

      // UserController.getUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(200)
      // expect(res.json).toHaveBeenCalledWith(mockedUser)
    })

    it('should return an error when the user is not found', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { query: { id: 'invalid' } } as unknown as Request

      // UserController.getUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(404)
      // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      //   error: expect.objectContaining({
      //     message: 'not found'
      //   })
      // }))
    })

    it('should return an error when the query is invalid', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { query: { id: 'invalid', email: 'invalid', username: 'invalid' } } as unknown as Request

      // UserController.getUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(400)
      // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      //   error: expect.arrayContaining([
      //     expect.objectContaining({
      //       message: 'id, email or username is required'
      //     })
      //   ])
      // }))
    })

    it('should return an error when the query is empty', () => {
      // const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
      // const req = { query: {} } as Request

      // UserController.getUser(req, res, next)

      // expect(res.status).toHaveBeenCalledWith(400)
      // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      //   error: expect.arrayContaining([
      //     expect.objectContaining({
      //       message: 'id, email or username is required'
      //     })
      //   ])
      // }))
    })
  })
})
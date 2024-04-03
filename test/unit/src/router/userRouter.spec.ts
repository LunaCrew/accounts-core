// import request from 'supertest'
// import express from 'express'
// import userRouter from 'src/router/userRouter'
// import UserController from 'src/controller/UserController'

describe.skip('userRouter', () => {
  beforeAll(() => {
    // const app = express()
    // app.use(express.json())
    // app.use(userRouter)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should call UserController.createUser when POST /api/user is called', async () => {
    // const createUserSpy = jest.spyOn(UserController, 'createUser')
    // const userData = { name: 'John Doe', email: 'john@example.com' }

    // await request(app)
    //   .post('/api/user')
    //   .send(userData)
    //   .expect(200)

    // expect(createUserSpy).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Function))
  })

  it('should call UserController.getUser when GET /api/user is called', async () => {
    // const getUserSpy = jest.spyOn(UserController, 'getUser')

    // await request(app)
    //   .get('/api/user')
    //   .expect(200)

    // expect(getUserSpy).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Function))
  })
})

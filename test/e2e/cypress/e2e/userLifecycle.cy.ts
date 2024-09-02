import { expect } from 'chai'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const name = 'John'
const email = process.env.TEST_USER_EMAIL ?? ''
const password = 'AAaa**12354'

let userId: string
let jwtToken: string
let emailValidationToken: string

afterEach(() => {
  cy.wait(500)
})

describe(':: User :: Lifecycle ::', () => {
  it('should create successfully', () => {
    const payload = {
      name: name,
      email: email,
      password: password,
      settings: {}
    }

    cy.request({
      method: 'POST',
      url: '/api/user',
      body: payload,
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('token')

      userId = response.body.id
      jwtToken = response.body.token
    })
  })

  it('should login the user', () => {
    const payload = {
      password: password
    }

    cy.request({
      method: 'POST',
      url: `/api/auth/login/${email}`,
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
    })
  })

  it('should get user by id', () => {
    cy.request({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      url: `/api/user?id=${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('_id').equals(userId)
      expect(response.body).to.have.property('name').equals('John')
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('settings').property('theme').equals('dark')
      expect(response.body).to.have.property('settings').property('animations').equals(true)
      expect(response.body).to.have.property('settings').property('notificationType').equals('default')
      expect(response.body).to.have.property('settings').property('speechType').equals('neutral')
      expect(response.body).to.have.property('settings').property('language').equals('en-us')
      expect(response.body).to.have.property('settings').property('mfa').equals(false)
      expect(response.body).to.have.property('createdAt')
      expect(response.body).to.have.property('isDisabled').equals(false)
      expect(response.body).to.have.property('emailStatus').property('validated').equals(false)
      expect(response.body).to.have.property('emailStatus').property('token')
      expect(response.body).to.have.property('emailStatus').property('tokenExpiration')

      emailValidationToken = response.body.emailStatus.token
    })
  })

  it('should get user by email', () => {
    cy.request({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      url: `/api/user?email=${email}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('_id').equals(userId)
      expect(response.body).to.have.property('name').equals('John')
      expect(response.body).to.have.property('settings').property('theme').equals('dark')
      expect(response.body).to.have.property('settings').property('animations').equals(true)
      expect(response.body).to.have.property('settings').property('notificationType').equals('default')
      expect(response.body).to.have.property('settings').property('speechType').equals('neutral')
      expect(response.body).to.have.property('settings').property('language').equals('en-us')
      expect(response.body).to.have.property('settings').property('mfa').equals(false)
      expect(response.body).to.have.property('createdAt')
      expect(response.body).to.have.property('isDisabled').equals(false)
      expect(response.body).to.have.property('emailStatus').property('validated').equals(false)
      expect(response.body).to.have.property('emailStatus').property('token')
      expect(response.body).to.have.property('emailStatus').property('tokenExpiration')
    })
  })

  it('should validate user email', () => {
    cy.request({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      url: `/api/auth/email/validate/${userId}/${emailValidationToken}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('emailStatus').property('validated').equals(true)
    })
  })

  it('should update user name', () => {
    const payload = {
      name: 'Jane'
    }

    cy.request({
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      url: `/api/user/${userId}`,
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name').equals('Jane')
      expect(response.body).to.have.property('updatedAt')
    })
  })

  it('should disable the user', () => {
    cy.request({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      url: `/api/user/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should delete the user', () => {
    cy.request({
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      url: `/api/user/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })
})

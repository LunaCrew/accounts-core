import { expect } from 'chai'
let userId: string
let token: string

describe('should create a new user', () => {
  it('passes', () => {
    const payload = {
      'name': 'John',
      'email': 'john@example.com',
      'password': 'AAaa**12354',
      'settings': {}
    }

    cy.request({
      method: 'POST',
      url: '/api/user',
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')

      userId = response.body.id
    })
  })
})

describe('should login the user', () => {
  it('passes', () => {
    const payload = {
      'password': 'AAaa**12354'
    }

    cy.request({
      method: 'POST',
      url: `/api/auth/login/${userId}`,
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')

      token = response.body.token
    })
  })
})

describe('should get a user', () => {
  it('should get user by id', () => {
    cy.request({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      url: `/api/user?id=${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('_id')
      expect(response.body).to.have.property('name').equals('John')
      expect(response.body).to.have.property('email').equals('john@example.com')
      expect(response.body).to.have.property('settings').property('theme').equals('dark')
      expect(response.body).to.have.property('settings').property('animations').equals(true)
      expect(response.body).to.have.property('settings').property('notificationType').equals('default')
      expect(response.body).to.have.property('settings').property('speechType').equals('neutral')
      expect(response.body).to.have.property('settings').property('mfa').equals(false)
      expect(response.body).to.have.property('createdAt')
      expect(response.body).to.have.property('isDisabled').equals(false)
      expect(response.body).to.have.property('emailVerification').property('verified').equals(false)
      expect(response.body).to.have.property('emailVerification').property('token')
      expect(response.body).to.have.property('emailVerification').property('tokenExpiration')
    })
  })
})

describe('should update a user', () => {
  it('passes', () => {
    const payload = {
      'name': 'Jane',
      'email': 'jane@example.com'
    }

    cy.request({
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      url: `/api/user/${userId}`,
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name').equals('Jane')
      expect(response.body).to.have.property('email').equals('jane@example.com')
      expect(response.body).to.have.property('updatedAt')
    })
  })
})

describe('should disable a user', () => {
  it('passes', () => {
    cy.request({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      url: `/api/user/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

describe('should delete a user', () => {
  it('passes', () => {
    cy.request({
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      url: `/api/user/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })
})

import rateLimit from 'express-rate-limit'
import RateLimiter from 'src/middleware/RateLimiter'

jest.mock('express-rate-limit')

describe('RateLimiter middleware', () => {
  it('should call express-rate-limit with the correct configuration', () => {
    expect(rateLimit).toHaveBeenCalledWith({
      windowMs: 60 * 1000 * 15,
      max: 100,
      message: 'Too many requests, please try again later.'
    })
  })

  it('should fail', () => {
    expect(RateLimiter.authenticated).toBeUndefined()
  })
})

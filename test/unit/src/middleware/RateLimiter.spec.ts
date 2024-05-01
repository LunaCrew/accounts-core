import rateLimit from 'express-rate-limit'
import rateLimiter from 'src/middleware/RateLimiter'

jest.mock('express-rate-limit')

describe('RateLimiter middleware', () => {
  it('should call express-rate-limit with the correct configuration', () => {
    rateLimiter
    expect(rateLimit).toHaveBeenCalledWith({
      windowMs: 60 * 1000 * 10,
      max: 10,
      message: 'Too many requests, please try again later.'
    })
  })
})

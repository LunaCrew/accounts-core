import rateLimit from 'express-rate-limit'

export default class RateLimiter {
  /**
   * Limit requests to 100 per 15 minutes
   */
  static readonly default = rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 100,
    message: 'Too many requests, please try again later.'
  })
}

import rateLimit from 'express-rate-limit'

const rateLimiter = rateLimit({
  windowMs: 60 * 1000 * 10,
  max: 10,
  message: 'Too many requests, please try again later.'
})

export default rateLimiter

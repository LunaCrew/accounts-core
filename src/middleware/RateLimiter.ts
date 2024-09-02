import rateLimit from 'express-rate-limit'

/**
 * @description IP rate-limiting middleware.
 * @method authenticated (100 requests in 15 min)
 * @method unauthenticated (10 requests in 1 hour)
 * @method default (5 requests in 10 min)
 */
export default class RateLimiter {
  private static readonly _message = 'Too many requests, please try again later.'
  private static readonly _minute = 60 * 1000
  private static readonly _10min = this._minute * 10
  private static readonly _15min = this._minute * 15
  private static readonly _1hour = this._minute * 60

  public static readonly authenticated = rateLimit({
    windowMs: this._15min,
    max: 100,
    message: this._message
  })

  public static readonly unauthenticated = rateLimit({
    windowMs: this._1hour,
    max: 10,
    message: this._message
  })

  public static readonly default = rateLimit({
    windowMs: this._10min,
    max: 5,
    message: this._message
  })
}

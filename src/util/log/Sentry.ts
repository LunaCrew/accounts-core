import * as sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const env = process.env.ENVIRONMENT ?? 'local'

sentry.init({
  enabled: env !== 'local',
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: env,
  ignoreErrors: [
    /E11000\\s+duplicate\\s+key\\s+error\\s+collection/, // MongoDB unique index conflict, already handled by express middleware
  ]
})

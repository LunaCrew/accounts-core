import * as sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const env = process.env.ENVIRONMENT ?? 'local'
const isEnabled = env !== 'local'

sentry.init({
  enabled: isEnabled,
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: env,
  ignoreErrors: [
    /^E11000 duplicate key error collection/, // MongoDB unique index conflict, already handled by express middleware
  ]
})

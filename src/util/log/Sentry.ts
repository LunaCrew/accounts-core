import * as sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

sentry.init({
  enabled: process.env.ENVIRONMENT !== 'local',
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: process.env.ENVIRONMENT ?? 'local',
})

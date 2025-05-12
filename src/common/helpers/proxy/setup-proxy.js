//import { ProxyAgent, setGlobalDispatcher } from 'undici'
//import { bootstrap } from 'global-agent'

import { createLogger } from '../logging/logger.js'
//import { config } from '../../../config.js'

const logger = createLogger()

/**
 * If HTTP_PROXY is set setupProxy() will enable it globally
 * for a number of http clients.
 * Node Fetch will still need to pass a ProxyAgent in on each call.
 */
export function setupProxy() {
  logger.info('Skipping setup of up global proxies')
}

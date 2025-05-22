import oracledb from 'oracledb'
import { config } from '../../config.js'

const oraclePegaDbConfig = config.get('oraclePEGADatabaseDetails')
const proxyConfig = config.get('httpProxy')
const proxyUrl = proxyConfig
  ? new URL(proxyConfig)
  : new URL('http://localhost:1234')

export const oraclePegaDB = {
  plugin: {
    name: 'oraclePegadb',
    version: '1.0.0',
    register: async function (server, options) {
      server.logger.info('Setting up OraclePegadb')

      try {
        await oracledb.createPool({
          user: options.oracleConfig.username,
          password: options.oracleConfig.password,
          connectString: `${options.oracleConfig.host}/${options.oracleConfig.dbname}`,
          httpsProxy: proxyUrl.hostname,
          httpsProxyPort: +proxyUrl.port,
          poolMax: options.oracleConfig.poolMax,
          poolMin: options.oracleConfig.poolMin,
          poolTimeout: options.oracleConfig.poolTimeout, // in seconds
          poolAlias: options.oracleConfig.poolAlias
        })
      } catch (err) {
        server.logger.error(err)
      }

      server.events.on('stop', async () => {
        server.logger.info('Closing Oracle PEGA Pool')
        try {
          await oracledb
            .getPool(options.oracleConfig.poolAlias)
            .close(options.oracleConfig.poolCloseWaitTime)
        } catch (err) {
          server.logger.info(err)
        }
      })
    }
  },
  options: {
    oracleConfig: oraclePegaDbConfig
  }
}

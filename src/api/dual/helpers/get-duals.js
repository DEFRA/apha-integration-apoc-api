import { createLogger } from '../../../common/helpers/logging/logger.js'

const logger = createLogger()

async function getDuals(oracledb) {
  let result
  let connection
  try {
    connection = await oracledb.getConnection()

    const results = await connection.execute(
      'SELECT :id FROM DUAL',
      ['Dual1'],
      {
        maxRows: 1
      }
    )
    result = results.rows
  } catch (err) {
    logger.warn('Oracle failed to get results:' + err)
  } finally {
    if (connection) {
      try {
        await connection.close() // always release the connection back to the pool
      } catch (err) {
        logger.warn('Oracle connection closed failed: ' + err)
      }
    }
  }
  return result
}

export { getDuals }

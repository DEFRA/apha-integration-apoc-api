import { createLogger } from '../../../common/helpers/logging/logger.js'

const logger = createLogger()

async function getDual(oracledb, dualID) {
  let result
  // dual is a reflect table, to simulate 404 I've hard coded these two ids.  When we use real queries, this is not required.
  if (dualID !== 'Dual1' && dualID !== 'Dual2') return result

  let connection
  try {
    connection = await oracledb.getConnection()

    const results = await connection.execute('SELECT :id FROM DUAL', [dualID], {
      maxRows: 1
    })
    result = results.rows[0]
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

export { getDual }

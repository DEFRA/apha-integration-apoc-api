import { createLogger } from '../common/helpers/logging/logger.js'

const logger = createLogger()

async function getUnits(oracledb, countyID, parishID, holdingId) {
  let result
  let connection
  try {
    logger.info(
      `Making oracledb request for ${countyID}/${parishID}/${holdingId}`
    )
    connection = await oracledb.getConnection()

    const results = await connection.execute(
      'Select * from ahbrp.v_cph_customer_unit where cph like',
      [`${countyID}/${parishID}/${holdingId}`],
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

export { getUnits }

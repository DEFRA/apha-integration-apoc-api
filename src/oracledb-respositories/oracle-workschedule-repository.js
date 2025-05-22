import { createLogger } from '../common/helpers/logging/logger.js'
import { config } from '../config.js'

const poolAlias = config.get('oraclePEGADatabaseDetails').poolAlias

const logger = createLogger()
const columnNames =
  ' pega_data.ahwork_ac.pxinsname,pega_data.ahwork_ac.region,pega_data.ahwork_ac.pysladeadline,pega_data.ahwork_ac.ukcountrycode,pega_data.ahwork_ac.contactid,pega_data.ahwork_ac.locationid,pega_data.ahwork_ac.pyid,pega_data.ahwork_ac.pydescription,pega_data.ahwork_ac.pxcoveredcountopen,pega_data.ahwork_ac.pxurgencywork,pega_data.ahview_assign_workbasket_ac.pylabel,pega_data.ahview_assign_workbasket_ac.workareacat,pega_data.ahview_assign_workbasket_ac.pxdeadlinetime,pega_data.ahview_assign_workbasket_ac.duedate,pega_data.ahview_assign_workbasket_ac.purposecountry,pega_data.ahview_assign_workbasket_ac.northing,pega_data.ahview_assign_workbasket_ac.easting,pega_data.ahview_assign_workbasket_ac.contactname,pega_data.ahview_assign_workbasket_ac.pxrefobjectkey,pega_data.ahview_assign_workbasket_ac.PXTASKLABEL,pega_data.ahview_assign_workbasket_ac.statuswork,pega_data.ahview_assign_workbasket_ac.cphid,pega_data.ahview_assign_workbasket_ac.entityid,pega_data.ahview_assign_workbasket_ac.pxdeadlinetime,pega_data.ahview_assign_workbasket_ac.pyassignmentstatus,pega_data.ahview_assign_workbasket_ac.pyinstructions,pega_data.ahview_assign_workbasket_ac.pxurgencyassign '

async function getWorkSchedules(oracledb) {
  let result
  let connection
  try {
    logger.info(`Making oracledb request for workschedules`)
    connection = await oracledb.getConnection(poolAlias)

    const results = await connection.execute(
      'Select ' +
        columnNames +
        " FROM pega_data.ahwork_ac INNER JOIN pega_data.ahview_assign_workbasket_ac ON pega_data.ahwork_ac.locationid = pega_data.ahview_assign_workbasket_ac.contactname WHERE pega_data.ahview_assign_workbasket_ac.statuswork = 'New' AND pega_data.ahwork_ac.pxapplication = 'AnimalHealth' AND pega_data.ahwork_ac.pydescription = 'Work Schedule - ' AND pega_data.ahwork_ac.ukcountrycode = 'SCOTLAND' AND pega_data.ahwork_ac.contactid IS NOT NULL AND pega_data.ahwork_ac.locationid IS NOT NULL AND ROWNUM < 11  order by  pega_data.ahview_assign_workbasket_ac.duedate desc ",
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        fetchTypeHandler: function (metaData) {
          // Tells the database to return column names in lowercase
          metaData.name = metaData.name.toLowerCase()
        }
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

export { getWorkSchedules }

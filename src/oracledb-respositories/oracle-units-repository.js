import { createLogger } from '../common/helpers/logging/logger.js'

const logger = createLogger()
const columnNames =
  'cph, location_id, feature_name, main_role_type, person_family_name, person_given_name, organisation_name, party_id, asset_id, asset_location_type, asset_type, animal_species_code, animal_group_id_mch_ext_ref, animal_group_id_mch_frm_dat, animal_group_id_mch_to_dat, animal_production_usage_code, asset_involvement_type, cph_type, herdmark, keeper_of_unit, property_number, postcode,owner_of_unit'

async function getUnits(oracledb, countyID, parishID, holdingId) {
  let result
  let connection
  try {
    logger.info(
      `Making oracledb request for ${countyID}/${parishID}/${holdingId}`
    )
    connection = await oracledb.getConnection()

    const results = await connection.execute(
      'Select ' +
        columnNames +
        ' from ahbrp.v_cph_customer_unit where cph like :cphid',
      [`${countyID}/${parishID}/${holdingId}`],
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

export { getUnits }

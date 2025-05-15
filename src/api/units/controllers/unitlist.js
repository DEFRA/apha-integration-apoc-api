import { getUnits } from '../../../oracledb-respositories/oracle-units-repository.js'
import { metricsCounter } from '../../../common/helpers/metrics.js'
import { transformRepositoryUnits } from '../transformers/unit.repository.transformer.js'
import oracledb from 'oracledb'

const unitListController = {
  handler: async (request, h) => {
    const countyId = request.params.countyId
    const parishId = request.params.parishId
    const holdingsId = request.params.holdingsId

    const respositoryResult = await getUnits(
      oracledb,
      countyId,
      parishId,
      holdingsId
    )
    const units = transformRepositoryUnits(respositoryResult)
    await metricsCounter('units-list')
    return h.response({ message: 'success', units }).code(200)
  }
}

export { unitListController }

import { getDuals } from '../helpers/get-duals.js'
import { metricsCounter } from '../../../common/helpers/metrics.js'
import oracledb from 'oracledb'

const dualListController = {
  handler: async (request, h) => {
    const duals = await getDuals(oracledb)
    await metricsCounter('duals-list')
    return h.response({ message: 'success', duals }).code(200)
  }
}

export { dualListController }

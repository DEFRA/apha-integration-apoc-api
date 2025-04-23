import { getDuals } from '../helpers/get-duals.js'
import { metricsCounter } from '../../../common/helpers/metrics.js'

const dualListController = {
  handler: async (request, h) => {
    const duals = await getDuals(request.db)
    await metricsCounter('duals-list')
    return h.response({ message: 'success', duals }).code(200)
  }
}

export { dualListController }

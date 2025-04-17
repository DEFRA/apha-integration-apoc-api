import { getDuals } from '../helpers/get-duals.js'
import { metricsCounter } from '../../../common/helpers/metrics.js'
import Joi from 'joi'

const dualListController = {
  options: {
    payload: {
      allow: ['application/json', 'application/*+json']
    },
    validate: {
      payload: Joi.object({}).unknown(true)
    }
  },
  handler: async (request, h) => {
    const duals = await getDuals(request.db)
    await metricsCounter('duals-list')
    return h.response({ message: 'success', duals }).code(200)
  }
}

export { dualListController }

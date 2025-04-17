import Joi from 'joi'
import Boom from '@hapi/boom'
import lodash, { isUndefined } from 'lodash'

import { getDual } from '../helpers/get-dual.js'

const { isNull } = lodash
const dualController = {
  options: {
    payload: {
      allow: ['application/json', 'application/*+json']
    },
    validate: {
      params: Joi.object({
        dualId: Joi.string().hex().length(24).required()
      })
    }
  },
  handler: async (request, h) => {
    const dual = await getDual(request.db, request.params.dualId)

    if (isNull(dual) || isUndefined(dual)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', dual }).code(200)
  }
}

export { dualController }

import Boom from '@hapi/boom'
import lodash from 'lodash'
import oracledb from 'oracledb'

import { getDual } from '../../../oracledb-respositories/oracle-dual-repository.js'

const { isNull } = lodash
const { isUndefined } = lodash
const authDualController = {
  handler: async (request, h) => {
    const dual = await getDual(oracledb, request.params.dualId)

    if (isNull(dual) || isUndefined(dual)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', dual }).code(200)
  }
}

export { authDualController }

import { getWorkSchedules } from '../../../oracledb-respositories/oracle-workschedule-repository.js'
import { metricsCounter } from '../../../common/helpers/metrics.js'
import { transformRepositoryWorkschedule } from '../transformers/workschedule.repository.transformer.js'
import oracledb from 'oracledb'

const workscheduleListController = {
  handler: async (request, h) => {
    const respositoryResult = await getWorkSchedules(oracledb)
    const workschedules = transformRepositoryWorkschedule(respositoryResult)
    await metricsCounter('workschedule-list')
    return h.response({ message: 'success', workschedules }).code(200)
  }
}

export { workscheduleListController }

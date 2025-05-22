import { workscheduleListController } from '../api/workschedule/controllers/workschedulelist.js'

const workschedule = [
  {
    method: 'GET',
    path: '/v1/workschedules',
    ...workscheduleListController
  }
]

export { workschedule }

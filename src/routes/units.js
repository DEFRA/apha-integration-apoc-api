import { unitListController } from '../api/units/controllers/index.js'

const units = [
  {
    method: 'GET',
    path: '/v1/holdings/{countyId}/{parishId}/{holdingsId}/units',
    ...unitListController
  }
]

export { units }

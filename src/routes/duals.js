import {
  dualListController,
  dualController
} from '../api/dual/controllers/index.js'

const duals = [
  {
    method: 'GET',
    path: '/api/dual',
    ...dualListController
  },
  {
    method: 'GET',
    path: '/api/dual/{dualId}',
    ...dualController
  }
]

export { duals }

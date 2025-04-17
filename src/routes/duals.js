import {
  dualListController,
  dualController
} from '../api/dual/controllers/index.js'

const duals = [
  {
    method: 'GET',
    path: '/dual',
    ...dualListController
  },
  {
    method: 'GET',
    path: '/dual/{dualId}',
    ...dualController
  }
]

export { duals }

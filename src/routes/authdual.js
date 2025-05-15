import {
  dualListController,
  dualController
} from '../api/authdual/controllers/index.js'

const authdual = [
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

export { authdual }

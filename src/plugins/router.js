import { health } from '../routes/health.js'
import { duals } from '../routes/duals.js'

const router = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route([health].concat(duals))
    }
  }
}

export { router }

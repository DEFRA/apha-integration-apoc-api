import { health } from '../routes/health.js'
import { duals } from '../routes/duals.js'
import { units } from '../routes/units.js'
import { workschedule } from '../routes/workschedule.js'

const router = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route([health].concat(duals).concat(units).concat(workschedule))
    }
  }
}

export { router }

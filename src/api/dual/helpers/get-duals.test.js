import { getDuals } from './get-duals.js'

describe('get-duals', () => {
  const mockdb = {}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return list of duals', async () => {
    const value = await getDuals(mockdb)

    expect(value).toEqual([{ dualID: 'Dual1' }, { dualID: 'Dual2' }])
  })
})

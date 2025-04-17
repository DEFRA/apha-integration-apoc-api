import { getDual } from './get-dual.js'

describe('get-dual', () => {
  const mockdb = {}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return Dual1', async () => {
    const value = await getDual(mockdb, 'Dual1')

    expect(value).toEqual({ dualID: 'Dual1' })
  })

  test('should return Dual2', async () => {
    const value = await getDual(mockdb, 'Dual2')

    expect(value).toEqual({ dualID: 'Dual2' })
  })

  test('should return empty when not found', async () => {
    const value = await getDual(mockdb, 'RandomID')

    expect(value).toBeUndefined()
  })
})

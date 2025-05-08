import { getDuals } from './get-duals.js'
import oracledb from 'oracledb'

jest.mock('oracledb', () => ({
  getConnection: jest.fn()
}))

describe('get-duals', () => {
  let mockExecute
  let mockClose

  beforeEach(() => {
    jest.clearAllMocks()
    mockClose = jest.fn().mockResolvedValue()
    jest.clearAllMocks()
  })

  test('should return list of duals', async () => {
    mockExecute = jest.fn().mockResolvedValue({ rows: [{ DUAL1: 'Dual1' }] })
    oracledb.getConnection.mockResolvedValue({
      execute: mockExecute,
      close: mockClose
    })

    const value = await getDuals(oracledb)

    expect(value).toEqual([{ DUAL1: 'Dual1' }])
  })
})

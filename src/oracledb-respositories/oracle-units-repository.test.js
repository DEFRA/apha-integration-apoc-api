import { getUnits } from './oracle-units-repository.js'
import oracledb from 'oracledb'

jest.mock('oracledb', () => ({
  getConnection: jest.fn()
}))

describe('get-units', () => {
  let mockExecute
  let mockClose

  beforeEach(() => {
    jest.clearAllMocks()
    mockClose = jest.fn().mockResolvedValue()
    jest.clearAllMocks()
  })

  test('should return list of units', async () => {
    mockExecute = jest.fn().mockResolvedValue({ rows: [{ UNITS: 'UNITS' }] })
    const mockConnect = oracledb.getConnection.mockResolvedValue({
      execute: mockExecute,
      close: mockClose
    })

    const value = await getUnits(oracledb, '42', '091', '0113')

    expect(value).toEqual([{ UNITS: 'UNITS' }])
    expect(mockConnect).toHaveBeenCalledWith('samPool')
  })
})

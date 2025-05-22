import { getWorkSchedules } from './oracle-workschedule-repository.js'
import oracledb from 'oracledb'

jest.mock('oracledb', () => ({
  getConnection: jest.fn()
}))

describe('get-workschedules', () => {
  let mockExecute
  let mockClose

  beforeEach(() => {
    jest.clearAllMocks()
    mockClose = jest.fn().mockResolvedValue()
    jest.clearAllMocks()
  })

  test('should return list of workschedules', async () => {
    mockExecute = jest
      .fn()
      .mockResolvedValue({ rows: [{ workschedules: 'WORKSCHEDULES' }] })
    const mockConnect = oracledb.getConnection.mockResolvedValue({
      execute: mockExecute,
      close: mockClose
    })

    const value = await getWorkSchedules(oracledb)

    expect(value).toEqual([{ workschedules: 'WORKSCHEDULES' }])
    expect(mockConnect).toHaveBeenCalledWith('pegaPool')
  })
})

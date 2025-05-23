import { getDual, getDuals } from './oracle-dual-repository.js'
import oracledb from 'oracledb'

jest.mock('oracledb', () => ({
  getConnection: jest.fn()
}))

describe('oracle-dual-repository', () => {
  describe('get-dual', () => {
    let mockExecute
    let mockClose

    beforeEach(() => {
      mockClose = jest.fn().mockResolvedValue()
      jest.clearAllMocks()
    })

    test('should return correct value via dual call', async () => {
      mockExecute = jest.fn().mockResolvedValue({ rows: [{ DUAL1: 'Dual1' }] })
      const mockConnect = oracledb.getConnection.mockResolvedValue({
        execute: mockExecute,
        close: mockClose
      })

      const value = await getDual(oracledb, 'Dual1')

      expect(value).toEqual({ DUAL1: 'Dual1' })
      expect(mockConnect).toHaveBeenCalledWith('samPool')
    })

    test('should return Dual2', async () => {
      const mockExecute = jest
        .fn()
        .mockResolvedValue({ rows: [{ DUAL2: 'Dual2' }] })
      const mockClose = jest.fn().mockResolvedValue()
      const mockConnect = oracledb.getConnection.mockResolvedValue({
        execute: mockExecute,
        close: mockClose
      })

      const value = await getDual(oracledb, 'Dual2')

      expect(value).toEqual({ DUAL2: 'Dual2' })
      expect(mockConnect).toHaveBeenCalledWith('samPool')
    })

    test('should return empty when not found', async () => {
      const value = await getDual(oracledb, 'RandomID')

      expect(value).toBeUndefined()
    })
  })

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
      const mockConnect = oracledb.getConnection.mockResolvedValue({
        execute: mockExecute,
        close: mockClose
      })

      const value = await getDuals(oracledb)

      expect(value).toEqual([{ DUAL1: 'Dual1' }])
      expect(mockConnect).toHaveBeenCalledWith('samPool')
    })
  })
})

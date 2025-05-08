import { getDual } from './get-dual.js'
import oracledb from 'oracledb'

jest.mock('oracledb', () => ({
  getConnection: jest.fn()
}))

describe('get-dual', () => {
  let mockExecute
  let mockClose

  beforeEach(() => {
    mockClose = jest.fn().mockResolvedValue()
    jest.clearAllMocks()
  })

  test('should return correct value throw dual call', async () => {
    mockExecute = jest.fn().mockResolvedValue({ rows: [{ DUAL1: 'Dual1' }] })
    oracledb.getConnection.mockResolvedValue({
      execute: mockExecute,
      close: mockClose
    })

    const value = await getDual(oracledb, 'Dual1')

    expect(value).toEqual({ DUAL1: 'Dual1' })
  })

  test('should return Dual2', async () => {
    const mockExecute = jest
      .fn()
      .mockResolvedValue({ rows: [{ DUAL2: 'Dual2' }] })
    const mockClose = jest.fn().mockResolvedValue()
    oracledb.getConnection.mockResolvedValue({
      execute: mockExecute,
      close: mockClose
    })

    const value = await getDual(oracledb, 'Dual2')

    expect(value).toEqual({ DUAL2: 'Dual2' })
  })

  test('should return empty when not found', async () => {
    const value = await getDual(oracledb, 'RandomID')

    expect(value).toBeUndefined()
  })
})

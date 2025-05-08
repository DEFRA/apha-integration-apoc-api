import { dualListController } from './list'

import { getDuals } from '../helpers/get-duals.js'

jest.mock('../helpers/get-duals.js')

describe('Dual list controller', () => {
  const mockDual = { DUALID: 'Dual1' }
  const mockRequest = {
    params: {},
    logger: {
      info: jest.fn(),
      error: jest.fn()
    }
  }

  const mockResponse = {
    code: jest.fn().mockReturnThis(),
    response: jest.fn().mockReturnThis()
  }

  const mockResponseData = {
    duals: [mockDual]
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockResponse.code.mockReturnThis()
    mockResponse.response.mockReturnThis()
  })

  test('should return dual list data on success', async () => {
    getDuals.mockResolvedValue([mockDual])

    await dualListController.handler(mockRequest, mockResponse)

    expect(mockResponse.response).toHaveBeenCalledWith({
      message: 'success',
      ...mockResponseData
    })

    expect(mockResponse.code).toHaveBeenCalledWith(200)
  })
})

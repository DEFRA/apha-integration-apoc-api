import { dualController } from './dual'
import Boom from '@hapi/boom'

describe('dual controller', () => {
  const mockDual = 'Dual1'
  const mockRequest = {
    params: { dualId: mockDual },
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
    dual: { dualID: mockDual }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockResponse.code.mockReturnThis()
    mockResponse.response.mockReturnThis()
  })

  test('should return dual data on success', async () => {
    await dualController.handler(mockRequest, mockResponse)

    expect(mockResponse.response).toHaveBeenCalledWith({
      message: 'success',
      ...mockResponseData
    })

    expect(mockResponse.code).toHaveBeenCalledWith(200)
  })

  test('should return 404 when not found', async () => {
    const failMockRequest = { ...mockRequest, params: { dualId: 'HAAAR' } }
    const value = await dualController.handler(failMockRequest, mockResponse)

    expect(value).toStrictEqual(Boom.boomify(Boom.notFound()))
  })
})

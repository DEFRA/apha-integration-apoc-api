import { workscheduleListController } from './workschedulelist.js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { getWorkSchedules } from '../../../oracledb-respositories/oracle-workschedule-repository.js'

jest.mock('../../../oracledb-respositories/oracle-workschedule-repository.js')

describe('Workschedule list controller', () => {
  let repositoryResult
  let expectedResult
  let mockResponseData
  let mockRequest
  let mockResponse

  beforeEach(() => {
    jest.clearAllMocks()

    repositoryResult = JSON.parse(
      readFileSync(resolve(__dirname, './fixtures/repository.result.json'))
    )
    expectedResult = JSON.parse(
      readFileSync(resolve(__dirname, './fixtures/mapped.result.json'))
    )

    mockRequest = {
      params: {},
      logger: {
        info: jest.fn(),
        error: jest.fn()
      }
    }

    mockResponseData = {
      workschedules: expectedResult
    }

    mockResponse = {
      code: jest.fn().mockReturnThis(),
      response: jest.fn().mockReturnThis()
    }

    mockResponse.code.mockReturnThis()
    mockResponse.response.mockReturnThis()
  })

  test('should return Unit list data on success', async () => {
    getWorkSchedules.mockResolvedValue(repositoryResult)

    await workscheduleListController.handler(mockRequest, mockResponse)

    expect(mockResponse.response).toHaveBeenCalledWith({
      message: 'success',
      ...mockResponseData
    })

    expect(mockResponse.code).toHaveBeenCalledWith(200)
  })

  test('should return nothing if repository returns undefined', async () => {
    getWorkSchedules.mockResolvedValue(undefined)

    await workscheduleListController.handler(mockRequest, mockResponse)

    expect(mockResponse.response).toHaveBeenCalledWith({
      message: 'success',
      ...undefined
    })

    expect(mockResponse.code).toHaveBeenCalledWith(200)
  })
})

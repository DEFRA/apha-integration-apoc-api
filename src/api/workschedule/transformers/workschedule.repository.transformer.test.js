import { transformRepositoryWorkschedule } from './workschedule.repository.transformer.js'

describe('WorkSchedule transformer', () => {
  let defaultWorkschedule
  let defaultExpectedWorkschedule

  beforeEach(() => {
    defaultWorkschedule = {
      countryCode: 'SCOTLAND', //pega_data.ahwork_ac.ukcountrycode
      contactid: 'C165595', //pega_data.ahwork_ac.contactid
      locationid: 'L159133', //pega_data.ahwork_ac.locationid
      contactname: 'L159133' //pega_data.ahview_assign_workbasket_ac.contactname
    }
    defaultExpectedWorkschedule = {
      countryCode: 'SCOTLAND', //pega_data.ahwork_ac.ukcountrycode
      contactid: 'C1*****', //pega_data.ahwork_ac.contactid
      locationid: 'L1*****', //pega_data.ahwork_ac.locationid
      contactname: 'L1*****' //pega_data.ahview_assign_workbasket_ac.contactname
    }
  })

  test('should transform workschedule object when there is only one', async () => {
    const payload = [{ ...defaultWorkschedule }]
    const expected = [{ ...defaultExpectedWorkschedule }]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should transform workschedule object when there is an array', async () => {
    const payload = [
      { ...defaultWorkschedule },
      { ...defaultWorkschedule, locationid: 'AK98231233' },
      { ...defaultWorkschedule, locationid: 'JO3454364376' }
    ]
    const expected = [
      { ...defaultExpectedWorkschedule },
      { ...defaultExpectedWorkschedule, locationid: 'AK*****' },
      { ...defaultExpectedWorkschedule, locationid: 'JO*****' }
    ]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should transform workschedule object when values are missing', async () => {
    const payload = [{ countryCode: 'ENGLAND' }]
    const expected = [
      {
        countryCode: 'ENGLAND',
        contactid: '*****',
        locationid: '*****',
        contactname: '*****'
      }
    ]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should transform workschedule object when values are single characters', async () => {
    const payload = [
      {
        ...defaultWorkschedule,
        contactid: 'A',
        locationid: 'B',
        contactname: 'C'
      }
    ]
    const expected = [
      {
        ...defaultExpectedWorkschedule,
        contactid: 'A*****',
        locationid: 'B*****',
        contactname: 'C*****'
      }
    ]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should transform workschedule object when values are empty strings', async () => {
    const payload = [
      {
        ...defaultWorkschedule,
        contactid: '',
        locationid: '',
        contactname: ''
      }
    ]
    const expected = [
      {
        ...defaultExpectedWorkschedule,
        contactid: '*****',
        locationid: '*****',
        contactname: '*****'
      }
    ]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should not fail when array is empty', async () => {
    const payload = []
    const expected = []

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should not fail when payload us undefined', async () => {
    const payload = undefined
    const expected = undefined

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })
})

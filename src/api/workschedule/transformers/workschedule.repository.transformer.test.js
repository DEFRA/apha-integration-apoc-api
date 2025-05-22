import { transformRepositoryWorkschedule } from './workschedule.repository.transformer.js'

describe('WorkSchedule transformer', () => {
  let defaultWorkschedule
  let defaultExpectedWorkschedule

  beforeEach(() => {
    defaultWorkschedule = {
      countryCode: 'SCOTLAND', //pega_data.ahwork_ac.ukcountrycode
      contactId: 'C165595', //pega_data.ahwork_ac.contactid
      locationId: 'L159133', //pega_data.ahwork_ac.locationid
      locationContactName: 'L159133' //pega_data.ahview_assign_workbasket_ac.contactname
    }
    defaultExpectedWorkschedule = {
      countryCode: 'SCOTLAND', //pega_data.ahwork_ac.ukcountrycode
      contactId: 'C1*****', //pega_data.ahwork_ac.contactid
      locationId: 'L1*****', //pega_data.ahwork_ac.locationid
      locationContactName: 'L1*****' //pega_data.ahview_assign_workbasket_ac.contactname
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
      { ...defaultWorkschedule, locationId: 'AK98231233' },
      { ...defaultWorkschedule, locationId: 'JO3454364376' }
    ]
    const expected = [
      { ...defaultExpectedWorkschedule },
      { ...defaultExpectedWorkschedule, locationId: 'AK*****' },
      { ...defaultExpectedWorkschedule, locationId: 'JO*****' }
    ]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should transform workschedule object when values are missing', async () => {
    const payload = [{ countryCode: 'ENGLAND' }]
    const expected = [
      {
        countryCode: 'ENGLAND',
        contactId: '*****',
        locationId: '*****',
        locationContactName: '*****'
      }
    ]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should transform workschedule object when values are single characters', async () => {
    const payload = [
      {
        ...defaultWorkschedule,
        contactId: 'A',
        locationId: 'B',
        locationContactName: 'C'
      }
    ]
    const expected = [
      {
        ...defaultExpectedWorkschedule,
        contactId: 'A*****',
        locationId: 'B*****',
        locationContactName: 'C*****'
      }
    ]

    const value = transformRepositoryWorkschedule(payload)

    expect(value).toEqual(expected)
  })

  test('should transform workschedule object when values are empty strings', async () => {
    const payload = [
      {
        ...defaultWorkschedule,
        contactId: '',
        locationId: '',
        locationContactName: ''
      }
    ]
    const expected = [
      {
        ...defaultExpectedWorkschedule,
        contactId: '*****',
        locationId: '*****',
        locationContactName: '*****'
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

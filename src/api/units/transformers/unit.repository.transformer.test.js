import { transformRepositoryUnits } from './unit.repository.transformer.js'

describe('Units transformer', () => {
  let defaultUnit
  let defaultExpectedUnit

  beforeEach(() => {
    defaultUnit = {
      cph: '42/091/0012',
      person_family_name: 'Johansons',
      person_given_name: 'Gumbo',
      organisation_name: 'My long and interesting Org name',
      property_number: '12 Feelings Lane',
      cph_type: 'PERMANENT'
    }
    defaultExpectedUnit = {
      cph: '42/091/0012',
      person_family_name: 'Jo*****',
      person_given_name: 'Gu*****',
      organisation_name: 'My*****',
      property_number: '12*****',
      cph_type: 'PERMANENT'
    }
  })

  test('should transform unit object when there is only one', async () => {
    const payload = [{ ...defaultUnit }]
    const expected = [{ ...defaultExpectedUnit }]

    const value = transformRepositoryUnits(payload)

    expect(value).toEqual(expected)
  })

  test('should transform unit object when there is an array', async () => {
    const payload = [
      { ...defaultUnit },
      { ...defaultUnit, person_given_name: 'Andy' },
      { ...defaultUnit, person_given_name: 'Pod' }
    ]
    const expected = [
      { ...defaultExpectedUnit },
      { ...defaultExpectedUnit, person_given_name: 'An*****' },
      { ...defaultExpectedUnit, person_given_name: 'Po*****' }
    ]

    const value = transformRepositoryUnits(payload)

    expect(value).toEqual(expected)
  })

  test('should transform unit object when values are missing', async () => {
    const payload = [{ cph: '42/091/0012' }]
    const expected = [
      {
        cph: '42/091/0012',
        person_family_name: '*****',
        person_given_name: '*****',
        organisation_name: '*****',
        property_number: '*****'
      }
    ]

    const value = transformRepositoryUnits(payload)

    expect(value).toEqual(expected)
  })

  test('should transform unit object when values are single characters', async () => {
    const payload = [
      {
        ...defaultUnit,
        person_family_name: 'A',
        person_given_name: 'B',
        organisation_name: 'C',
        property_number: 'D'
      }
    ]
    const expected = [
      {
        ...defaultExpectedUnit,
        person_family_name: 'A*****',
        person_given_name: 'B*****',
        organisation_name: 'C*****',
        property_number: 'D*****'
      }
    ]

    const value = transformRepositoryUnits(payload)

    expect(value).toEqual(expected)
  })

  test('should transform unit object when values are empty strings', async () => {
    const payload = [
      {
        ...defaultUnit,
        person_family_name: '',
        person_given_name: '',
        organisation_name: '',
        property_number: ''
      }
    ]
    const expected = [
      {
        ...defaultExpectedUnit,
        person_family_name: '*****',
        person_given_name: '*****',
        organisation_name: '*****',
        property_number: '*****'
      }
    ]

    const value = transformRepositoryUnits(payload)

    expect(value).toEqual(expected)
  })

  test('should not fail when array is empty', async () => {
    const payload = []
    const expected = []

    const value = transformRepositoryUnits(payload)

    expect(value).toEqual(expected)
  })

  test('should not fail when payload us undefined', async () => {
    const payload = undefined
    const expected = undefined

    const value = transformRepositoryUnits(payload)

    expect(value).toEqual(expected)
  })
})
